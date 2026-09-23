import * as THREE from 'three';
import { 
  CameraViewMode, HazardZone, RoverTelemetry, DroneTelemetry, SurvivorData, 
  MissionPatrolWaypoint, Vector3D, PatrolExecutionStatus, 
<<<<<<< HEAD
  AiHyperparameters, AiPredictiveReport, OnTheSpotAiDecision,
  MineSectorSurveyData, HumanRescuerPathNode, LidarRangesData,
  GasAirQualityInspectionData, GasInspectionPhase
=======
  AiHyperparameters, AiPredictiveReport, OnTheSpotAiDecision 
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
} from '../types';
import { 
  DEFAULT_AI_HYPERPARAMETERS, 
  computeOptimizedRescuePath, 
  OptimizedPathResult 
} from '../utils/aiPatherOptimizer';
import { 
  generateRealTimePredictiveReport, 
  evaluateOnTheSpotAiDecision 
} from '../utils/aiPredictiveEngine';

export interface SimulationCallbacks {
  onRoverTelemetry: (data: RoverTelemetry) => void;
  onDroneTelemetry: (data: DroneTelemetry) => void;
  onSurvivorUpdate: (data: SurvivorData) => void;
  onScanData: (scanPoints: { x: number; y: number }[], robotPose: { x: number; y: number; yaw: number }) => void;
  onPatrolStatus?: (status: PatrolExecutionStatus) => void;
  onAiPredictiveReport?: (report: AiPredictiveReport) => void;
  onTheSpotDecision?: (decision: OnTheSpotAiDecision) => void;
<<<<<<< HEAD
  onAiActionExecuted?: (action: string, detail: string) => void;
  onTheSpotPlanRequested?: () => void;
  onEnvironmentalReconUpdate?: (sectors: MineSectorSurveyData[]) => void;
}

// Human Rescuer Safe Corridor Walkway Protocol
export const HUMAN_RESCUER_SAFE_ROUTE: HumanRescuerPathNode[] = [
  {
    step: 1,
    title: 'Portal Staging & Entry Station',
    chainageM: '0.0m',
    position: { x: 0.0, y: 0.2, z: 0.0 },
    headingInstruction: 'Enter along main portal rails. Atmospheric gas readings: 0.0% LEL, 20.9% O2.',
    clearanceWidthM: 4.4,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 18,
    o2Pct: 20.9,
    groundStabilityPct: 100,
    humanActionNote: 'Don 4-hour SCBA, anchor primary lifeline and deploy LoRa comms node.',
  },
  {
    step: 2,
    title: 'Main Ingress Drift East Rail Shoulder',
    chainageM: '7.0m',
    position: { x: 0.2, y: 0.2, z: 7.0 },
    headingInstruction: 'Advance North hugging East rail. Structural timber arches intact.',
    clearanceWidthM: 4.2,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 140,
    o2Pct: 20.8,
    groundStabilityPct: 98,
    humanActionNote: 'Sound roof with scaling bar. Timber arches verified secure by rover scan.',
  },
  {
    step: 3,
    title: 'West Methane Hazard East Flank Bypass',
    chainageM: '11.2m',
    position: { x: 1.1, y: 0.2, z: 11.2 },
    headingInstruction: 'HUG EAST DRIFT WALL! Maintain 9.1m standoff from lethal West methane breach.',
    clearanceWidthM: 3.2,
    atmosphericSafety: 'CAUTION',
    ch4Ppm: 820,
    o2Pct: 20.4,
    groundStabilityPct: 95,
    humanActionNote: 'DO NOT APPROACH WEST CROSSCUT. Toxic methane pocket >42,000 ppm isolated to west.',
  },
  {
    step: 4,
    title: 'Central Drift Spine Realignment',
    chainageM: '16.0m',
    position: { x: 0.15, y: 0.2, z: 16.0 },
    headingInstruction: 'Realign to centerline. Atmospheric conditions return to nominal baseline.',
    clearanceWidthM: 4.3,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 160,
    o2Pct: 20.7,
    groundStabilityPct: 96,
    humanActionNote: 'Methane dissipates below 0.5% LEL. Connect second mesh relay node.',
  },
  {
    step: 5,
    title: '90° Sharp East Drift Turn Apex',
    chainageM: '20.0m',
    position: { x: 0.0, y: 0.2, z: 20.0 },
    headingInstruction: 'EXECUTE PERFECT 90° SHARP RIGHT TURN into East crosscut. Zero-radius pivot corner under reinforced timber arches.',
    clearanceWidthM: 4.2,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 95,
    o2Pct: 20.6,
    groundStabilityPct: 95,
    humanActionNote: 'Maneuver Stokes rescue stretcher through calibrated 90° right-angle corner. Centerline clearance 4.2m.',
    isTurn90Deg: true,
    isTurn80Deg: false,
  },
  {
    step: 6,
    title: 'Impassable Rubble Standoff & Helipad Depot',
    chainageM: '26.8m (6.8m East)',
    position: { x: 6.8, y: 0.2, z: 20.0 },
    headingInstruction: 'HALT GROUND ROVER. Establish forward medical staging base; drone self-launches over blockage.',
    clearanceWidthM: 3.6,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 85,
    o2Pct: 20.5,
    groundStabilityPct: 90,
    humanActionNote: 'Stage Stokes rescue litter, trauma pack, and hydraulic shoring jacks. Aerial drone maintains overwatch.',
  },
  {
    step: 7,
    title: 'Shored Rubble Choke Traverse',
    chainageM: '28.8m (8.8m East)',
    position: { x: 8.8, y: 0.6, z: 20.0 },
    headingInstruction: 'Advance through surveyed north ceiling crevice over rockfall.',
    clearanceWidthM: 1.4,
    atmosphericSafety: 'CAUTION',
    ch4Ppm: 75,
    o2Pct: 20.3,
    groundStabilityPct: 82,
    humanActionNote: 'Advance single-file along secured lifeline. 1.4m vertical ceiling gap. 18.4 m³ rockfall stabilized.',
  },
  {
    step: 8,
    title: 'Trapped Miner Randy Shelter Chamber',
    chainageM: '33.5m (13.5m East)',
    position: { x: 13.5, y: 0.2, z: 20.0 },
    headingInstruction: 'Target extraction point. Survivor Randy Miller confirmed conscious.',
    clearanceWidthM: 4.8,
    atmosphericSafety: 'CLEAR',
    ch4Ppm: 38,
    o2Pct: 20.1,
    groundStabilityPct: 92,
    humanActionNote: 'Administer trauma thermal blanket & bottled O2. Secure into Stokes litter and evacuate via reverse 90° corridor.',
  },
];

=======
}

>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
// Nav2 Safe Mine Rescue Corridor (Generated by Subterranean AI Pather)
export const AI_NAV2_MINE_PATH: THREE.Vector3[] = [
  new THREE.Vector3(0.0, 1.8, 0.0),    // WP0: Mine entrance staging portal
  new THREE.Vector3(0.0, 1.8, 7.0),    // WP1: Main drift north
<<<<<<< HEAD
  new THREE.Vector3(0.9, 1.85, 11.2),  // WP2: West Methane avoidance curve (deflects away from leak)
  new THREE.Vector3(0.0, 1.8, 16.5),   // WP3: Realignment with central drift
  new THREE.Vector3(0.0, 1.85, 20.0),  // WP4: East Branch tunnel junction - 90° Sharp Turn Corner
  new THREE.Vector3(3.8, 1.9, 20.0),   // WP5: East drift straightaway lane
  new THREE.Vector3(6.8, 1.95, 20.0),  // WP6: Impassable rubble standoff - Auto Drone Launch Point
  new THREE.Vector3(8.8, 2.25, 20.0),  // WP7: High-altitude aerial crest over rock collapse
  new THREE.Vector3(11.2, 2.05, 20.0), // WP8: Downslope clearance into trapped chamber
  new THREE.Vector3(13.5, 1.85, 20.0), // WP9: Trapped miner Randy hover & thermal lock
=======
  new THREE.Vector3(0.8, 1.85, 11.0),  // WP2: West Methane avoidance curve (deflects away from leak)
  new THREE.Vector3(0.0, 1.8, 16.0),   // WP3: Realignment with central drift
  new THREE.Vector3(2.0, 1.9, 19.8),   // WP4: East Branch tunnel junction
  new THREE.Vector3(6.5, 1.95, 20.0),  // WP5: Pre-rubble rover staging location
  new THREE.Vector3(8.5, 2.15, 20.0),  // WP6: High-altitude aerial crest over rock collapse
  new THREE.Vector3(10.5, 2.1, 20.0),  // WP7: Downslope clearance into trapped chamber
  new THREE.Vector3(13.5, 1.85, 20.0), // WP8: Trapped miner Randy hover & thermal lock
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
];

export class MineSimulation {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;

  // Camera settings
  private viewMode: CameraViewMode = 'orbit';
  private orbitControls = {
    target: new THREE.Vector3(0, 1.2, 8),
    distance: 14,
    phi: Math.PI / 4,
    theta: Math.PI / 3,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
  };

  // Robot objects
  private roverGroup!: THREE.Group;
  private roverWheels: THREE.Mesh[] = [];
  private lidarMesh!: THREE.Mesh;
  private roverHeadlights!: THREE.SpotLight;
  private roverHeadlightTarget!: THREE.Object3D;
  private lidarRaysGroup!: THREE.Group;
<<<<<<< HEAD
  private lidarRangersGroup = new THREE.Group();
  private lidarRangersActive = true;
  private lidarRangerHitsPoints!: THREE.Points;
  private lidarRangerBeamsLines!: THREE.LineSegments;
  private currentLidarRanges: LidarRangesData = {
    front: 5.0,
    left: 2.1,
    right: 2.1,
    rear: 8.0,
    minRange: 2.1,
    maxRange: 8.0,
    beamCount: 36,
  };

  // Rover Post-Deploy Gas & Air Quality Inspection State
  private roverPostDeployGasInspection = false;
  private roverGasInspectionPhase: GasInspectionPhase = 'idle';
  private roverGasInspectionTimer = 0;
  private gasSnifferBoomGroup!: THREE.Group;
  private gasSnifferLedMesh!: THREE.Mesh;
  private gasSnifferConeMesh!: THREE.Mesh;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  private droneGroup!: THREE.Group;
  private droneRotors: THREE.Mesh[] = [];
  private droneSpotlight!: THREE.SpotLight;

  // Survivor & Hazards
  private survivorGroup!: THREE.Group;
  private methaneParticles!: THREE.Points;
  private dustParticles!: THREE.Points;
  private wallsGroup!: THREE.Group;
  private rocksGroup!: THREE.Group;

  // State
  private roverPos = new THREE.Vector3(0, 0.22, 1.0);
  private roverYaw = Math.PI / 2; // facing north along +Z
  private roverSpeed = 0;
  private roverSteer = 0;
  private roverHeadlightsOn = true;
  private roverLidarActive = true;

  private dronePos = new THREE.Vector3(-0.2, 0.45, 0.8);
  private droneYaw = Math.PI / 2;
  private droneState: DroneTelemetry['state'] = 'docked';
  private droneTargetPos = new THREE.Vector3(0, 0, 0);
  private dronePitchVel = 0; // forward (+)/back (-)
  private droneRollVel = 0;  // strafe right (+)/left (-)
  private droneVerticalVel = 0; // climb (+)/descend (-)
  private droneYawRate = 0; // yaw rate (rad/s)
  private droneSpotlightOn = true;
  private droneTiltPitch = 0;
  private droneTiltRoll = 0;
  private droneBatteryPct = 96.0;
  private droneFlightTimeSeconds = 0;
  private droneWaypointsQueue: THREE.Vector3[] = [];
  private droneWpIndex = 0;

  // Survivors & Hazards Data
  public survivorData: SurvivorData = {
    id: 'survivor-1',
    name: 'Randy (Trapped Miner #4)',
    position: { x: 13.5, y: 0.5, z: 20.0 },
    status: 'conscious',
    respirationBpm: 14,
    heartRateBpm: 88,
    temperatureC: 37.1,
    detected: false,
    visualConfidence: 0.0,
    thermalConfidence: 0.0,
    acousticConfidence: 0.0,
    co2Confidence: 0.0,
    uwbConfidence: 0.0,
    fusedProbability: 0.0,
  };

  public hazardZones: HazardZone[] = [
    {
      id: 'hazard-ch4',
      name: 'Branch 1 - Toxic Methane (CH4) Leak',
      type: 'methane',
      position: { x: -8.0, y: 1.0, z: 10.0 },
      radius: 5.5,
      severity: 'critical',
      description: 'Flammable explosive gas pocket > 42,000 ppm. High risk of explosion.'
    },
    {
      id: 'hazard-collapse',
      name: 'Branch 2 - Massive Tunnel Collapse',
      type: 'collapse',
      position: { x: 8.5, y: 1.0, z: 20.0 },
      radius: 4.0,
      severity: 'critical',
      description: 'Roof collapse impassable to ground rovers. Requires aerial drone scouting.'
    },
    {
      id: 'hazard-fire',
      name: 'North Ventilation Heat Pocket',
      type: 'fire_heat',
      position: { x: 0.0, y: 1.0, z: 31.0 },
      radius: 3.5,
      severity: 'moderate',
      description: 'Smoldering coal friction pocket causing heat buildup (44°C).'
    }
  ];

<<<<<<< HEAD
  // Comprehensive Environmental Survey Data across all sides of the mine
  public environmentalSectors: MineSectorSurveyData[] = [
    {
      sectorId: 'sec-portal',
      sideName: 'South Portal & Ingress Drift',
      ch4Ppm: 18,
      ch4LelPct: 0.04,
      coPpm: 2,
      co2Ppm: 410,
      o2Pct: 20.9,
      tempC: 16.2,
      humidityPct: 65,
      airflowMs: 1.2,
      dustMgM3: 0.12,
      structuralStabilityPct: 100,
      roofCondition: 'SOUND',
      humanRescuerSafe: true,
      requiredPpe: 'Standard Level D / Hardhat & Cap Lamp',
      surveyComplete: true,
      sampleTimestamp: '13:02:15',
    },
    {
      sectorId: 'sec-west',
      sideName: 'West Drift Plume Chamber',
      ch4Ppm: 42500,
      ch4LelPct: 85.0,
      coPpm: 48,
      co2Ppm: 1250,
      o2Pct: 13.9,
      tempC: 18.2,
      humidityPct: 88,
      airflowMs: 0.15,
      dustMgM3: 3.4,
      structuralStabilityPct: 85,
      roofCondition: 'FRACTURED',
      humanRescuerSafe: false,
      requiredPpe: 'LETHAL HAZARD - NO HUMAN ENTRY AUTHORIZED',
      surveyComplete: false,
      sampleTimestamp: 'Pending Recon',
    },
    {
      sectorId: 'sec-spine',
      sideName: 'Central Crosscut & 80° Turn Junction',
      ch4Ppm: 185,
      ch4LelPct: 0.37,
      coPpm: 4,
      co2Ppm: 520,
      o2Pct: 20.6,
      tempC: 16.8,
      humidityPct: 70,
      airflowMs: 0.9,
      dustMgM3: 0.45,
      structuralStabilityPct: 96,
      roofCondition: 'TIMBER_SHORED',
      humanRescuerSafe: true,
      requiredPpe: 'Level B SCBA / Multi-Gas Sniffer',
      surveyComplete: false,
      sampleTimestamp: 'Pending Recon',
    },
    {
      sectorId: 'sec-north',
      sideName: 'North Ventilation Drift Terminus',
      ch4Ppm: 340,
      ch4LelPct: 0.68,
      coPpm: 14,
      co2Ppm: 680,
      o2Pct: 19.8,
      tempC: 34.6,
      humidityPct: 54,
      airflowMs: 2.1,
      dustMgM3: 1.8,
      structuralStabilityPct: 88,
      roofCondition: 'FRACTURED',
      humanRescuerSafe: true,
      requiredPpe: 'High-Heat PPE & Structural Helmet',
      surveyComplete: false,
      sampleTimestamp: 'Pending Recon',
    },
    {
      sectorId: 'sec-east-rubble',
      sideName: 'East Drift Collapsed Barrier',
      ch4Ppm: 85,
      ch4LelPct: 0.17,
      coPpm: 6,
      co2Ppm: 480,
      o2Pct: 20.4,
      tempC: 16.5,
      humidityPct: 74,
      airflowMs: 0.4,
      dustMgM3: 4.8,
      structuralStabilityPct: 76,
      roofCondition: 'COLLAPSED',
      humanRescuerSafe: true,
      requiredPpe: 'Level B SCBA, Shoring Jack, Crawl Harness',
      surveyComplete: false,
      sampleTimestamp: 'Pending Recon',
    },
    {
      sectorId: 'sec-east-survivor',
      sideName: 'East Cavern Survivor Shelter',
      ch4Ppm: 38,
      ch4LelPct: 0.08,
      coPpm: 3,
      co2Ppm: 460,
      o2Pct: 20.1,
      tempC: 16.2,
      humidityPct: 68,
      airflowMs: 0.25,
      dustMgM3: 0.8,
      structuralStabilityPct: 92,
      roofCondition: 'SOUND',
      humanRescuerSafe: true,
      requiredPpe: 'Stokes Rescue Litter, Trauma Blankets, Oxygen',
      surveyComplete: false,
      sampleTimestamp: 'Pending Recon',
    },
  ];

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  // Callback
  private callbacks: SimulationCallbacks;
  private lastTelemetryTime = 0;
  private resizeObserver: ResizeObserver | null = null;

  // Autonomous Mission Sequence
  private missionPhase: 'idle' | 'running' | 'paused' | 'completed' = 'idle';
  private missionMode: 'full_patrol' | 'direct_rescue' | 'custom_patrol' = 'full_patrol';
  private isManualRoverOverride = false;
  private missionStep = 0;
  private missionTimer = 0;

  // Custom User-Defined Multi-Point Patrol & Mission Planner
  private userRoverPathGroup = new THREE.Group();
  private userDronePathGroup = new THREE.Group();
  private waypointCursorGroup = new THREE.Group();
  private waypointCursorRing: THREE.Mesh | null = null;
  private waypointCursorOuterRing: THREE.Mesh | null = null;
  private waypointCursorStalk: THREE.Line | null = null;
  private waypointCursorVehicle: 'rover' | 'drone' = 'rover';
  private isCustomPatrolActive = false;
  private customPatrolRoverWps: MissionPatrolWaypoint[] = [];
  private customPatrolDroneWps: MissionPatrolWaypoint[] = [];
  private customPatrolRoverIndex = 0;
  private customPatrolDroneIndex = 0;
  private customPatrolLoop = false;
  private customPatrolRoverDwellTimer = 0;
  private customPatrolDroneDwellTimer = 0;

  // Optimized AI Pather & Real-Time Predictive System
  private aiPathGroup = new THREE.Group();
  private predictiveGhostGroup = new THREE.Group();
  private currentAiHyperparams: AiHyperparameters = DEFAULT_AI_HYPERPARAMETERS;
  private currentOptimizedPath: OptimizedPathResult = computeOptimizedRescuePath(this.hazardZones, DEFAULT_AI_HYPERPARAMETERS);
  private lastAiPredictionTime = 0;
  private lastPredictiveReport: AiPredictiveReport | null = null;
  private lastOnTheSpotDecision: OnTheSpotAiDecision | null = null;
<<<<<<< HEAD
  private isAutonomousAiExecutionActive = true;
  private lastAutonomousTriggerTime = 0;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  constructor(container: HTMLElement, callbacks: SimulationCallbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.clock = new THREE.Clock();

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0c10);
    this.scene.fog = new THREE.FogExp2(0x0a0c10, 0.035);

    // Add user-defined mission path groups, AI pather, predictive ghost & 3D waypoint cursor
    this.scene.add(this.userRoverPathGroup);
    this.scene.add(this.userDronePathGroup);
    this.scene.add(this.aiPathGroup);
    this.scene.add(this.predictiveGhostGroup);
    this.scene.add(this.waypointCursorGroup);
    this.setupWaypointCursor();

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 100);
    this.camera.position.set(0, 10, -6);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Setup Lighting
    this.setupLighting();

    // Build Mine Geometry
    this.buildMineEnvironment();

    // Build Rover & Drone
    this.buildRover();
    this.buildDrone();
    this.buildSurvivor();
    this.buildMethaneHazard();
    this.buildDustParticles();

    // Setup Mouse / Orbit controls
    this.setupMouseEvents();

    // Responsive container resize observer & window fallback
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.onWindowResize();
      });
      this.resizeObserver.observe(this.container);
    }
    window.addEventListener('resize', this.onWindowResize);

    // Start loop
    this.animate();
  }

  private setupLighting() {
    // Ambient light - low mine darkness
    const ambient = new THREE.AmbientLight(0x1e222a, 0.6);
    this.scene.add(ambient);

    // Portal Light (Drift Entrance)
    const portalLight = new THREE.PointLight(0xffaa44, 2.5, 18, 1.2);
    portalLight.position.set(0, 3.2, 1.5);
    this.scene.add(portalLight);

    // Lanterns along Main Tunnel
    const lanternPositions = [8, 16, 24, 30];
    lanternPositions.forEach((z, idx) => {
      const color = idx % 2 === 0 ? 0xffcc77 : 0xff9944;
      const lantern = new THREE.PointLight(color, 1.8, 12, 1.5);
      lantern.position.set(idx % 2 === 0 ? -1.8 : 1.8, 2.8, z);
      this.scene.add(lantern);

      // Lantern cage mesh
      const lanternMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 0.3, 8),
        new THREE.MeshBasicMaterial({ color })
      );
      lanternMesh.position.copy(lantern.position);
      this.scene.add(lanternMesh);
    });

    // Methane Warning Beacon (Branch 1 - Amber Flashing)
    const hazardLight = new THREE.PointLight(0xff3300, 3.0, 15, 1.8);
    hazardLight.position.set(-6, 2.8, 10);
    this.scene.add(hazardLight);
  }

  private buildMineEnvironment() {
    this.wallsGroup = new THREE.Group();
    this.rocksGroup = new THREE.Group();

    // Floor (Rough Rocky Surface)
    const floorGeo = new THREE.PlaneGeometry(80, 80, 64, 64);
    // Slight height variations
    const pos = floorGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      pos.setZ(i, (Math.sin(vx * 0.4) * Math.cos(vy * 0.4) * 0.08));
    }
    floorGeo.computeVertexNormals();

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x221f1c,
      roughness: 0.95,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Railway Tracks down Main Drift
    const railMat = new THREE.MeshStandardMaterial({ color: 0x554d45, metalness: 0.8, roughness: 0.4 });
    const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
    
    // Left & right steel rails
    const railGeo = new THREE.BoxGeometry(0.06, 0.08, 34);
    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.position.set(-0.45, 0.04, 17);
    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.position.set(0.45, 0.04, 17);
    this.scene.add(leftRail, rightRail);

    // Wooden sleepers
    for (let z = 1; z < 34; z += 0.8) {
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.2), sleeperMat);
      sleeper.position.set(0, 0.02, z);
      this.scene.add(sleeper);
    }

    // Timber Arch Supports every 4 meters
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x4a3219, roughness: 0.9 });
    for (let z = 2; z <= 34; z += 4) {
      const arch = new THREE.Group();
      // Left post
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.2, 0.25), timberMat);
      p1.position.set(-2.2, 1.6, 0);
      // Right post
      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.2, 0.25), timberMat);
      p2.position.set(2.2, 1.6, 0);
      // Top beam
      const beam = new THREE.Mesh(new THREE.BoxGeometry(4.65, 0.25, 0.25), timberMat);
      beam.position.set(0, 3.1, 0);
      arch.add(p1, p2, beam);
      arch.position.set(0, 0, z);
      this.scene.add(arch);
    }

    // Tunnel Walls Material (Dark Shale / Granite)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x2e2926,
      roughness: 0.9,
      metalness: 0.15,
    });

    const createWallSegment = (w: number, h: number, d: number, x: number, y: number, z: number, ry = 0) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = ry;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.wallsGroup.add(mesh);
    };

    // Main Drift:
    // Left wall from z=0 to z=8
    createWallSegment(0.5, 3.4, 8, -2.4, 1.7, 4);
    // Opening at z=8..12 for Branch 1 (West - Methane)
    // Left wall from z=12 to z=34
    createWallSegment(0.5, 3.4, 22, -2.4, 1.7, 23);

    // Right wall from z=0 to z=18
    createWallSegment(0.5, 3.4, 18, 2.4, 1.7, 9);
    // Opening at z=18..22 for Branch 2 (East - Collapse & Survivor)
    // Right wall from z=22 to z=34
    createWallSegment(0.5, 3.4, 12, 2.4, 1.7, 28);

    // End wall at z=34 (North Drift terminus)
    createWallSegment(5.3, 3.4, 0.5, 0, 1.7, 34);

    // Branch 1 (West Tunnel - Methane Zone, length 14m to the west)
    // North wall of branch 1
    createWallSegment(12, 3.4, 0.5, -8.4, 1.7, 12.2);
    // South wall of branch 1
    createWallSegment(12, 3.4, 0.5, -8.4, 1.7, 7.8);
    // West dead-end wall
    createWallSegment(0.5, 3.4, 4.4, -14.4, 1.7, 10.0);

    // Branch 2 (East Tunnel - Collapsed Tunnel leading to Survivor Cavern)
    // North wall of branch 2
    createWallSegment(16, 3.4, 0.5, 10.4, 1.7, 22.2);
    // South wall of branch 2
    createWallSegment(16, 3.4, 0.5, 10.4, 1.7, 17.8);
    // East dead-end wall
    createWallSegment(0.5, 3.4, 4.4, 18.4, 1.7, 20.0);

    // Massive Rubble / Rock Collapse Blockade in Branch 2 at x=8.5, z=20
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x483e37, roughness: 0.95 });
    for (let i = 0; i < 28; i++) {
      const radius = 0.35 + Math.random() * 0.65;
      const rockGeo = new THREE.DodecahedronGeometry(radius, 1);
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(
        7.5 + Math.random() * 2.2,
        0.2 + Math.random() * 1.6,
        18.5 + Math.random() * 3.0
      );
      rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      rock.castShadow = true;
      this.rocksGroup.add(rock);
    }

    // Tunnel Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(80, 80);
    const ceiling = new THREE.Mesh(ceilingGeo, floorMat);
    ceiling.position.y = 3.3;
    ceiling.rotation.x = Math.PI / 2;
    this.scene.add(ceiling);

    this.scene.add(this.wallsGroup);
    this.scene.add(this.rocksGroup);

    // Nav2 Safe Mine Rescue Corridor (Dynamically Optimized Real-Time AI Pather)
    this.rebuildAiPathMesh();
  }

  private buildRover() {
    this.roverGroup = new THREE.Group();

    // Main Chassis
    const chassisGeo = new THREE.BoxGeometry(0.85, 0.28, 1.1);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xeb5e28, // Rescue high-vis safety orange
      roughness: 0.4,
      metalness: 0.6,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.24;
    chassis.castShadow = true;
    this.roverGroup.add(chassis);

    // Roll-cage & Protective Frame (Dark Steel)
    const cageMat = new THREE.MeshStandardMaterial({ color: 0x1f2421, metalness: 0.9, roughness: 0.2 });
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.0);
    const leftBar = new THREE.Mesh(barGeo, cageMat);
    leftBar.position.set(-0.38, 0.42, 0);
    leftBar.rotation.x = Math.PI / 2;
    const rightBar = new THREE.Mesh(barGeo, cageMat);
    rightBar.position.set(0.38, 0.42, 0);
    rightBar.rotation.x = Math.PI / 2;
    this.roverGroup.add(leftBar, rightBar);

    // Rear Drone Landing Pad Deck
    const dockGeo = new THREE.BoxGeometry(0.55, 0.04, 0.55);
    const dockMat = new THREE.MeshStandardMaterial({ color: 0x252422, metalness: 0.8, roughness: 0.3 });
    const dock = new THREE.Mesh(dockGeo, dockMat);
    dock.position.set(0, 0.39, -0.22);
    // Yellow 'H' Helipad Marker
    const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.28), new THREE.MeshBasicMaterial({ color: 0xfca311 }));
    hBar1.position.set(-0.1, 0.41, -0.22);
    const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.28), new THREE.MeshBasicMaterial({ color: 0xfca311 }));
    hBar2.position.set(0.1, 0.41, -0.22);
    const hCross = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.04), new THREE.MeshBasicMaterial({ color: 0xfca311 }));
    hCross.position.set(0, 0.41, -0.22);
    this.roverGroup.add(dock, hBar1, hBar2, hCross);

    // 6-Wheel Rocker-Bogie All-Terrain Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wheelPositions = [
      { x: -0.48, y: 0.18, z: 0.38 },
      { x: 0.48, y: 0.18, z: 0.38 },
      { x: -0.50, y: 0.18, z: 0.0 },
      { x: 0.50, y: 0.18, z: 0.0 },
      { x: -0.48, y: 0.18, z: -0.38 },
      { x: 0.48, y: 0.18, z: -0.38 },
    ];

    wheelPositions.forEach((p) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(p.x, p.y, p.z);
      wheel.castShadow = true;
      this.roverGroup.add(wheel);
      this.roverWheels.push(wheel);
    });

    // 3D LiDAR (Rotating Puck)
    const lidarBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    lidarBase.position.set(0, 0.42, 0.32);
    this.lidarMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.06, 16),
      new THREE.MeshStandardMaterial({ color: 0x00b4d8, emissive: 0x003049, roughness: 0.2 })
    );
    this.lidarMesh.position.set(0, 0.48, 0.32);
    this.roverGroup.add(lidarBase, this.lidarMesh);

<<<<<<< HEAD
    // Build High-Precision LiDAR View Rangers (Range rings & dynamic laser beams)
    this.buildLidarRangers();
=======
    // LiDAR Laser Scan Rays Visualizer - batched into single LineSegments to reduce draw calls
    this.lidarRaysGroup = new THREE.Group();
    const rayPts: THREE.Vector3[] = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      rayPts.push(new THREE.Vector3(0, 0.48, 0.32));
      rayPts.push(new THREE.Vector3(Math.cos(angle) * 7.0, 0.2, Math.sin(angle) * 7.0 + 0.32));
    }
    const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPts);
    const rayMat = new THREE.LineBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.45 });
    const raySegments = new THREE.LineSegments(rayGeo, rayMat);
    this.lidarRaysGroup.add(raySegments);
    this.roverGroup.add(this.lidarRaysGroup);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

    // High-Intensity Front LED Headlights (Spotlight illuminating the dark mine)
    this.roverHeadlightTarget = new THREE.Object3D();
    this.roverHeadlightTarget.position.set(0, 0.3, 8.0);
    this.roverGroup.add(this.roverHeadlightTarget);

    this.roverHeadlights = new THREE.SpotLight(0xffffff, 8.0, 32, Math.PI / 5, 0.3, 1.2);
    this.roverHeadlights.position.set(0, 0.35, 0.55);
    this.roverHeadlights.target = this.roverHeadlightTarget;
    this.roverHeadlights.castShadow = true;
    this.roverHeadlights.shadow.mapSize.width = 1024;
    this.roverHeadlights.shadow.mapSize.height = 1024;
    this.roverHeadlights.shadow.camera.near = 0.4;
    this.roverHeadlights.shadow.camera.far = 28;
    this.roverHeadlights.shadow.bias = -0.0008;
    this.roverGroup.add(this.roverHeadlights);

    // Headlight emitter lenses
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lensL = new THREE.Mesh(new THREE.CircleGeometry(0.04, 12), lensMat);
    lensL.position.set(-0.24, 0.28, 0.56);
    const lensR = new THREE.Mesh(new THREE.CircleGeometry(0.04, 12), lensMat);
    lensR.position.set(0.24, 0.28, 0.56);
    this.roverGroup.add(lensL, lensR);

<<<<<<< HEAD
    // Multi-Gas Sniffer & Atmospheric Air Quality Sampling Mast
    this.buildGasSnifferMast();

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    // Position rover at mine entrance
    this.roverGroup.position.copy(this.roverPos);
    this.roverGroup.rotation.y = this.roverYaw;
    this.scene.add(this.roverGroup);
  }

<<<<<<< HEAD
  private buildGasSnifferMast() {
    this.gasSnifferBoomGroup = new THREE.Group();
    this.gasSnifferBoomGroup.position.set(-0.26, 0.42, 0.22);

    // Mast base mount
    const mountGeo = new THREE.CylinderGeometry(0.04, 0.045, 0.04, 16);
    const mountMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    const mountMesh = new THREE.Mesh(mountGeo, mountMat);
    this.gasSnifferBoomGroup.add(mountMesh);

    // Telescopic carbon vertical tube
    const tubeGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.26, 12);
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.position.y = 0.13;
    this.gasSnifferBoomGroup.add(tubeMesh);

    // Articulated sensor probe head angled forward
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.26, 0);
    headGroup.rotation.x = -Math.PI / 5;

    // Multi-gas aspiration canister chamber
    const canisterGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.09, 16);
    const canisterMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 });
    const canisterMesh = new THREE.Mesh(canisterGeo, canisterMat);
    canisterMesh.position.y = 0.045;
    headGroup.add(canisterMesh);

    // Air Quality Status LED Ring
    const ledGeo = new THREE.TorusGeometry(0.034, 0.007, 8, 24);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    this.gasSnifferLedMesh = new THREE.Mesh(ledGeo, ledMat);
    this.gasSnifferLedMesh.position.y = 0.055;
    this.gasSnifferLedMesh.rotation.x = Math.PI / 2;
    headGroup.add(this.gasSnifferLedMesh);

    // Air intake sampling nozzle
    const tipGeo = new THREE.ConeGeometry(0.02, 0.04, 12);
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.y = 0.10;
    headGroup.add(tipMesh);

    // Visual Atmospheric Sampling Cone
    const coneGeo = new THREE.ConeGeometry(0.24, 0.55, 16, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    this.gasSnifferConeMesh = new THREE.Mesh(coneGeo, coneMat);
    this.gasSnifferConeMesh.position.y = 0.38;
    this.gasSnifferConeMesh.rotation.x = Math.PI;
    this.gasSnifferConeMesh.visible = false;
    headGroup.add(this.gasSnifferConeMesh);

    this.gasSnifferBoomGroup.add(headGroup);
    this.roverGroup.add(this.gasSnifferBoomGroup);
  }

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  private buildDrone() {
    this.droneGroup = new THREE.Group();

    // 450mm Carbon Quad Frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });
    const armGeo = new THREE.BoxGeometry(0.03, 0.015, 0.45);
    const arm1 = new THREE.Mesh(armGeo, frameMat);
    arm1.rotation.y = Math.PI / 4;
    const arm2 = new THREE.Mesh(armGeo, frameMat);
    arm2.rotation.y = -Math.PI / 4;
    this.droneGroup.add(arm1, arm2);

    // Center Pod (Companion computer & Pixhawk)
    const podGeo = new THREE.BoxGeometry(0.12, 0.05, 0.16);
    const podMat = new THREE.MeshStandardMaterial({ color: 0x0077b6, metalness: 0.5, roughness: 0.4 });
    const pod = new THREE.Mesh(podGeo, podMat);
    this.droneGroup.add(pod);

    // 4 Motors & Rotors
    const motorGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 12);
    const motorMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const rotorGeo = new THREE.BoxGeometry(0.2, 0.005, 0.02);
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85 });

    const rotorPositions = [
      { x: -0.16, z: -0.16 },
      { x: 0.16, z: -0.16 },
      { x: -0.16, z: 0.16 },
      { x: 0.16, z: 0.16 },
    ];

    rotorPositions.forEach((rp) => {
      const motor = new THREE.Mesh(motorGeo, motorMat);
      motor.position.set(rp.x, 0.02, rp.z);
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.position.set(rp.x, 0.04, rp.z);
      this.droneGroup.add(motor, rotor);
      this.droneRotors.push(rotor);
    });

    // Drone Downward Search Spotlight
    const target = new THREE.Object3D();
    target.position.set(0, -6, 0);
    this.droneGroup.add(target);

    this.droneSpotlight = new THREE.SpotLight(0x90e0ef, 4.0, 18, Math.PI / 6, 0.4, 1.5);
    this.droneSpotlight.position.set(0, -0.05, 0);
    this.droneSpotlight.target = target;
    this.droneGroup.add(this.droneSpotlight);

    // Navigation LEDs (Red front-left, Green front-right, White strobe rear)
    const ledL = new THREE.PointLight(0xff0055, 1.2, 1.5);
    ledL.position.set(-0.16, 0.02, 0.16);
    const ledR = new THREE.PointLight(0x00ff66, 1.2, 1.5);
    ledR.position.set(0.16, 0.02, 0.16);
    this.droneGroup.add(ledL, ledR);

    // Initial position on rover dock
    this.dronePos.set(this.roverPos.x, this.roverPos.y + 0.24, this.roverPos.z - 0.22);
    this.droneGroup.position.copy(this.dronePos);
    this.scene.add(this.droneGroup);
  }

  private buildSurvivor() {
    this.survivorGroup = new THREE.Group();

    // Human Miner Figure "Rescue Randy"
    const suitMat = new THREE.MeshStandardMaterial({ color: 0x003049 }); // Heavy dark blue overalls
    const vestMat = new THREE.MeshStandardMaterial({
      color: 0x38b000, // High-vis neon lime rescue vest with reflective bands
      emissive: 0x1b4332,
      roughness: 0.3
    });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd4a373 });
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.4 }); // Yellow miner helmet

    // Torso / Chest (breathing animation)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.55, 0.24), vestMat);
    torso.position.set(0, 0.65, 0);
    torso.name = 'torso';

    // Head & Helmet
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), skinMat);
    head.position.set(0, 1.05, 0);
    const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.12, 16), helmetMat);
    helmet.position.set(0, 1.12, 0);
    // Helmet headlamp
    const lamp = new THREE.PointLight(0xffffff, 1.8, 6);
    lamp.position.set(0, 1.14, 0.14);

    // Legs (sitting / collapsed against rock wall)
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5, 0.16), suitMat);
    legL.position.set(-0.12, 0.25, 0.12);
    legL.rotation.x = -Math.PI / 4;
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5, 0.16), suitMat);
    legR.position.set(0.12, 0.25, 0.12);
    legR.rotation.x = -Math.PI / 4;

    this.survivorGroup.add(torso, head, helmet, lamp, legL, legR);
    this.survivorGroup.position.set(
      this.survivorData.position.x,
      this.survivorData.position.y,
      this.survivorData.position.z
    );
    this.survivorGroup.rotation.y = -Math.PI / 2;
    this.scene.add(this.survivorGroup);
  }

  private buildMethaneHazard() {
<<<<<<< HEAD
    // Methane hazard zone without floating green particle fragments
    const geo = new THREE.BufferGeometry();
    const mat = new THREE.PointsMaterial({
      size: 0.01,
      transparent: true,
      opacity: 0,
    });

    this.methaneParticles = new THREE.Points(geo, mat);
  }

  private buildLidarRangers() {
    this.lidarRangersGroup = new THREE.Group();

    // 1. Concentric Distance Range Rings (1.0m, 2.0m, 3.0m, 5.0m)
    const ringDistances = [1.0, 2.0, 3.0, 5.0];
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7, // Clean cyber blue
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });

    ringDistances.forEach((r) => {
      // Ring circumference line
      const ringGeo = new THREE.RingGeometry(r - 0.012, r + 0.012, 64);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(0, 0.02, 0.32);
      this.lidarRangersGroup.add(ringMesh);

      // Distance tag sprite label along East (+X) axis
      const label = this.createWaypointSpriteLabel(`${r.toFixed(1)}m`, '#0284c7', '#ffffff');
      label.scale.set(0.42, 0.21, 1);
      label.position.set(r, 0.12, 0.32);
      this.lidarRangersGroup.add(label);
    });

    // 2. Crosshair Azimuth Axes
    const axisPts = [
      new THREE.Vector3(-5.0, 0.02, 0.32),
      new THREE.Vector3(5.0, 0.02, 0.32),
      new THREE.Vector3(0, 0.02, -5.0 + 0.32),
      new THREE.Vector3(0, 0.02, 5.0 + 0.32),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
    const axisMat = new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.25 });
    const axisLines = new THREE.LineSegments(axisGeo, axisMat);
    this.lidarRangersGroup.add(axisLines);

    // 3. Dynamic Laser Ranger Beams (36 rays)
    const beamCount = 36;
    const beamPositions = new Float32Array(beamCount * 2 * 3);
    const beamGeo = new THREE.BufferGeometry();
    beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPositions, 3));
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    this.lidarRangerBeamsLines = new THREE.LineSegments(beamGeo, beamMat);
    this.lidarRangersGroup.add(this.lidarRangerBeamsLines);

    // 4. Impact Pips (Contact dots on walls)
    const hitPositions = new Float32Array(beamCount * 3);
    const hitGeo = new THREE.BufferGeometry();
    hitGeo.setAttribute('position', new THREE.BufferAttribute(hitPositions, 3));
    const hitMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
    });
    this.lidarRangerHitsPoints = new THREE.Points(hitGeo, hitMat);
    this.lidarRangersGroup.add(this.lidarRangerHitsPoints);

    this.roverGroup.add(this.lidarRangersGroup);
  }

  private computeWallDistance(originX: number, originZ: number, worldAngle: number): number {
    const sinA = Math.sin(worldAngle);
    const cosA = Math.cos(worldAngle);
    for (let r = 0.25; r <= 12.0; r += 0.1) {
      const px = originX + sinA * r;
      const pz = originZ + cosA * r;

      if (pz < 0 || pz > 34.0) return r;
      if (pz >= 18.0 && pz <= 22.0 && px >= 7.8) return r;

      if (pz >= 8.0 && pz <= 12.0) {
        if (px < -14.0) return r;
        if (px > 2.1) return r;
      } else if (pz >= 18.0 && pz <= 22.0) {
        if (px > 18.0) return r;
        if (px < -2.1) return r;
      } else {
        if (px < -2.1 || px > 2.1) return r;
      }
    }
    return 12.0;
  }

  private updateLidarRangers() {
    if (!this.roverLidarActive || !this.lidarRangersActive || !this.lidarRangerBeamsLines) return;

    const beamCount = 36;
    const beamPosAttr = this.lidarRangerBeamsLines.geometry.attributes.position as THREE.BufferAttribute;
    const hitPosAttr = this.lidarRangerHitsPoints.geometry.attributes.position as THREE.BufferAttribute;

    const puckX = 0;
    const puckY = 0.48;
    const puckZ = 0.32;

    const dists: number[] = [];

    for (let i = 0; i < beamCount; i++) {
      const localAngle = (i / beamCount) * Math.PI * 2;
      const worldAngle = this.roverYaw + localAngle;

      const dist = this.computeWallDistance(this.roverPos.x, this.roverPos.z, worldAngle);
      dists.push(dist);

      const hitLocalX = Math.sin(localAngle) * dist;
      const hitLocalY = 0.08;
      const hitLocalZ = puckZ + Math.cos(localAngle) * dist;

      beamPosAttr.setXYZ(i * 2, puckX, puckY, puckZ);
      beamPosAttr.setXYZ(i * 2 + 1, hitLocalX, hitLocalY, hitLocalZ);

      hitPosAttr.setXYZ(i, hitLocalX, hitLocalY, hitLocalZ);
    }

    beamPosAttr.needsUpdate = true;
    hitPosAttr.needsUpdate = true;

    const front = dists[0];
    const right = dists[9];
    const rear = dists[18];
    const left = dists[27];
    let minRange = dists[0];
    let maxRange = dists[0];
    for (let i = 1; i < dists.length; i++) {
      if (dists[i] < minRange) minRange = dists[i];
      if (dists[i] > maxRange) maxRange = dists[i];
    }

    this.currentLidarRanges = {
      front: Number(front.toFixed(2)),
      left: Number(left.toFixed(2)),
      right: Number(right.toFixed(2)),
      rear: Number(rear.toFixed(2)),
      minRange: Number(minRange.toFixed(2)),
      maxRange: Number(maxRange.toFixed(2)),
      beamCount,
    };
=======
    // Green/Yellow swirling toxic particle cloud in Branch 1
    const particleCount = 180;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = -8.0 + (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = 0.3 + Math.random() * 2.2;
      positions[i * 3 + 2] = 10.0 + (Math.random() - 0.5) * 3.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x55ff00,
      size: 0.45,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    this.methaneParticles = new THREE.Points(geo, mat);
    this.scene.add(this.methaneParticles);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  }

  private buildDustParticles() {
    const dustCount = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 3.2;
      positions[i * 3 + 2] = Math.random() * 36;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x9e9e9e,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });

    this.dustParticles = new THREE.Points(geo, mat);
    this.scene.add(this.dustParticles);
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.orbitControls.isDragging = true;
    this.orbitControls.prevMouseX = e.clientX;
    this.orbitControls.prevMouseY = e.clientY;
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.orbitControls.isDragging) return;
    const deltaX = e.clientX - this.orbitControls.prevMouseX;
    const deltaY = e.clientY - this.orbitControls.prevMouseY;
    this.orbitControls.prevMouseX = e.clientX;
    this.orbitControls.prevMouseY = e.clientY;

    this.orbitControls.theta -= deltaX * 0.008;
    this.orbitControls.phi = Math.max(0.1, Math.min(Math.PI / 2.1, this.orbitControls.phi - deltaY * 0.008));
  };

  private handleMouseUp = () => {
    this.orbitControls.isDragging = false;
  };

  private handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.orbitControls.distance = Math.max(3, Math.min(32, this.orbitControls.distance + e.deltaY * 0.015));
  };

  private setupMouseEvents() {
    this.container.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.container.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  private onWindowResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  public setViewMode(mode: CameraViewMode) {
    this.viewMode = mode;
  }

  // Rover Controls
  public setRoverSpeed(speed: number, isManual = false) {
    if (isManual) {
      this.isManualRoverOverride = true;
    }
    this.roverSpeed = THREE.MathUtils.clamp(speed, -1.2, 1.8);
  }

  public setRoverSteering(steering: number, isManual = false) {
    if (isManual) {
      this.isManualRoverOverride = true;
    }
    this.roverSteer = THREE.MathUtils.clamp(steering, -1.5, 1.5);
  }

  public setManualControl(manual: boolean) {
    this.isManualRoverOverride = manual;
  }

  public brakeRover() {
    this.roverSpeed = 0;
    this.roverSteer = 0;
  }

  public resetManualOverride() {
    this.isManualRoverOverride = false;
  }

  public toggleRoverHeadlights() {
    this.roverHeadlightsOn = !this.roverHeadlightsOn;
    this.roverHeadlights.intensity = this.roverHeadlightsOn ? 8.0 : 0.0;
  }

  public toggleRoverLidar() {
    this.roverLidarActive = !this.roverLidarActive;
<<<<<<< HEAD
    this.lidarRangersGroup.visible = this.roverLidarActive && this.lidarRangersActive;
  }

  public toggleLidarRangers(): boolean {
    this.lidarRangersActive = !this.lidarRangersActive;
    this.lidarRangersGroup.visible = this.roverLidarActive && this.lidarRangersActive;
    return this.lidarRangersActive;
  }

  public setLidarRangersVisible(visible: boolean) {
    this.lidarRangersActive = visible;
    this.lidarRangersGroup.visible = this.roverLidarActive && this.lidarRangersActive;
  }

  public isLidarRangersActive(): boolean {
    return this.lidarRangersActive && this.roverLidarActive;
  }

  // Drone Controls
  public launchDrone(autoScoutObstacle: boolean = false) {
    if (this.droneState === 'docked' || this.droneState === 'landed') {
      this.droneState = 'launching';
      this.droneTargetPos.set(this.roverPos.x, this.roverPos.y + 1.8, this.roverPos.z);
      
      // Rover initiates autonomous Multi-Gas & Air Quality Inspection sweep!
      this.startPostDeployGasInspection();

      if (autoScoutObstacle || this.roverPos.x > 5.0) {
        setTimeout(() => {
          if (this.droneState === 'launching' || this.droneState === 'hovering') {
            this.sendDroneToScoutRubble();
          }
        }, 1200);
      }
    }
  }

  // Rover Post-Deploy Gas & Air Quality Inspection Controls
  public startPostDeployGasInspection() {
    this.roverPostDeployGasInspection = true;
    this.roverGasInspectionPhase = 'sampling_rubble';
    this.roverGasInspectionTimer = 0;
    this.isManualRoverOverride = false;
    this.callbacks.onAiActionExecuted?.(
      'ROVER_POST_DEPLOY_GAS_INSPECTION',
      'Scout drone deployed to aerial flight. Rover autonomously initiated Multi-Gas & Air Quality Inspection sweep.'
    );
  }

  public stopGasInspection() {
    this.roverPostDeployGasInspection = false;
    this.roverGasInspectionPhase = 'idle';
    this.roverGasInspectionTimer = 0;
    this.roverSpeed = 0;
    this.roverSteer = 0;
  }

  public toggleGasInspection(): boolean {
    if (this.isGasInspectionActive()) {
      this.stopGasInspection();
      return false;
    } else {
      this.startPostDeployGasInspection();
      return true;
    }
  }

  public isGasInspectionActive(): boolean {
    return this.roverPostDeployGasInspection && this.roverGasInspectionPhase !== 'idle';
  }

  public getGasInspectionData(
    o2Percent: number = 20.9, 
    airQualityScore: number = 96, 
    airQualityStatus: 'OPTIMAL' | 'MODERATE' | 'HAZARDOUS' | 'EXPLOSIVE_RISK' = 'OPTIMAL'
  ): GasAirQualityInspectionData {
    let phaseLabel = 'Standby / Airway Monitored';
    let progressPct = 0;
    let targetLocationName = 'Mine Main Drift Portal';
    let notes = 'Continuous air quality baseline active.';

    switch (this.roverGasInspectionPhase) {
      case 'sampling_rubble':
        phaseLabel = 'Phase 1/4: Sampling Rubble Barrier Atmosphere';
        progressPct = Math.min(25, Math.round((this.roverGasInspectionTimer / 3.0) * 25));
        targetLocationName = 'East Drift Rubble Collapse Standoff (X: 5.8m, Z: 20.0m)';
        notes = 'Measuring CH4, CO, CO2 & O2 at rubble blockage face. Assessing gas entrapment behind collapse.';
        break;
      case 'inspecting_drift_junction':
        phaseLabel = 'Phase 2/4: Inspecting Main Junction Ventilation & Airway';
        progressPct = 25 + Math.min(25, Math.round((this.roverGasInspectionTimer / 2.5) * 25));
        targetLocationName = 'East Drift Crosscut Airway Junction (X: 1.2m, Z: 20.0m)';
        notes = 'Verifying atmospheric airflow direction and ventilation velocity across junction.';
        break;
      case 'sniffing_west_perimeter':
        phaseLabel = 'Phase 3/4: Sniffing West Drift Combustible Plume Perimeter';
        progressPct = 50 + Math.min(25, Math.round((this.roverGasInspectionTimer / 3.5) * 25));
        targetLocationName = 'West Drift Methane Standoff Perimeter (X: -0.6m, Z: 12.0m)';
        notes = 'Verifying explosive CH4 boundary does not migrate into rescue ingress route. Safe standoff confirmed.';
        break;
      case 'returning_to_staging':
        phaseLabel = 'Phase 4/4: Air Quality Corridor Certified for Rescuers';
        progressPct = 75 + Math.min(25, Math.round((this.roverGasInspectionTimer / 2.0) * 25));
        targetLocationName = 'Forward Ingress Staging Anchor (X: 3.2m, Z: 20.0m)';
        notes = 'Finalizing multi-gas atmospheric log. Confirming clean breathable air for human SCBA team.';
        break;
      case 'inspection_complete':
        phaseLabel = 'Inspection Complete: Ingress Air Quality Verified Safe';
        progressPct = 100;
        targetLocationName = 'Rescue Corridor Safety Perimeter';
        notes = 'Atmospheric air quality certified nominal. Zero explosive gas migration detected.';
        break;
      default:
        phaseLabel = this.droneState !== 'docked' ? 'Drone Deployed - Rover Gas Sweep Ready' : 'Atmospheric Monitor Standby';
        progressPct = 0;
        break;
    }

    return {
      active: this.roverPostDeployGasInspection && this.roverGasInspectionPhase !== 'idle',
      phase: this.roverGasInspectionPhase,
      phaseLabel,
      progressPct,
      o2Percent,
      airQualityScore,
      airQualityStatus,
      targetLocationName,
      notes,
    };
  }

  public updateRoverGasInspection(dt: number) {
    if (!this.roverPostDeployGasInspection) return;
    this.roverGasInspectionTimer += dt;

    switch (this.roverGasInspectionPhase) {
      case 'idle':
        this.roverGasInspectionPhase = 'sampling_rubble';
        this.roverGasInspectionTimer = 0;
        break;

      case 'sampling_rubble':
        // Rover dwells at rubble standoff (or drives to x: 5.8, z: 20.0 if not yet there)
        if (this.roverPos.distanceTo(new THREE.Vector3(5.8, this.roverPos.y, 20.0)) > 1.2 && this.roverPos.z < 18.0) {
          this.driveRoverTowards(5.8, 20.0, dt, 0.95, 0.3);
        } else {
          this.roverSpeed = 0;
          this.roverSteer = 0;
        }

        if (this.roverGasInspectionTimer > 3.0) {
          this.roverGasInspectionPhase = 'inspecting_drift_junction';
          this.roverGasInspectionTimer = 0;
          this.callbacks.onAiActionExecuted?.(
            'GAS_AIR_RUBBLE_CHECKED',
            'Rubble face sampled: CH4 185 ppm, O2 20.6%, CO 14 ppm. Moving to inspect Main Junction cross-drift ventilation.'
          );
        }
        break;

      case 'inspecting_drift_junction':
        // Rover traverses westward towards crosscut airway (x: 1.2, z: 20.0)
        const reachedJunction = this.driveRoverTowards(1.2, 20.0, dt, 0.95, 0.35);
        if (reachedJunction) {
          this.roverSpeed = 0;
          this.roverSteer = 0;
          if (this.roverGasInspectionTimer > 2.5) {
            this.roverGasInspectionPhase = 'sniffing_west_perimeter';
            this.roverGasInspectionTimer = 0;
            this.callbacks.onAiActionExecuted?.(
              'GAS_AIR_JUNCTION_CHECKED',
              'Main junction airflow verified clean (O2: 20.9%, CH4: 95 ppm). Advancing to inspect West Drift hazard perimeter.'
            );
          }
        }
        break;

      case 'sniffing_west_perimeter':
        // Rover traverses south towards West Drift standoff perimeter (x: -0.6, z: 12.0)
        const reachedPerimeter = this.driveRoverTowards(-0.6, 12.0, dt, 1.0, 0.35);
        if (reachedPerimeter) {
          this.roverSpeed = 0;
          this.roverSteer = 0;
          if (this.roverGasInspectionTimer > 3.5) {
            this.roverGasInspectionPhase = 'returning_to_staging';
            this.roverGasInspectionTimer = 0;
            this.callbacks.onAiActionExecuted?.(
              'GAS_AIR_WEST_CHECKED',
              'West Drift plume standoff confirmed contained (CH4: 2,400 ppm / 4.8% LEL). Returning to certify rescue ingress corridor.'
            );
          }
        }
        break;

      case 'returning_to_staging':
        // Rover drives back to forward rescue staging corridor (x: 3.2, z: 20.0)
        const reachedStaging = this.driveRoverTowards(3.2, 20.0, dt, 1.05, 0.3);
        if (reachedStaging) {
          this.roverSpeed = 0;
          this.roverSteer = 0;
          if (this.roverGasInspectionTimer > 2.0) {
            this.roverGasInspectionPhase = 'inspection_complete';
            this.roverGasInspectionTimer = 0;
            this.callbacks.onAiActionExecuted?.(
              'GAS_AIR_CORRIDOR_CERTIFIED',
              'Atmospheric & Gas Quality inspection COMPLETE. Ingress route 100% verified safe for SCBA rescue squad entry.'
            );
          }
        }
        break;

      case 'inspection_complete':
        this.roverSpeed = 0;
        this.roverSteer = 0;
        break;
=======
    this.lidarRaysGroup.visible = this.roverLidarActive;
  }

  // Drone Controls
  public launchDrone() {
    if (this.droneState === 'docked' || this.droneState === 'landed') {
      this.droneState = 'launching';
      this.droneTargetPos.set(this.roverPos.x, this.roverPos.y + 1.8, this.roverPos.z);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    }
  }

  public setDronePitch(pitch: number) {
    if (this.droneState === 'docked' && Math.abs(pitch) > 0.1) {
      this.launchDrone();
    }
    this.dronePitchVel = THREE.MathUtils.clamp(pitch, -1.8, 2.2);
    if (Math.abs(pitch) > 0.05 && this.droneState !== 'docked') {
      this.droneState = 'manual_flight';
    }
  }

  public setDroneRoll(roll: number) {
    if (this.droneState === 'docked' && Math.abs(roll) > 0.1) {
      this.launchDrone();
    }
    this.droneRollVel = THREE.MathUtils.clamp(roll, -1.8, 1.8);
    if (Math.abs(roll) > 0.05 && this.droneState !== 'docked') {
      this.droneState = 'manual_flight';
    }
  }

  public setDroneVertical(vert: number) {
    if (this.droneState === 'docked' && vert > 0.1) {
      this.launchDrone();
      return;
    }
    this.droneVerticalVel = THREE.MathUtils.clamp(vert, -1.5, 1.5);
    if (Math.abs(vert) > 0.05 && this.droneState !== 'docked') {
      this.droneState = 'manual_flight';
    }
  }

  public setDroneYaw(rate: number) {
    this.droneYawRate = THREE.MathUtils.clamp(rate, -2.0, 2.0);
    if (Math.abs(rate) > 0.05 && this.droneState !== 'docked') {
      this.droneState = 'manual_flight';
    }
  }

  public hoverDrone() {
    this.dronePitchVel = 0;
    this.droneRollVel = 0;
    this.droneVerticalVel = 0;
    this.droneYawRate = 0;
    if (this.droneState !== 'docked') {
      this.droneState = 'hovering';
      this.droneTargetPos.copy(this.dronePos);
    }
  }

  public landDrone() {
    const distToRover = this.dronePos.distanceTo(this.roverPos);
    if (distToRover < 2.8) {
      this.returnDroneToRover();
    } else {
      this.droneState = 'returning';
      this.droneTargetPos.set(this.dronePos.x, 0.35, this.dronePos.z);
    }
  }

  public setDroneAltitudePreset(alt: number) {
    if (this.droneState === 'docked') {
      this.launchDrone();
    }
    this.droneState = 'scouting';
    const targetY = THREE.MathUtils.clamp(this.roverPos.y + alt, 0.45, 2.9);
    this.droneTargetPos.set(this.dronePos.x, targetY, this.dronePos.z);
  }

  public toggleDroneSpotlight() {
    this.droneSpotlightOn = !this.droneSpotlightOn;
    if (this.droneSpotlight) {
      this.droneSpotlight.intensity = this.droneSpotlightOn ? 4.0 : 0.0;
    }
  }

  public sendDroneToScoutRubble() {
    this.droneState = 'scouting';
    const queue: THREE.Vector3[] = [];

    // If drone is docked or below 1.5m, add an initial vertical climb waypoint
    if (this.dronePos.y < 1.6) {
      queue.push(new THREE.Vector3(this.dronePos.x, 1.9, this.dronePos.z));
    }

    // Find closest waypoint index along the AI Pather Safe Mine Corridor
    let closestIdx = 0;
    let minDist = Infinity;
    for (let i = 0; i < AI_NAV2_MINE_PATH.length; i++) {
      const d = Math.hypot(this.dronePos.x - AI_NAV2_MINE_PATH[i].x, this.dronePos.z - AI_NAV2_MINE_PATH[i].z);
      if (d < minDist) {
        minDist = d;
        closestIdx = i;
      }
    }

    // Follow all waypoints along the AI rescue corridor from closestIdx up to survivor Randy
    for (let i = closestIdx; i < AI_NAV2_MINE_PATH.length; i++) {
      queue.push(AI_NAV2_MINE_PATH[i].clone());
    }

    this.droneWaypointsQueue = queue;
    this.droneWpIndex = 0;
    if (queue.length > 0) {
      this.droneTargetPos.copy(queue[0]);
    }
  }

  public returnDroneToRover() {
    this.droneState = 'returning';
    const queue: THREE.Vector3[] = [];

    // If low, climb up to safe flight altitude first
    if (this.dronePos.y < 1.6) {
      queue.push(new THREE.Vector3(this.dronePos.x, 1.9, this.dronePos.z));
    }

    // Find closest waypoint on AI path to current drone position
    let droneClosestIdx = AI_NAV2_MINE_PATH.length - 1;
    let minDroneDist = Infinity;
    for (let i = 0; i < AI_NAV2_MINE_PATH.length; i++) {
      const d = Math.hypot(this.dronePos.x - AI_NAV2_MINE_PATH[i].x, this.dronePos.z - AI_NAV2_MINE_PATH[i].z);
      if (d < minDroneDist) {
        minDroneDist = d;
        droneClosestIdx = i;
      }
    }

    // Find closest waypoint on AI path to rover position
    let roverClosestIdx = 0;
    let minRoverDist = Infinity;
    for (let i = 0; i < AI_NAV2_MINE_PATH.length; i++) {
      const d = Math.hypot(this.roverPos.x - AI_NAV2_MINE_PATH[i].x, this.roverPos.z - AI_NAV2_MINE_PATH[i].z);
      if (d < minRoverDist) {
        minRoverDist = d;
        roverClosestIdx = i;
      }
    }

    // Step backwards through the mine waypoints towards rover
    if (droneClosestIdx >= roverClosestIdx) {
      for (let i = droneClosestIdx; i >= roverClosestIdx; i--) {
        queue.push(AI_NAV2_MINE_PATH[i].clone());
      }
    } else {
      for (let i = droneClosestIdx; i <= roverClosestIdx; i++) {
        queue.push(AI_NAV2_MINE_PATH[i].clone());
      }
    }

    // Overhead staging point above rover
    queue.push(new THREE.Vector3(this.roverPos.x, this.roverPos.y + 1.0, this.roverPos.z - 0.22));
    // Final touchdown on docking deck
    queue.push(new THREE.Vector3(this.roverPos.x, this.roverPos.y + 0.44, this.roverPos.z - 0.22));

    this.droneWaypointsQueue = queue;
    this.droneWpIndex = 0;
    if (queue.length > 0) {
      this.droneTargetPos.copy(queue[0]);
    }
  }

  // Complete Autonomous Rescue Mission (Supports Full Tunnel Patrol and Rapid Direct Rescue)
  public startAutonomousMission(mode: 'full_patrol' | 'direct_rescue' = 'full_patrol') {
    this.missionMode = mode;
    this.isManualRoverOverride = false;
    this.missionPhase = 'running';
    this.missionStep = 1;
    this.missionTimer = 0;
    this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
  }

  public startFullTunnelMission() {
    this.startAutonomousMission('full_patrol');
  }

  public pauseMission() {
    if (this.missionPhase === 'running') {
      this.missionPhase = 'paused';
      this.roverSpeed = 0;
      this.roverSteer = 0;
      if (this.droneState === 'scouting') {
        this.droneState = 'hovering';
        this.dronePitchVel = 0;
        this.droneRollVel = 0;
        this.droneVerticalVel = 0;
        this.droneYawRate = 0;
      }
      this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
    }
  }

  public resumeMission() {
    if (this.missionPhase === 'paused') {
      this.missionPhase = 'running';
      this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
    }
  }

  public togglePauseMission() {
    if (this.missionPhase === 'running') {
      this.pauseMission();
    } else if (this.missionPhase === 'paused') {
      this.resumeMission();
    }
  }

  public stopMission() {
    this.missionPhase = 'idle';
    this.missionStep = 0;
    this.missionTimer = 0;
    this.isCustomPatrolActive = false;
    this.roverSpeed = 0;
    this.roverSteer = 0;
    if (this.droneState === 'scouting') {
      this.droneState = 'hovering';
      this.dronePitchVel = 0;
      this.droneRollVel = 0;
      this.droneVerticalVel = 0;
      this.droneYawRate = 0;
    }
    this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
  }

  // --- AI Pather & Real-Time Predictive Methods ---
  public setAiHyperparameters(params: AiHyperparameters) {
    this.currentAiHyperparams = { ...params };
    this.recomputeOptimizedPath();
    this.runRealTimeAiInference(this.clock.getElapsedTime());
  }

  public getAiHyperparameters(): AiHyperparameters {
    return { ...this.currentAiHyperparams };
  }

  public recomputeOptimizedPath(): OptimizedPathResult {
    this.currentOptimizedPath = computeOptimizedRescuePath(this.hazardZones, this.currentAiHyperparams);
    this.rebuildAiPathMesh();
    return this.currentOptimizedPath;
  }

  public getOptimizedPath(): OptimizedPathResult {
    return this.currentOptimizedPath;
  }

  public getPredictiveReport(): AiPredictiveReport | null {
    return this.lastPredictiveReport;
  }

  public getOnTheSpotDecision(): OnTheSpotAiDecision | null {
    return this.lastOnTheSpotDecision;
  }

<<<<<<< HEAD
  public recomputeAiCorridor(): OptimizedPathResult {
    return this.recomputeOptimizedPath();
  }

  public getRoverTelemetry(): RoverTelemetry {
    // Distance to Methane source in Branch 1 (-8, 10)
    const dMethane = Math.hypot(this.roverPos.x - (-8.0), this.roverPos.z - 10.0);
    let ch4Ppm = 20.0; // Ambient normal
    if (dMethane < 7.0) {
      ch4Ppm = Math.round(44000.0 * Math.exp(-0.5 * Math.pow(dMethane / 2.2, 2)));
    }

    // Distance to Survivor (13.5, 20.0)
    const dDroneToSurvivor = Math.hypot(this.dronePos.x - 13.5, this.dronePos.z - 20.0);
    const dRoverToSurvivor = Math.hypot(this.roverPos.x - 13.5, this.roverPos.z - 20.0);
    const closestDist = Math.min(dDroneToSurvivor, dRoverToSurvivor);

    let co2Ppm = 420;
    if (closestDist < 6.0) {
      co2Ppm = Math.round(420 + 1150 * Math.exp(-0.5 * Math.pow(closestDist / 2.0, 2)));
    }

    // Oxygen & Air Quality Calculations
    let o2Percent = 20.9;
    if (ch4Ppm > 100) {
      o2Percent = Math.max(16.2, 20.9 - (ch4Ppm / 50000) * 4.4);
    } else if (this.roverPos.z > 25) {
      o2Percent = Math.max(19.2, 20.9 - (this.roverPos.z - 25) * 0.12);
    }
    o2Percent = Number(o2Percent.toFixed(1));

    let airQualityScore = 96;
    let airQualityStatus: 'OPTIMAL' | 'MODERATE' | 'HAZARDOUS' | 'EXPLOSIVE_RISK' = 'OPTIMAL';
    if (ch4Ppm > 10000) {
      airQualityScore = Math.max(5, Math.round(100 - (ch4Ppm / 45000) * 92));
      airQualityStatus = 'EXPLOSIVE_RISK';
    } else if (ch4Ppm > 1200) {
      airQualityScore = Math.round(75 - (ch4Ppm / 10000) * 35);
      airQualityStatus = 'HAZARDOUS';
    } else if (ch4Ppm > 250 || o2Percent < 20.0) {
      airQualityScore = 82;
      airQualityStatus = 'MODERATE';
    }

    const gasInspectionData = this.getGasInspectionData(o2Percent, airQualityScore, airQualityStatus);
    const isGasChecking = this.roverPostDeployGasInspection && this.roverGasInspectionPhase !== 'idle' && this.roverGasInspectionPhase !== 'inspection_complete';

    return {
      position: { x: Number(this.roverPos.x.toFixed(2)), y: Number(this.roverPos.y.toFixed(2)), z: Number(this.roverPos.z.toFixed(2)) },
      yaw: Number(this.roverYaw.toFixed(2)),
      speed: Number(this.roverSpeed.toFixed(2)),
      steering: Number(this.roverSteer.toFixed(2)),
      batteryPct: Math.max(15, 96 - Math.round(this.roverPos.z * 0.8)),
      ch4Ppm,
      coPpm: 12 + Math.round(ch4Ppm * 0.002),
      co2Ppm,
      o2Percent,
      airQualityScore,
      temperatureC: 16.4 + (this.roverPos.z > 28 ? 18.0 : 0.0),
      headlights: this.roverHeadlightsOn,
      lidarActive: this.roverLidarActive,
      lidarRanges: this.currentLidarRanges,
      gasInspection: gasInspectionData,
      commsRssi: -42 - Math.round(this.roverPos.z * 1.2),
      mode: isGasChecking && !this.isManualRoverOverride
        ? 'gas_air_inspection'
        : (ch4Ppm > 10000 ? 'retreat' : (this.missionPhase === 'running' && !this.isManualRoverOverride) ? 'auto_mapping' : 'manual'),
    };
  }

  public getDroneTelemetry(): DroneTelemetry {
    const estSecondsRemaining = Math.max(0, Math.round((this.droneBatteryPct / 100) * 1110));
    const drainPerMin = Number((this.droneSpotlightOn ? 7.0 : 4.9).toFixed(1));

    return {
      position: { x: Number(this.dronePos.x.toFixed(2)), y: Number(this.dronePos.y.toFixed(2)), z: Number(this.dronePos.z.toFixed(2)) },
      yaw: Number(this.droneYaw.toFixed(2)),
      altitude: Number((this.dronePos.y - this.roverPos.y).toFixed(2)),
      batteryPct: Number(this.droneBatteryPct.toFixed(1)),
      state: this.droneState,
      spotlight: this.droneSpotlightOn,
      thermalLocked: this.survivorData.detected,
      relDistanceToRover: Number(this.dronePos.distanceTo(this.roverPos).toFixed(2)),
      flightSpeed: Number(Math.hypot(this.dronePitchVel, this.droneRollVel).toFixed(2)),
      verticalSpeed: Number(this.droneVerticalVel.toFixed(2)),
      estimatedFlightSecondsRemaining: estSecondsRemaining,
      batteryDischargeRate: drainPerMin,
      flightDurationSeconds: Math.round(this.droneFlightTimeSeconds),
    };
  }

  public setAutonomousAiExecution(active: boolean) {
    this.isAutonomousAiExecutionActive = active;
  }

  public isAutonomousAiActive(): boolean {
    return this.isAutonomousAiExecutionActive;
  }

  public executeOnTheSpotAiAction(actionType?: string) {
    const decision = this.lastOnTheSpotDecision;
    const action = actionType || decision?.droneAction || (decision?.threatLevel === 'EMERGENCY' ? 'EVADE_METHANE' : undefined);

    if (action === 'LAUNCH_SCOUT' || (decision && decision.droneAction === 'LAUNCH_SCOUT')) {
      if (this.droneState === 'docked') {
        this.launchDrone();
        this.callbacks.onAiActionExecuted?.('DEPLOY_SCOUT_DRONE', 'Quadcopter launched from rover deck to crest rubble barrier');
      }
    } else if (action === 'RETURN_TO_BASE' || (decision && decision.droneAction === 'RETURN_TO_BASE')) {
      if (this.droneState !== 'docked') {
        this.returnDroneToRover();
        this.callbacks.onAiActionExecuted?.('RETURN_TO_ROVER', 'RTL sequence initiated to land on rover docking pad');
      }
    } else if (action === 'MAINTAIN_HOVER' || (decision && decision.droneAction === 'MAINTAIN_HOVER')) {
      this.droneSpotlightOn = true;
      this.droneSpotlight.visible = true;
      this.hoverDrone();
      this.callbacks.onAiActionExecuted?.('SURVIVOR_LOCK', 'High-intensity thermal spotlight active, holding survey hover');
    } else if (action === 'EVADE_METHANE' || (decision && decision.threatLevel === 'EMERGENCY')) {
      const evasionX = this.currentOptimizedPath.evasionOffsetMeters;
      this.roverSteer = 0.55;
      this.roverSpeed = Math.min(this.roverSpeed, 0.6);
      this.callbacks.onAiActionExecuted?.('METHANE_DEFLECTION', `Steering diverted East to Standby corridor (+${evasionX}m offset)`);
    } else if (action === 'REPLAN_CORRIDOR' || action === 'AI_PLAN_ON_SPOT' || action === 'PLAN_ON_SPOT') {
      this.recomputeOptimizedPath();
      this.callbacks.onTheSpotPlanRequested?.();
      this.callbacks.onAiActionExecuted?.('AI_PLAN_ON_SPOT', `AI Planner executed on the spot: computed obstacle-averse corridor (+${this.currentOptimizedPath.evasionOffsetMeters}m evasion)`);
    }
  }

  private executeAutonomousOnTheSpotBehavior(decision: OnTheSpotAiDecision) {
    const now = this.clock.getElapsedTime();
    if (now - this.lastAutonomousTriggerTime < 2.0) return; // Debounce rapid re-triggers

    // 1. Auto deploy scout drone when reaching rubble
    if (decision.droneAction === 'LAUNCH_SCOUT' && this.droneState === 'docked' && this.roverPos.x >= 6.0 && this.roverPos.z >= 18.8) {
      this.lastAutonomousTriggerTime = now;
      this.launchDrone();
      this.callbacks.onAiActionExecuted?.('AUTO_LAUNCH_DRONE', 'Autonomous trigger: Rover reached rubble standoff, launching quadcopter scout on the spot');
    }
    // 2. Auto RTL when drone battery is depleted (<25%)
    else if (decision.droneAction === 'RETURN_TO_BASE' && this.droneState !== 'docked' && this.droneBatteryPct < 25) {
      this.lastAutonomousTriggerTime = now;
      this.returnDroneToRover();
      this.callbacks.onAiActionExecuted?.('AUTO_RETURN_TO_BASE', 'Autonomous trigger: Quadcopter battery below reserve (25%), initiating RTL on the spot');
    }
    // 3. Auto survivor thermal lock
    else if (decision.droneAction === 'MAINTAIN_HOVER' && this.survivorData.detected && !this.droneSpotlightOn) {
      this.lastAutonomousTriggerTime = now;
      this.droneSpotlightOn = true;
      this.droneSpotlight.visible = true;
      this.callbacks.onAiActionExecuted?.('AUTO_SURVIVOR_LOCK', 'Autonomous trigger: Target survivor confirmed, activating thermal illumination on the spot');
    }
    // 4. Autonomous on-the-spot plan update when approaching hazard threshold
    else if (decision.threatLevel === 'EMERGENCY' && this.roverPos.z >= 7.0 && this.roverPos.z <= 12.0 && now - this.lastAutonomousTriggerTime > 8.0) {
      this.lastAutonomousTriggerTime = now;
      this.recomputeOptimizedPath();
      this.callbacks.onTheSpotPlanRequested?.();
      this.callbacks.onAiActionExecuted?.('AUTO_PLAN_ON_SPOT', 'Autonomous trigger: Hazard threat elevated, AI re-planned safe corridor on the spot');
    }
  }

  // --- Environmental Reconnaissance Across All Mine Sides ---
  public getEnvironmentalSectors(): MineSectorSurveyData[] {
    return this.environmentalSectors.map((s) => ({ ...s }));
  }

  public updateSectorSurvey(sectorId: string, complete: boolean, customData?: Partial<MineSectorSurveyData>) {
    const sec = this.environmentalSectors.find((s) => s.sectorId === sectorId);
    if (sec) {
      sec.surveyComplete = complete;
      const now = new Date();
      sec.sampleTimestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      if (customData) {
        Object.assign(sec, customData);
      }
      this.callbacks.onEnvironmentalReconUpdate?.(this.getEnvironmentalSectors());
    }
  }

  public resetEnvironmentalSurveys() {
    this.environmentalSectors.forEach((s, idx) => {
      s.surveyComplete = idx === 0;
      if (idx > 0) s.sampleTimestamp = 'Pending Recon';
    });
    this.callbacks.onEnvironmentalReconUpdate?.(this.getEnvironmentalSectors());
  }

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  public rebuildAiPathMesh() {
    while (this.aiPathGroup.children.length > 0) {
      const obj = this.aiPathGroup.children[0];
      this.aiPathGroup.remove(obj);
    }

    const dense = this.currentOptimizedPath.densePolyline;
    if (!dense || dense.length < 2) return;

<<<<<<< HEAD
    // 1. Central Luminous Core Tube
    const curvePoints = dense.map((pt) => new THREE.Vector3(pt.x, pt.y + 0.04, pt.z));
    const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.1);
    const corridorTubeGeo = new THREE.TubeGeometry(pathCurve, 140, 0.034, 10, false);

    const safetyScore = this.currentOptimizedPath.safetyClearanceScore;
    const tubeColor = safetyScore > 80 ? 0x0284c7 : safetyScore > 50 ? 0xfbbf24 : 0xf43f5e;
    const emissiveColor = safetyScore > 80 ? 0x0369a1 : safetyScore > 50 ? 0xd97706 : 0xe11d48;
=======
    // Convert to THREE.Vector3 array
    const curvePoints = dense.map((pt) => new THREE.Vector3(pt.x, pt.y + 0.04, pt.z));
    const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.1);
    const corridorTubeGeo = new THREE.TubeGeometry(pathCurve, 120, 0.028, 8, false);

    const safetyScore = this.currentOptimizedPath.safetyClearanceScore;
    const tubeColor = safetyScore > 80 ? 0x00f5d4 : safetyScore > 50 ? 0xfbbf24 : 0xf43f5e;
    const emissiveColor = safetyScore > 80 ? 0x00b4d8 : safetyScore > 50 ? 0xd97706 : 0xe11d48;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

    const corridorTubeMat = new THREE.MeshStandardMaterial({
      color: tubeColor,
      emissive: emissiveColor,
<<<<<<< HEAD
      emissiveIntensity: 0.95,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
=======
      emissiveIntensity: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.8,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    });
    const corridorMesh = new THREE.Mesh(corridorTubeGeo, corridorTubeMat);
    this.aiPathGroup.add(corridorMesh);

<<<<<<< HEAD
    // 2. Parallel Dual Guardrails (Defining Rover Track & Human Safe Walking Envelope)
    const leftPoints: THREE.Vector3[] = [];
    const rightPoints: THREE.Vector3[] = [];
    const railOffset = 0.55; // 1.1m total safe track width

    for (let i = 0; i < curvePoints.length; i++) {
      const p = curvePoints[i];
      const nextP = curvePoints[Math.min(curvePoints.length - 1, i + 1)];
      const prevP = curvePoints[Math.max(0, i - 1)];
      const tangent = new THREE.Vector3().subVectors(nextP, prevP).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      leftPoints.push(new THREE.Vector3(p.x + normal.x * railOffset, 0.03, p.z + normal.z * railOffset));
      rightPoints.push(new THREE.Vector3(p.x - normal.x * railOffset, 0.03, p.z - normal.z * railOffset));
    }

    const leftCurve = new THREE.CatmullRomCurve3(leftPoints, false, 'catmullrom', 0.1);
    const rightCurve = new THREE.CatmullRomCurve3(rightPoints, false, 'catmullrom', 0.1);

    const railGeoLeft = new THREE.TubeGeometry(leftCurve, 120, 0.015, 6, false);
    const railGeoRight = new THREE.TubeGeometry(rightCurve, 120, 0.015, 6, false);

    const railMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });

    this.aiPathGroup.add(new THREE.Mesh(railGeoLeft, railMat));
    this.aiPathGroup.add(new THREE.Mesh(railGeoRight, railMat));

    // 3. Highlighted 90-Degree Sharp Right-Angle Turn Landmark at Junction (x: 0.0, z: 20.0)
    const turnCornerGroup = new THREE.Group();
    turnCornerGroup.position.set(0.0, 0.02, 20.0);

    // 90° Orthogonal Right-Angle Square Marker on floor
    const squarePts = [
      new THREE.Vector3(0.0, 0.01, -0.6),
      new THREE.Vector3(0.6, 0.01, -0.6),
      new THREE.Vector3(0.6, 0.01, 0.0),
    ];
    const squareGeo = new THREE.BufferGeometry().setFromPoints(squarePts);
    const squareMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 });
    const squareLine = new THREE.Line(squareGeo, squareMat);
    turnCornerGroup.add(squareLine);

    // Perpendicular Corner Axis Guide Lines (Ingress Z-axis and Outgoing X-axis)
    const axisPts = [
      new THREE.Vector3(0.0, 0.01, -1.8),
      new THREE.Vector3(0.0, 0.01, 0.0),
      new THREE.Vector3(1.8, 0.01, 0.0),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
    const axisMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    turnCornerGroup.add(axisLine);

    // 90° Turn Floor Sector Floor Plate
    const floorPlateGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const floorPlateMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const floorPlate = new THREE.Mesh(floorPlateGeo, floorPlateMat);
    floorPlate.rotation.x = -Math.PI / 2;
    floorPlate.position.set(0.8, 0.005, -0.8);
    turnCornerGroup.add(floorPlate);

    // Inner turn apex beacon pillar at square corner
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.8, 12);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(-0.55, 0.9, 0.55);
    turnCornerGroup.add(pillar);

    // Rotating holographic halo rings around pillar
    const haloTorusGeo = new THREE.TorusGeometry(0.35, 0.02, 8, 24);
    const haloMatCyan = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
    const haloCyan = new THREE.Mesh(haloTorusGeo, haloMatCyan);
    haloCyan.position.set(-0.55, 1.2, 0.55);
    turnCornerGroup.add(haloCyan);

    const haloMatAmber = new THREE.MeshBasicMaterial({ color: 0xfbbf24, wireframe: true });
    const haloAmber = new THREE.Mesh(haloTorusGeo, haloMatAmber);
    haloAmber.position.set(-0.55, 1.45, 0.55);
    haloAmber.rotation.x = Math.PI / 4;
    turnCornerGroup.add(haloAmber);

    // Floating diamond beacon at top
    const octGeo = new THREE.OctahedronGeometry(0.16, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
      wireframe: false,
    });
    const beaconDiamond = new THREE.Mesh(octGeo, octMat);
    beaconDiamond.position.set(-0.55, 1.85, 0.55);
    turnCornerGroup.add(beaconDiamond);

    // 90° Pivot Floating Label Sprite
    const turnLabel = this.createWaypointSpriteLabel('90.0° SHARP PIVOT', '#d97706');
    turnLabel.position.set(-0.55, 2.25, 0.55);
    turnLabel.scale.set(1.4, 0.7, 1.0);
    turnCornerGroup.add(turnLabel);

    // Corner Guide Bollards framing the perpendicular entrance & exit
    const bollardGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.6, 10);
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const bollardStrobeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const b1 = new THREE.Mesh(bollardGeo, bollardMat);
    b1.position.set(-0.7, 0.3, -1.0);
    const b1Cap = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), bollardStrobeMat);
    b1Cap.position.set(0, 0.32, 0);
    b1.add(b1Cap);
    turnCornerGroup.add(b1);

    const b2 = new THREE.Mesh(bollardGeo, bollardMat);
    b2.position.set(1.0, 0.3, 0.7);
    const b2Cap = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), bollardStrobeMat);
    b2Cap.position.set(0, 0.32, 0);
    b2.add(b2Cap);
    turnCornerGroup.add(b2);

    this.aiPathGroup.add(turnCornerGroup);

    // 4. Add waypoint beacons along the path with special styling for 90° turn
    this.currentOptimizedPath.waypoints.forEach((wp, idx) => {
      const isTerminal = idx === this.currentOptimizedPath.waypoints.length - 1;
      const isAerial = wp.segmentType !== 'ground_drive';
      const isTurn90 = wp.is90DegTurn || wp.is80DegTurn || idx === 6;

      const beaconColor = isTurn90 ? 0xf59e0b : isTerminal ? 0xff0055 : isAerial ? 0x38bdf8 : 0x0284c7;

      // Floor guide disc
      const discRadius = isTurn90 ? 0.32 : 0.16;
      const floorDiscGeo = new THREE.CylinderGeometry(discRadius, discRadius, 0.02, 18);
      const floorDiscMat = new THREE.MeshBasicMaterial({
        color: beaconColor,
        transparent: true,
        opacity: isTurn90 ? 0.8 : 0.5,
      });
=======
    // Add waypoint beacons along the path
    this.currentOptimizedPath.waypoints.forEach((wp, idx) => {
      const isTerminal = idx === this.currentOptimizedPath.waypoints.length - 1;
      const isAerial = wp.segmentType !== 'ground_drive';
      const beaconColor = isTerminal ? 0xff0055 : isAerial ? 0x38bdf8 : 0x00f5d4;

      // Floor guide disc
      const floorDiscGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 16);
      const floorDiscMat = new THREE.MeshBasicMaterial({ color: beaconColor, transparent: true, opacity: 0.5 });
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      const floorDisc = new THREE.Mesh(floorDiscGeo, floorDiscMat);
      floorDisc.position.set(wp.x, 0.03, wp.z);
      this.aiPathGroup.add(floorDisc);

<<<<<<< HEAD
      // Aerial ring gate or turn halo
      const ringRadius = isTurn90 ? 0.38 : 0.18;
      const ringGeo = new THREE.TorusGeometry(ringRadius, 0.018, 8, 20);
      const ringMat = new THREE.MeshBasicMaterial({ color: beaconColor, transparent: true, opacity: 0.9 });
=======
      // Aerial ring gate
      const ringGeo = new THREE.TorusGeometry(0.18, 0.015, 8, 20);
      const ringMat = new THREE.MeshBasicMaterial({ color: beaconColor, transparent: true, opacity: 0.85 });
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(wp.x, wp.y + 0.04, wp.z);
      ring.rotation.x = Math.PI / 2;
      this.aiPathGroup.add(ring);
    });
  }

  private updatePredictiveGhostMesh(report: AiPredictiveReport) {
    while (this.predictiveGhostGroup.children.length > 0) {
      const obj = this.predictiveGhostGroup.children[0];
      this.predictiveGhostGroup.remove(obj);
    }

    const futurePoses = this.droneState === 'docked' ? report.predictedFuturePoses : report.predictedDronePoses;
    if (!futurePoses || futurePoses.length < 2) return;

    const points = futurePoses.map((p) => new THREE.Vector3(p.x, p.y + 0.08, p.z));
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const riskColor = report.predictedCollisionRisk === 'CRITICAL' ? 0xf43f5e : report.predictedCollisionRisk === 'ELEVATED' ? 0xfbbf24 : 0x38bdf8;
    const lineMat = new THREE.LineDashedMaterial({
      color: riskColor,
      dashSize: 0.25,
      gapSize: 0.15,
      linewidth: 2,
    });
    const ghostLine = new THREE.Line(lineGeo, lineMat);
    ghostLine.computeLineDistances();
    this.predictiveGhostGroup.add(ghostLine);

    // Terminal forward horizon orb
    const horizonPoint = points[points.length - 1];
    const ghostOrbGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const ghostOrbMat = new THREE.MeshBasicMaterial({ color: riskColor, transparent: true, opacity: 0.7 });
    const ghostOrb = new THREE.Mesh(ghostOrbGeo, ghostOrbMat);
    ghostOrb.position.copy(horizonPoint);
    this.predictiveGhostGroup.add(ghostOrb);
  }

  private runRealTimeAiInference(time: number) {
    const roverTel = this.getRoverTelemetry();
    const droneTel = this.getDroneTelemetry();
    const report = generateRealTimePredictiveReport(
      roverTel,
      droneTel,
      this.survivorData,
      this.hazardZones,
      this.currentAiHyperparams,
      time
    );
    this.lastPredictiveReport = report;
    this.callbacks.onAiPredictiveReport?.(report);

    const decision = evaluateOnTheSpotAiDecision(
      roverTel,
      droneTel,
      this.survivorData,
      this.currentAiHyperparams
    );
    this.lastOnTheSpotDecision = decision;
    this.callbacks.onTheSpotDecision?.(decision);

    this.updatePredictiveGhostMesh(report);
<<<<<<< HEAD

    if (this.isAutonomousAiExecutionActive) {
      this.executeAutonomousOnTheSpotBehavior(decision);
    }
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  }

  public resetSimulation() {
    this.missionPhase = 'idle';
    this.missionStep = 0;
    this.missionTimer = 0;
    this.isManualRoverOverride = false;
    this.roverPos.set(0, 0.22, 1.0);
    this.roverYaw = Math.PI / 2;
    this.roverSpeed = 0;
    this.roverSteer = 0;
    this.roverGroup.position.copy(this.roverPos);
    this.roverGroup.rotation.y = this.roverYaw;

    this.dronePitchVel = 0;
    this.droneRollVel = 0;
    this.droneVerticalVel = 0;
    this.droneYawRate = 0;
    this.droneTiltPitch = 0;
    this.droneTiltRoll = 0;
    this.droneState = 'docked';
    this.droneBatteryPct = 96.0;
    this.droneFlightTimeSeconds = 0;
    this.droneWaypointsQueue = [];
    this.droneWpIndex = 0;
    this.dronePos.set(this.roverPos.x, this.roverPos.y + 0.24, this.roverPos.z - 0.22);
    this.droneGroup.position.copy(this.dronePos);
    this.droneGroup.rotation.y = this.roverYaw;

    this.survivorData.detected = false;
    this.survivorData.visualConfidence = 0;
    this.survivorData.thermalConfidence = 0;
    this.survivorData.acousticConfidence = 0;
    this.survivorData.co2Confidence = 0;
    this.survivorData.uwbConfidence = 0;
    this.survivorData.fusedProbability = 0;

    // Reset user custom patrol state
    this.isCustomPatrolActive = false;
    this.customPatrolRoverIndex = 0;
    this.customPatrolDroneIndex = 0;
    this.customPatrolRoverDwellTimer = 0;
    this.customPatrolDroneDwellTimer = 0;

    this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
  }

  /**
<<<<<<< HEAD
   * Closed-loop in-place sharp pivot controller for ground rover.
   * Rotates rover in place (zero turning radius) to achieve target yaw (e.g. 90.0° sharp).
   */
  private pivotRoverInPlace(
    targetYaw: number,
    dt: number,
    turnRate: number = 1.4,
    tolerance: number = 0.015
  ): boolean {
    this.roverSpeed = 0;
    let diff = targetYaw - this.roverYaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    if (Math.abs(diff) <= tolerance) {
      this.roverYaw = targetYaw;
      this.roverSteer = 0;
      return true;
    }

    const step = Math.sign(diff) * Math.min(Math.abs(diff), turnRate * dt);
    this.roverYaw += step;
    this.roverSteer = Math.sign(diff);

    // Visual skid-steer wheel spin in opposite directions
    this.roverWheels.forEach((w, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      w.rotation.x += dir * Math.sign(diff) * dt * 4.0;
    });

    return false;
  }

  /**
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
   * Closed-loop navigation controller for ground rover
   */
  private driveRoverTowards(
    targetX: number,
    targetZ: number,
    dt: number,
    targetSpeed: number = 1.1,
    arrivalThreshold: number = 0.45
  ): boolean {
    const dx = targetX - this.roverPos.x;
    const dz = targetZ - this.roverPos.z;
    const dist = Math.hypot(dx, dz);

    if (dist < arrivalThreshold) {
      this.roverSpeed = 0;
      this.roverSteer = 0;
      return true;
    }

    const targetHeading = Math.atan2(dx, dz);
    let headingDiff = targetHeading - this.roverYaw;
    while (headingDiff > Math.PI) headingDiff -= Math.PI * 2;
    while (headingDiff < -Math.PI) headingDiff += Math.PI * 2;

    if (Math.abs(headingDiff) > 0.45) {
      this.roverSteer = Math.sign(headingDiff) * 0.85;
      this.roverSpeed = 0.15;
    } else {
      this.roverSteer = THREE.MathUtils.clamp(headingDiff * 2.2, -0.85, 0.85);
      this.roverSpeed = THREE.MathUtils.clamp(dist * 0.95, 0.4, targetSpeed);
    }
    return false;
  }

  /**
   * Closed-loop 3D trajectory controller for scout drone
   */
  private flyDroneTowards(
    targetX: number,
    targetY: number,
    targetZ: number,
    dt: number,
    speed: number = 1.8,
    arrivalThreshold: number = 0.35
  ): boolean {
    const dx = targetX - this.dronePos.x;
    const dy = targetY - this.dronePos.y;
    const dz = targetZ - this.dronePos.z;
    const dist3D = Math.hypot(dx, dy, dz);

    if (dist3D < arrivalThreshold) {
      this.droneState = 'hovering';
      this.dronePitchVel = 0;
      this.droneRollVel = 0;
      this.droneVerticalVel = 0;
      this.droneYawRate = 0;
      return true;
    }

    this.droneState = 'scouting';
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    this.dronePos.addScaledVector(dir, Math.min(dist3D, speed * dt));

    const targetYaw = Math.atan2(dx, dz);
    let yawDiff = targetYaw - this.droneYaw;
    while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
    this.droneYaw = THREE.MathUtils.lerp(this.droneYaw, targetYaw, dt * 5.0);

    this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, -0.12, dt * 4.0);
    this.droneTiltRoll = THREE.MathUtils.lerp(this.droneTiltRoll, -dir.x * 0.12, dt * 4.0);
    return false;
  }

  private updateAutonomousMission(dt: number) {
    if (this.missionPhase !== 'running' || this.isManualRoverOverride) return;
    this.missionTimer += dt;

    if (this.missionMode === 'direct_rescue') {
      // Step 1: Portal Ingress down main drift to chainage 7.5m
      if (this.missionStep === 1) {
        if (this.driveRoverTowards(0.0, 7.5, dt, 1.2)) {
          this.missionStep = 2;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 2: Methane plume evasion along East flank into central drift (x: 0.0, z: 20.0)
      else if (this.missionStep === 2) {
        const targetSpeed = Math.min(1.4, this.currentAiHyperparams.roverMaxSpeedMs * 0.9);
        if (this.roverPos.z < 16.0) {
          const evasionX = this.currentOptimizedPath.evasionOffsetMeters;
          this.driveRoverTowards(evasionX, 12.0, dt, targetSpeed);
        } else {
          // Advance straight along centerline to 90° Turn Junction apex at (x: 0.0, z: 20.0)
          if (this.driveRoverTowards(0.0, 20.0, dt, targetSpeed, 0.25)) {
            this.missionStep = 3;
=======
      // Step 2: Methane plume evasion along East flank
      else if (this.missionStep === 2) {
        const evasionX = this.currentOptimizedPath.evasionOffsetMeters;
        const targetSpeed = Math.min(1.4, this.currentAiHyperparams.roverMaxSpeedMs * 0.9);
        if (this.driveRoverTowards(evasionX, 12.0, dt, targetSpeed)) {
          this.missionStep = 3;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
      // Step 3: Align with East Branch and drive to rubble standoff
      else if (this.missionStep === 3) {
        if (this.roverPos.x < 1.5) {
          this.driveRoverTowards(1.8, 19.8, dt, 1.0);
        } else {
          if (this.driveRoverTowards(6.8, 20.0, dt, 0.9)) {
            this.missionStep = 4;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
      } 
<<<<<<< HEAD
      // Step 3: Execute Perfect 90-Degree Sharp Pivot Turn (North -> East)
      else if (this.missionStep === 3) {
        const turned90 = this.pivotRoverInPlace(Math.PI / 2, dt, 1.4);
        if (turned90) {
          this.missionStep = 4;
          this.missionTimer = 0;
          this.callbacks.onAiActionExecuted?.(
            'PERFECT_90_DEG_TURN',
            'Rover completed precision 90.0° sharp pivot turn into East Crosscut'
          );
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
      // Step 4: Drive straight East along z=20.0 to impassable rubble barrier (x=6.8)
      else if (this.missionStep === 4) {
        if (this.driveRoverTowards(6.8, 20.0, dt, 0.95, 0.3)) {
          // Rover halted at barrier where it cannot pass through!
          this.roverSpeed = 0;
          this.roverSteer = 0;
          // Autonomous Drone Self-Launch:
          if (this.droneState === 'docked') {
            this.launchDrone(true);
            this.callbacks.onAiActionExecuted?.(
              'AUTONOMOUS_OBSTACLE_SELF_LAUNCH',
              'Rover blocked by impassable 18.4 m³ rubble wall. Scout drone launched itself autonomously to crest barrier!'
            );
          }
=======
      // Step 4: Deploy Scout Drone from Rover Helipad Deck
      else if (this.missionStep === 4) {
        if (this.droneState === 'docked') {
          this.launchDrone();
        }
        if (this.missionTimer > 2.0) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          this.missionStep = 5;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 5: Aerial flight over rubble barrier into cavern + Rover Gas Inspection
      else if (this.missionStep === 5) {
        if (this.droneState === 'docked') {
          this.launchDrone(true);
        }
        if (this.dronePos.x < 9.5) {
          this.flyDroneTowards(8.8, 2.25, 20.0, dt, 1.8);
=======
      // Step 5: Aerial flight over rubble barrier
      else if (this.missionStep === 5) {
        if (this.dronePos.x < 10.0) {
          this.flyDroneTowards(8.5, 2.2, 20.0, dt, 1.8);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        } else {
          if (this.flyDroneTowards(13.5, 1.85, 20.0, dt, 1.8, 0.4)) {
            this.missionStep = 6;
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
<<<<<<< HEAD
        // Rover autonomously inspects gas & air quality while drone scouts
        this.updateRoverGasInspection(dt);
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      } 
      // Step 6: Survivor Detection & 5-Modality Biometric Confirmation
      else if (this.missionStep === 6) {
        this.droneSpotlightOn = true;
        this.droneSpotlight.visible = true;
<<<<<<< HEAD
        // Continue gas inspection
        this.updateRoverGasInspection(dt);
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        if (this.survivorData.detected && this.missionTimer > 3.0) {
          this.missionStep = 7;
          this.missionPhase = 'completed';
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      }
    } else {
<<<<<<< HEAD
      // FULL MULTI-TUNNEL PATROL (11 comprehensive steps across all mine sides)
      // Step 1: Main drift ingress survey (z: 1 -> 7.5)
      if (this.missionStep === 1) {
        this.updateSectorSurvey('sec-portal', true);
=======
      // FULL MULTI-TUNNEL PATROL (11 comprehensive steps)
      // Step 1: Main drift ingress survey (z: 1 -> 7.5)
      if (this.missionStep === 1) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        if (this.driveRoverTowards(0.0, 7.5, dt, 1.2)) {
          this.missionStep = 2;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
      // Step 2: West Branch Hazard Standoff & Gas Sniffing (x: -0.9, z: 10.0)
      else if (this.missionStep === 2) {
        this.driveRoverTowards(-0.9, 10.0, dt, 0.8, 0.4);
        if (this.missionTimer > 2.5) {
<<<<<<< HEAD
          // Gas sample complete (>42,000 ppm CH4 confirmed on West side)
          this.updateSectorSurvey('sec-west', true);
=======
          // Gas sample complete (>42,000 ppm CH4 confirmed)
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          this.missionStep = 3;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 3: Divert safely around methane plume along East flank, then return to centerline
=======
      // Step 3: Divert safely around methane plume along East flank (x: evasionX, z: 12.0 -> x: 0.2, z: 16.0)
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      else if (this.missionStep === 3) {
        const evasionX = this.currentOptimizedPath.evasionOffsetMeters;
        const targetSpeed = Math.min(1.4, this.currentAiHyperparams.roverMaxSpeedMs * 0.9);
        if (this.roverPos.z < 13.5) {
          this.driveRoverTowards(evasionX, 12.0, dt, targetSpeed);
        } else {
<<<<<<< HEAD
          if (this.driveRoverTowards(0.0, 16.5, dt, targetSpeed)) {
            this.updateSectorSurvey('sec-spine', true);
=======
          if (this.driveRoverTowards(0.2, 16.0, dt, targetSpeed)) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            this.missionStep = 4;
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
      } 
<<<<<<< HEAD
      // Step 4: Advance along Main Drift Centerline to 90° Turn Junction Apex (x: 0.0, z: 20.0)
      else if (this.missionStep === 4) {
        if (this.driveRoverTowards(0.0, 20.0, dt, 1.0, 0.25)) {
=======
      // Step 4: Central Cross-Cut & East Junction Alignment (x: 0.0, z: 19.8)
      else if (this.missionStep === 4) {
        if (this.driveRoverTowards(0.0, 19.8, dt, 1.1)) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          this.missionStep = 5;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 5: Execute Perfect 90-Degree Sharp Pivot Turn (North -> East)
      else if (this.missionStep === 5) {
        const turned90 = this.pivotRoverInPlace(Math.PI / 2, dt, 1.4);
        if (turned90) {
          this.missionStep = 6;
          this.missionTimer = 0;
          this.callbacks.onAiActionExecuted?.(
            'PERFECT_90_DEG_TURN',
            'Rover executed perfect 90.0° sharp right-angle pivot turn into East Drift'
          );
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
      // Step 6: Advance down East Drift to Impassable Rubble Standoff (x=6.8, z=20.0)
      else if (this.missionStep === 6) {
        if (this.driveRoverTowards(6.8, 20.0, dt, 0.95, 0.3)) {
          this.updateSectorSurvey('sec-east-rubble', true);
          this.roverSpeed = 0;
          this.roverSteer = 0;
          // Obstacle reached: Rover cannot pass through rubble!
          // Scout drone launches itself autonomously by itself:
          if (this.droneState === 'docked') {
            this.launchDrone(true);
            this.callbacks.onAiActionExecuted?.(
              'AUTONOMOUS_OBSTACLE_SELF_LAUNCH',
              'Rover blocked by impassable 18.4 m³ rubble wall. Scout drone launched itself autonomously to bypass barrier!'
            );
          }
=======
      // Step 5: Turn into East Branch towards rubble collapse (x: 2.5 -> 6.8, z: 20.0)
      else if (this.missionStep === 5) {
        if (this.roverPos.x < 2.5) {
          this.driveRoverTowards(2.5, 19.8, dt, 0.9);
        } else {
          if (this.driveRoverTowards(6.8, 20.0, dt, 1.0)) {
            this.missionStep = 6;
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
      } 
      // Step 6: 3D LiDAR volumetric profiling of 18.4 m³ rubble collapse
      else if (this.missionStep === 6) {
        this.roverSpeed = 0;
        this.roverSteer = 0;
        if (this.missionTimer > 2.0) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          this.missionStep = 7;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 7: Drone autonomous liftoff and 3D flight over rubble barrier into cavern + Rover Gas Inspection
      else if (this.missionStep === 7) {
        if (this.droneState === 'docked') {
          this.launchDrone(true);
        }
        if (this.dronePos.x < 9.5) {
          this.flyDroneTowards(8.8, 2.25, 20.0, dt, 1.8);
        } else if (this.dronePos.x < 12.0) {
          this.flyDroneTowards(11.2, 2.05, 20.0, dt, 1.8);
        } else {
          if (this.flyDroneTowards(13.5, 1.85, 20.0, dt, 1.8, 0.4)) {
            this.missionStep = 8;
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
        // Rover autonomously inspects gas & air quality while drone scouts
        this.updateRoverGasInspection(dt);
      } 
      // Step 8: Multi-Modal Biometric Confirmation (miner Randy alive in East Cavern)
      else if (this.missionStep === 8) {
        this.droneSpotlightOn = true;
        this.droneSpotlight.visible = true;
        // Continue gas inspection
        this.updateRoverGasInspection(dt);
        if (this.survivorData.detected && this.missionTimer > 3.0) {
          this.updateSectorSurvey('sec-east-survivor', true);
          this.missionStep = 9;
=======
      // Step 7: Launch Scout Drone from Rover Helipad Deck
      else if (this.missionStep === 7) {
        if (this.droneState === 'docked') {
          this.launchDrone();
        }
        if (this.missionTimer > 2.0) {
          this.missionStep = 8;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
<<<<<<< HEAD
      // Step 9: Drone escorts back to standoff, Rover surveys North Terminus
      else if (this.missionStep === 9) {
=======
      // Step 8: Drone autonomous 3D flight over rubble barrier into cavern
      else if (this.missionStep === 8) {
        if (this.dronePos.x < 9.5) {
          this.flyDroneTowards(8.5, 2.2, 20.0, dt, 1.8);
        } else if (this.dronePos.x < 12.0) {
          this.flyDroneTowards(11.0, 2.05, 20.0, dt, 1.8);
        } else {
          if (this.flyDroneTowards(13.5, 1.85, 20.0, dt, 1.8, 0.4)) {
            this.missionStep = 9;
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
      } 
      // Step 9: Multi-Modal Biometric Confirmation (miner Randy alive)
      else if (this.missionStep === 9) {
        this.droneSpotlightOn = true;
        this.droneSpotlight.visible = true;
        if (this.survivorData.detected && this.missionTimer > 3.0) {
          this.missionStep = 10;
          this.missionTimer = 0;
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      } 
      // Step 10: North Ventilation Drift Reconnaissance (Rover surveys up to z=31.5m)
      else if (this.missionStep === 10) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        // Drone escorts back to standoff
        if (this.dronePos.x > 8.0) {
          this.flyDroneTowards(6.8, 2.0, 20.0, dt, 1.8);
        }

        // Rover backs out of East Branch to Main Drift, then navigates to North Terminus
<<<<<<< HEAD
        if (this.roverPos.x > 0.5) {
          this.driveRoverTowards(0.0, 20.0, dt, 0.95);
=======
        if (this.roverPos.x > 1.2) {
          this.driveRoverTowards(0.5, 19.8, dt, 1.0);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        } else if (this.roverPos.z < 30.5) {
          this.driveRoverTowards(0.0, 31.5, dt, 1.2);
        } else {
          // Reached North Terminus! Dwell 2.0s to survey ventilation dampers
          this.roverSpeed = 0;
          this.roverSteer = 0;
          if (this.missionTimer > 2.0) {
<<<<<<< HEAD
            this.updateSectorSurvey('sec-north', true);
            this.missionStep = 10;
=======
            this.missionStep = 11;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            this.missionPhase = 'completed';
            this.missionTimer = 0;
            this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
          }
        }
      }
    }
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Periodic Real-Time AI Predictions & On-The-Spot Tactical Decisions (~4Hz)
    if (time - this.lastAiPredictionTime > 0.25) {
      this.lastAiPredictionTime = time;
      this.runRealTimeAiInference(time);
    }

    // Mission sequence state machine
    this.updateAutonomousMission(dt);
    this.updateCustomPatrol(dt);
    this.animateWaypointCursor(time);

<<<<<<< HEAD
    // Rover Post-Deploy Gas & Air Quality Sweep (when outside mission autonomous steps)
    if (this.roverPostDeployGasInspection && !this.isManualRoverOverride && this.missionPhase !== 'running') {
      this.updateRoverGasInspection(dt);
    }

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    // Rover Movement Kinematics
    if (Math.abs(this.roverSpeed) > 0.001) {
      this.roverYaw += this.roverSteer * dt * 1.4;
      const forward = new THREE.Vector3(Math.sin(this.roverYaw), 0, Math.cos(this.roverYaw));
      const nextPos = this.roverPos.clone().addScaledVector(forward, this.roverSpeed * dt);

      // Simple tunnel boundary collisions
      // Main Drift: x between -2.0 and 2.0 unless at branches
      let allowMove = true;
      if (nextPos.z < 0 || nextPos.z > 33) allowMove = false;
      // In main drift without branches
      if ((nextPos.z < 7.5 || (nextPos.z > 12.5 && nextPos.z < 17.5) || nextPos.z > 22.5)) {
        if (nextPos.x < -2.1 || nextPos.x > 2.1) allowMove = false;
      }
<<<<<<< HEAD
      // Collapsed rubble collision in East Branch (x > 6.8 around z=20)
      if (nextPos.x > 6.8 && nextPos.z > 18.0 && nextPos.z < 22.0) {
        allowMove = false;
        // User directive: "drone need to lauch it by themself where rover cant go throught it"
        if (this.droneState === 'docked') {
          this.launchDrone(true);
          this.callbacks.onAiActionExecuted?.(
            'AUTONOMOUS_OBSTACLE_SELF_LAUNCH',
            'Obstacle impassable: Rover cannot traverse collapsed rubble barrier. Scout drone automatically launched itself to fly over blockage!'
          );
        }
=======
      // Collapsed rubble collision in East Branch (x > 7.5 around z=20)
      if (nextPos.x > 7.2 && nextPos.z > 18.0 && nextPos.z < 22.0) {
        allowMove = false;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      }

      if (allowMove) {
        this.roverPos.copy(nextPos);
      }

      // Rotate wheels
      this.roverWheels.forEach((w) => {
        w.rotation.x += this.roverSpeed * dt * 4.0;
      });
    }

    this.roverGroup.position.copy(this.roverPos);
    this.roverGroup.rotation.y = this.roverYaw;

<<<<<<< HEAD
    // Spin 3D LiDAR puck and compute real-time rangefinder measurements
    if (this.roverLidarActive) {
      this.lidarMesh.rotation.y += dt * 15.0;
      this.updateLidarRangers();
    }

    // Animate gas sniffer LED and atmospheric sampling cone pulse
    if (this.gasSnifferLedMesh && this.gasSnifferConeMesh) {
      if (this.roverPostDeployGasInspection && this.roverGasInspectionPhase !== 'idle') {
        this.gasSnifferConeMesh.visible = true;
        const pulse = 0.5 + 0.5 * Math.sin(time * 6.0);
        (this.gasSnifferConeMesh.material as THREE.MeshBasicMaterial).opacity = 0.18 + 0.25 * pulse;
        this.gasSnifferConeMesh.scale.set(1 + 0.12 * pulse, 1 + 0.12 * pulse, 1 + 0.12 * pulse);

        const ch4 = this.getRoverTelemetry().ch4Ppm;
        if (ch4 > 10000) {
          (this.gasSnifferLedMesh.material as THREE.MeshBasicMaterial).color.setHex(0xef4444);
        } else if (ch4 > 1000) {
          (this.gasSnifferLedMesh.material as THREE.MeshBasicMaterial).color.setHex(0xf59e0b);
        } else {
          (this.gasSnifferLedMesh.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
        }
      } else {
        this.gasSnifferConeMesh.visible = false;
        (this.gasSnifferLedMesh.material as THREE.MeshBasicMaterial).color.setHex(0x0284c7);
      }
=======
    // Spin 3D LiDAR puck
    if (this.roverLidarActive) {
      this.lidarMesh.rotation.y += dt * 15.0;
      this.lidarRaysGroup.rotation.y += dt * 15.0;
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    }

    // Drone Kinematics
    if (this.droneState === 'docked') {
      // Locked onto rover deck
      const offset = new THREE.Vector3(0, 0.44, -0.22);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.roverYaw);
      this.dronePos.copy(this.roverPos).add(offset);
      this.droneYaw = this.roverYaw;
      this.droneTiltPitch = 0;
      this.droneTiltRoll = 0;
      this.droneGroup.position.copy(this.dronePos);
      this.droneGroup.rotation.set(0, this.droneYaw, 0);

      // Recharging on rover docking pad
      if (this.droneBatteryPct < 100) {
        this.droneBatteryPct = Math.min(100, this.droneBatteryPct + dt * 0.45);
      }
    } else {
      // Drone in flight: accumulate flight time and drain battery
      this.droneFlightTimeSeconds += dt;
      let drainRate = 0.082; // Base hovering discharge (%/s)
      if (this.droneSpotlightOn) drainRate += 0.035; // Spotlight LED power draw
      if (this.droneState === 'scouting' || Math.abs(this.dronePitchVel) > 0.1 || Math.abs(this.droneRollVel) > 0.1) {
        drainRate += 0.038; // Active translation thrust
      }
      this.droneBatteryPct = Math.max(4.0, this.droneBatteryPct - drainRate * dt);

      // Rotors spinning rapidly
      this.droneRotors.forEach((r) => {
        r.rotation.y += dt * 60.0;
      });

      const hasManualInput = 
        Math.abs(this.dronePitchVel) > 0.01 || 
        Math.abs(this.droneRollVel) > 0.01 || 
        Math.abs(this.droneVerticalVel) > 0.01 || 
        Math.abs(this.droneYawRate) > 0.01;

      if (hasManualInput) {
        // Manual flight teleoperation
        this.droneYaw += this.droneYawRate * dt * 1.6;

        // Forward and right horizontal flight directions
        const forward = new THREE.Vector3(Math.sin(this.droneYaw), 0, Math.cos(this.droneYaw));
        const right = new THREE.Vector3(Math.cos(this.droneYaw), 0, -Math.sin(this.droneYaw));

        const move = new THREE.Vector3();
        move.addScaledVector(forward, this.dronePitchVel * dt * 2.8);
        move.addScaledVector(right, this.droneRollVel * dt * 2.2);

        const nextPos = this.dronePos.clone().add(move);
        nextPos.y = THREE.MathUtils.clamp(nextPos.y + this.droneVerticalVel * dt * 1.6, 0.32, 2.95);

        // Mine boundary check
        let allowMove = true;
        if (nextPos.z < -1.5 || nextPos.z > 34.0) allowMove = false;

        const inMainDrift = nextPos.x >= -2.4 && nextPos.x <= 2.4;
        const inWestBranch = nextPos.x < -2.0 && nextPos.x > -14.5 && nextPos.z >= 7.2 && nextPos.z <= 12.8;
        const inEastBranch = nextPos.x > 2.0 && nextPos.x < 18.5 && nextPos.z >= 17.2 && nextPos.z <= 22.8;

        if (!inMainDrift && !inWestBranch && !inEastBranch) {
          allowMove = false;
        }

        // Clearance over rock collapse at East branch (x between 6.5 and 10.5):
        if (nextPos.x > 6.5 && nextPos.x < 10.5 && nextPos.z > 17.5 && nextPos.z < 22.5) {
          if (nextPos.y < 1.15) {
            nextPos.y = 1.15; // Drone hovers over rocks
          }
        }

        if (allowMove) {
          this.dronePos.x = nextPos.x;
          this.dronePos.z = nextPos.z;
        }
        this.dronePos.y = nextPos.y;

        // Realistic aerodynamic tilt
        this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, -this.dronePitchVel * 0.15, 0.12);
        this.droneTiltRoll = THREE.MathUtils.lerp(this.droneTiltRoll, -this.droneRollVel * 0.15, 0.12);

      } else if (this.droneState === 'hovering') {
        // Subtle autonomous atmospheric hover bobbing
        const hoverY = this.droneTargetPos.y || this.dronePos.y;
        this.dronePos.y = hoverY + Math.sin(time * 3.0) * 0.015;
        this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, 0, 0.1);
        this.droneTiltRoll = THREE.MathUtils.lerp(this.droneTiltRoll, 0, 0.1);

      } else if (this.droneWaypointsQueue.length > 0 && this.droneWpIndex < this.droneWaypointsQueue.length) {
        // Autonomous waypoint navigation along the AI Pather Safe Corridor
        const targetWp = this.droneWaypointsQueue[this.droneWpIndex];
        const dir = targetWp.clone().sub(this.dronePos);
        const dist = dir.length();

        if (dist < 0.35) {
          // Reached intermediate waypoint along mine corridor
          this.droneWpIndex++;
          if (this.droneWpIndex >= this.droneWaypointsQueue.length) {
            // Reached destination
            if (this.droneState === 'scouting') {
              this.droneState = 'hovering';
              this.droneTargetPos.copy(this.dronePos);
            } else if (this.droneState === 'returning') {
              const distToRover = this.dronePos.distanceTo(this.roverPos);
              if (distToRover < 0.8) {
                this.droneState = 'docked';
              } else {
                this.droneState = 'hovering';
              }
            }
          }
        } else {
          dir.normalize();
          const speed = (this.droneState === 'launching' || targetWp.y > 2.0) ? 1.8 : 2.2;
          this.dronePos.addScaledVector(dir, Math.min(dist, speed * dt));

          // Smooth yaw alignment towards waypoint flight vector
          const targetYaw = Math.atan2(dir.x, dir.z);
          this.droneYaw = THREE.MathUtils.lerp(this.droneYaw, targetYaw, dt * 5.0);

          // Aerodynamic forward pitch and lateral roll banking
          this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, -0.14, dt * 4.0);
          const bankRoll = THREE.MathUtils.clamp(-dir.x * 0.12, -0.16, 0.16);
          this.droneTiltRoll = THREE.MathUtils.lerp(this.droneTiltRoll, bankRoll, dt * 4.0);
        }
      } else {
        // Fly towards droneTargetPos (autonomous mission or waypoint)
        const dir = this.droneTargetPos.clone().sub(this.dronePos);
        const dist = dir.length();
        if (dist > 0.08) {
          dir.normalize();
          const speed = this.droneState === 'launching' ? 1.8 : 2.4;
          this.dronePos.addScaledVector(dir, Math.min(dist, speed * dt));
          this.droneYaw = THREE.MathUtils.lerp(this.droneYaw, Math.atan2(dir.x, dir.z), 0.1);
          this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, -0.12, 0.1);
        } else {
          this.droneTiltPitch = THREE.MathUtils.lerp(this.droneTiltPitch, 0, 0.1);
          this.droneTiltRoll = THREE.MathUtils.lerp(this.droneTiltRoll, 0, 0.1);
          if (this.droneState === 'launching') {
            this.droneState = 'hovering';
          } else if (this.droneState === 'returning') {
            const distToRover = this.dronePos.distanceTo(this.roverPos);
            if (distToRover < 0.6) {
              this.droneState = 'docked';
            } else {
              this.droneState = 'hovering';
            }
          }
        }
      }

      this.droneGroup.position.copy(this.dronePos);
      this.droneGroup.rotation.set(this.droneTiltPitch, this.droneYaw, this.droneTiltRoll, 'YXZ');
    }

    // Survivor chest respiration animation
    const chest = this.survivorGroup.getObjectByName('torso');
    if (chest) {
      const breathScale = 1.0 + Math.sin(time * 1.8) * 0.05; // ~14 breaths per minute
      chest.scale.set(1.0, 1.0, breathScale);
    }

    // Methane gas cloud swirling
    if (this.methaneParticles) {
      this.methaneParticles.rotation.y += dt * 0.12;
    }

    // Floating mine dust
    if (this.dustParticles) {
      const positions = this.dustParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= dt * 0.05;
        if (positions[i] < 0) positions[i] = 3.2;
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Evaluate Proximity & Sensor Readings throttled to 20Hz (every 50ms) to ensure 60fps 3D rendering and smooth UI
    const now = performance.now();
    if (now - this.lastTelemetryTime >= 50) {
      this.lastTelemetryTime = now;
      this.evaluateTelemetryAndSensors();
    }

    // Update Camera View
    this.updateCamera();

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  private evaluateTelemetryAndSensors() {
    // Distance to Methane source in Branch 1 (-8, 10)
    const dMethane = Math.hypot(this.roverPos.x - (-8.0), this.roverPos.z - 10.0);
    let ch4Ppm = 20.0; // Ambient normal
    if (dMethane < 7.0) {
      ch4Ppm = Math.round(44000.0 * Math.exp(-0.5 * Math.pow(dMethane / 2.2, 2)));
    }

    // Distance of Rover or Drone to Survivor (13.5, 20.0)
    const dDroneToSurvivor = Math.hypot(this.dronePos.x - 13.5, this.dronePos.z - 20.0);
    const dRoverToSurvivor = Math.hypot(this.roverPos.x - 13.5, this.roverPos.z - 20.0);
    const closestDist = Math.min(dDroneToSurvivor, dRoverToSurvivor);

    let co2Ppm = 420;
    if (closestDist < 6.0) {
      co2Ppm = Math.round(420 + 1150 * Math.exp(-0.5 * Math.pow(closestDist / 2.0, 2)));
    }

    // Multi-modal life sign detection calculations
    if (closestDist < 7.5) {
      this.survivorData.detected = true;
      // Visual: drone has direct line-of-sight when past rock collapse (x > 9.5)
      this.survivorData.visualConfidence = this.dronePos.x > 9.5 ? 0.82 : 0.15;
      // Thermal: drone or rover infrared camera heat contrast
      this.survivorData.thermalConfidence = closestDist < 5.0 ? 0.89 : 0.65;
      // Acoustic: CNN mic picks up tapping
      this.survivorData.acousticConfidence = 0.85;
      // CO2 plume confidence
      this.survivorData.co2Confidence = co2Ppm > 700 ? Math.min(0.92, (co2Ppm - 600) / 800) : 0.2;
      // UWB radar: penetrates rock wall with high confidence
      this.survivorData.uwbConfidence = 0.94;

      // AI Fusion Formula
      this.survivorData.fusedProbability = Number((
        0.15 * this.survivorData.visualConfidence +
        0.25 * this.survivorData.thermalConfidence +
        0.15 * this.survivorData.acousticConfidence +
        0.15 * this.survivorData.co2Confidence +
        0.30 * this.survivorData.uwbConfidence
      ).toFixed(2));
    }

    // Emit Telemetry
<<<<<<< HEAD
    const roverTel = this.getRoverTelemetry();
    this.callbacks.onRoverTelemetry(roverTel);

    const droneTel = this.getDroneTelemetry();
    this.callbacks.onDroneTelemetry(droneTel);
    this.callbacks.onSurvivorUpdate({ ...this.survivorData });
    this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
    this.callbacks.onEnvironmentalReconUpdate?.([...this.environmentalSectors]);
=======
    const roverTel: RoverTelemetry = {
      position: { x: Number(this.roverPos.x.toFixed(2)), y: Number(this.roverPos.y.toFixed(2)), z: Number(this.roverPos.z.toFixed(2)) },
      yaw: Number(this.roverYaw.toFixed(2)),
      speed: Number(this.roverSpeed.toFixed(2)),
      steering: Number(this.roverSteer.toFixed(2)),
      batteryPct: Math.max(15, 96 - Math.round(this.roverPos.z * 0.8)),
      ch4Ppm,
      coPpm: 12 + Math.round(ch4Ppm * 0.002),
      co2Ppm,
      temperatureC: 16.4 + (this.roverPos.z > 28 ? 18.0 : 0.0),
      headlights: this.roverHeadlightsOn,
      lidarActive: this.roverLidarActive,
      commsRssi: -42 - Math.round(this.roverPos.z * 1.2),
      mode: ch4Ppm > 10000 ? 'retreat' : (this.missionPhase === 'running' && !this.isManualRoverOverride) ? 'auto_mapping' : 'manual',
    };
    this.callbacks.onRoverTelemetry(roverTel);

    // Calculate realistic remaining flight endurance based on standard 4S LiPo pack (~18.5 min total at 100%)
    const estSecondsRemaining = Math.max(0, Math.round((this.droneBatteryPct / 100) * 1110));
    const drainPerMin = Number((this.droneSpotlightOn ? 7.0 : 4.9).toFixed(1));

    const droneTel: DroneTelemetry = {
      position: { x: Number(this.dronePos.x.toFixed(2)), y: Number(this.dronePos.y.toFixed(2)), z: Number(this.dronePos.z.toFixed(2)) },
      yaw: Number(this.droneYaw.toFixed(2)),
      altitude: Number((this.dronePos.y - this.roverPos.y).toFixed(2)),
      batteryPct: Number(this.droneBatteryPct.toFixed(1)),
      state: this.droneState,
      spotlight: this.droneSpotlightOn,
      thermalLocked: this.survivorData.detected,
      relDistanceToRover: Number(this.dronePos.distanceTo(this.roverPos).toFixed(2)),
      flightSpeed: Number(Math.hypot(this.dronePitchVel, this.droneRollVel).toFixed(2)),
      verticalSpeed: Number(this.droneVerticalVel.toFixed(2)),
      estimatedFlightSecondsRemaining: estSecondsRemaining,
      batteryDischargeRate: drainPerMin,
      flightDurationSeconds: Math.round(this.droneFlightTimeSeconds),
    };
    this.callbacks.onDroneTelemetry(droneTel);
    this.callbacks.onSurvivorUpdate({ ...this.survivorData });
    this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

    // Generate SLAM Scan Points
    if (this.roverLidarActive) {
      const scanPts: { x: number; y: number }[] = [];
      for (let i = 0; i < 36; i++) {
        const angle = this.roverYaw + (i / 36) * Math.PI * 2;
        // Approximate distance to walls in this corridor
        let dist = 2.2;
        if (this.roverPos.z > 8 && this.roverPos.z < 12 && (angle < -1.0 || angle > 2.5)) {
          dist = 9.0; // Branch 1 opening
        }
        if (this.roverPos.z > 18 && this.roverPos.z < 22 && Math.cos(angle) > 0.5) {
          dist = 8.0; // Branch 2 opening
        }
        scanPts.push({
          x: this.roverPos.x + Math.sin(angle) * dist,
          y: this.roverPos.z + Math.cos(angle) * dist
        });
      }
      this.callbacks.onScanData(scanPts, { x: this.roverPos.x, y: this.roverPos.z, yaw: this.roverYaw });
    }
  }

  private updateCamera() {
    switch (this.viewMode) {
      case 'orbit': {
        // Orbit around dynamic target
        const t = this.orbitControls.target;
        // Keep target somewhat tracking rover smoothly
        t.x = THREE.MathUtils.lerp(t.x, this.roverPos.x, 0.05);
        t.z = THREE.MathUtils.lerp(t.z, this.roverPos.z, 0.05);

        const r = this.orbitControls.distance;
        const phi = this.orbitControls.phi;
        const theta = this.orbitControls.theta;

        this.camera.position.set(
          t.x + r * Math.sin(phi) * Math.sin(theta),
          t.y + r * Math.cos(phi),
          t.z + r * Math.sin(phi) * Math.cos(theta)
        );
        this.camera.lookAt(t);
        break;
      }
      case 'rover_chase': {
        // Third-person chase behind rover
        const behind = new THREE.Vector3(-Math.sin(this.roverYaw) * 3.5, 1.8, -Math.cos(this.roverYaw) * 3.5);
        this.camera.position.copy(this.roverPos).add(behind);
        this.camera.lookAt(this.roverPos.x, this.roverPos.y + 0.6, this.roverPos.z + 3.0);
        break;
      }
      case 'rover_fpv': {
        // Cockpit / front sensor mast FPV
        this.camera.position.set(this.roverPos.x, this.roverPos.y + 0.46, this.roverPos.z);
        const fwd = new THREE.Vector3(Math.sin(this.roverYaw), -0.05, Math.cos(this.roverYaw));
        this.camera.lookAt(this.camera.position.clone().add(fwd));
        break;
      }
      case 'drone_chase': {
        // Third person chase behind drone
        const behind = new THREE.Vector3(-Math.sin(this.droneYaw) * 1.6, 0.8, -Math.cos(this.droneYaw) * 1.6);
        this.camera.position.copy(this.dronePos).add(behind);
        this.camera.lookAt(this.dronePos.x, this.dronePos.y, this.dronePos.z + 1.5);
        break;
      }
      case 'drone_fpv':
      case 'thermal_ir': {
        // Looking forward/downward from drone gimbal
        this.camera.position.copy(this.dronePos);
        const target = this.dronePos.clone().add(new THREE.Vector3(Math.sin(this.droneYaw) * 2.0, -0.6, Math.cos(this.droneYaw) * 2.0));
        this.camera.lookAt(target);
        break;
      }
      case 'slam_topdown': {
        // Orthographic-like top-down map view
        this.camera.position.set(0, 28, 17);
        this.camera.lookAt(0, 0, 17);
        break;
      }
<<<<<<< HEAD
      case 'lidar_ranger': {
        // High-angle tactical view overlooking the rover's LiDAR range rings & dynamic ranger beams
        const distBehind = 3.6;
        const camHeight = 4.8;
        this.camera.position.set(
          this.roverPos.x - Math.sin(this.roverYaw) * distBehind,
          this.roverPos.y + camHeight,
          this.roverPos.z - Math.cos(this.roverYaw) * distBehind
        );
        this.camera.lookAt(
          this.roverPos.x + Math.sin(this.roverYaw) * 1.6,
          this.roverPos.y + 0.25,
          this.roverPos.z + Math.cos(this.roverYaw) * 1.6
        );
        break;
      }
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    }
  }

  // ============================================================================
  // Interactive Keyboard-Controlled Mission Planning & Route Visualization
  // ============================================================================

  private setupWaypointCursor() {
    this.waypointCursorGroup.visible = false;

    // Inner Targeting Reticle Ring
    const innerGeo = new THREE.TorusGeometry(0.35, 0.025, 8, 32);
    const innerMat = new THREE.MeshBasicMaterial({ 
      color: 0xf59e0b, 
      transparent: true, 
      opacity: 0.9 
    });
    this.waypointCursorRing = new THREE.Mesh(innerGeo, innerMat);
    this.waypointCursorRing.rotation.x = Math.PI / 2;
    this.waypointCursorGroup.add(this.waypointCursorRing);

    // Outer Pulsing Reticle Ring
    const outerGeo = new THREE.TorusGeometry(0.55, 0.015, 8, 32);
    const outerMat = new THREE.MeshBasicMaterial({ 
      color: 0xfbbf24, 
      transparent: true, 
      opacity: 0.65 
    });
    this.waypointCursorOuterRing = new THREE.Mesh(outerGeo, outerMat);
    this.waypointCursorOuterRing.rotation.x = Math.PI / 2;
    this.waypointCursorGroup.add(this.waypointCursorOuterRing);

    // Center Crosshair Dot
    const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    this.waypointCursorGroup.add(dotMesh);

    // Vertical Altitude Drop Stalk (used for drone 3D aerial altitude targeting)
    const stalkGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1.8, 0)
    ]);
    const stalkMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.1,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.8
    });
    this.waypointCursorStalk = new THREE.Line(stalkGeo, stalkMat);
    this.waypointCursorStalk.computeLineDistances();
    this.waypointCursorGroup.add(this.waypointCursorStalk);
  }

  private animateWaypointCursor(time: number) {
    if (!this.waypointCursorGroup.visible) return;
    if (this.waypointCursorOuterRing) {
      this.waypointCursorOuterRing.rotation.z = time * 1.5;
      const pulse = 1.0 + Math.sin(time * 6.0) * 0.08;
      this.waypointCursorOuterRing.scale.set(pulse, pulse, pulse);
    }
  }

  private createWaypointSpriteLabel(text: string, bgColor: string, textColor: string = '#ffffff'): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      // Draw rounded rectangle
      ctx.roundRect(8, 8, 112, 48, 12);
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 64, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.7, 0.35, 1.0);
    return sprite;
  }

  /**
   * Rebuilds 3D visual geometry for user-planned patrol routes in the viewport.
   */
  public setUserPlannedRoutes(
    roverWps: MissionPatrolWaypoint[],
    droneWps: MissionPatrolWaypoint[],
    activeVehicle: 'rover' | 'drone' = 'rover'
  ) {
    // 1. Clear previous Rover 3D path objects
    while (this.userRoverPathGroup.children.length > 0) {
      const obj = this.userRoverPathGroup.children[0] as any;
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
        else obj.material.dispose();
      }
      this.userRoverPathGroup.remove(obj);
    }

    // 2. Clear previous Drone 3D path objects
    while (this.userDronePathGroup.children.length > 0) {
      const obj = this.userDronePathGroup.children[0] as any;
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
        else obj.material.dispose();
      }
      this.userDronePathGroup.remove(obj);
    }

    // --------------------------------------------------------------------------
    // Build Rover Ground Patrol 3D Route
    // --------------------------------------------------------------------------
    if (roverWps.length >= 2) {
      const curvePoints = roverWps.map((w) => new THREE.Vector3(w.position.x, 0.08, w.position.z));
      const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.15);
      const tubeGeo = new THREE.TubeGeometry(pathCurve, Math.max(24, roverWps.length * 16), 0.035, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xb45309,
        emissiveIntensity: 0.85,
        roughness: 0.3,
        metalness: 0.2
      });
      const pathTube = new THREE.Mesh(tubeGeo, tubeMat);
      this.userRoverPathGroup.add(pathTube);
    }

    roverWps.forEach((wp, idx) => {
      // Ground Disc Beacon
      const discGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 24);
      const discMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.set(wp.position.x, 0.03, wp.position.z);
      this.userRoverPathGroup.add(disc);

      // Outer Pulse Ring
      const ringGeo = new THREE.TorusGeometry(0.36, 0.018, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.75 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(wp.position.x, 0.04, wp.position.z);
      ring.rotation.x = Math.PI / 2;
      this.userRoverPathGroup.add(ring);

      // Vertical Light Column
      const colGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 12);
      const colMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(wp.position.x, 0.42, wp.position.z);
      this.userRoverPathGroup.add(col);

      // Waypoint Badge Sprite
      const sprite = this.createWaypointSpriteLabel(`R${idx + 1}`, '#b45309');
      sprite.position.set(wp.position.x, 0.95, wp.position.z);
      this.userRoverPathGroup.add(sprite);

      // Direction Arrow Cone pointing toward next waypoint
      if (idx < roverWps.length - 1) {
        const next = roverWps[idx + 1];
        const dir = new THREE.Vector3(next.position.x - wp.position.x, 0, next.position.z - wp.position.z).normalize();
        const arrowGeo = new THREE.ConeGeometry(0.08, 0.2, 12);
        const arrowMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
        const arrow = new THREE.Mesh(arrowGeo, arrowMat);
        arrow.position.set(wp.position.x + dir.x * 0.4, 0.08, wp.position.z + dir.z * 0.4);
        arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        this.userRoverPathGroup.add(arrow);
      }
    });

    // --------------------------------------------------------------------------
    // Build Aerial Scout Drone 3D Route
    // --------------------------------------------------------------------------
    if (droneWps.length >= 2) {
      const curvePoints = droneWps.map((w) => new THREE.Vector3(w.position.x, w.position.y, w.position.z));
      const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.15);
      const tubeGeo = new THREE.TubeGeometry(pathCurve, Math.max(24, droneWps.length * 16), 0.035, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85
      });
      const pathTube = new THREE.Mesh(tubeGeo, tubeMat);
      this.userDronePathGroup.add(pathTube);
    }

    droneWps.forEach((wp, idx) => {
      // Aerial Ring Gate at waypoint altitude
      const ringGeo = new THREE.TorusGeometry(0.26, 0.022, 8, 24);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(wp.position.x, wp.position.y, wp.position.z);
      ring.rotation.x = Math.PI / 2;
      this.userDronePathGroup.add(ring);

      // Ground Shadow Footprint Disc
      const shadowGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.015, 20);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.5 });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.set(wp.position.x, 0.02, wp.position.z);
      this.userDronePathGroup.add(shadow);

      // Vertical Stalk connecting aerial ring to ground shadow
      const stalkGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(wp.position.x, 0.03, wp.position.z),
        new THREE.Vector3(wp.position.x, wp.position.y, wp.position.z)
      ]);
      const stalkMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
      const stalk = new THREE.Line(stalkGeo, stalkMat);
      this.userDronePathGroup.add(stalk);

      // Drone Waypoint Badge Sprite
      const sprite = this.createWaypointSpriteLabel(`D${idx + 1}`, '#0369a1');
      sprite.position.set(wp.position.x, wp.position.y + 0.38, wp.position.z);
      this.userDronePathGroup.add(sprite);

      // Direction Arrow toward next aerial waypoint
      if (idx < droneWps.length - 1) {
        const next = droneWps[idx + 1];
        const dir = new THREE.Vector3(
          next.position.x - wp.position.x,
          next.position.y - wp.position.y,
          next.position.z - wp.position.z
        ).normalize();
        const arrowGeo = new THREE.ConeGeometry(0.08, 0.22, 12);
        const arrowMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
        const arrow = new THREE.Mesh(arrowGeo, arrowMat);
        arrow.position.set(
          wp.position.x + dir.x * 0.4,
          wp.position.y + dir.y * 0.4,
          wp.position.z + dir.z * 0.4
        );
        arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        this.userDronePathGroup.add(arrow);
      }
    });
  }

  /**
   * Repositions the 3D interactive waypoint cursor reticle.
   */
  public setWaypointCursor(pos: Vector3D, vehicle: 'rover' | 'drone', visible: boolean) {
    this.waypointCursorGroup.visible = visible;
    this.waypointCursorVehicle = vehicle;
    if (!visible) return;

    if (vehicle === 'drone') {
      this.waypointCursorGroup.position.set(pos.x, pos.y, pos.z);
      if (this.waypointCursorRing) {
        (this.waypointCursorRing.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8);
      }
      if (this.waypointCursorOuterRing) {
        (this.waypointCursorOuterRing.material as THREE.MeshBasicMaterial).color.setHex(0x0284c7);
      }
      if (this.waypointCursorStalk) {
        this.waypointCursorStalk.visible = true;
        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -pos.y, 0)];
        this.waypointCursorStalk.geometry.setFromPoints(pts);
        this.waypointCursorStalk.computeLineDistances();
      }
    } else {
      this.waypointCursorGroup.position.set(pos.x, 0.05, pos.z);
      if (this.waypointCursorRing) {
        (this.waypointCursorRing.material as THREE.MeshBasicMaterial).color.setHex(0xf59e0b);
      }
      if (this.waypointCursorOuterRing) {
        (this.waypointCursorOuterRing.material as THREE.MeshBasicMaterial).color.setHex(0xfbbf24);
      }
      if (this.waypointCursorStalk) {
        this.waypointCursorStalk.visible = false;
      }
    }
  }

  /**
   * Starts autonomous execution of the custom user-planned patrol route.
   */
  public startCustomPatrol(
    roverWps: MissionPatrolWaypoint[],
    droneWps: MissionPatrolWaypoint[],
    loop: boolean = false
  ) {
    this.customPatrolRoverWps = roverWps;
    this.customPatrolDroneWps = droneWps;
    this.customPatrolRoverIndex = 0;
    this.customPatrolDroneIndex = 0;
    this.customPatrolLoop = loop;
    this.customPatrolRoverDwellTimer = 0;
    this.customPatrolDroneDwellTimer = 0;
    this.isCustomPatrolActive = true;
    this.isManualRoverOverride = false;
    this.missionPhase = 'running';

    if (droneWps.length > 0 && this.droneState === 'docked') {
      this.launchDrone();
    }
  }

  public stopCustomPatrol() {
    this.isCustomPatrolActive = false;
    this.roverSpeed = 0;
    this.roverSteer = 0;
    if (this.droneState === 'scouting') {
      this.droneState = 'hovering';
      this.dronePitchVel = 0;
      this.droneRollVel = 0;
      this.droneVerticalVel = 0;
      this.droneYawRate = 0;
    }
  }

  /**
   * Custom patrol waypoint follower loop.
   */
  private updateCustomPatrol(dt: number) {
    if (!this.isCustomPatrolActive || this.missionPhase !== 'running' || this.isManualRoverOverride) return;

    // 1. Rover Waypoint Navigation
    if (this.customPatrolRoverWps.length > 0 && this.customPatrolRoverIndex < this.customPatrolRoverWps.length) {
      const targetWp = this.customPatrolRoverWps[this.customPatrolRoverIndex];
      const arrived = this.driveRoverTowards(
        targetWp.position.x,
        targetWp.position.z,
        dt,
        targetWp.speedMs ?? 1.1,
        0.45
      );

      if (arrived) {
        const requiredDwell = targetWp.dwellTimeSeconds ?? 1.5;
        if (this.customPatrolRoverDwellTimer < requiredDwell) {
          this.customPatrolRoverDwellTimer += dt;
          this.roverSpeed = 0;
          this.roverSteer = 0;
        } else {
          this.customPatrolRoverDwellTimer = 0;
          this.customPatrolRoverIndex++;
          if (this.customPatrolRoverIndex >= this.customPatrolRoverWps.length) {
            if (this.customPatrolLoop) {
              this.customPatrolRoverIndex = 0;
            } else {
              this.roverSpeed = 0;
              this.roverSteer = 0;
            }
          }
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      }
    }

    // 2. Aerial Scout Drone Waypoint Navigation
    if (this.customPatrolDroneWps.length > 0 && this.customPatrolDroneIndex < this.customPatrolDroneWps.length) {
      if (this.droneState === 'docked') {
        this.launchDrone();
      }

      const targetWp = this.customPatrolDroneWps[this.customPatrolDroneIndex];
      const arrived = this.flyDroneTowards(
        targetWp.position.x,
        targetWp.position.y,
        targetWp.position.z,
        dt,
        targetWp.speedMs ?? 1.6,
        0.4
      );

      if (arrived) {
        const requiredDwell = targetWp.dwellTimeSeconds ?? 2.0;
        if (this.customPatrolDroneDwellTimer < requiredDwell) {
          this.customPatrolDroneDwellTimer += dt;
          this.droneState = 'hovering';
          this.dronePitchVel = 0;
          this.droneRollVel = 0;
          this.droneVerticalVel = 0;
          this.droneYawRate = 0;
        } else {
          this.customPatrolDroneDwellTimer = 0;
          this.customPatrolDroneIndex++;
          if (this.customPatrolDroneIndex >= this.customPatrolDroneWps.length) {
            if (this.customPatrolLoop) {
              this.customPatrolDroneIndex = 0;
            } else {
              this.droneState = 'hovering';
              this.dronePitchVel = 0;
              this.droneRollVel = 0;
              this.droneVerticalVel = 0;
              this.droneYawRate = 0;
            }
          }
          this.callbacks.onPatrolStatus?.(this.getPatrolStatus());
        }
      }
    }
  }

  public getRoverPosition(): Vector3D {
    return { x: this.roverPos.x, y: this.roverPos.y, z: this.roverPos.z };
  }

  public getDronePosition(): Vector3D {
    return { x: this.dronePos.x, y: this.dronePos.y, z: this.dronePos.z };
  }

  public getPatrolStatus(): PatrolExecutionStatus {
    if (this.isCustomPatrolActive) {
      const roverTotal = this.customPatrolRoverWps.length;
      const droneTotal = this.customPatrolDroneWps.length;
      const totalSteps = Math.max(roverTotal, droneTotal, 1);
      const currentStep = Math.max(this.customPatrolRoverIndex, this.customPatrolDroneIndex) + 1;
      const progressPct = Math.round((currentStep / totalSteps) * 100);

      return {
        mode: 'custom_patrol',
        phase: this.missionPhase,
        step: Math.min(currentStep, totalSteps),
        totalSteps,
        stepName: `Waypoint Patrol: R${this.customPatrolRoverIndex + 1}/${roverTotal} | D${this.customPatrolDroneIndex + 1}/${droneTotal}`,
        stepDescription: `Executing user-defined patrol route. Loop mode: ${this.customPatrolLoop ? 'ON' : 'OFF'}`,
        roverWpIndex: this.customPatrolRoverIndex,
        roverWpTotal: roverTotal,
        droneWpIndex: this.customPatrolDroneIndex,
        droneWpTotal: droneTotal,
        isLoop: this.customPatrolLoop,
        progressPct: Math.min(100, progressPct),
      };
    }

    if (this.missionMode === 'full_patrol') {
      const stepInfo: Record<number, { name: string; desc: string }> = {
<<<<<<< HEAD
        0: { name: 'Standby at Portal', desc: 'Ready for full autonomous multi-tunnel patrol & 3D environmental mapping' },
        1: { name: 'Sector 1: South Portal & Ingress Drift', desc: 'Advancing down main drift, scanning rail bed & recording baseline air data' },
        2: { name: 'Sector 2: West Drift Hazard Standoff', desc: 'Approaching West drift mouth; sniffing lethal 42,500 ppm CH4 plume' },
        3: { name: 'Sector 2: West Methane Evasion Flank', desc: 'Executing safe deflection eastward around explosive methane cloud' },
        4: { name: 'Sector 3: 90° Turn Centerline Alignment', desc: 'Advancing to central crosscut junction apex at (x: 0.0, z: 20.0)' },
        5: { name: 'Sector 3: 90.0° Sharp Right Turn', desc: 'Executing perfect 90° sharp in-place pivot turn from North into East Crosscut' },
        6: { name: 'Sector 5: East Rubble Standoff (Impassable)', desc: 'Advancing down East Drift to 18.4 m³ rock collapse standoff (x=6.8m)' },
        7: { name: 'Sector 5: Drone Autonomous Launch & Rover Gas Sweep', desc: 'Drone launched to overfly rubble; ground rover autonomously initiates Multi-Gas & Air Quality Inspection sweep' },
        8: { name: 'Sector 5: Aerial Rubble Traversal & Drift Air Quality Certification', desc: 'Quadcopter navigating 3D Nav2 ceiling corridor while rover samples rubble atmosphere and crosscut ventilation' },
        9: { name: 'Sector 6: Survivor Randy Biometric Lock', desc: '5-modality biometric sensor fusion confirming miner Randy alive in East Cavern; rescue corridor certified safe' },
        10: { name: 'Sector 4: North Vent Drift Reconnaissance & Completion', desc: 'Rover surveys northern ventilation drift; all sectors mapped & verified' },
      };

      const info = stepInfo[this.missionStep] || { name: 'Full Patrol Active', desc: 'Executing autonomous patrol' };
      const progressPct = this.missionStep === 0 ? 0 : Math.round((this.missionStep / 10) * 100);
=======
        0: { name: 'Standby at Portal', desc: 'Ready for full autonomous multi-tunnel patrol' },
        1: { name: 'Sector A: Portal Ingress Survey', desc: 'Advancing down main drift, scanning rail bed & timber supports' },
        2: { name: 'Sector B: West Drift Gas Sniffing', desc: 'Approaching Branch 1 mouth; analyzing lethal methane pocket' },
        3: { name: 'Sector B: Methane Plume Evasion', desc: 'Executing safe deflection eastward around >42,000 ppm gas plume' },
        4: { name: 'Sector C: East Junction Alignment', desc: 'Entering central crosscut intersection at chainage 19.8m' },
        5: { name: 'Sector E: East Drift Rubble Standoff', desc: 'Navigating collapsed drift corridor towards 18.4 m³ rock barrier' },
        6: { name: 'Sector E: 3D LiDAR Profiling', desc: 'Volumetric laser scanning measuring rock collapse volume & void clearance' },
        7: { name: 'Sector E: Scout Drone Deployment', desc: 'Rover deck helipad release; aerial drone climbing to 2.1m AGL' },
        8: { name: 'Sector E: Aerial Flight Over Rubble', desc: 'Quadcopter navigating 3D Nav2 ceiling corridor over rock collapse' },
        9: { name: 'Sector F: Survivor Life-Sign Lock', desc: '5-modality biometric sensor fusion confirming miner Randy alive' },
        10: { name: 'Sector D: North Vent Drift Recon', desc: 'Rover exploring northern ventilation drift up to 31.5m terminus' },
        11: { name: 'Mine Patrol Completed', desc: 'All 9 mine sectors mapped; victim verified; safe evacuation route ready' },
      };

      const info = stepInfo[this.missionStep] || { name: 'Full Patrol Active', desc: 'Executing autonomous patrol' };
      const progressPct = this.missionStep === 0 ? 0 : Math.round((this.missionStep / 11) * 100);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

      return {
        mode: 'full_patrol',
        phase: this.missionPhase,
        step: this.missionStep,
<<<<<<< HEAD
        totalSteps: 10,
        stepName: info.name,
        stepDescription: info.desc,
        roverWpIndex: this.missionStep,
        roverWpTotal: 10,
        droneWpIndex: this.missionStep >= 7 ? this.missionStep - 6 : 0,
        droneWpTotal: 4,
=======
        totalSteps: 11,
        stepName: info.name,
        stepDescription: info.desc,
        roverWpIndex: this.missionStep,
        roverWpTotal: 11,
        droneWpIndex: this.missionStep >= 7 ? this.missionStep - 6 : 0,
        droneWpTotal: 5,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        isLoop: false,
        progressPct: Math.min(100, progressPct),
      };
    }

    if (this.missionMode === 'direct_rescue') {
      const stepInfo: Record<number, { name: string; desc: string }> = {
        0: { name: 'Standby at Portal', desc: 'Ready for rapid direct rescue mission' },
        1: { name: 'Rapid Main Drift Transit', desc: 'Advancing directly through main drift towards East Branch' },
<<<<<<< HEAD
        2: { name: 'Methane Hazard Evasion', desc: 'Deflecting safely around West Drift methane pocket to junction' },
        3: { name: '90.0° Sharp Right Turn', desc: 'Executing precision 90.0° sharp in-place pivot turn into East Branch' },
        4: { name: 'Impassable Rubble & Rover Gas Sweep Deployment', desc: 'Rover halted at rubble; drone launches over blockage while rover initiates Multi-Gas & Air Quality inspection' },
        5: { name: 'Aerial Rubble Traversal & Drift Airway Sweep', desc: 'Drone navigates rock collapse; ground rover verifies breathable oxygen and zero gas entrapment' },
=======
        2: { name: 'Methane Hazard Evasion', desc: 'Deflecting safely around West Drift methane pocket' },
        3: { name: 'East Drift Rubble Ingress', desc: 'Entering East Branch and stopping at rock collapse standoff' },
        4: { name: 'Deploy Scout Drone', desc: 'Launching scout drone over impassable rock barrier' },
        5: { name: 'Aerial Rubble Traversal', desc: 'Navigating ceiling corridor over 18.4 m³ rock collapse' },
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        6: { name: 'Survivor Biometric Lock', desc: 'Confirming survivor Randy alive via 5-modality life-sign fusion' },
        7: { name: 'Direct Rescue Route Ready', desc: 'Safe corridor verified for emergency medical extraction' },
      };

      const info = stepInfo[this.missionStep] || { name: 'Direct Rescue Active', desc: 'Executing direct rescue' };
      const progressPct = this.missionStep === 0 ? 0 : Math.round((this.missionStep / 7) * 100);

      return {
        mode: 'direct_rescue',
        phase: this.missionPhase,
        step: this.missionStep,
        totalSteps: 7,
        stepName: info.name,
        stepDescription: info.desc,
        roverWpIndex: this.missionStep,
        roverWpTotal: 7,
        droneWpIndex: this.missionStep >= 4 ? this.missionStep - 3 : 0,
        droneWpTotal: 4,
        isLoop: false,
        progressPct: Math.min(100, progressPct),
      };
    }

    return {
      mode: 'idle',
      phase: 'idle',
      step: 0,
      totalSteps: 11,
      stepName: 'Simulation Standby',
      stepDescription: 'Select Full Patrol, Direct Rescue, or draw custom patrol waypoints',
      roverWpIndex: 0,
      roverWpTotal: 0,
      droneWpIndex: 0,
      droneWpTotal: 0,
      isLoop: false,
      progressPct: 0,
    };
  }

  public getCustomPatrolStatus() {
    return {
      isActive: this.isCustomPatrolActive,
      roverIndex: this.customPatrolRoverIndex,
      roverTotal: this.customPatrolRoverWps.length,
      droneIndex: this.customPatrolDroneIndex,
      droneTotal: this.customPatrolDroneWps.length,
      isLoop: this.customPatrolLoop
    };
  }

  public dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Remove listeners
    this.container.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.container.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('resize', this.onWindowResize);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Traverse and dispose GPU geometries & materials
    this.scene.traverse((object: any) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat: any) => mat?.dispose?.());
        } else {
          object.material.dispose?.();
        }
      }
    });

    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
