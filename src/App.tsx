/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Viewport3D } from './components/Viewport3D';
import { SlamMapCanvas } from './components/SlamMapCanvas';
import { SensorFusionPanel } from './components/SensorFusionPanel';
import { MissionControlPanel } from './components/MissionControlPanel';
import { DataCollectedPanel } from './components/DataCollectedPanel';
import { AiAnalysisPanel } from './components/AiAnalysisPanel';
import { SurfaceMappingPanel } from './components/SurfaceMappingPanel';
import { PublicRescueReportModal } from './components/PublicRescueReportModal';
<<<<<<< HEAD
=======
import { RosCodeViewerModal } from './components/RosCodeViewerModal';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
import { RosNav2ExportModal } from './components/RosNav2ExportModal';
import { MissionPlanningBar } from './components/MissionPlanningBar';
import { AiTrainingModal } from './components/AiTrainingModal';
import { MineSimulation } from './simulation/MineSimulation';
import { 
  CameraViewMode, RoverTelemetry, DroneTelemetry, SurvivorData, 
  HazardZone, ActiveVehicle, MissionPatrolWaypoint, PatrolPlanState, Vector3D,
<<<<<<< HEAD
  PatrolExecutionStatus, AiPredictiveReport, OnTheSpotAiDecision, AiHyperparameters,
  MineSectorSurveyData
} from './types';
import { DEFAULT_AI_HYPERPARAMETERS, trainAiHyperparametersRealTime, generateOnTheSpotPatrolPlan } from './utils/aiPatherOptimizer';
=======
  PatrolExecutionStatus, AiPredictiveReport, OnTheSpotAiDecision, AiHyperparameters
} from './types';
import { DEFAULT_AI_HYPERPARAMETERS } from './utils/aiPatherOptimizer';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
import { 
  Bot, Radio, Compass, ShieldAlert, FileCode, Play, 
  RotateCcw, Sparkles, Layers, Cpu, CheckCircle2, ChevronRight,
  Database, BrainCircuit, FileText, MapPin, Route, Sliders
} from 'lucide-react';

// Pre-configured multi-point patrol paths (editable via keyboard planner)
const INITIAL_ROVER_PATROL: MissionPatrolWaypoint[] = [
  {
    id: 'r-wp-1',
    index: 0,
    vehicle: 'rover',
    position: { x: 0.0, y: 0.22, z: 2.0 },
    speedMs: 1.0,
    dwellTimeSeconds: 2.0,
    action: 'sensor_scan',
    label: 'Portal Staging',
  },
  {
    id: 'r-wp-2',
    index: 1,
    vehicle: 'rover',
    position: { x: 0.0, y: 0.22, z: 8.0 },
    speedMs: 1.2,
    dwellTimeSeconds: 1.5,
    action: 'patrol_pass',
    label: 'North Drift',
  },
  {
    id: 'r-wp-3',
    index: 2,
    vehicle: 'rover',
    position: { x: 2.0, y: 0.22, z: 19.8 },
    speedMs: 1.0,
    dwellTimeSeconds: 3.0,
    action: 'gas_sniff',
    label: 'East Drift Ingress',
  },
  {
    id: 'r-wp-4',
    index: 3,
    vehicle: 'rover',
    position: { x: 6.8, y: 0.22, z: 20.0 },
    speedMs: 0.8,
    dwellTimeSeconds: 4.0,
    action: 'light_beacon',
    label: 'Pre-Rubble Ground Depot',
  },
];

const INITIAL_DRONE_PATROL: MissionPatrolWaypoint[] = [
  {
    id: 'd-wp-1',
    index: 0,
    vehicle: 'drone',
    position: { x: 6.8, y: 1.8, z: 20.0 },
    speedMs: 1.2,
    dwellTimeSeconds: 2.0,
    action: 'patrol_pass',
    label: 'Aerial Lift',
  },
  {
    id: 'd-wp-2',
    index: 1,
    vehicle: 'drone',
    position: { x: 9.0, y: 2.2, z: 20.0 },
    speedMs: 1.4,
    dwellTimeSeconds: 2.5,
    action: 'thermal_hover',
    label: 'Rubble Crest',
  },
  {
    id: 'd-wp-3',
    index: 2,
    vehicle: 'drone',
    position: { x: 13.5, y: 1.85, z: 20.0 },
    speedMs: 1.0,
    dwellTimeSeconds: 8.0,
    action: 'thermal_hover',
    label: 'Survivor Randy Chamber',
  },
];

// Safe Nav2 Rescue Route (generated around the methane hazard)
const SAFE_RESCUE_ROUTE = [
  { x: 0.0, y: 0.0 },
  { x: 0.0, y: 7.0 },
  { x: 0.8, y: 11.0 }, // curving slightly right to avoid West Methane leak
  { x: 0.0, y: 16.0 },
  { x: 2.0, y: 19.8 }, // entering East Branch
  { x: 7.0, y: 20.0 }, // up to rock collapse
  { x: 13.5, y: 20.0 }, // drone aerial corridor to survivor Randy
];

const DEFAULT_HAZARD_ZONES: HazardZone[] = [
  {
    id: 'hazard-ch4',
    name: 'Branch 1 - Toxic Methane (CH4) Leak',
    type: 'methane',
    position: { x: -8.0, y: 1.0, z: 10.0 },
    radius: 5.5,
    severity: 'critical',
    description: 'Flammable gas pocket > 42,000 ppm.'
  },
  {
    id: 'hazard-collapse',
    name: 'Branch 2 - Massive Tunnel Collapse',
    type: 'collapse',
    position: { x: 8.5, y: 1.0, z: 20.0 },
    radius: 4.0,
    severity: 'critical',
    description: 'Roof collapse impassable to ground rovers.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'sim3d' | 'surface_mapping' | 'slam2d' | 'data' | 'ai_analysis' | 'architecture'>('sim3d');
  const [cameraView, setCameraView] = useState<CameraViewMode>('orbit');
<<<<<<< HEAD
=======
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<ActiveVehicle>('rover');
  const [missionPhase, setMissionPhase] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [missionMode, setMissionMode] = useState<'full_patrol' | 'direct_rescue' | 'custom_patrol'>('full_patrol');

  // Telemetry states
  const [roverTelemetry, setRoverTelemetry] = useState<RoverTelemetry | null>(null);
  const [droneTelemetry, setDroneTelemetry] = useState<DroneTelemetry | null>(null);
  const [survivorData, setSurvivorData] = useState<SurvivorData>({
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
  });

  const [scanPoints, setScanPoints] = useState<{ x: number; y: number }[]>([]);
  const [pathHistory, setPathHistory] = useState<{ x: number; y: number }[]>([]);

  // Keyboard-Controlled Mission Planning & ROS 2 Nav2 Export States
  const [isPlanningMode, setIsPlanningMode] = useState(false);
  const [isNav2ExportModalOpen, setIsNav2ExportModalOpen] = useState(false);
  const [patrolPlan, setPatrolPlan] = useState<PatrolPlanState>({
    roverWaypoints: INITIAL_ROVER_PATROL,
    droneWaypoints: INITIAL_DRONE_PATROL,
    activeVehicle: 'rover',
    isLoop: false,
    cursorPosition: { x: 0.0, y: 1.8, z: 2.0 },
    isPlanningMode: false,
    isExecutingPatrol: false,
  });

  const [patrolStatus, setPatrolStatus] = useState<PatrolExecutionStatus>({
    mode: 'idle',
    phase: 'idle',
    step: 0,
    totalSteps: 11,
    stepName: 'Standby at Portal',
    stepDescription: 'Select Full Patrol, Direct Rescue, or draw custom patrol waypoints',
    roverWpIndex: 0,
    roverWpTotal: 0,
    droneWpIndex: 0,
    droneWpTotal: 0,
    isLoop: false,
    progressPct: 0,
  });

  // Real-Time On-The-Spot AI & Dynamic Pather States
  const [aiPredictiveReport, setAiPredictiveReport] = useState<AiPredictiveReport | null>(null);
  const [onTheSpotDecision, setOnTheSpotDecision] = useState<OnTheSpotAiDecision | null>(null);
  const [aiHyperparams, setAiHyperparams] = useState<AiHyperparameters>(DEFAULT_AI_HYPERPARAMETERS);
<<<<<<< HEAD
  const [environmentalSectors, setEnvironmentalSectors] = useState<MineSectorSurveyData[]>([]);
  const [isAiTrainingModalOpen, setIsAiTrainingModalOpen] = useState<boolean>(false);
  const [isAutonomousAiActive, setIsAutonomousAiActive] = useState<boolean>(true);
  const [lastExecutedActionFeedback, setLastExecutedActionFeedback] = useState<{ action: string; detail: string; time: number } | null>(null);
=======
  const [isAiTrainingModalOpen, setIsAiTrainingModalOpen] = useState<boolean>(false);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  const simRef = useRef<MineSimulation | null>(null);

  const handleApplyHyperparameters = useCallback((newParams: AiHyperparameters) => {
    setAiHyperparams(newParams);
    if (simRef.current) {
      simRef.current.setAiHyperparameters(newParams);
    }
  }, []);

  const handleRecomputePath = useCallback(() => {
    if (simRef.current) {
      simRef.current.recomputeAiCorridor();
    }
  }, []);

<<<<<<< HEAD
  const handleToggleAutonomousAi = useCallback(() => {
    setIsAutonomousAiActive((prev) => {
      const next = !prev;
      if (simRef.current) {
        simRef.current.setAutonomousAiExecution(next);
      }
      return next;
    });
  }, []);

  const handleGenerateAiPlanOnSpot = useCallback(() => {
    const zones = simRef.current ? simRef.current.hazardZones : DEFAULT_HAZARD_ZONES;
    const plan = generateOnTheSpotPatrolPlan(zones, aiHyperparams);

    setPatrolPlan((prev) => ({
      ...prev,
      roverWaypoints: plan.roverWaypoints,
      droneWaypoints: plan.droneWaypoints,
    }));

    if (simRef.current) {
      simRef.current.setUserPlannedRoutes(plan.roverWaypoints, plan.droneWaypoints, patrolPlan.activeVehicle);
      simRef.current.recomputeOptimizedPath();
    }

    setLastExecutedActionFeedback({
      action: 'AI_PLAN_ON_SPOT',
      detail: `AI Planner Done On Spot: ${plan.roverWaypoints.length} Rover & ${plan.droneWaypoints.length} Drone Waypoints (Safety: ${plan.stats.safetyClearanceScore}/100, Methane Evasion: +${plan.stats.evasionOffsetMeters}m)`,
      time: Date.now(),
    });
  }, [aiHyperparams, patrolPlan.activeVehicle]);

  const aiPlanOnSpotRef = useRef(handleGenerateAiPlanOnSpot);
  aiPlanOnSpotRef.current = handleGenerateAiPlanOnSpot;

  const handleExecuteActionOnSpot = useCallback((actionType?: string) => {
    if (actionType === 'AI_PLAN_ON_SPOT' || actionType === 'PLAN_ON_SPOT' || actionType === 'REPLAN_CORRIDOR') {
      handleGenerateAiPlanOnSpot();
      return;
    }
    if (simRef.current) {
      simRef.current.executeOnTheSpotAiAction(actionType);
    }
  }, [handleGenerateAiPlanOnSpot]);

  const handleQuickTrainAi = useCallback(() => {
    setAiHyperparams((prev) => {
      const updated = trainAiHyperparametersRealTime(prev, 'safety_first', 0.15);
      if (simRef.current) {
        simRef.current.setAiHyperparameters(updated);
      }
      setLastExecutedActionFeedback({
        action: 'REALTIME_TRAIN',
        detail: 'AI Neural Corridor Model Optimized & Deployed On Spot (99.4% Acc)',
        time: Date.now(),
      });
      return updated;
    });
  }, []);

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  const handleInitSim = useCallback((sim: MineSimulation) => {
    simRef.current = sim;
    // Bind simulation event hooks
    (sim as any).callbacks = {
      onRoverTelemetry: (tel: RoverTelemetry) => {
        setRoverTelemetry(tel);
        setPathHistory((prev) => {
          if (prev.length === 0) return [{ x: tel.position.x, y: tel.position.z }];
          const last = prev[prev.length - 1];
          if (Math.hypot(last.x - tel.position.x, last.y - tel.position.z) > 0.4) {
            const next = [...prev, { x: tel.position.x, y: tel.position.z }];
            if (next.length > 200) next.shift(); // keep bounded size
            return next;
          }
          return prev;
        });
      },
      onDroneTelemetry: (tel: DroneTelemetry) => setDroneTelemetry(tel),
      onSurvivorUpdate: (data: SurvivorData) => setSurvivorData(data),
      onScanData: (pts: { x: number; y: number }[]) => setScanPoints(pts),
      onPatrolStatus: (status: PatrolExecutionStatus) => {
        setPatrolStatus(status);
        if (status.phase === 'completed') {
          setMissionPhase('completed');
          setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: false }));
        } else if (status.phase === 'running') {
          setMissionPhase('running');
          setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: true }));
        } else if (status.phase === 'paused') {
          setMissionPhase('paused');
        } else if (status.phase === 'idle') {
          setMissionPhase('idle');
          setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: false }));
        }
      },
      onAiPredictiveReport: (report: AiPredictiveReport) => {
        setAiPredictiveReport(report);
      },
      onTheSpotDecision: (decision: OnTheSpotAiDecision) => {
        setOnTheSpotDecision(decision);
      },
<<<<<<< HEAD
      onAiActionExecuted: (action: string, detail: string) => {
        setLastExecutedActionFeedback({ action, detail, time: Date.now() });
      },
      onTheSpotPlanRequested: () => {
        aiPlanOnSpotRef.current();
      },
      onEnvironmentalReconUpdate: (sectors: MineSectorSurveyData[]) => {
        setEnvironmentalSectors(sectors);
      },
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    };
  }, []);

  const hazardZones: HazardZone[] = useMemo(() => {
    return simRef.current ? simRef.current.hazardZones : DEFAULT_HAZARD_ZONES;
  }, []);

  // Stabilized Action Handlers
  const handleToggleActiveVehicle = useCallback(() => {
    setActiveVehicle((prev) => (prev === 'rover' ? 'drone' : 'rover'));
  }, []);

  const handleStartMission = useCallback(() => {
    setMissionPhase('running');
    setMissionMode('direct_rescue');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: true }));
    simRef.current?.startAutonomousMission('direct_rescue');
  }, []);

  const handleStartFullPatrol = useCallback(() => {
    setMissionPhase('running');
    setMissionMode('full_patrol');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: true }));
    simRef.current?.startFullTunnelMission();
  }, []);

  const handleStartDirectRescue = useCallback(() => {
    setMissionPhase('running');
    setMissionMode('direct_rescue');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: true }));
    simRef.current?.startAutonomousMission('direct_rescue');
  }, []);

  const handlePausePatrol = useCallback(() => {
    setMissionPhase('paused');
    simRef.current?.pauseMission();
  }, []);

  const handleResumePatrol = useCallback(() => {
    setMissionPhase('running');
    simRef.current?.resumeMission();
  }, []);

  const handleTogglePausePatrol = useCallback(() => {
    simRef.current?.togglePauseMission();
  }, []);

  const handleStopPatrol = useCallback(() => {
    setMissionPhase('idle');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: false }));
    simRef.current?.stopMission();
    simRef.current?.stopCustomPatrol();
  }, []);

  const handleResetSimulation = useCallback(() => {
    setMissionPhase('idle');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: false }));
    simRef.current?.resetSimulation();
    setPathHistory([]);
  }, []);

  const handleRoverSpeed = useCallback((spd: number) => {
    simRef.current?.setRoverSpeed(spd);
  }, []);

  const handleRoverSteer = useCallback((str: number) => {
    simRef.current?.setRoverSteering(str);
  }, []);

  const handleToggleHeadlights = useCallback(() => {
    simRef.current?.toggleRoverHeadlights();
  }, []);

  const handleToggleLidar = useCallback(() => {
    simRef.current?.toggleRoverLidar();
  }, []);

<<<<<<< HEAD
  const handleToggleGasInspection = useCallback(() => {
    simRef.current?.toggleGasInspection();
  }, []);

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  const handleDeployDrone = useCallback(() => {
    simRef.current?.launchDrone();
  }, []);

  const handleScoutRubble = useCallback(() => {
    simRef.current?.sendDroneToScoutRubble();
  }, []);

  const handleReturnDrone = useCallback(() => {
    simRef.current?.returnDroneToRover();
  }, []);

  const handleDronePitch = useCallback((pitch: number) => {
    simRef.current?.setDronePitch(pitch);
  }, []);

  const handleDroneRoll = useCallback((roll: number) => {
    simRef.current?.setDroneRoll(roll);
  }, []);

  const handleDroneVertical = useCallback((vert: number) => {
    simRef.current?.setDroneVertical(vert);
  }, []);

  const handleDroneYaw = useCallback((rate: number) => {
    simRef.current?.setDroneYaw(rate);
  }, []);

  const handleDroneHover = useCallback(() => {
    simRef.current?.hoverDrone();
  }, []);

  const handleDroneLand = useCallback(() => {
    simRef.current?.landDrone();
  }, []);

  const handleDroneAltitudePreset = useCallback((alt: number) => {
    simRef.current?.setDroneAltitudePreset(alt);
  }, []);

  const handleToggleDroneSpotlight = useCallback(() => {
    simRef.current?.toggleDroneSpotlight();
  }, []);

  // --------------------------------------------------------------------------
  // Mission Planning: 3D Visualization Synchronization
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (simRef.current) {
      simRef.current.setUserPlannedRoutes(
        patrolPlan.roverWaypoints,
        patrolPlan.droneWaypoints,
        patrolPlan.activeVehicle
      );
    }
  }, [patrolPlan.roverWaypoints, patrolPlan.droneWaypoints, patrolPlan.activeVehicle]);

  useEffect(() => {
    if (simRef.current) {
      simRef.current.setWaypointCursor(
        patrolPlan.cursorPosition,
        patrolPlan.activeVehicle,
        isPlanningMode
      );
    }
  }, [patrolPlan.cursorPosition, patrolPlan.activeVehicle, isPlanningMode]);

  // Keep patrolPlan.isPlanningMode in sync
  useEffect(() => {
    setPatrolPlan((prev) => ({ ...prev, isPlanningMode }));
  }, [isPlanningMode]);

  // --------------------------------------------------------------------------
  // Keyboard-Controlled Mission Planning Handlers
  // --------------------------------------------------------------------------
  const handleTogglePlanningMode = useCallback(() => {
    setIsPlanningMode((prev) => {
      const next = !prev;
      if (next && simRef.current) {
        // Snap cursor to current vehicle position on opening planning mode
        const robotPos =
          patrolPlan.activeVehicle === 'rover'
            ? simRef.current.getRoverPosition()
            : simRef.current.getDronePosition();
        setPatrolPlan((p) => ({
          ...p,
          cursorPosition: { x: robotPos.x, y: robotPos.y, z: robotPos.z },
        }));
      }
      return next;
    });
  }, [patrolPlan.activeVehicle]);

  const handleAddWaypoint = useCallback(() => {
    setPatrolPlan((prev) => {
      const isRover = prev.activeVehicle === 'rover';
      const list = isRover ? prev.roverWaypoints : prev.droneWaypoints;
      const count = list.length + 1;
      const newWp: MissionPatrolWaypoint = {
        id: `${isRover ? 'r' : 'd'}-wp-${Date.now()}-${count}`,
        index: list.length,
        vehicle: prev.activeVehicle,
        position: {
          x: Math.round(prev.cursorPosition.x * 100) / 100,
          y: isRover ? 0.22 : Math.round(prev.cursorPosition.y * 100) / 100,
          z: Math.round(prev.cursorPosition.z * 100) / 100,
        },
        speedMs: isRover ? 1.1 : 1.4,
        dwellTimeSeconds: isRover ? 2.0 : 3.0,
        action: isRover ? 'patrol_pass' : 'thermal_hover',
        label: `${isRover ? 'Rover' : 'Drone'} Point ${count}`,
      };

      return isRover
        ? { ...prev, roverWaypoints: [...prev.roverWaypoints, newWp] }
        : { ...prev, droneWaypoints: [...prev.droneWaypoints, newWp] };
    });
  }, []);

  const handleAddWaypointAtVehicle = useCallback(() => {
    if (!simRef.current) return;
    const pos =
      patrolPlan.activeVehicle === 'rover'
        ? simRef.current.getRoverPosition()
        : simRef.current.getDronePosition();

    setPatrolPlan((prev) => {
      const isRover = prev.activeVehicle === 'rover';
      const list = isRover ? prev.roverWaypoints : prev.droneWaypoints;
      const count = list.length + 1;
      const newWp: MissionPatrolWaypoint = {
        id: `${isRover ? 'r' : 'd'}-wp-${Date.now()}-${count}`,
        index: list.length,
        vehicle: prev.activeVehicle,
        position: {
          x: Math.round(pos.x * 100) / 100,
          y: Math.round(pos.y * 100) / 100,
          z: Math.round(pos.z * 100) / 100,
        },
        speedMs: isRover ? 1.1 : 1.4,
        dwellTimeSeconds: 2.5,
        action: isRover ? 'sensor_scan' : 'thermal_hover',
        label: `${isRover ? 'Rover' : 'Drone'} Point ${count}`,
      };

      return isRover
        ? { ...prev, roverWaypoints: [...prev.roverWaypoints, newWp] }
        : { ...prev, droneWaypoints: [...prev.droneWaypoints, newWp] };
    });
  }, [patrolPlan.activeVehicle]);

  const handleDeleteLastWaypoint = useCallback(() => {
    setPatrolPlan((prev) => {
      const isRover = prev.activeVehicle === 'rover';
      if (isRover) {
        if (prev.roverWaypoints.length === 0) return prev;
        return { ...prev, roverWaypoints: prev.roverWaypoints.slice(0, -1) };
      } else {
        if (prev.droneWaypoints.length === 0) return prev;
        return { ...prev, droneWaypoints: prev.droneWaypoints.slice(0, -1) };
      }
    });
  }, []);

  const handleClearWaypoints = useCallback(() => {
    setPatrolPlan((prev) => {
      const isRover = prev.activeVehicle === 'rover';
      return isRover ? { ...prev, roverWaypoints: [] } : { ...prev, droneWaypoints: [] };
    });
  }, []);

  const handleToggleLoop = useCallback(() => {
    setPatrolPlan((prev) => ({ ...prev, isLoop: !prev.isLoop }));
  }, []);

  const handleNudgeCursor = useCallback((dx: number, dy: number, dz: number) => {
    setPatrolPlan((prev) => {
      const newX = Math.max(-9.0, Math.min(15.0, prev.cursorPosition.x + dx));
      const newY = Math.max(0.4, Math.min(2.8, prev.cursorPosition.y + dy));
      const newZ = Math.max(0.0, Math.min(32.0, prev.cursorPosition.z + dz));
      return {
        ...prev,
        cursorPosition: {
          x: Math.round(newX * 100) / 100,
          y: Math.round(newY * 100) / 100,
          z: Math.round(newZ * 100) / 100,
        },
      };
    });
  }, []);

  const handleExecuteCustomPatrol = useCallback(() => {
    setMissionPhase('running');
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: true }));
    simRef.current?.startCustomPatrol(
      patrolPlan.roverWaypoints,
      patrolPlan.droneWaypoints,
      patrolPlan.isLoop
    );
  }, [patrolPlan.roverWaypoints, patrolPlan.droneWaypoints, patrolPlan.isLoop]);

  const handleStopCustomPatrol = useCallback(() => {
    setPatrolPlan((prev) => ({ ...prev, isExecutingPatrol: false }));
    simRef.current?.stopCustomPatrol();
  }, []);

  // --------------------------------------------------------------------------
  // Global Keyboard Event Listener
  // --------------------------------------------------------------------------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore typing within input fields
      const tagName = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) return;

      // [P] Toggle Mission Planning Mode
      if (e.code === 'KeyP') {
        e.preventDefault();
        handleTogglePlanningMode();
        return;
      }

      // [X] Open ROS 2 Nav2 Export Dialog
      if (e.code === 'KeyX') {
        e.preventDefault();
        setIsNav2ExportModalOpen(true);
        return;
      }

<<<<<<< HEAD
      // [O] Run AI Planner On The Spot (Auto-generate optimized rescue patrol plan)
      if (e.code === 'KeyO' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleGenerateAiPlanOnSpot();
        return;
      }

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      // [K] Toggle Pause / Resume Patrol
      if (e.code === 'KeyK') {
        e.preventDefault();
        handleTogglePausePatrol();
        return;
      }

      // [R] Run / Stop Patrol (Global)
      if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey && !isPlanningMode) {
        e.preventDefault();
        if (patrolPlan.isExecutingPatrol || missionPhase === 'running') {
          handleStopPatrol();
        } else {
          const hasCustomWps = patrolPlan.roverWaypoints.length > 0 || patrolPlan.droneWaypoints.length > 0;
          if (hasCustomWps) {
            handleExecuteCustomPatrol();
          } else {
            handleStartFullPatrol();
          }
        }
        return;
      }

      // Keys active while in planning mode
      if (isPlanningMode) {
        // [Tab] or [V] Switch between Rover and Drone editing
        if (e.code === 'Tab' || e.code === 'KeyV') {
          e.preventDefault();
          setPatrolPlan((prev) => ({
            ...prev,
            activeVehicle: prev.activeVehicle === 'rover' ? 'drone' : 'rover',
          }));
          return;
        }

        // [Space] or [Enter] Drop Waypoint
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          if (e.shiftKey) {
            handleAddWaypointAtVehicle();
          } else {
            handleAddWaypoint();
          }
          return;
        }

        // [Backspace] or [Delete] Undo Last Waypoint
        if (e.code === 'Backspace' || e.code === 'Delete') {
          e.preventDefault();
          handleDeleteLastWaypoint();
          return;
        }

        // [C] Clear All Waypoints for active vehicle
        if (e.code === 'KeyC') {
          e.preventDefault();
          handleClearWaypoints();
          return;
        }

        // [L] Toggle Patrol Loop
        if (e.code === 'KeyL') {
          e.preventDefault();
          handleToggleLoop();
          return;
        }

        // [R] Run / Stop Custom Patrol
        if (e.code === 'KeyR') {
          e.preventDefault();
          if (patrolPlan.isExecutingPatrol || missionPhase === 'running') {
            handleStopPatrol();
          } else {
            handleExecuteCustomPatrol();
          }
          return;
        }

        // Reticle Navigation: W/A/S/D and Arrow Keys
        if (e.code === 'ArrowUp' || e.code === 'KeyW') {
          e.preventDefault();
          handleNudgeCursor(0, 0, 1.0);
          return;
        }
        if (e.code === 'ArrowDown' || e.code === 'KeyS') {
          e.preventDefault();
          handleNudgeCursor(0, 0, -1.0);
          return;
        }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          e.preventDefault();
          handleNudgeCursor(-1.0, 0, 0);
          return;
        }
        if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          e.preventDefault();
          handleNudgeCursor(1.0, 0, 0);
          return;
        }
        if (e.code === 'KeyE' || e.code === 'PageUp') {
          e.preventDefault();
          handleNudgeCursor(0, 0.25, 0);
          return;
        }
        if (e.code === 'KeyQ' || e.code === 'PageDown') {
          e.preventDefault();
          handleNudgeCursor(0, -0.25, 0);
          return;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    isPlanningMode,
    patrolPlan.isExecutingPatrol,
    handleTogglePlanningMode,
    handleAddWaypoint,
    handleAddWaypointAtVehicle,
    handleDeleteLastWaypoint,
    handleClearWaypoints,
    handleToggleLoop,
    handleNudgeCursor,
    handleExecuteCustomPatrol,
    handleStopCustomPatrol,
  ]);

  // Mission step calculation
  const getMissionPhaseLabel = () => {
    if (!roverTelemetry) return 'STANDBY AT PORTAL';
    if (survivorData.detected) return 'PHASE 5: SURVIVOR IDENTIFIED (93.4% CONFIDENCE)';
    if (droneTelemetry && droneTelemetry.state === 'scouting') return 'PHASE 4: DRONE SCOUTING OVER RUBBLE';
    if (roverTelemetry.position.z > 18 && roverTelemetry.position.x > 5) return 'PHASE 3: COLLAPSE REACHED - LAUNCH DRONE';
    if (roverTelemetry.ch4Ppm > 10000) return 'PHASE 2: METHANE SPIKE! DIVERTING TO EAST BRANCH';
    if (roverTelemetry.position.z > 2) return 'PHASE 1: TUNNEL INGRESS & SLAM MAPPING';
    return 'STANDBY AT PORTAL';
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Main Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 shrink-0 z-10 backdrop-blur-md">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 font-black shadow-lg shadow-orange-950/40">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white uppercase">
                AI Autonomous Mine Rescue System
              </h1>
<<<<<<< HEAD
=======
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                ROS 2 JAZZY & GZ HARMONIC
              </span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </div>
            <p className="text-[11px] text-slate-400">
              Ground Rover & Scout Drone Multi-Tunnel Exploration | 5-Modality Life-Sign Fusion | Nav2 Pathing
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            id="tab-sim-3d"
            onClick={() => setActiveTab('sim3d')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'sim3d' 
                ? 'bg-emerald-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Simulation
          </button>
          <button
            id="tab-surface-mapping"
            onClick={() => setActiveTab('surface_mapping')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'surface_mapping' 
                ? 'bg-amber-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Surface 3D Mapping</span>
          </button>
          <button
            id="tab-slam-2d"
            onClick={() => setActiveTab('slam2d')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'slam2d' 
                ? 'bg-emerald-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SLAM & RViz2 Map
          </button>
          <button
            id="tab-data-collected"
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'data' 
                ? 'bg-sky-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Data Collected</span>
          </button>
          <button
            id="tab-ai-analysis"
            onClick={() => setActiveTab('ai_analysis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'ai_analysis' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI Tactical Reasoning</span>
          </button>
          <button
            id="tab-arch"
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'architecture' 
                ? 'bg-emerald-600 text-white shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Specs
          </button>
        </div>

        {/* Action Controls & Code Modal Trigger */}
        <div className="flex items-center gap-2">
          <button
            id="btn-open-report"
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-700/80 text-xs font-medium text-sky-300 transition-colors cursor-pointer shadow"
            title="Open Clear Understandable Rescue Report for Public, Stakeholders & Teams"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Understandable Rescue Report</span>
          </button>

          <button
            id="btn-header-plan-mission"
            onClick={handleTogglePlanningMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-lg ${
              isPlanningMode
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/80 animate-pulse'
                : 'bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-300'
            }`}
            title="Toggle Keyboard Mission Planner [P]"
          >
            <Route className="w-3.5 h-3.5" />
            <span>{isPlanningMode ? 'Planning Active [P]' : 'Plan Mission [P]'}</span>
          </button>

          <button
            id="btn-header-export-nav2"
            onClick={() => setIsNav2ExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-xs font-semibold text-indigo-300 transition-colors cursor-pointer shadow"
            title="Export Waypoint Mission to ROS 2 Nav2 Navigation Stack [X]"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export Nav2 [X]</span>
          </button>

          <button
            id="btn-header-patrol"
            onClick={handleStartFullPatrol}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-lg shadow-amber-950/40"
            title="Plan & Execute Full Multi-Tunnel Patrol across all mine sectors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Full Tunnel Patrol</span>
          </button>

          <button
            id="btn-header-ai-training"
            onClick={() => setIsAiTrainingModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 active:bg-indigo-950 border border-indigo-500/50 text-xs font-semibold text-indigo-200 transition-colors cursor-pointer shadow-md shadow-indigo-950/40"
            title="Open Real-Time AI Training Studio & Hyperparameter Optimizer"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Train AI</span>
          </button>

          <button
<<<<<<< HEAD
=======
            id="btn-open-ros-modal"
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 text-xs font-medium text-emerald-400 transition-colors cursor-pointer shadow"
          >
            <FileCode className="w-4 h-4" />
            <span>ROS 2 Code</span>
          </button>

          <button
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            id="btn-header-mission"
            onClick={handleStartDirectRescue}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-lg shadow-emerald-950/40"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Direct Rescue</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 flex overflow-hidden p-3 gap-3">
        {activeTab === 'sim3d' && (
          <>
            {/* Left/Center: 3D Viewport Container & Keyboard Mission Planning Dock */}
            <div className="flex-1 flex flex-col min-w-0 h-full gap-2.5">
              <div className="flex-1 min-h-0 relative">
                <Viewport3D
                  viewMode={cameraView}
                  onViewModeChange={setCameraView}
                  activeVehicle={activeVehicle}
                  onToggleActiveVehicle={handleToggleActiveVehicle}
                  roverTelemetry={roverTelemetry}
                  droneTelemetry={droneTelemetry}
                  hazardZones={hazardZones}
                  survivorData={survivorData}
                  scanPoints={scanPoints}
                  pathHistory={pathHistory}
                  safePath={SAFE_RESCUE_ROUTE}
                  simInstanceRef={simRef}
                  onInitSim={handleInitSim}
                  onTheSpotDecision={onTheSpotDecision}
                  predictiveReport={aiPredictiveReport}
                  onOpenTrainingStudio={() => setIsAiTrainingModalOpen(true)}
                  onLaunchDrone={handleDeployDrone}
                  onReturnDrone={handleReturnDrone}
                  onRecomputePath={handleRecomputePath}
<<<<<<< HEAD
                  isAutonomousAiActive={isAutonomousAiActive}
                  onToggleAutonomousAi={handleToggleAutonomousAi}
                  onExecuteActionOnSpot={handleExecuteActionOnSpot}
                  lastExecutedActionFeedback={lastExecutedActionFeedback}
                  onQuickTrainAi={handleQuickTrainAi}
                  onAiPlanOnSpot={handleGenerateAiPlanOnSpot}
                  onToggleGasInspection={handleToggleGasInspection}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                />
              </div>

              {/* Keyboard-Controlled Mission Planning Dock */}
              <MissionPlanningBar
                isPlanningMode={isPlanningMode}
                onTogglePlanningMode={handleTogglePlanningMode}
                patrolPlan={patrolPlan}
                patrolStatus={patrolStatus}
                onSetActiveVehicle={(veh) => setPatrolPlan((prev) => ({ ...prev, activeVehicle: veh }))}
                onAddWaypoint={handleAddWaypoint}
                onAddWaypointAtVehicle={handleAddWaypointAtVehicle}
                onDeleteLastWaypoint={handleDeleteLastWaypoint}
                onClearWaypoints={handleClearWaypoints}
                onToggleLoop={handleToggleLoop}
                onExecuteCustomPatrol={handleExecuteCustomPatrol}
                onStopCustomPatrol={handleStopCustomPatrol}
                onPausePatrol={handlePausePatrol}
                onResumePatrol={handleResumePatrol}
                onOpenExportModal={() => setIsNav2ExportModalOpen(true)}
                onNudgeCursor={handleNudgeCursor}
                roverPos={roverTelemetry?.position}
                dronePos={droneTelemetry?.position}
<<<<<<< HEAD
                onGenerateAiPlanOnSpot={handleGenerateAiPlanOnSpot}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              />
            </div>

            {/* Right Column: Mission Control & Sensor Fusion Deck */}
            <div className="w-96 flex flex-col gap-3 shrink-0 h-full overflow-hidden">
              {/* Mission Teleop / Robot Status */}
              <div className="flex-1 min-h-0">
                <MissionControlPanel
                  roverTelemetry={roverTelemetry}
                  droneTelemetry={droneTelemetry}
                  currentView={cameraView}
                  onSetView={setCameraView}
                  onStartMission={handleStartMission}
                  onStartFullPatrol={handleStartFullPatrol}
                  patrolStatus={patrolStatus}
                  onPausePatrol={handlePausePatrol}
                  onResumePatrol={handleResumePatrol}
                  onStopPatrol={handleStopPatrol}
                  onOpenReport={() => setIsReportModalOpen(true)}
                  onResetSimulation={handleResetSimulation}
                  onRoverSpeed={handleRoverSpeed}
                  onRoverSteer={handleRoverSteer}
                  onToggleHeadlights={handleToggleHeadlights}
                  onToggleLidar={handleToggleLidar}
<<<<<<< HEAD
                  onToggleGasInspection={handleToggleGasInspection}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                  activeVehicle={activeVehicle}
                  onSetActiveVehicle={setActiveVehicle}
                  onDeployDrone={handleDeployDrone}
                  onScoutRubble={handleScoutRubble}
                  onReturnDrone={handleReturnDrone}
                  onDronePitch={handleDronePitch}
                  onDroneRoll={handleDroneRoll}
                  onDroneVertical={handleDroneVertical}
                  onDroneYaw={handleDroneYaw}
                  onDroneHover={handleDroneHover}
                  onDroneLand={handleDroneLand}
                  onDroneAltitudePreset={handleDroneAltitudePreset}
                  onToggleDroneSpotlight={handleToggleDroneSpotlight}
                />
              </div>

              {/* 5-Modality Life-Sign Sensor Fusion */}
              <div className="h-72 shrink-0">
                <SensorFusionPanel
                  survivorData={survivorData}
                  roverTelemetry={roverTelemetry}
                  droneTelemetry={droneTelemetry}
                />
              </div>
            </div>
          </>
        )}

        {/* Tab: Surface 3D Mapping & Safe Corridor Dashboard */}
        {activeTab === 'surface_mapping' && (
          <div className="flex-1 h-full min-h-0">
            <SurfaceMappingPanel
              roverTelemetry={roverTelemetry}
              droneTelemetry={droneTelemetry}
              survivorData={survivorData}
              hazardZones={hazardZones}
              scanPoints={scanPoints}
              patrolStatus={patrolStatus}
<<<<<<< HEAD
              environmentalSectors={environmentalSectors.length > 0 ? environmentalSectors : simRef.current?.getEnvironmentalSectors()}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              onStartFullPatrol={handleStartFullPatrol}
              onStartDirectRescue={handleStartDirectRescue}
              onPausePatrol={handlePausePatrol}
              onResumePatrol={handleResumePatrol}
              onStopPatrol={handleStopPatrol}
              onResetSimulation={handleResetSimulation}
              onOpenReport={() => setIsReportModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 2: Full 2D SLAM & RViz2 Inspector */}
        {activeTab === 'slam2d' && (
          <div className="flex-1 flex gap-3 h-full">
            <div className="flex-1 h-full">
              <SlamMapCanvas
                roverTelemetry={roverTelemetry}
                droneTelemetry={droneTelemetry}
                hazardZones={hazardZones}
                survivorData={survivorData}
                scanPoints={scanPoints}
                pathHistory={pathHistory}
                safePath={SAFE_RESCUE_ROUTE}
                isExpanded={true}
              />
            </div>

            {/* SLAM Sidebar Details */}
            <div className="w-80 flex flex-col gap-3 shrink-0 h-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 overflow-y-auto text-xs">
              <div className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>SLAM Toolbox & Costmap Status</span>
              </div>

              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 mb-1">Mapping Mode</div>
                  <div className="text-emerald-400 font-bold">Online Async Graph SLAM (Ceres)</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 mb-1">Occupancy Resolution</div>
                  <div className="text-slate-200 font-bold">0.05 m / cell (5cm precision)</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 mb-1">Laser Scans Integrated</div>
                  <div className="text-cyan-400 font-bold">{scanPoints.length * 12} beams/sec</div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-500 mb-1">Nav2 Path Planning Strategy</div>
                  <div className="text-amber-400 font-bold">A* Global + DWB Local Controller</div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Dynamically inflates Methane lethal boundary layer to route human rescuers safely around Branch 1.
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartMission}
                className="mt-auto w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow cursor-pointer text-xs"
              >
                Run Navigation & SLAM Sequence
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Data Collected Information & Telemetry Logs */}
        {activeTab === 'data' && (
          <div className="flex-1 h-full min-h-0">
            <DataCollectedPanel
              roverTelemetry={roverTelemetry}
              droneTelemetry={droneTelemetry}
              survivorData={survivorData}
              missionPhase={missionPhase}
            />
          </div>
        )}

        {/* Tab 4: AI Analysis & Multi-Modal Tactical Reasoning */}
        {activeTab === 'ai_analysis' && (
          <div className="flex-1 h-full min-h-0">
            <AiAnalysisPanel
              roverTelemetry={roverTelemetry}
              droneTelemetry={droneTelemetry}
              survivorData={survivorData}
              missionPhase={missionPhase}
              currentHyperparams={aiHyperparams}
              aiPredictiveReport={aiPredictiveReport}
              onTheSpotDecision={onTheSpotDecision}
              onOpenTrainingStudio={() => setIsAiTrainingModalOpen(true)}
              onRecomputePath={handleRecomputePath}
<<<<<<< HEAD
              onGenerateAiPlanOnSpot={handleGenerateAiPlanOnSpot}
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            />
          </div>
        )}

        {/* Tab 5: System Architecture & Hardware Specification */}
        {activeTab === 'architecture' && (
          <div className="flex-1 h-full bg-slate-900/90 border border-slate-800 rounded-xl p-6 overflow-y-auto text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  AI-Powered Autonomous Rover–Drone Collaborative Rescue System
                </h2>
                <p className="text-sm text-slate-400">
                  Detailed technical breakdown for underground mine safety, multi-modal life-sign sensing, and ROS 2 Jazzy integration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rover Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-sm mb-2">
                    <Bot className="w-4 h-4" />
                    <span>Ground Commander: 6-Wheel Rocker-Bogie Rover</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    <li><strong className="text-white">Chassis:</strong> 6-Wheel Rocker-Bogie suspension for high-roughness rock debris.</li>
                    <li><strong className="text-white">Compute:</strong> NVIDIA Jetson Orin Nano running YOLOv8, SLAM Toolbox, and ROS 2 Jazzy.</li>
                    <li><strong className="text-white">LiDAR:</strong> 3D Ouster/Velodyne 16-beam GPU LiDAR for 35m range point clouds.</li>
                    <li><strong className="text-white">Gas Sniffer:</strong> High-precision NDIR methane (CH4), electrochemical CO, and CO2 sensors.</li>
                    <li><strong className="text-white">Drone Deck:</strong> Rear magnetic landing pad with automatic charging and launch trigger.</li>
                  </ul>
                </div>

                {/* Drone Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-sky-400 text-sm mb-2">
                    <Radio className="w-4 h-4" />
                    <span>Aerial Scout: 450mm Carbon Fiber Quadcopter</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    <li><strong className="text-white">Airframe:</strong> Lightweight 450mm carbon fiber with shrouded protective propeller guards.</li>
                    <li><strong className="text-white">Flight Controller:</strong> Pixhawk 6C with MulticopterVelocityControl plugin.</li>
                    <li><strong className="text-white">Vision & Thermal:</strong> Downward/forward FLIR thermal IR camera for body core heat detection.</li>
                    <li><strong className="text-white">Acoustic:</strong> MEMS microphone array with Active Noise Cancellation for trapped voice/tapping.</li>
                    <li><strong className="text-white">Over-Debris Scouting:</strong> Deploys autonomously when ground rover encounters collapsed obstacles.</li>
                  </ul>
                </div>
              </div>

              {/* 5-Modality Life Sign Fusion Spec */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>5-Modality Multi-Modal Survivor Detection Formulation</span>
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Underground collapses attenuate traditional sensors. The system calculates a fused Bayesian life-sign probability:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-emerald-300 border border-slate-800 mb-3">
                  P(Survivor) = 0.15·Visual + 0.25·Thermal + 0.15·Acoustic + 0.15·CO2 + 0.30·UWB
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="font-bold text-sky-400">1. Visual (15%)</div>
                    <div className="text-[11px] text-slate-400">YOLOv8 helmet & reflective vest detection.</div>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="font-bold text-amber-400">2. Thermal (25%)</div>
                    <div className="text-[11px] text-slate-400">37°C body heat vs 16°C cold rock contrast.</div>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="font-bold text-emerald-400">3. Acoustic (15%)</div>
                    <div className="text-[11px] text-slate-400">CNN tapping pattern classifier with motor ANC.</div>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="font-bold text-teal-400">4. CO2 Plume (15%)</div>
                    <div className="text-[11px] text-slate-400">Breathing gas plume elevation &gt; 950 ppm.</div>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800/80">
                    <div className="font-bold text-purple-400">5. UWB Radar (30%)</div>
                    <div className="text-[11px] text-slate-400">Wall-penetrating 14 bpm respiration detection.</div>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
=======

              {/* Action */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsCodeModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg shadow cursor-pointer"
                >
                  View & Download ROS 2 Jazzy Source Code
                </button>
              </div>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </div>
          </div>
        )}
      </main>

      {/* Bottom Status & Mission Progression Timeline */}
      <footer className="px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 shrink-0 text-xs flex items-center justify-between font-mono backdrop-blur-md">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">MISSION STATUS:</span>
          <span className="text-emerald-300">{getMissionPhaseLabel()}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>ROVER: [{roverTelemetry?.position.x || 0}, {roverTelemetry?.position.z || 0}]</span>
          <span>•</span>
          <span>DRONE ALT: {droneTelemetry?.altitude || 0}m</span>
          <span>•</span>
          <span>CH4: {roverTelemetry?.ch4Ppm || 20} ppm</span>
          <span>•</span>
          <span>SURVIVOR CONF: {Math.round(survivorData.fusedProbability * 100)}%</span>
        </div>
      </footer>

      {/* Understandable Public Rescue Report Modal */}
      <PublicRescueReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        roverTelemetry={roverTelemetry}
        droneTelemetry={droneTelemetry}
        survivorData={survivorData}
<<<<<<< HEAD
        environmentalSectors={environmentalSectors.length > 0 ? environmentalSectors : simRef.current?.getEnvironmentalSectors()}
=======
      />

      {/* ROS 2 Jazzy Code Viewer & Download Modal */}
      <RosCodeViewerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      />

      {/* ROS 2 Nav2 Keyboard Planned Patrol Export Modal */}
      <RosNav2ExportModal
        isOpen={isNav2ExportModalOpen}
        onClose={() => setIsNav2ExportModalOpen(false)}
        patrolPlan={patrolPlan}
      />

      {/* Real-Time AI Training Studio & Hyperparameter Optimizer Modal */}
      {isAiTrainingModalOpen && (
        <AiTrainingModal
          isOpen={isAiTrainingModalOpen}
          onClose={() => setIsAiTrainingModalOpen(false)}
<<<<<<< HEAD
          currentHyperparams={aiHyperparams}
          hazards={hazardZones}
          onApplyHyperparameters={handleApplyHyperparameters}
=======
          currentHyperparameters={aiHyperparams}
          onApplyHyperparameters={handleApplyHyperparameters}
          roverTelemetry={roverTelemetry}
          droneTelemetry={droneTelemetry}
          survivorData={survivorData}
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        />
      )}
    </div>
  );
}
