export type CameraViewMode = 
  | 'orbit' 
  | 'rover_chase' 
  | 'rover_fpv' 
  | 'drone_chase' 
  | 'drone_fpv' 
  | 'thermal_ir'
<<<<<<< HEAD
  | 'slam_topdown'
  | 'lidar_ranger';

export interface LidarRangesData {
  front: number;
  left: number;
  right: number;
  rear: number;
  minRange: number;
  maxRange: number;
  beamCount: number;
}

export type GasInspectionPhase = 
  | 'idle'
  | 'sampling_rubble'
  | 'inspecting_drift_junction'
  | 'sniffing_west_perimeter'
  | 'returning_to_staging'
  | 'inspection_complete';

export interface GasAirQualityInspectionData {
  active: boolean;
  phase: GasInspectionPhase;
  phaseLabel: string;
  progressPct: number;
  o2Percent: number;
  airQualityScore: number; // 0 - 100
  airQualityStatus: 'OPTIMAL' | 'MODERATE' | 'HAZARDOUS' | 'EXPLOSIVE_RISK';
  targetLocationName: string;
  notes: string;
}
=======
  | 'slam_topdown';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface HazardZone {
  id: string;
  name: string;
  type: 'methane' | 'collapse' | 'fire_heat';
  position: Vector3D;
  radius: number;
  severity: 'low' | 'moderate' | 'critical';
  description: string;
}

export interface SurvivorData {
  id: string;
  name: string;
  position: Vector3D;
  status: 'conscious' | 'weak' | 'critical';
  respirationBpm: number;
  heartRateBpm: number;
  temperatureC: number;
  detected: boolean;
  visualConfidence: number;
  thermalConfidence: number;
  acousticConfidence: number;
  co2Confidence: number;
  uwbConfidence: number;
  fusedProbability: number;
}

export interface RoverTelemetry {
  position: Vector3D;
  yaw: number;
  speed: number;
  steering: number;
  batteryPct: number;
  ch4Ppm: number;
  coPpm: number;
  co2Ppm: number;
<<<<<<< HEAD
  o2Percent?: number;
  airQualityScore?: number;
  temperatureC: number;
  headlights: boolean;
  lidarActive: boolean;
  lidarRanges?: LidarRangesData;
  gasInspection?: GasAirQualityInspectionData;
  commsRssi: number; // dBm
  mode: 'manual' | 'auto_mapping' | 'retreat' | 'return_to_base' | 'gas_air_inspection';
=======
  temperatureC: number;
  headlights: boolean;
  lidarActive: boolean;
  commsRssi: number; // dBm
  mode: 'manual' | 'auto_mapping' | 'retreat' | 'return_to_base';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

export interface DroneTelemetry {
  position: Vector3D;
  yaw: number;
  altitude: number;
  batteryPct: number;
  state: 'docked' | 'launching' | 'scouting' | 'hovering' | 'returning' | 'landed' | 'manual_flight';
  spotlight: boolean;
  thermalLocked: boolean;
  relDistanceToRover: number;
  flightSpeed?: number;
  verticalSpeed?: number;
  estimatedFlightSecondsRemaining?: number;
  batteryDischargeRate?: number; // % per minute
  flightDurationSeconds?: number;
}

export type ActiveVehicle = 'rover' | 'drone';

export type MissionPhase = 
  | 'standby'
  | 'ingress_mapping'
  | 'methane_alert_divert'
  | 'collapse_detected'
  | 'drone_airborne_scout'
  | 'survivor_life_fusion'
  | 'nav2_route_generation'
  | 'rescue_path_verified';

export type MissionMode = 'full_patrol' | 'direct_rescue' | 'manual_teleop';

export interface SafePathWaypoint {
  id: string;
  step: number;
  name: string;
  position: Vector3D;
  clearanceWidthM: number;
  methanePpm: number;
  groundTraversablePct: number;
  riskRating: 'SAFE' | 'CAUTION' | 'RESTRICTED' | 'IMPASSABLE';
  instruction: string;
  vehicle: 'rover' | 'drone' | 'both';
}

export interface TunnelSectorInfo {
  id: string;
  name: string;
  chainageMeters: string;
  airQualityStatus: 'OPTIMAL' | 'LETHAL_CH4' | 'HIGH_HEAT' | 'POOR_AIRFLOW';
  structuralStatus: 'STABLE' | 'COLLAPSED_RUBBLE' | 'FRACTURED_ROOF' | 'UNINSPECTED';
  ch4Ppm: number;
  tempC: number;
  meshRssi: number;
  mappedPercent: number;
  passability: 'ALL_VEHICLES' | 'AERIAL_ONLY' | 'NO_ACCESS';
}

export interface PublicRescueReport {
  timestamp: string;
  incidentId: string;
  mineName: string;
  survivorName: string;
  survivorStatus: 'ALIVE_STABLE' | 'ALIVE_CRITICAL' | 'UNCONFIRMED';
  distanceFromPortalMeters: number;
  locationDescription: string;
  goldenHourRemainingMinutes: number;
  coreVitalsSummary: {
    heartRateBpm: number;
    respirationRateBpm: number;
    estimatedCoreTempC: number;
    responsiveness: string;
  };
  plainEnglishObstacleSummary: string;
  plainEnglishMethaneSummary: string;
  plainEnglishDroneHeroSummary: string;
  safestExtractionSteps: string[];
  recommendedEquipment: string[];
  publicBriefingDraft: string;
}

export interface RosPackageFile {
  path: string;
  filename: string;
  category: 'launch' | 'urdf' | 'sdf' | 'config' | 'scripts' | 'rviz' | 'build';
  description: string;
  content: string;
}

export interface MissionPatrolWaypoint {
  id: string;
  index: number;
  vehicle: 'rover' | 'drone';
  position: Vector3D;
  headingYaw?: number; // radians
  dwellTimeSeconds?: number;
  action?: 'patrol_pass' | 'sensor_scan' | 'thermal_hover' | 'gas_sniff' | 'light_beacon';
  speedMs?: number;
  label?: string;
}

export interface PatrolPlanState {
  roverWaypoints: MissionPatrolWaypoint[];
  droneWaypoints: MissionPatrolWaypoint[];
  activeVehicle: 'rover' | 'drone';
  isLoop: boolean;
  cursorPosition: Vector3D;
  isPlanningMode: boolean;
  isExecutingPatrol: boolean;
  currentPatrolWpIndex?: number;
}

export interface PatrolExecutionStatus {
  mode: 'idle' | 'full_patrol' | 'direct_rescue' | 'custom_patrol';
  phase: 'idle' | 'running' | 'paused' | 'completed';
  step: number;
  totalSteps: number;
  stepName: string;
  stepDescription: string;
  roverWpIndex: number;
  roverWpTotal: number;
  droneWpIndex: number;
  droneWpTotal: number;
  isLoop: boolean;
  progressPct: number;
}

// AI Pather Optimization & Real-Time Hyperparameters
export interface AiHyperparameters {
  hazardAversionWeight: number;    // Weight of repulsive potential from gas/fire (1.0 - 5.0)
  smoothnessWeight: number;        // Weight of minimum jerk / curvature constraint (0.5 - 3.0)
  diffusionRate: number;           // Atmospheric methane diffusion constant (0.01 - 0.10 m²/s)
  goldenHourDecayRate: number;     // Biological body core cooling decay rate (0.0001 - 0.001)
  lookaheadHorizonSeconds: number; // Predictive horizon window (2.0 - 10.0 s)
  obstacleBufferMeters: number;    // Clearance padding around walls & rubble (0.4 - 1.5 m)
  roverMaxSpeedMs: number;         // Safe commanded rover velocity (0.6 - 1.8 m/s)
  droneMaxSpeedMs: number;         // Safe commanded drone velocity (1.0 - 2.5 m/s)
  profileName: 'balanced' | 'safety_first' | 'fast_response' | 'custom';
}

// Real-Time Predictive AI State
export interface AiPredictiveReport {
  methaneArrivalMinutes: number | null;
  methanePlumeRadiusMeters: number;
  survivorGoldenHourRemainingMinutes: number;
  survivorPredictedTempC: number;
  dronePredictedFlightRemainingMinutes: number;
  predictedCollisionRisk: 'NONE' | 'LOW' | 'ELEVATED' | 'CRITICAL';
  predictedFuturePoses: Vector3D[];
  predictedDronePoses: Vector3D[];
  optimalPathMetrics: {
    totalDistanceM: number;
    estTransitSeconds: number;
    safetyClearanceScore: number; // 0 - 100
    curvatureJerkScore: number;   // lower is smoother
  };
}

// On-the-Spot Real-Time AI Tactical Decision
export interface OnTheSpotAiDecision {
  threatLevel: 'NOMINAL' | 'ADVISORY' | 'WARNING' | 'EMERGENCY';
  badgeText: string;
  headline: string;
  actionDirective: string;
  recommendedOffsetM: number;
  recommendedSpeedMs: number;
  droneAction: 'STANDBY' | 'LAUNCH_SCOUT' | 'MAINTAIN_HOVER' | 'RETURN_TO_BASE';
  autonomousOverrideActive: boolean;
  lastUpdatedIso: string;
  reasoningNotes: string[];
}

// Interactive Live AI Training Engine State
export interface AiTrainingState {
  isTraining: boolean;
  currentEpoch: number;
  totalEpochs: number;
  lossHazard: number;
  lossSmoothness: number;
  lossEfficiency: number;
  totalLoss: number;
  validationAccuracyPct: number;
  history: { epoch: number; totalLoss: number; accuracy: number }[];
}

<<<<<<< HEAD
// Environmental Reconnaissance Data from all sides of the mine
export interface MineSectorSurveyData {
  sectorId: string;
  sideName: string; // 'South Portal' | 'West Drift Plume' | 'North Vent Terminus' | 'Central Spine' | 'East Rubble' | 'East Survivor Cavern'
  ch4Ppm: number;
  ch4LelPct: number;
  coPpm: number;
  co2Ppm: number;
  o2Pct: number;
  tempC: number;
  humidityPct: number;
  airflowMs: number;
  dustMgM3: number;
  structuralStabilityPct: number;
  roofCondition: 'SOUND' | 'FRACTURED' | 'COLLAPSED' | 'TIMBER_SHORED';
  humanRescuerSafe: boolean;
  requiredPpe: string;
  surveyComplete: boolean;
  sampleTimestamp: string;
}

export interface HumanRescuerPathNode {
  step: number;
  title: string;
  chainageM: string;
  position: Vector3D;
  headingInstruction: string;
  clearanceWidthM: number;
  atmosphericSafety: 'CLEAR' | 'CAUTION' | 'RESTRICTED';
  ch4Ppm: number;
  o2Pct: number;
  groundStabilityPct: number;
  humanActionNote: string;
  isTurn90Deg?: boolean;
  isTurn80Deg?: boolean;
}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
