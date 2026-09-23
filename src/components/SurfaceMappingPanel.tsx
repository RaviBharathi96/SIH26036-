import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RoverTelemetry, DroneTelemetry, SurvivorData, HazardZone, 
<<<<<<< HEAD
  SafePathWaypoint, TunnelSectorInfo, PatrolExecutionStatus,
  MineSectorSurveyData, HumanRescuerPathNode
} from '../types';
import { AI_NAV2_MINE_PATH, HUMAN_RESCUER_SAFE_ROUTE } from '../simulation/MineSimulation';
=======
  SafePathWaypoint, TunnelSectorInfo, PatrolExecutionStatus 
} from '../types';
import { AI_NAV2_MINE_PATH } from '../simulation/MineSimulation';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
import { 
  Compass, Eye, ShieldAlert, CheckCircle2, 
  AlertTriangle, Play, Pause, Square, RotateCcw, MapPin, 
  Radio, HardHat, FileText, ChevronRight, Download, Crosshair, 
<<<<<<< HEAD
  Sparkles, Layers, ShieldCheck, CornerUpRight, Activity,
  Thermometer, Wind, AlertOctagon, Flame, Box, UserCheck
=======
  Sparkles, Layers
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
} from 'lucide-react';

interface SurfaceMappingPanelProps {
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  survivorData: SurvivorData;
  hazardZones: HazardZone[];
  scanPoints: { x: number; y: number }[];
  patrolStatus?: PatrolExecutionStatus;
<<<<<<< HEAD
  environmentalSectors?: MineSectorSurveyData[];
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  onStartFullPatrol: () => void;
  onStartDirectRescue: () => void;
  onPausePatrol?: () => void;
  onResumePatrol?: () => void;
  onStopPatrol?: () => void;
  onResetSimulation: () => void;
  onOpenReport: () => void;
}

export const MINE_SAFE_WAYPOINTS: SafePathWaypoint[] = [
  {
    id: 'wp-0',
    step: 0,
    name: 'Portal Staging & Comms Mast',
    position: { x: 0.0, y: 1.8, z: 0.0 },
    clearanceWidthM: 4.4,
    methanePpm: 20,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
<<<<<<< HEAD
    instruction: 'Zero atmospheric hazard. Deploy LoRa high-gain mesh repeater at portal mouth. Level D standard PPE.',
=======
    instruction: 'Zero atmospheric hazard. Deploy LoRa high-gain mesh repeater at portal mouth.',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    vehicle: 'both',
  },
  {
    id: 'wp-1',
    step: 1,
    name: 'Main Ingress Drift North',
    position: { x: 0.0, y: 1.8, z: 7.0 },
    clearanceWidthM: 4.2,
    methanePpm: 180,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
<<<<<<< HEAD
    instruction: 'Standard railway tracks. Structural timber arches verified intact with 100% roof stability.',
=======
    instruction: 'Standard railway tracks. Structural timber arches verified intact.',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    vehicle: 'both',
  },
  {
    id: 'wp-2',
    step: 2,
    name: 'West Methane Hazard Standoff Flank',
    position: { x: 0.8, y: 1.85, z: 11.0 },
    clearanceWidthM: 3.1,
    methanePpm: 1250,
    groundTraversablePct: 95,
    riskRating: 'CAUTION',
<<<<<<< HEAD
    instruction: 'CRITICAL EVASION: Hug East flank strictly! West drift opening contains lethal >42,000 ppm explosive gas cloud.',
=======
    instruction: 'STAY ON EAST FLANK! West drift opening contains >42,000 ppm explosive gas pocket.',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    vehicle: 'both',
  },
  {
    id: 'wp-3',
    step: 3,
<<<<<<< HEAD
    name: 'Central Drift Pre-Turn Alignment',
    position: { x: 0.25, y: 1.8, z: 16.0 },
=======
    name: 'Central Drift Realignment',
    position: { x: 0.0, y: 1.8, z: 16.0 },
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    clearanceWidthM: 4.3,
    methanePpm: 190,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
<<<<<<< HEAD
    instruction: 'Methane dissipates below 200 ppm. Rescuers align with central crosscut heading towards East Drift.',
=======
    instruction: 'Methane dissipates to ambient. Atmospheric conditions nominal.',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    vehicle: 'both',
  },
  {
    id: 'wp-4',
    step: 4,
<<<<<<< HEAD
    name: 'Central Crosscut & 90° Turn Apex',
    position: { x: 0.0, y: 1.9, z: 20.0 },
    clearanceWidthM: 3.8,
    methanePpm: 120,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
    instruction: 'STRATEGIC 90° RIGHT TURN: Execute precision 90-degree right-angle pivot turn (zero radius) around beacon apex into East Drift.',
=======
    name: 'East Branch Cavern Junction',
    position: { x: 2.0, y: 1.9, z: 19.8 },
    clearanceWidthM: 3.8,
    methanePpm: 110,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
    instruction: 'Make 90-degree right turn into East collapsed drift towards victim.',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    vehicle: 'both',
  },
  {
    id: 'wp-5',
    step: 5,
<<<<<<< HEAD
    name: 'East Drift Crosscut Lane',
    position: { x: 4.2, y: 1.9, z: 20.0 },
    clearanceWidthM: 3.8,
    methanePpm: 95,
    groundTraversablePct: 100,
    riskRating: 'SAFE',
    instruction: 'Sound shored corridor under timber sets. Direct line of sight to rockfall barricade.',
    vehicle: 'both',
=======
    name: 'Ground Vehicle Terminal Staging',
    position: { x: 6.5, y: 1.95, z: 20.0 },
    clearanceWidthM: 3.6,
    methanePpm: 90,
    groundTraversablePct: 100,
    riskRating: 'RESTRICTED',
    instruction: 'HALT GROUND VEHICLES. Rock collapse ahead is 0% passable to wheels. Park & deploy drone.',
    vehicle: 'rover',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  },
  {
    id: 'wp-6',
    step: 6,
<<<<<<< HEAD
    name: 'Ground Vehicle Terminal / Rescue Base',
    position: { x: 6.8, y: 1.95, z: 20.0 },
    clearanceWidthM: 3.6,
    methanePpm: 85,
    groundTraversablePct: 100,
    riskRating: 'RESTRICTED',
    instruction: 'HALT GROUND VEHICLES. Rover parks here. Human rescuers stage hydraulic shoring jacks and Stokes rescue litter.',
    vehicle: 'rover',
=======
    name: 'High-Altitude Aerial Crest Over Rubble',
    position: { x: 8.5, y: 2.15, z: 20.0 },
    clearanceWidthM: 1.4,
    methanePpm: 80,
    groundTraversablePct: 0,
    riskRating: 'CAUTION',
    instruction: 'Fly 2.15m AGL through ceiling gap. 18.4 m³ jagged boulders directly beneath.',
    vehicle: 'drone',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  },
  {
    id: 'wp-7',
    step: 7,
<<<<<<< HEAD
    name: 'Rubble Barrier Crawlway (18.4 m³)',
    position: { x: 8.8, y: 2.15, z: 20.0 },
    clearanceWidthM: 1.4,
    methanePpm: 80,
    groundTraversablePct: 60,
    riskRating: 'CAUTION',
    instruction: 'HUMAN RESCUE CORRIDOR: 1.4m high ceiling void. Rescuers crawl with SCBA and shore jacks, or drone aerial overflight.',
    vehicle: 'both',
=======
    name: 'Downslope Cavern Ingress',
    position: { x: 10.5, y: 2.1, z: 20.0 },
    clearanceWidthM: 3.9,
    methanePpm: 60,
    groundTraversablePct: 40,
    riskRating: 'SAFE',
    instruction: 'Rubble slope clears. Descend into sheltered survivor cavern.',
    vehicle: 'drone',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  },
  {
    id: 'wp-8',
    step: 8,
<<<<<<< HEAD
    name: 'Downslope Cavern Ingress',
    position: { x: 11.0, y: 2.05, z: 20.0 },
    clearanceWidthM: 3.9,
    methanePpm: 60,
    groundTraversablePct: 85,
    riskRating: 'SAFE',
    instruction: 'Rubble slope tapers off. Walkway opens into sheltered East Cavern.',
    vehicle: 'both',
  },
  {
    id: 'wp-9',
    step: 9,
    name: 'Survivor Randy Shelter Chamber',
    position: { x: 13.5, y: 1.85, z: 20.0 },
    clearanceWidthM: 4.8,
    methanePpm: 38,
    groundTraversablePct: 90,
    riskRating: 'SAFE',
    instruction: 'EXTRACTION ZONE: Trapped miner Randy located alive! Administer oxygen, package into Stokes litter, evacuate via 90° turn corridor.',
    vehicle: 'both',
=======
    name: 'Trapped Miner Randy Staging Chamber',
    position: { x: 13.5, y: 1.85, z: 20.0 },
    clearanceWidthM: 4.8,
    methanePpm: 40,
    groundTraversablePct: 80,
    riskRating: 'SAFE',
    instruction: 'Target acquired! Miner Randy located. 37.1°C core temp, 14 bpm respiration.',
    vehicle: 'drone',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  },
];

export const MINE_SECTORS: TunnelSectorInfo[] = [
  {
    id: 'sec-portal',
<<<<<<< HEAD
    name: 'Sector 1: South Portal & Ingress Drift',
    chainageMeters: '0.0m - 8.0m (South)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 18,
    tempC: 16.2,
=======
    name: 'Sector A: Surface Portal & Ingress Drift',
    chainageMeters: '0.0m - 8.0m',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 20,
    tempC: 16.4,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    meshRssi: -42,
    mappedPercent: 100,
    passability: 'ALL_VEHICLES',
  },
  {
    id: 'sec-west',
<<<<<<< HEAD
    name: 'Sector 2: West Drift Methane Plume Chamber',
    chainageMeters: '8.0m - 14.0m (West Side)',
=======
    name: 'Sector B: West Drift Methane Leak Chamber',
    chainageMeters: '8.0m - 14.0m (West Branch)',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    airQualityStatus: 'LETHAL_CH4',
    structuralStatus: 'STABLE',
    ch4Ppm: 42500,
    tempC: 18.2,
    meshRssi: -58,
<<<<<<< HEAD
    mappedPercent: 95,
    passability: 'NO_ACCESS',
  },
  {
    id: 'sec-spine',
    name: 'Sector 3: Central Crosscut & 90° Turn Junction',
    chainageMeters: '14.0m - 20.0m (Center/East)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 185,
=======
    mappedPercent: 92,
    passability: 'NO_ACCESS',
  },
  {
    id: 'sec-central',
    name: 'Sector C: Central Cross-Cut & Mesh Backbone',
    chainageMeters: '14.0m - 20.0m',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 190,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    tempC: 16.8,
    meshRssi: -52,
    mappedPercent: 100,
    passability: 'ALL_VEHICLES',
  },
  {
    id: 'sec-north',
<<<<<<< HEAD
    name: 'Sector 4: North Ventilation Drift Terminus',
    chainageMeters: '20.0m - 34.0m (North Side)',
    airQualityStatus: 'HIGH_HEAT',
    structuralStatus: 'FRACTURED_ROOF',
    ch4Ppm: 340,
    tempC: 34.6,
=======
    name: 'Sector D: North Ventilation Drift Terminus',
    chainageMeters: '20.0m - 34.0m (North Terminus)',
    airQualityStatus: 'HIGH_HEAT',
    structuralStatus: 'FRACTURED_ROOF',
    ch4Ppm: 340,
    tempC: 34.4,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    meshRssi: -66,
    mappedPercent: 98,
    passability: 'ALL_VEHICLES',
  },
  {
    id: 'sec-east-rubble',
<<<<<<< HEAD
    name: 'Sector 5: East Drift Rubble Collapse Barrier',
    chainageMeters: '20.0m - 28.0m (East Side)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'COLLAPSED_RUBBLE',
    ch4Ppm: 85,
    tempC: 16.5,
=======
    name: 'Sector E: East Drift Rubble Collapse Barrier',
    chainageMeters: '20.0m - 28.0m (East Branch)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'COLLAPSED_RUBBLE',
    ch4Ppm: 90,
    tempC: 17.1,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    meshRssi: -62,
    mappedPercent: 100,
    passability: 'AERIAL_ONLY',
  },
  {
<<<<<<< HEAD
    id: 'sec-east-survivor',
    name: 'Sector 6: East Cavern Survivor Shelter',
    chainageMeters: '28.0m - 34.0m (East Cavern)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 38,
=======
    id: 'sec-victim',
    name: 'Sector F: East Cavern Survivor Shelter',
    chainageMeters: '28.0m - 34.0m (Shelter Pocket)',
    airQualityStatus: 'OPTIMAL',
    structuralStatus: 'STABLE',
    ch4Ppm: 40,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    tempC: 16.2,
    meshRssi: -72,
    mappedPercent: 100,
    passability: 'AERIAL_ONLY',
  },
];

export const SurfaceMappingPanel: React.FC<SurfaceMappingPanelProps> = ({
  roverTelemetry,
  droneTelemetry,
  survivorData,
  hazardZones,
<<<<<<< HEAD
  scanPoints,
  patrolStatus,
  environmentalSectors,
=======
  patrolStatus,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  onStartFullPatrol,
  onStartDirectRescue,
  onPausePatrol,
  onResumePatrol,
  onStopPatrol,
  onResetSimulation,
  onOpenReport,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Markers refs
  const roverMarkerRef = useRef<THREE.Group | null>(null);
  const droneMarkerRef = useRef<THREE.Group | null>(null);
  const victimMarkerRef = useRef<THREE.Group | null>(null);
  const pointCloudRef = useRef<THREE.Points | null>(null);

<<<<<<< HEAD
  // Active Tab: Safe Rescuer Route vs All-Sides Survey vs 3D SLAM Metrics
  const [activeSubTab, setActiveSubTab] = useState<'safe_route' | 'environmental' | 'slam_metrics'>('safe_route');
  const [selectedWaypoint, setSelectedWaypoint] = useState<SafePathWaypoint | null>(MINE_SAFE_WAYPOINTS[4]);
  const [cameraPreset, setCameraPreset] = useState<'surface' | 'turn90' | 'topdown' | 'rubble' | 'survivor'>('surface');
  const [sectorFilter, setSectorFilter] = useState<'all' | 'safe_only' | 'hazards_only'>('all');

  // Fallback environmental survey data if not provided via props
  const surveyData: MineSectorSurveyData[] = environmentalSectors && environmentalSectors.length > 0
    ? environmentalSectors
    : [
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
          surveyComplete: true,
          sampleTimestamp: '13:03:40',
        },
        {
          sectorId: 'sec-spine',
          sideName: 'Central Crosscut & 90° Turn Junction',
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
          surveyComplete: true,
          sampleTimestamp: '13:04:18',
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
          surveyComplete: true,
          sampleTimestamp: '13:05:02',
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
          surveyComplete: true,
          sampleTimestamp: '13:05:45',
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
          surveyComplete: true,
          sampleTimestamp: '13:06:12',
        },
      ];
=======
  // Layer filters
  const [showPointClouds, setShowPointClouds] = useState(true);
  const [showSafeCorridor, setShowSafeCorridor] = useState(true);
  const [showHazardVolumes, setShowHazardVolumes] = useState(true);
  const [showVoxelGrid, setShowVoxelGrid] = useState(true);
  const [selectedWaypoint, setSelectedWaypoint] = useState<SafePathWaypoint | null>(MINE_SAFE_WAYPOINTS[0]);
  const [cameraPreset, setCameraPreset] = useState<'surface' | 'topdown' | 'rubble' | 'survivor'>('surface');
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  // Set up 3D Surface & Mine Visualization
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06090e);
    scene.fog = new THREE.FogExp2(0x06090e, 0.022);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(22, 28, -12);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(3, 1, 16);
    controlsRef.current = controls;

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff1e6, 1.2);
    sunLight.position.set(20, 40, 20);
    scene.add(sunLight);

    // Surface Terrain Wireframe
    const terrainGeo = new THREE.PlaneGeometry(60, 60, 30, 30);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x16202c,
      wireframe: true,
      roughness: 0.9,
      transparent: true,
      opacity: 0.25,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = 3.6; // surface ground level above tunnel
    scene.add(terrain);

    // Surface Command Base Station Tower
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0, 3.6, -2.5);
    const mastGeo = new THREE.CylinderGeometry(0.12, 0.18, 5, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = 2.5;
    towerGroup.add(mast);

    const dishGeo = new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9 });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.position.set(0, 4.8, 0);
    dish.rotation.x = Math.PI / 3;
    towerGroup.add(dish);
    scene.add(towerGroup);

    // 3D Subterranean Tunnel Tubes (Wireframe & Ghosted solid)
    const buildTunnelCorridor = (start: THREE.Vector3, end: THREE.Vector3, width: number, color: number) => {
      const dir = end.clone().sub(start);
      const len = dir.length();
      const mid = start.clone().addScaledVector(dir, 0.5);

      const boxGeo = new THREE.BoxGeometry(width, 3.2, len);
      const boxMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.8,
        transparent: true,
        opacity: 0.18,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(boxGeo, boxMat);
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize());
      scene.add(mesh);

      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 });
      const wire = new THREE.LineSegments(edgesGeo, edgesMat);
      wire.position.copy(mid);
      wire.quaternion.copy(mesh.quaternion);
      scene.add(wire);
    };

    // Main Drift: Z: 0 to 34m
<<<<<<< HEAD
    buildTunnelCorridor(new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(0, 1.6, 34), 4.4, 0x334155);
=======
    buildTunnelCorridor(new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(0, 1.6, 34), 4.4, 0x00f5d4);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    // West Methane Branch: X: 0 to -14m at Z=10m
    buildTunnelCorridor(new THREE.Vector3(0, 1.6, 10), new THREE.Vector3(-14, 1.6, 10), 4.2, 0xef4444);
    // East Rubble Branch: X: 0 to 18m at Z=20m
    buildTunnelCorridor(new THREE.Vector3(0, 1.6, 20), new THREE.Vector3(18, 1.6, 20), 4.4, 0xf59e0b);

<<<<<<< HEAD
    // 1. High-Definition Rover Nav2 Path Tube
    const pathPoints = AI_NAV2_MINE_PATH.map((p) => p.clone());
    const curve = new THREE.CatmullRomCurve3(pathPoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.08, 10, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
=======
    // 3D Safe Corridor Tube
    const curve = new THREE.CatmullRomCurve3(AI_NAV2_MINE_PATH.map((p) => p.clone()));
    const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.09, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      transparent: true,
      opacity: 0.85,
    });
    const safeTubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(safeTubeMesh);

<<<<<<< HEAD
    // 2. Parallel Dual Guardrails (Defining Human Rescuer 1.1m Walkway Envelope)
    const leftRails: THREE.Vector3[] = [];
    const rightRails: THREE.Vector3[] = [];
    const railOffset = 0.55;

    for (let i = 0; i < pathPoints.length; i++) {
      const p = pathPoints[i];
      const nextP = pathPoints[Math.min(pathPoints.length - 1, i + 1)];
      const prevP = pathPoints[Math.max(0, i - 1)];
      const tangent = new THREE.Vector3().subVectors(nextP, prevP).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      leftRails.push(new THREE.Vector3(p.x + normal.x * railOffset, 0.15, p.z + normal.z * railOffset));
      rightRails.push(new THREE.Vector3(p.x - normal.x * railOffset, 0.15, p.z - normal.z * railOffset));
    }

    const railMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(leftRails), 100, 0.02, 6, false), railMat));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rightRails), 100, 0.02, 6, false), railMat));

    // 3. Highlighted 90-Degree Strategic Turn Landmark at (x: 0.0, y: 0.05, z: 20.0)
    const turnCornerGroup = new THREE.Group();
    turnCornerGroup.position.set(0.0, 0.05, 20.0);

    // 90° Turn Floor Arc Ring (sweep 90° = Math.PI * 0.5 rad)
    const turnArcGeo = new THREE.RingGeometry(1.4, 2.5, 32, 1, 0, Math.PI * 0.5);
    const turnArcMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const turnArc = new THREE.Mesh(turnArcGeo, turnArcMat);
    turnArc.rotation.x = -Math.PI / 2;
    turnArc.rotation.z = 0;
    turnCornerGroup.add(turnArc);

    // Apex Beacon Pillar
    const apexPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 2.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.85 })
    );
    apexPillar.position.set(0, 1.1, 0);
    turnCornerGroup.add(apexPillar);

    // Holographic Torus Ring
    const haloTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.025, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true })
    );
    haloTorus.position.set(0, 1.5, 0);
    turnCornerGroup.add(haloTorus);

    // Diamond Beacon Strobe
    const diamondTop = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.2, 0),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf59e0b, emissiveIntensity: 1.5 })
    );
    diamondTop.position.set(0, 2.25, 0);
    turnCornerGroup.add(diamondTop);

    scene.add(turnCornerGroup);

    // Waypoint Beacon Discs & Rings
    AI_NAV2_MINE_PATH.forEach((wp, idx) => {
      const isTurn90 = idx === 4 || idx === 5;
      const isVictim = idx === AI_NAV2_MINE_PATH.length - 1;
      const wpColor = isTurn90 ? 0xf59e0b : isVictim ? 0xf43f5e : 0x38bdf8;

      const ringGeo = new THREE.TorusGeometry(isTurn90 ? 0.45 : 0.32, 0.035, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: wpColor });
=======
    // Waypoint Beacon Discs & Rings
    AI_NAV2_MINE_PATH.forEach((wp, idx) => {
      const ringGeo = new THREE.TorusGeometry(0.35, 0.035, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === AI_NAV2_MINE_PATH.length - 1 ? 0xf43f5e : 0x10b981,
      });
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(wp);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    });

    // Methane Hazard Sphere (West Branch)
    const ch4SphereGeo = new THREE.SphereGeometry(4.8, 20, 20);
    const ch4SphereMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });
    const ch4Sphere = new THREE.Mesh(ch4SphereGeo, ch4SphereMat);
    ch4Sphere.position.set(-8.0, 1.6, 10.0);
    scene.add(ch4Sphere);

    // Rubble Collapse Mass (East Branch)
    const rubbleGroup = new THREE.Group();
    rubbleGroup.position.set(8.5, 0.8, 20.0);
<<<<<<< HEAD
    for (let i = 0; i < 24; i++) {
=======
    for (let i = 0; i < 22; i++) {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      const rockMesh = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.3 + Math.random() * 0.45),
        new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 })
      );
      rockMesh.position.set((Math.random() - 0.5) * 2.2, Math.random() * 1.4, (Math.random() - 0.5) * 2.4);
      rubbleGroup.add(rockMesh);
    }
    scene.add(rubbleGroup);

    // Dense 3D LiDAR Point Cloud Reconstruction
    const ptCount = 3800;
    const ptPositions = new Float32Array(ptCount * 3);
    const ptColors = new Float32Array(ptCount * 3);
    const c1 = new THREE.Color(0x0284c7);
<<<<<<< HEAD
    const c2 = new THREE.Color(0x64748b);
=======
    const c2 = new THREE.Color(0x10b981);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    const c3 = new THREE.Color(0xf59e0b);

    for (let i = 0; i < ptCount; i++) {
      let px = 0;
      let py = Math.random() * 3.2;
      let pz = Math.random() * 34;

      if (i < 1800) {
        // Main drift walls
        const wallSide = Math.random() > 0.5 ? 2.1 : -2.1;
        px = wallSide + (Math.random() - 0.5) * 0.15;
      } else if (i < 2800) {
        // West drift
        px = -Math.random() * 14;
        pz = 10.0 + (Math.random() - 0.5) * 4.2;
      } else {
        // East drift & rubble
        px = Math.random() * 18;
        pz = 20.0 + (Math.random() - 0.5) * 4.4;
      }

      ptPositions[i * 3] = px;
      ptPositions[i * 3 + 1] = py;
      ptPositions[i * 3 + 2] = pz;

      const normY = py / 3.2;
      const ptColor = normY > 0.7 ? c1 : normY > 0.3 ? c2 : c3;
      ptColors[i * 3] = ptColor.r;
      ptColors[i * 3 + 1] = ptColor.g;
      ptColors[i * 3 + 2] = ptColor.b;
    }

    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(ptPositions, 3));
    ptsGeo.setAttribute('color', new THREE.BufferAttribute(ptColors, 3));
    const ptsMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const pointCloud = new THREE.Points(ptsGeo, ptsMat);
    scene.add(pointCloud);
    pointCloudRef.current = pointCloud;

    // Rover 3D Marker
    const roverM = new THREE.Group();
    const rBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 1.1), new THREE.MeshStandardMaterial({ color: 0xf97316 }));
    const rArrow = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0xfbbf24 }));
    rArrow.rotation.x = Math.PI / 2;
    rArrow.position.z = 0.8;
    roverM.add(rBody, rArrow);
    scene.add(roverM);
    roverMarkerRef.current = roverM;

    // Drone 3D Marker
    const droneM = new THREE.Group();
    const dBody = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
    const dStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.0), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 }));
    dStem.position.y = -1.0;
    droneM.add(dBody, dStem);
    scene.add(droneM);
    droneMarkerRef.current = droneM;

    // Survivor 3D Marker
    const victimM = new THREE.Group();
    victimM.position.set(13.5, 0.5, 20.0);
    const vMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.6, 8, 12), new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 }));
    vMesh.rotation.z = Math.PI / 2;
    const vHalo = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.7, 16), new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));
    vHalo.rotation.x = Math.PI / 2;
    victimM.add(vMesh, vHalo);
    scene.add(victimM);
    victimMarkerRef.current = victimM;

    // Animation loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      // Pulse survivor halo
      vHalo.scale.setScalar(1 + 0.15 * Math.sin(Date.now() * 0.005));

<<<<<<< HEAD
      // Rotate turn 90 apex halo
      haloTorus.rotation.z += 0.015;
      diamondTop.rotation.y += 0.02;

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update robot poses in 3D scene
  useEffect(() => {
    if (roverMarkerRef.current && roverTelemetry) {
      roverMarkerRef.current.position.set(roverTelemetry.position.x, 0.25, roverTelemetry.position.z);
      roverMarkerRef.current.rotation.y = roverTelemetry.yaw;
    }
  }, [roverTelemetry]);

  useEffect(() => {
    if (droneMarkerRef.current && droneTelemetry) {
      droneMarkerRef.current.position.set(droneTelemetry.position.x, droneTelemetry.position.y || 1.8, droneTelemetry.position.z);
      droneMarkerRef.current.rotation.y = droneTelemetry.yaw;
    }
  }, [droneTelemetry]);

  // Handle camera presets
<<<<<<< HEAD
  const handleCameraPreset = (preset: 'surface' | 'turn90' | 'topdown' | 'rubble' | 'survivor') => {
=======
  const handleCameraPreset = (preset: 'surface' | 'topdown' | 'rubble' | 'survivor') => {
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    setCameraPreset(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    if (preset === 'surface') {
      cameraRef.current.position.set(20, 26, -10);
      controlsRef.current.target.set(2, 1, 16);
<<<<<<< HEAD
    } else if (preset === 'turn90') {
      cameraRef.current.position.set(5, 7, 16);
      controlsRef.current.target.set(0.0, 1, 20.0);
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    } else if (preset === 'topdown') {
      cameraRef.current.position.set(0, 48, 17);
      controlsRef.current.target.set(0, 0, 17);
    } else if (preset === 'rubble') {
      cameraRef.current.position.set(16, 8, 14);
      controlsRef.current.target.set(8.5, 1, 20);
    } else if (preset === 'survivor') {
      cameraRef.current.position.set(18, 5, 18);
      controlsRef.current.target.set(13.5, 0.5, 20);
    }
    controlsRef.current.update();
  };

<<<<<<< HEAD
  const filteredSurveys = surveyData.filter((s) => {
    if (sectorFilter === 'safe_only') return s.humanRescuerSafe;
    if (sectorFilter === 'hazards_only') return !s.humanRescuerSafe || s.ch4Ppm > 1000 || s.structuralStabilityPct < 90;
    return true;
  });

  return (
    <div id="surface-mapping-dashboard" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Surface Base Station Header Bar */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
=======
  return (
    <div id="surface-mapping-dashboard" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Surface Base Station Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
<<<<<<< HEAD
                Surface Dashboard: 3D SLAM Mapping & Safe Rescuer Corridor
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                SAFE ROUTE VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Defined 90° Turn Junction • All-Side Environmental Recon • Human Evacuation Corridor
=======
                Surface Base Station & 3D Subterranean SLAM Mapping
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold border border-emerald-500/40">
                LORA MESH LINK: 99.4% RSSI -42 dBm
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Mine Portal Latitude 37.892° N | Longitude 81.541° W | Elev 428m MSL
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </p>
          </div>
        </div>

        {/* Quick Actions & Public Report Trigger */}
        <div className="flex items-center gap-2">
          <button
            id="btn-surface-full-patrol"
            onClick={onStartFullPatrol}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow shadow-emerald-950"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Autonomous Full Patrol</span>
          </button>

          <button
            id="btn-surface-direct-rescue"
            onClick={onStartDirectRescue}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Direct Survivor Scout</span>
          </button>

          <button
            id="btn-surface-open-report"
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow shadow-amber-950"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Understandable Rescue Report</span>
          </button>

          <button
            id="btn-surface-reset-sim"
            onClick={onResetSimulation}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Autonomous Patrol Mission Real-time Banner */}
      {patrolStatus && (patrolStatus.phase === 'running' || patrolStatus.phase === 'paused' || patrolStatus.phase === 'completed') && (
        <div id="surface-patrol-status-banner" className="bg-slate-900 border-b border-emerald-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              {patrolStatus.phase === 'running' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                patrolStatus.phase === 'running' ? 'bg-emerald-500' :
                patrolStatus.phase === 'paused' ? 'bg-amber-400' : 'bg-sky-400'
              }`}></span>
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
<<<<<<< HEAD
                  {patrolStatus.mode === 'full_patrol' ? 'Full Mine Tunnel Patrol & Environmental Survey' :
=======
                  {patrolStatus.mode === 'full_patrol' ? 'Full Mine Tunnel Patrol & Survey' :
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                   patrolStatus.mode === 'direct_rescue' ? 'Direct Autonomous Rescue Mission' : 'Custom Waypoint Patrol'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  patrolStatus.phase === 'running' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  patrolStatus.phase === 'paused' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-sky-500/20 text-sky-300 border-sky-500/40'
                }`}>
                  {patrolStatus.phase}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  Step {patrolStatus.step}/{patrolStatus.totalSteps} ({patrolStatus.progressPct}%)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-white">{patrolStatus.stepName}:</span> {patrolStatus.stepDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {patrolStatus.phase === 'running' && onPausePatrol && (
              <button
                id="btn-surface-pause-patrol"
                onClick={onPausePatrol}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600/90 hover:bg-amber-500 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            {patrolStatus.phase === 'paused' && onResumePatrol && (
              <button
                id="btn-surface-resume-patrol"
                onClick={onResumePatrol}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            )}

            {onStopPatrol && (
              <button
                id="btn-surface-stop-patrol"
                onClick={onStopPatrol}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600/80 hover:bg-rose-500 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Abort</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content: Split 3D Visualizer and Telemetry / Safe Path Tables */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left / Top: Interactive 3D Subterranean Mine Stage */}
<<<<<<< HEAD
        <div className="flex-1 relative flex flex-col min-h-[380px] bg-slate-950">
=======
        <div className="flex-1 relative flex flex-col min-h-[360px] bg-slate-950">
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          {/* 3D Canvas Mount */}
          <div ref={mountRef} className="flex-1 w-full h-full cursor-grab active:cursor-grabbing" />

          {/* 3D Viewport Floating Overlay Controls */}
<<<<<<< HEAD
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 shadow-lg">
            <span className="text-slate-500 text-[10px] px-1 font-sans uppercase font-bold">3D Focus:</span>
=======
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-200">
            <span className="text-slate-500 text-[10px] px-1 font-sans uppercase font-bold">3D Camera:</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            <button
              onClick={() => handleCameraPreset('surface')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                cameraPreset === 'surface' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Surface Ingress
            </button>
            <button
<<<<<<< HEAD
              onClick={() => handleCameraPreset('turn90')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer flex items-center gap-1 ${
                cameraPreset === 'turn90' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-amber-300'
              }`}
            >
              <CornerUpRight className="w-3 h-3" />
              <span>90° Turn Junction</span>
            </button>
            <button
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              onClick={() => handleCameraPreset('topdown')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                cameraPreset === 'topdown' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Top-Down Ortho
            </button>
            <button
              onClick={() => handleCameraPreset('rubble')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                cameraPreset === 'rubble' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              East Rubble Barrier
            </button>
            <button
              onClick={() => handleCameraPreset('survivor')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                cameraPreset === 'survivor' ? 'bg-rose-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Survivor Cavern
            </button>
          </div>

          {/* Floating Key Legend Overlay */}
<<<<<<< HEAD
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1 font-mono text-slate-300 pointer-events-none shadow-lg">
            <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider mb-1">
              3D Mine Features & Route
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span>Green Tube: AI Nav2 Safe Rescuer Path (Clearance &gt;3.1m)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm" />
              <span>Amber Beacon: 90° Right Turn Junction (x: 0.0, z: 20.0)</span>
=======
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1 font-mono text-slate-300 pointer-events-none">
            <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider mb-1">
              3D Mine Feature Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span>Green Tube: AI Nav2 Verified Rescue Path</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-sm" />
              <span>Red Sphere: West Methane Gas Cloud (&gt;42,000 ppm)</span>
            </div>
            <div className="flex items-center gap-2">
<<<<<<< HEAD
=======
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm" />
              <span>Amber Debris: 18.4 m³ Slate Ceiling Collapse Barrier</span>
            </div>
            <div className="flex items-center gap-2">
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm animate-pulse" />
              <span>Rose Marker: Trapped Miner Randy (Conscious, 37.1°C)</span>
            </div>
          </div>

          {/* 3D Telemetry HUD Pill */}
<<<<<<< HEAD
          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs flex items-center gap-3 shadow-lg">
            <div>
              <span className="text-slate-500">ROVER: </span>
              <span className="text-amber-400 font-bold">[{roverTelemetry?.position.x ?? 0}, {roverTelemetry?.position.z ?? 0}]</span>
=======
          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs flex items-center gap-3">
            <div>
              <span className="text-slate-500">ROVER: </span>
              <span className="text-amber-400 font-bold">[{roverTelemetry?.position.x}, {roverTelemetry?.position.z}]</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </div>
            <div>
              <span className="text-slate-500">DRONE: </span>
              <span className="text-sky-400 font-bold">Alt {droneTelemetry?.altitude || 0}m</span>
            </div>
            <div>
              <span className="text-slate-500">SLAM PTS: </span>
              <span className="text-emerald-400 font-bold">3,800 beams</span>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Surface Command Telemetry, Safe Path Waypoints & Sector Status */}
<<<<<<< HEAD
        <div className="w-full lg:w-[480px] bg-slate-900/95 border-l border-slate-800 flex flex-col h-full overflow-hidden shrink-0">
          {/* Surface Summary Cards */}
          <div className="p-3.5 border-b border-slate-800 grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/60">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Survey Coverage</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">100%</div>
              <div className="text-[10px] text-slate-500">All 6 Mine Sides</div>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Critical Turn</div>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">90° Right</div>
              <div className="text-[10px] text-slate-500">Zero Radius Pivot at WP4</div>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Rescuer Walkway</div>
              <div className="text-base font-bold text-sky-400 font-mono mt-0.5">28.5m</div>
              <div className="text-[10px] text-slate-500">Est. 4.2 min egress</div>
            </div>
          </div>

          {/* Sub-Tab Navigation Header */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/90 text-xs px-2 pt-1">
            <button
              onClick={() => setActiveSubTab('safe_route')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'safe_route'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Rescuer Path</span>
            </button>

            <button
              onClick={() => setActiveSubTab('environmental')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'environmental'
                  ? 'border-cyan-500 text-cyan-400 bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>All-Sides Survey</span>
            </button>

            <button
              onClick={() => setActiveSubTab('slam_metrics')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'slam_metrics'
                  ? 'border-purple-500 text-purple-400 bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>LiDAR & Sectors</span>
            </button>
          </div>

          {/* TAB 1: Safe Rescuer Route Detailed Breakdown */}
          {activeSubTab === 'safe_route' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
              {/* Human Rescue Authorization Alert Card */}
              <div className="p-3 bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-500/50 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Human Rescuer Ingress Corridor Cleared
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                    APPROVED
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Robotic scout completed preliminary survey. Human rescuers can traverse the <strong>Green Corridor</strong> bypassing the West methane pocket by hugging East flank, executing the <strong>90° right turn</strong> at Junction (x: 0.0, z: 20.0), and accessing the East Cavern.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1 text-slate-300 border-t border-emerald-500/30">
                  <div>Required PPE: <span className="text-emerald-400 font-semibold">Level B SCBA</span></div>
                  <div>Extraction Gear: <span className="text-emerald-400 font-semibold">Stokes Litter</span></div>
                </div>
              </div>

              {/* Waypoints List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    Turn-By-Turn Human Rescuer Route Nodes
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">10 WAYPOINTS</span>
                </div>

                {MINE_SAFE_WAYPOINTS.map((wp) => {
                  const isSelected = selectedWaypoint?.id === wp.id;
                  const isTurn90 = wp.step === 4;
                  const badgeColor = 
                    wp.riskRating === 'SAFE' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : wp.riskRating === 'CAUTION' 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

                  return (
                    <div
                      key={wp.id}
                      onClick={() => setSelectedWaypoint(wp)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isTurn90 
                          ? 'bg-amber-950/30 border-amber-500/70 shadow-sm' 
                          : isSelected 
                            ? 'bg-slate-800/90 border-emerald-500/80 shadow-md' 
                            : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                            isTurn90 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {wp.step}
                          </span>
                          <span className="font-semibold text-slate-200">{wp.name}</span>
                          {isTurn90 && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-500/40">
                              90° TURN
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${badgeColor}`}>
                          {wp.riskRating}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {wp.instruction}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1.5 pt-1 border-t border-slate-800/60">
                        <span>Coord: [{wp.position.x}, {wp.position.z}]</span>
                        <span>Clearance: {wp.clearanceWidthM}m</span>
                        <span>CH4: {wp.methanePpm} ppm</span>
                        <span>Walkable: {wp.groundTraversablePct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: All-Sides Environmental Survey Report */}
          {activeSubTab === 'environmental' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <div>
                  <div className="font-bold text-white text-xs uppercase tracking-wider">
                    All-Sides Environmental Survey Matrix
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Continuous Multi-Gas & Geotechnical Logging Across Full Mine
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 text-[10px]">
                  <button
                    onClick={() => setSectorFilter('all')}
                    className={`px-2 py-0.5 rounded ${sectorFilter === 'all' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    All Sides
                  </button>
                  <button
                    onClick={() => setSectorFilter('safe_only')}
                    className={`px-2 py-0.5 rounded ${sectorFilter === 'safe_only' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Safe Route
                  </button>
                  <button
                    onClick={() => setSectorFilter('hazards_only')}
                    className={`px-2 py-0.5 rounded ${sectorFilter === 'hazards_only' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Hazards
                  </button>
                </div>
              </div>

              {/* Sector Survey Cards */}
              <div className="space-y-2.5">
                {filteredSurveys.map((sec) => (
                  <div 
                    key={sec.sectorId}
                    className={`p-3 rounded-xl border ${
                      !sec.humanRescuerSafe 
                        ? 'bg-rose-950/20 border-rose-500/40' 
                        : sec.sectorId === 'sec-spine'
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${sec.humanRescuerSafe ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                        <span className="font-bold text-slate-200">{sec.sideName}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                        sec.humanRescuerSafe 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {sec.humanRescuerSafe ? 'HUMAN PASSAGE SAFE' : 'LETHAL - NO ENTRY'}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono text-slate-300 py-1.5 my-1 border-y border-slate-800/60">
                      <div>
                        <div className="text-slate-500">CH4:</div>
                        <div className={sec.ch4Ppm > 1000 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          {sec.ch4Ppm} ppm ({sec.ch4LelPct}% LEL)
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">O2:</div>
                        <div className={sec.o2Pct < 19.5 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                          {sec.o2Pct}%
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Temp:</div>
                        <div className={sec.tempC > 30 ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                          {sec.tempC}°C
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Stability:</div>
                        <div className="text-emerald-400 font-bold">
                          {sec.structuralStabilityPct}% ({sec.roofCondition})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <div>PPE: <span className="text-slate-300">{sec.requiredPpe}</span></div>
                      <div className="font-mono text-slate-500">Sample: {sec.sampleTimestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LiDAR & Sectors Metrics */}
          {activeSubTab === 'slam_metrics' && (
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Subterranean Drift Sectors & LiDAR Profiles</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">MSHA CODE 30 CFR</span>
=======
        <div className="w-full lg:w-[460px] bg-slate-900/95 border-l border-slate-800 flex flex-col h-full overflow-hidden">
          {/* Surface Summary Cards */}
          <div className="p-3.5 border-b border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Surveyed Drift</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">94.8%</div>
              <div className="text-[10px] text-slate-500">118.5m / 125m</div>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Victim Distance</div>
              <div className="text-base font-bold text-sky-400 font-mono mt-0.5">24.8m</div>
              <div className="text-[10px] text-slate-500">From portal mouth</div>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Rubble Debris</div>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">18.4 m³</div>
              <div className="text-[10px] text-slate-500">~45 metric tons</div>
            </div>
          </div>

          {/* Section: Safest Rescue Path Waypoint Ledger */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Safest Rescue Corridor Waypoints</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {MINE_SAFE_WAYPOINTS.length} NAV2 WAYPOINTS
              </span>
            </div>

            <div className="space-y-1.5">
              {MINE_SAFE_WAYPOINTS.map((wp) => {
                const isSelected = selectedWaypoint?.id === wp.id;
                const badgeColor = 
                  wp.riskRating === 'SAFE' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : wp.riskRating === 'CAUTION' 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

                return (
                  <div
                    key={wp.id}
                    onClick={() => setSelectedWaypoint(wp)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-slate-800/90 border-emerald-500/80 shadow-md' 
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono font-bold flex items-center justify-center text-slate-300">
                          {wp.step}
                        </span>
                        <span className="font-semibold text-slate-200">{wp.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${badgeColor}`}>
                        {wp.riskRating}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {wp.instruction}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1.5 pt-1 border-t border-slate-800/60">
                      <span>Coord: [{wp.position.x}, {wp.position.z}]</span>
                      <span>Clearance: {wp.clearanceWidthM}m</span>
                      <span>CH4: {wp.methanePpm} ppm</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subterranean Sectors Operational Matrix */}
            <div className="pt-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Subterranean Drift Sectors</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">MSHA STANDARDS</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              </div>

              <div className="space-y-1.5">
                {MINE_SECTORS.map((sec) => (
<<<<<<< HEAD
                  <div key={sec.id} className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px]">
=======
                  <div key={sec.id} className="p-2 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px]">
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                    <div className="flex items-center justify-between font-medium text-slate-200 mb-1">
                      <span>{sec.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{sec.chainageMeters}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-slate-400">
                      <div>
                        Air: <span className={sec.airQualityStatus === 'LETHAL_CH4' ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          {sec.ch4Ppm} ppm
                        </span>
                      </div>
                      <div>
                        Temp: <span className="text-slate-300">{sec.tempC}°C</span>
                      </div>
                      <div>
                        Pass: <span className={sec.passability === 'NO_ACCESS' ? 'text-rose-400' : 'text-cyan-400'}>
                          {sec.passability.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
<<<<<<< HEAD

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs uppercase">LiDAR SLAM Volumetric Summary</div>
                <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>Total Scanned Points:</span>
                    <span className="text-emerald-400 font-bold">3,800 active beams</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Drift Point Cloud Density:</span>
                    <span className="text-sky-400 font-bold">142 pts / m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rock Collapse Volume:</span>
                    <span className="text-amber-400 font-bold">18.4 m³ (~45 metric tons)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Over-Rubble Ceiling Clearance:</span>
                    <span className="text-emerald-400 font-bold">1.4m passable void</span>
                  </div>
                </div>
              </div>
            </div>
          )}
=======
            </div>
          </div>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

          {/* Bottom Button Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-2">
            <button
              id="btn-view-detailed-report"
              onClick={onOpenReport}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Rescue & Public Briefing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
