import { Vector3D, RoverTelemetry, DroneTelemetry, SurvivorData, HazardZone, AiHyperparameters, AiPredictiveReport, OnTheSpotAiDecision } from '../types';
import { DEFAULT_AI_HYPERPARAMETERS, computeOptimizedRescuePath } from './aiPatherOptimizer';

/**
 * Predicts the forward vehicle trajectory using bicycle/Ackermann kinematics for ground rover
 * and 3D velocity integration for scout drone.
 */
export function predictVehicleTrajectory(
  currentPos: Vector3D,
  yaw: number,
  speedMs: number,
  steerAngle: number,
  isDrone: boolean,
  horizonSeconds: number = 5.0,
  droneVerticalVel: number = 0
): { futurePoses: Vector3D[]; collisionRisk: 'NONE' | 'LOW' | 'ELEVATED' | 'CRITICAL' } {
  const steps = Math.max(5, Math.round(horizonSeconds * 3));
  const dt = horizonSeconds / steps;
  const futurePoses: Vector3D[] = [];

  let simX = currentPos.x;
  let simY = currentPos.y;
  let simZ = currentPos.z;
  let simYaw = yaw;
  let maxRisk: 'NONE' | 'LOW' | 'ELEVATED' | 'CRITICAL' = 'NONE';

  // Effective commanded speed (if vehicle stopped, project nominal forward crawl 0.6 m/s for route anticipation)
  const effectiveSpeed = Math.abs(speedMs) > 0.05 ? speedMs : 0.6;

  for (let i = 1; i <= steps; i++) {
    if (!isDrone) {
      // Rover kinematic prediction
      simYaw += steerAngle * dt * 1.4;
      simX += Math.sin(simYaw) * effectiveSpeed * dt;
      simZ += Math.cos(simYaw) * effectiveSpeed * dt;
      simY = 0.22;

      // Check collision with East rubble collapse (x > 7.2 around z=20)
      if (simX > 7.2 && simZ > 18.0 && simZ < 22.0) {
        maxRisk = 'CRITICAL';
      }
      // Check collision with West methane hazard zone (x near -8, z near 10)
      const distToMethane = Math.hypot(simX - (-8.0), simZ - 10.0);
      if (distToMethane < 5.8) {
        maxRisk = 'CRITICAL';
      } else if (distToMethane < 7.5 && maxRisk !== 'CRITICAL') {
        maxRisk = 'ELEVATED';
      }
    } else {
      // Drone kinematic prediction
      simX += Math.sin(simYaw) * effectiveSpeed * dt;
      simZ += Math.cos(simYaw) * effectiveSpeed * dt;
      simY = Math.max(0.4, Math.min(3.1, simY + droneVerticalVel * dt));

      // Check ceiling clearance (ceiling at 3.3m)
      if (simY > 3.05 || simY < 0.3) {
        maxRisk = 'ELEVATED';
      }
    }

    futurePoses.push({
      x: Number(simX.toFixed(3)),
      y: Number(simY.toFixed(3)),
      z: Number(simZ.toFixed(3)),
    });
  }

  return { futurePoses, collisionRisk: maxRisk };
}

/**
 * Predicts methane plume expansion rate and arrival at the main drift junction
 */
export function predictMethanePlumeDiffusion(
  elapsedSeconds: number,
  diffusionRate: number = 0.045
): { plumeRadiusMeters: number; arrivalMinutes: number | null } {
  // Base physical leak radius at West Drift (x=-8.0, z=10.0)
  // Distance from West leak source to Main Drift edge (x=-2.2m) is 5.8m
  const baseRadius = 5.5;
  const expansion = Math.sqrt(2 * diffusionRate * Math.max(1, elapsedSeconds)) * 1.6;
  const currentRadius = Number((baseRadius + expansion).toFixed(2));

  // Distance from leak origin to main tunnel centerline is 8.0 meters
  const distToCenterline = 8.0;
  if (currentRadius >= distToCenterline) {
    return { plumeRadiusMeters: currentRadius, arrivalMinutes: 0 };
  }

  // Time remaining until front reaches main drift:
  // (distToCenterline - baseRadius) = sqrt(2 * D * t_arrive) * 1.6
  const neededExpansion = (distToCenterline - baseRadius) / 1.6;
  const tArriveTotalSec = (neededExpansion * neededExpansion) / (2 * diffusionRate);
  const remainingSec = Math.max(0, tArriveTotalSec - elapsedSeconds);
  const arrivalMinutes = Number((remainingSec / 60).toFixed(1));

  return {
    plumeRadiusMeters: currentRadius,
    arrivalMinutes: arrivalMinutes > 0 ? arrivalMinutes : null,
  };
}

/**
 * Real-time survivor golden hour prognosis and core body temperature prediction
 */
export function predictSurvivorGoldenHour(
  currentTempC: number = 37.1,
  respirationBpm: number = 14,
  decayRate: number = 0.00035,
  elapsedSeconds: number = 0
): { predictedTempC: number; goldenHourRemainingMinutes: number } {
  const ambientMineTempC = 16.4;
  // Newton's law of subterranean convective body cooling
  const decayExponent = Math.exp(-decayRate * Math.max(0, elapsedSeconds));
  const predictedTemp = ambientMineTempC + (currentTempC - ambientMineTempC) * decayExponent;

  // Critical hypothermia threshold is 32.0°C (loss of shivering, cardiac arrhythmia risk)
  // Solve for time until temp reaches 32.0°C
  const deltaTarget = 32.0 - ambientMineTempC;
  const deltaInitial = currentTempC - ambientMineTempC;
  let goldenMinutes = 240; // Default 4-hour window
  if (deltaInitial > deltaTarget && decayRate > 0) {
    const totalSecondsToCritical = -Math.log(deltaTarget / deltaInitial) / decayRate;
    const remainingSeconds = Math.max(600, totalSecondsToCritical - elapsedSeconds);
    goldenMinutes = Math.round(remainingSeconds / 60);
  }

  // Factor in respiration decline if shallow (<12 BPM)
  if (respirationBpm < 12) {
    goldenMinutes = Math.round(goldenMinutes * 0.85);
  }

  return {
    predictedTempC: Number(predictedTemp.toFixed(1)),
    goldenHourRemainingMinutes: Math.max(15, goldenMinutes),
  };
}

/**
 * Generates the complete Real-Time Predictive AI Report
 */
export function generateRealTimePredictiveReport(
  roverTelemetry: RoverTelemetry | null,
  droneTelemetry: DroneTelemetry | null,
  survivorData: SurvivorData | null,
  hazards: HazardZone[],
  hyperparams: AiHyperparameters = DEFAULT_AI_HYPERPARAMETERS,
  simTimeSeconds: number = 0
): AiPredictiveReport {
  const roverPos = roverTelemetry?.position || { x: 0, y: 0.22, z: 1.0 };
  const dronePos = droneTelemetry?.position || { x: 0, y: 0.45, z: 0.8 };

  // Rover forward prediction
  const roverPred = predictVehicleTrajectory(
    roverPos,
    roverTelemetry?.yaw ?? (Math.PI / 2),
    roverTelemetry?.speed ?? 0,
    roverTelemetry?.steering ?? 0,
    false,
    hyperparams.lookaheadHorizonSeconds
  );

  // Drone forward prediction
  const dronePred = predictVehicleTrajectory(
    dronePos,
    droneTelemetry?.yaw ?? (Math.PI / 2),
    droneTelemetry?.flightSpeed ?? 0,
    0,
    true,
    hyperparams.lookaheadHorizonSeconds,
    droneTelemetry?.verticalSpeed ?? 0
  );

  // Methane plume diffusion prediction
  const methanePred = predictMethanePlumeDiffusion(simTimeSeconds, hyperparams.diffusionRate);

  // Survivor golden-hour prognosis
  const survivorPred = predictSurvivorGoldenHour(
    survivorData?.temperatureC ?? 37.1,
    survivorData?.respirationBpm ?? 14,
    hyperparams.goldenHourDecayRate,
    simTimeSeconds
  );

  // Drone flight remaining projection
  const droneBatt = droneTelemetry?.batteryPct ?? 96;
  // Estimated flight minutes remaining (assuming average 6.5% discharge per minute)
  const droneRemainingMin = Number(((droneBatt / 6.5)).toFixed(1));

  // Path optimization metrics
  const pathResult = computeOptimizedRescuePath(hazards, hyperparams);

  return {
    methaneArrivalMinutes: methanePred.arrivalMinutes,
    methanePlumeRadiusMeters: methanePred.plumeRadiusMeters,
    survivorGoldenHourRemainingMinutes: survivorPred.goldenHourRemainingMinutes,
    survivorPredictedTempC: survivorPred.predictedTempC,
    dronePredictedFlightRemainingMinutes: droneRemainingMin,
    predictedCollisionRisk: roverPred.collisionRisk !== 'NONE' ? roverPred.collisionRisk : dronePred.collisionRisk,
    predictedFuturePoses: roverPred.futurePoses,
    predictedDronePoses: dronePred.futurePoses,
    optimalPathMetrics: {
      totalDistanceM: pathResult.totalDistanceMeters,
      estTransitSeconds: pathResult.estTransitSeconds,
      safetyClearanceScore: pathResult.safetyClearanceScore,
      curvatureJerkScore: pathResult.curvatureJerkScore,
    },
  };
}

/**
 * Evaluates real-time situational awareness on the spot and emits live tactical directives
 */
export function evaluateOnTheSpotAiDecision(
  roverTelemetry: RoverTelemetry | null,
  droneTelemetry: DroneTelemetry | null,
  survivorData: SurvivorData | null,
  hyperparams: AiHyperparameters = DEFAULT_AI_HYPERPARAMETERS
): OnTheSpotAiDecision {
  const ch4Ppm = roverTelemetry?.ch4Ppm ?? 420;
  const roverPos = roverTelemetry?.position || { x: 0, y: 0.22, z: 1.0 };
  const droneState = droneTelemetry?.state ?? 'docked';
  const droneBatt = droneTelemetry?.batteryPct ?? 96;
  const survivorDetected = survivorData?.detected ?? false;

  const reasoningNotes: string[] = [];

  // 1. Critical Methane Plume Threat Detection
  if (ch4Ppm > 10000) {
    reasoningNotes.push(`Critical CH4 concentration (${ch4Ppm.toLocaleString()} ppm) exceeds 20% LEL flammability threshold.`);
    reasoningNotes.push(`Electrical motor spark risk high. Enforcing maximum eastward path deflection +${hyperparams.obstacleBufferMeters + 0.4}m.`);
    return {
      threatLevel: 'EMERGENCY',
      badgeText: 'CRITICAL METHANE EVASION ACTIVE',
      headline: 'Emergency Deflection: West Drift Plume Spike',
      actionDirective: `Governing rover speed to 0.6 m/s. Deflecting steering East (+1.2m offset) to maintain explosion barrier standoff.`,
      recommendedOffsetM: 1.2,
      recommendedSpeedMs: 0.6,
      droneAction: droneState === 'docked' ? 'STANDBY' : 'RETURN_TO_BASE',
      autonomousOverrideActive: true,
      lastUpdatedIso: new Date().toISOString(),
      reasoningNotes,
    };
  }

  // 2. Trapped Miner Acquisition & Thermal Lock
  if (survivorDetected) {
    reasoningNotes.push(`Trapped Miner Randy acquired with ${Math.round((survivorData?.fusedProbability ?? 0) * 100)}% multi-sensor fusion certainty.`);
    reasoningNotes.push(`Respiration: ${survivorData?.respirationBpm ?? 14} BPM. Core Temp: ${survivorData?.temperatureC ?? 36.8}°C.`);
    reasoningNotes.push(`Aerial thermal IR spotlight locked. Relaying biometrics to Incident Command.`);
    return {
      threatLevel: 'NOMINAL',
      badgeText: 'SURVIVOR CONTACT CONFIRMED & LOCKED',
      headline: 'Target Miner Randy Acquired — Holding Aerial Orbit',
      actionDirective: `Maintain steady 1.85m AGL hover lock. Illuminating collapse chamber. Ingress corridor cleared for manual extraction team.`,
      recommendedOffsetM: 0.0,
      recommendedSpeedMs: 0.0,
      droneAction: 'MAINTAIN_HOVER',
      autonomousOverrideActive: false,
      lastUpdatedIso: new Date().toISOString(),
      reasoningNotes,
    };
  }

  // 3. Rover Staging at Rock Collapse -> Launch Drone Directive
  if (roverPos.x >= 6.0 && roverPos.z >= 19.0 && droneState === 'docked') {
    reasoningNotes.push(`Ground rover reached 18.4 m³ collapsed stone barrier at chainage X=6.8m, Z=20.0m.`);
    reasoningNotes.push(`Ground wheels cannot surmount 1.2m rock slabs without rollover hazard.`);
    reasoningNotes.push(`Autonomous recommendation: Launch aerial scout drone to crest rubble.`);
    return {
      threatLevel: 'ADVISORY',
      badgeText: 'RUBBLE STANDOFF REACHED — DRONE LAUNCH RECOMMENDED',
      headline: 'Rubble Blockage: Deploy Aerial Scout Drone',
      actionDirective: `Ground rover immobilized at safety standoff. Launch quadcopter from rover helipad deck to survey trapped chamber.`,
      recommendedOffsetM: 0.0,
      recommendedSpeedMs: 0.0,
      droneAction: 'LAUNCH_SCOUT',
      autonomousOverrideActive: false,
      lastUpdatedIso: new Date().toISOString(),
      reasoningNotes,
    };
  }

  // 4. Drone Battery Low Warning
  if (droneState !== 'docked' && droneBatt < 25) {
    reasoningNotes.push(`Drone battery at ${droneBatt.toFixed(1)}%. Below 25% safety reserve.`);
    reasoningNotes.push(`Risk of emergency uncommanded landing over impassable rubble barrier.`);
    return {
      threatLevel: 'WARNING',
      badgeText: 'DRONE BATTERY LOW — RETURN TO BASE',
      headline: 'Quadcopter Battery Reserve Depleted',
      actionDirective: `Initiating autonomous Return-To-Rover (RTL) docking trajectory before payload power fails.`,
      recommendedOffsetM: 0.0,
      recommendedSpeedMs: 0.8,
      droneAction: 'RETURN_TO_BASE',
      autonomousOverrideActive: true,
      lastUpdatedIso: new Date().toISOString(),
      reasoningNotes,
    };
  }

  // 5. Moderate Methane Warning near West Branch
  if (ch4Ppm > 1500 || (roverPos.z >= 8.5 && roverPos.z <= 13.5 && roverPos.x < 0.4)) {
    reasoningNotes.push(`Approaching West Branch methane leak zone (CH4: ${ch4Ppm} ppm).`);
    reasoningNotes.push(`Applying gentle Eastward bias offset to ensure minimum 8.0m source standoff.`);
    return {
      threatLevel: 'ADVISORY',
      badgeText: 'METHANE ZONE PROXIMITY — PATH DEFLECTING EAST',
      headline: 'Automated Evasion: Biasing East Flank',
      actionDirective: `Steering adjusted +0.85m East along optimal Catmull-Rom spline. Clearance corridor green.`,
      recommendedOffsetM: 0.85,
      recommendedSpeedMs: hyperparams.roverMaxSpeedMs * 0.9,
      droneAction: 'STANDBY',
      autonomousOverrideActive: false,
      lastUpdatedIso: new Date().toISOString(),
      reasoningNotes,
    };
  }

  // Default: Nominal Autonomous Exploration
  reasoningNotes.push(`Corridor parameters nominal. Atmospheric sensors clear.`);
  reasoningNotes.push(`Path pather executing smooth kinematic trajectory following safe Nav2 coordinates.`);
  return {
    threatLevel: 'NOMINAL',
    badgeText: 'AI PATHER OPTIMAL — TRAJECTORY CLEAR',
    headline: 'Autonomous Exploration & Ingress Nominal',
    actionDirective: `All subterranean systems synchronized. Following AI-optimized minimum-jerk corridor.`,
    recommendedOffsetM: 0.0,
    recommendedSpeedMs: hyperparams.roverMaxSpeedMs,
    droneAction: 'STANDBY',
    autonomousOverrideActive: false,
    lastUpdatedIso: new Date().toISOString(),
    reasoningNotes,
  };
}
