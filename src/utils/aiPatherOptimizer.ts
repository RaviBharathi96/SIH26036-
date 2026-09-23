<<<<<<< HEAD
import { Vector3D, HazardZone, AiHyperparameters, MissionPatrolWaypoint } from '../types';
=======
import { Vector3D, HazardZone, AiHyperparameters } from '../types';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

export const DEFAULT_AI_HYPERPARAMETERS: AiHyperparameters = {
  hazardAversionWeight: 2.8,
  smoothnessWeight: 1.6,
  diffusionRate: 0.045,
  goldenHourDecayRate: 0.00035,
  lookaheadHorizonSeconds: 5.0,
  obstacleBufferMeters: 0.75,
  roverMaxSpeedMs: 1.1,
  droneMaxSpeedMs: 1.8,
  profileName: 'balanced',
};

export const AI_TRAINING_PRESET_PROFILES: Record<string, AiHyperparameters> = {
  balanced: {
    ...DEFAULT_AI_HYPERPARAMETERS,
    profileName: 'balanced',
  },
  safety_first: {
    hazardAversionWeight: 4.5,
    smoothnessWeight: 2.4,
    diffusionRate: 0.065,
    goldenHourDecayRate: 0.00030,
    lookaheadHorizonSeconds: 7.0,
    obstacleBufferMeters: 1.1,
    roverMaxSpeedMs: 0.8,
    droneMaxSpeedMs: 1.4,
    profileName: 'safety_first',
  },
  fast_response: {
    hazardAversionWeight: 1.6,
    smoothnessWeight: 1.1,
    diffusionRate: 0.035,
    goldenHourDecayRate: 0.00045,
    lookaheadHorizonSeconds: 3.5,
    obstacleBufferMeters: 0.55,
    roverMaxSpeedMs: 1.5,
    droneMaxSpeedMs: 2.3,
    profileName: 'fast_response',
  },
};

export interface OptimizedPathPoint extends Vector3D {
  segmentType: 'ground_drive' | 'aerial_crest' | 'hover_survey';
  curvature: number;
  safetyMarginMeters: number;
  targetSpeedMs: number;
  recommendedHeadingYaw: number;
<<<<<<< HEAD
  name?: string;
  is90DegTurn?: boolean;
  is80DegTurn?: boolean;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

export interface OptimizedPathResult {
  waypoints: OptimizedPathPoint[];
  densePolyline: Vector3D[];
  roverWaypoints: Vector3D[];
  droneWaypoints: Vector3D[];
  totalDistanceMeters: number;
  estTransitSeconds: number;
  safetyClearanceScore: number; // 0 - 100
  curvatureJerkScore: number;   // lower is smoother
  evasionOffsetMeters: number;
}

/**
 * Optimizes the subterranean rescue path using a combination of dynamic potential fields,
 * wall inflation clearance margins, and kinematic curvature smoothing.
 */
export function computeOptimizedRescuePath(
  hazards: HazardZone[],
  hyperparams: AiHyperparameters = DEFAULT_AI_HYPERPARAMETERS
): OptimizedPathResult {
  const { hazardAversionWeight, smoothnessWeight, obstacleBufferMeters, roverMaxSpeedMs, droneMaxSpeedMs } = hyperparams;

  // Identify active hazards
  const methaneHazard = hazards.find((h) => h.type === 'methane') || {
    position: { x: -8.0, y: 1.0, z: 10.0 },
    radius: 5.5,
  };

  // Base corridor keypoints through the subterranean mine
  // Tunnel bounds: Main drift is x in [-2.0, 2.0], z in [0, 33]
  // West methane plume is centered at x=-8.0, z=10.0
  // Wall max bound: 2.0m - buffer (e.g. 2.0 - 0.75 = 1.25m max safe east offset)
<<<<<<< HEAD
  const maxSafeWallX = Math.max(0.65, 2.0 - obstacleBufferMeters);
=======
  const maxSafeWallX = Math.max(0.6, 2.0 - obstacleBufferMeters);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  
  // Calculate dynamic repulsion deflection based on hazard aversion weight
  // Base offset 0.8m scaled by aversion factor
  const dynamicEvasionX = Math.min(
    maxSafeWallX,
<<<<<<< HEAD
    0.80 + (hazardAversionWeight - 1.0) * 0.22
  );

  // Raw control anchors with intermediate smooth fillets
  const rawAnchors: { pos: Vector3D; type: 'ground_drive' | 'aerial_crest' | 'hover_survey'; speed: number; name?: string; is90DegTurn?: boolean; is80DegTurn?: boolean }[] = [
    // WP0: Staging Portal
    { pos: { x: 0.0, y: 0.22, z: 0.0 }, type: 'ground_drive', speed: roverMaxSpeedMs, name: 'Portal Staging & Entry' },
    // WP1: Main Drift Ingress
    { pos: { x: 0.0, y: 0.22, z: 6.5 }, type: 'ground_drive', speed: roverMaxSpeedMs, name: 'Main Ingress Drift East Rail' },
    // WP2: Approaching Methane Influence Zone - Pre-turn
    { pos: { x: dynamicEvasionX * 0.55, y: 0.22, z: 8.5 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.9, name: 'Methane Standoff Pre-Turn' },
    // WP3: Maximum Methane Evasion Deflection Apex (opposite to West Branch at z=10.5)
    { pos: { x: dynamicEvasionX, y: 0.22, z: 11.2 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.8, name: 'West Methane Hazard Standoff Flank' },
    // WP4: Post-Evasion Return toward corridor centerline
    { pos: { x: dynamicEvasionX * 0.4, y: 0.22, z: 14.5 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.9, name: 'Spine Re-entry Deflection' },
    // WP5: East Branch Junction Centerline Ingress
    { pos: { x: 0.0, y: 0.22, z: 18.0 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.85, name: 'Main Drift Centerline Ingress' },
    // WP6: 90-Degree Sharp Turn Apex into East Branch (z=20.0, heading turns 90° East)
    { pos: { x: 0.0, y: 0.22, z: 20.0 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.65, name: '90° Sharp East Drift Pivot Turn', is90DegTurn: true, is80DegTurn: false },
    // WP7: East drift straightaway lane
    { pos: { x: 3.8, y: 0.22, z: 20.0 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.85, name: 'East Drift Crosscut Lane' },
    // WP8: Rover Pre-Rubble Staging Base (Obstacle standoff at x=6.8m - Drone Auto-Launches by itself!)
    { pos: { x: 6.8, y: 0.22, z: 20.0 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.65, name: 'Rover Impassable Rubble Standoff (Auto Drone Launch)' },
    
    // --- Scout Drone Aerial Transition ---
    // WP9: Aerial Liftoff from Rover Dock (vertical climb clear of chassis)
    { pos: { x: 7.0, y: 1.35, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.6, name: 'Drone Vertical Liftoff' },
    // WP10: Cresting the 18.4 m³ Rock Collapse (Peak altitude clearance at z=20, x=8.8)
    { pos: { x: 8.8, y: 2.25, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.85, name: 'Aerial Rubble Cresting (1.4m Gap)' },
    // WP11: Post-Rubble Cavern Descent into Survivor Chamber
    { pos: { x: 11.2, y: 1.95, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.9, name: 'Survivor Chamber Descent' },
    // WP12: Survivor Randy Standoff & Thermal Hover Lock (eye-level inspection)
    { pos: { x: 13.5, y: 1.85, z: 20.0 }, type: 'hover_survey', speed: 0.0, name: 'Survivor Randy Biometric Lock' },
=======
    0.75 + (hazardAversionWeight - 1.0) * 0.22
  );

  // Raw control anchors
  const rawAnchors: { pos: Vector3D; type: 'ground_drive' | 'aerial_crest' | 'hover_survey'; speed: number }[] = [
    // WP0: Staging Portal
    { pos: { x: 0.0, y: 0.22, z: 0.0 }, type: 'ground_drive', speed: roverMaxSpeedMs },
    // WP1: Main Drift Ingress
    { pos: { x: 0.0, y: 0.22, z: 6.5 }, type: 'ground_drive', speed: roverMaxSpeedMs },
    // WP2: Approaching Methane Influence Zone - Pre-turn
    { pos: { x: dynamicEvasionX * 0.5, y: 0.22, z: 8.5 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.9 },
    // WP3: Maximum Methane Evasion Deflection Apex (opposite to West Branch at z=10.5)
    { pos: { x: dynamicEvasionX, y: 0.22, z: 11.2 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.8 },
    // WP4: Post-Evasion Return toward corridor centerline
    { pos: { x: dynamicEvasionX * 0.35, y: 0.22, z: 14.5 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.9 },
    // WP5: East Branch Junction Alignment
    { pos: { x: 0.2, y: 0.22, z: 17.5 }, type: 'ground_drive', speed: roverMaxSpeedMs },
    // WP6: Turning into East Branch (z=19.8)
    { pos: { x: 1.8, y: 0.22, z: 19.8 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.85 },
    // WP7: Rover Pre-Rubble Staging Base (impassable rubble begins at x=7.5m)
    { pos: { x: 6.8, y: 0.22, z: 20.0 }, type: 'ground_drive', speed: roverMaxSpeedMs * 0.7 },
    
    // --- Scout Drone Aerial Transition ---
    // WP8: Aerial Liftoff from Rover Dock
    { pos: { x: 6.9, y: 1.2, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.6 },
    // WP9: Cresting the 18.4 m³ Rock Collapse (Peak altitude clearance at z=20, x=8.8)
    { pos: { x: 8.8, y: 2.22, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.85 },
    // WP10: Post-Rubble Cavern Descent into Survivor Chamber
    { pos: { x: 11.2, y: 2.05, z: 20.0 }, type: 'aerial_crest', speed: droneMaxSpeedMs * 0.9 },
    // WP11: Survivor Randy Standoff & Thermal Hover Lock
    { pos: { x: 13.5, y: 1.85, z: 20.0 }, type: 'hover_survey', speed: 0.0 },
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  ];

  // Apply Laplacian Curvature Smoothing across the intermediate trajectory
  const smoothedAnchors = rawAnchors.map((item) => ({ ...item, pos: { ...item.pos } }));
  const smoothIterations = Math.round(3 + smoothnessWeight * 2);
  const alpha = 0.22;

  for (let iter = 0; iter < smoothIterations; iter++) {
    for (let i = 1; i < smoothedAnchors.length - 1; i++) {
      // Don't smooth the elevation transition boundary (between ground rover and aerial drone)
<<<<<<< HEAD
      // or the sharp 90-degree corner apex
      if (
        smoothedAnchors[i].type !== smoothedAnchors[i - 1].type ||
        smoothedAnchors[i].type !== smoothedAnchors[i + 1].type ||
        smoothedAnchors[i].is90DegTurn
      ) {
=======
      if (smoothedAnchors[i].type !== smoothedAnchors[i - 1].type || smoothedAnchors[i].type !== smoothedAnchors[i + 1].type) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        continue;
      }
      const prev = smoothedAnchors[i - 1].pos;
      const curr = smoothedAnchors[i].pos;
      const next = smoothedAnchors[i + 1].pos;

      // Laplacian delta on X and Z
      const deltaX = 0.5 * (prev.x + next.x) - curr.x;
      const deltaZ = 0.5 * (prev.z + next.z) - curr.z;

      // Verify that smoothing doesn't push the rover back toward methane in z in [8, 14]
      let candidateX = curr.x + alpha * deltaX;
      if (curr.z >= 8.5 && curr.z <= 13.5) {
        // Enforce minimum standoff boundary
        candidateX = Math.max(dynamicEvasionX * 0.8, Math.min(maxSafeWallX, candidateX));
      }

      smoothedAnchors[i].pos.x = candidateX;
      smoothedAnchors[i].pos.z = curr.z + alpha * deltaZ;
    }
  }

  // Generate dense polyline (step size ~0.25m for precise rendering & simulation tracking)
  const densePolyline: Vector3D[] = [];
  const optimizedWaypoints: OptimizedPathPoint[] = [];

  for (let i = 0; i < smoothedAnchors.length; i++) {
    const p = smoothedAnchors[i];
    const prevPos = i > 0 ? smoothedAnchors[i - 1].pos : p.pos;
    const nextPos = i < smoothedAnchors.length - 1 ? smoothedAnchors[i + 1].pos : p.pos;

    // Heading calculation
    const heading = Math.atan2(nextPos.x - prevPos.x, nextPos.z - prevPos.z);

    // Approximate local curvature
    const d1 = Math.hypot(p.pos.x - prevPos.x, p.pos.z - prevPos.z);
    const d2 = Math.hypot(nextPos.x - p.pos.x, nextPos.z - p.pos.z);
    let curvature = 0;
    if (d1 > 0.05 && d2 > 0.05 && i > 0 && i < smoothedAnchors.length - 1) {
      const h1 = Math.atan2(p.pos.x - prevPos.x, p.pos.z - prevPos.z);
      const h2 = Math.atan2(nextPos.x - p.pos.x, nextPos.z - p.pos.z);
      let diff = h2 - h1;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      curvature = Math.abs(diff) / ((d1 + d2) * 0.5);
    }

    // Safety margin calculation from methane
    const distToMethane = Math.hypot(p.pos.x - methaneHazard.position.x, p.pos.z - methaneHazard.position.z);
    const safetyMargin = Math.max(0.2, distToMethane - methaneHazard.radius);

    optimizedWaypoints.push({
      x: p.pos.x,
      y: p.pos.y,
      z: p.pos.z,
      segmentType: p.type,
      curvature,
      safetyMarginMeters: Number(safetyMargin.toFixed(2)),
      targetSpeedMs: p.speed,
      recommendedHeadingYaw: heading,
<<<<<<< HEAD
      name: p.name,
      is90DegTurn: p.is90DegTurn,
      is80DegTurn: p.is80DegTurn,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    });
  }

  // Interpolate dense polyline with cubic Hermite / Catmull-Rom
  for (let i = 0; i < smoothedAnchors.length - 1; i++) {
    const p0 = smoothedAnchors[Math.max(0, i - 1)].pos;
    const p1 = smoothedAnchors[i].pos;
    const p2 = smoothedAnchors[i + 1].pos;
    const p3 = smoothedAnchors[Math.min(smoothedAnchors.length - 1, i + 2)].pos;

    const segmentDist = Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    const steps = Math.max(4, Math.round(segmentDist / 0.25));

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;

      // Catmull-Rom formulation
      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      const z = 0.5 * ((2 * p1.z) + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3);

      densePolyline.push({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)), z: Number(z.toFixed(3)) });
    }
  }
  densePolyline.push(smoothedAnchors[smoothedAnchors.length - 1].pos);

  // Compute metrics
  let totalDist = 0;
  for (let i = 1; i < densePolyline.length; i++) {
    totalDist += Math.hypot(
      densePolyline[i].x - densePolyline[i - 1].x,
      densePolyline[i].y - densePolyline[i - 1].y,
      densePolyline[i].z - densePolyline[i - 1].z
    );
  }

  // Estimate transit time
  const roverDist = 24.5;
  const droneDist = 6.7;
  const estTransit = (roverDist / roverMaxSpeedMs) + (droneDist / droneMaxSpeedMs) + 6.0; // dwell & takeoff overhead

  // Safety Clearance Score: 0 to 100 based on minimum distance to methane pocket
  const minMethaneDist = Math.min(
    ...densePolyline.map((p) => Math.hypot(p.x - methaneHazard.position.x, p.z - methaneHazard.position.z))
  );
  const safetyClearanceScore = Math.min(100, Math.max(10, Math.round((minMethaneDist / 9.5) * 100)));

  // Curvature Jerk Score (average curvature magnitude)
  const avgCurvature = optimizedWaypoints.reduce((acc, wp) => acc + wp.curvature, 0) / Math.max(1, optimizedWaypoints.length);
  const curvatureJerkScore = Number(avgCurvature.toFixed(3));

  const roverWps = optimizedWaypoints.filter((wp) => wp.segmentType === 'ground_drive').map((wp) => ({ x: wp.x, y: wp.y, z: wp.z }));
  const droneWps = optimizedWaypoints.filter((wp) => wp.segmentType !== 'ground_drive').map((wp) => ({ x: wp.x, y: wp.y, z: wp.z }));

  return {
    waypoints: optimizedWaypoints,
    densePolyline,
    roverWaypoints: roverWps,
    droneWaypoints: droneWps,
    totalDistanceMeters: Number(totalDist.toFixed(2)),
    estTransitSeconds: Math.round(estTransit),
    safetyClearanceScore,
    curvatureJerkScore,
    evasionOffsetMeters: Number(dynamicEvasionX.toFixed(2)),
  };
}
<<<<<<< HEAD

/**
 * Calculates multi-objective loss for training the AI pather in real time
 */
export function computeTrajectoryLoss(
  hyperparams: AiHyperparameters,
  hazards: HazardZone[]
): {
  lossHazard: number;
  lossSmoothness: number;
  lossEfficiency: number;
  totalLoss: number;
  validationAccuracyPct: number;
} {
  const path = computeOptimizedRescuePath(hazards, hyperparams);

  // 1. Hazard Loss: penalizes proximity to hazard boundary
  const hazardLoss = Math.max(0.01, Number(((100 - path.safetyClearanceScore) / 250).toFixed(3)));

  // 2. Smoothness Loss: penalizes high curvature jerk
  const smoothnessLoss = Math.max(0.015, Number((path.curvatureJerkScore * 0.45).toFixed(3)));

  // 3. Efficiency Loss: transit time overhead relative to nominal 20s
  const efficiencyLoss = Math.max(0.02, Number((Math.max(0, path.estTransitSeconds - 18) / 120).toFixed(3)));

  const totalLoss = Number((hazardLoss + smoothnessLoss + efficiencyLoss).toFixed(3));
  const accuracy = Math.min(99.6, Math.max(70.0, Number((100 - totalLoss * 42).toFixed(1))));

  return {
    lossHazard: hazardLoss,
    lossSmoothness: smoothnessLoss,
    lossEfficiency: efficiencyLoss,
    totalLoss,
    validationAccuracyPct: accuracy,
  };
}

/**
 * Executes a simulated training step (gradient descent optimization)
 * to tune hyperparameters toward target objective
 */
export function trainAiHyperparametersRealTime(
  current: AiHyperparameters,
  objective: 'balanced' | 'safety_first' | 'fast_response',
  learningRate: number = 0.12
): AiHyperparameters {
  const target = AI_TRAINING_PRESET_PROFILES[objective] || DEFAULT_AI_HYPERPARAMETERS;

  return {
    ...current,
    hazardAversionWeight: Number((current.hazardAversionWeight + (target.hazardAversionWeight - current.hazardAversionWeight) * learningRate).toFixed(2)),
    smoothnessWeight: Number((current.smoothnessWeight + (target.smoothnessWeight - current.smoothnessWeight) * learningRate).toFixed(2)),
    obstacleBufferMeters: Number((current.obstacleBufferMeters + (target.obstacleBufferMeters - current.obstacleBufferMeters) * learningRate).toFixed(2)),
    roverMaxSpeedMs: Number((current.roverMaxSpeedMs + (target.roverMaxSpeedMs - current.roverMaxSpeedMs) * learningRate).toFixed(2)),
    droneMaxSpeedMs: Number((current.droneMaxSpeedMs + (target.droneMaxSpeedMs - current.droneMaxSpeedMs) * learningRate).toFixed(2)),
    lookaheadHorizonSeconds: Number((current.lookaheadHorizonSeconds + (target.lookaheadHorizonSeconds - current.lookaheadHorizonSeconds) * learningRate).toFixed(1)),
    profileName: objective,
  };
}

/**
 * Generates an operational multi-stage Mission Patrol Plan directly on the spot,
 * separating ground rover navigation and quadcopter aerial crest / hover standoff.
 */
export function generateOnTheSpotPatrolPlan(
  hazards: HazardZone[],
  hyperparams: AiHyperparameters = DEFAULT_AI_HYPERPARAMETERS
): {
  roverWaypoints: MissionPatrolWaypoint[];
  droneWaypoints: MissionPatrolWaypoint[];
  stats: {
    totalDistanceMeters: number;
    estTransitSeconds: number;
    safetyClearanceScore: number;
    curvatureJerkScore: number;
    evasionOffsetMeters: number;
  };
} {
  const trajectory = computeOptimizedRescuePath(hazards, hyperparams);
  const now = Date.now();

  const roverWaypoints: MissionPatrolWaypoint[] = [];
  const droneWaypoints: MissionPatrolWaypoint[] = [];

  trajectory.waypoints.forEach((wp, idx) => {
    if (wp.segmentType === 'ground_drive') {
      const isStart = idx === 0;
      const isMethaneZone = wp.z >= 7.5 && wp.z <= 15.0;
      const isJunction = wp.z >= 16.5 && wp.z <= 18.5;
      const isStagingBase = wp.x >= 6.0 && wp.z >= 19.5;

      let action: 'patrol_pass' | 'sensor_scan' | 'thermal_hover' | 'gas_sniff' | 'light_beacon' = 'patrol_pass';
      let dwell = 1.0;
      let label = `Rover Path Segment ${idx + 1}`;

      if (isStart) {
        action = 'sensor_scan';
        dwell = 2.0;
        label = 'Portal Ingress (Sensor Calibration)';
      } else if (isMethaneZone) {
        action = 'gas_sniff';
        dwell = 2.5;
        label = `CH4 Evasion Apex (+${trajectory.evasionOffsetMeters}m)`;
      } else if (isJunction) {
        action = 'sensor_scan';
        dwell = 1.5;
        label = 'East Drift Crosscut Junction';
      } else if (isStagingBase) {
        action = 'light_beacon';
        dwell = 4.0;
        label = 'Pre-Rubble Ground Depot & Drone Launch Pad';
      }

      roverWaypoints.push({
        id: `rover-spot-wp-${idx}-${now}`,
        index: roverWaypoints.length,
        vehicle: 'rover',
        position: {
          x: Number(wp.x.toFixed(2)),
          y: 0.22,
          z: Number(wp.z.toFixed(2)),
        },
        speedMs: wp.targetSpeedMs,
        dwellTimeSeconds: dwell,
        action,
        label,
      });
    } else {
      const isHoverSurvivor = wp.segmentType === 'hover_survey';
      const isCrest = wp.y >= 2.0;

      let action: 'patrol_pass' | 'sensor_scan' | 'thermal_hover' | 'gas_sniff' | 'light_beacon' = 'patrol_pass';
      let dwell = 2.0;
      let label = `Drone Flight Segment ${idx + 1}`;

      if (isHoverSurvivor) {
        action = 'thermal_hover';
        dwell = 12.0;
        label = 'Survivor Randy Chamber (Thermal Lock & Comms)';
      } else if (isCrest) {
        action = 'sensor_scan';
        dwell = 3.0;
        label = '18.4m³ Rock Collapse Overflight Crest';
      } else {
        action = 'patrol_pass';
        dwell = 1.5;
        label = `Scout Flight Nav Point ${droneWaypoints.length + 1}`;
      }

      droneWaypoints.push({
        id: `drone-spot-wp-${idx}-${now}`,
        index: droneWaypoints.length,
        vehicle: 'drone',
        position: {
          x: Number(wp.x.toFixed(2)),
          y: Number(wp.y.toFixed(2)),
          z: Number(wp.z.toFixed(2)),
        },
        speedMs: wp.targetSpeedMs,
        dwellTimeSeconds: dwell,
        action,
        label,
      });
    }
  });

  return {
    roverWaypoints,
    droneWaypoints,
    stats: {
      totalDistanceMeters: trajectory.totalDistanceMeters,
      estTransitSeconds: trajectory.estTransitSeconds,
      safetyClearanceScore: trajectory.safetyClearanceScore,
      curvatureJerkScore: trajectory.curvatureJerkScore,
      evasionOffsetMeters: trajectory.evasionOffsetMeters,
    },
  };
}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
