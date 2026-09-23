import React, { useState, useEffect, useMemo } from 'react';
import { 
  RoverTelemetry, DroneTelemetry, SurvivorData, 
  AiHyperparameters, AiPredictiveReport, OnTheSpotAiDecision 
} from '../types';
import { 
  BrainCircuit, Sparkles, AlertTriangle, ShieldCheck, Heart, 
  Send, RefreshCw, Copy, Check, Compass, Bot, Flame, 
  Activity, Clock, ChevronRight, ChevronDown, HelpCircle, Info,
  Layers, ShieldAlert, Navigation, Zap, Thermometer, Eye,
  Radio, FileText, CheckCircle2, ArrowRight, Sliders, Crosshair, Target
} from 'lucide-react';

interface AiAnalysisPanelProps {
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  survivorData: SurvivorData;
  missionPhase: string;
  currentHyperparams?: AiHyperparameters;
  aiPredictiveReport?: AiPredictiveReport | null;
  onTheSpotDecision?: OnTheSpotAiDecision | null;
  onOpenTrainingStudio?: () => void;
  onRecomputePath?: () => void;
<<<<<<< HEAD
  onGenerateAiPlanOnSpot?: () => void;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

type DecisionCategory = 'all' | 'rover_diversion' | 'drone_deployment' | 'ai_pather' | 'life_signs' | 'battery_safety';

interface TacticalReasoningEntry {
  id: string;
  category: 'rover_diversion' | 'drone_deployment' | 'ai_pather' | 'life_signs' | 'battery_safety';
  categoryLabel: string;
  title: string;
  status: 'active' | 'triggered' | 'standby' | 'completed';
  statusLabel: string;
  summary: string;
  sensorSnapshot: {
    name: string;
    reading: string;
    threshold: string;
    severity: 'nominal' | 'elevated' | 'critical';
  };
  protocolRule: string;
  tacticalExplanation: string;
  actionExecuted: string;
}

export const AiAnalysisPanel: React.FC<AiAnalysisPanelProps> = ({
  roverTelemetry,
  droneTelemetry,
  survivorData,
  missionPhase,
  currentHyperparams,
  aiPredictiveReport,
  onTheSpotDecision,
  onOpenTrainingStudio,
  onRecomputePath,
<<<<<<< HEAD
  onGenerateAiPlanOnSpot,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}) => {
  const [analysisText, setAnalysisText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelSource, setModelSource] = useState<string>('subterranean-sar-expert-engine');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [auditTrailCopied, setAuditTrailCopied] = useState<boolean>(false);
  const [demandNotice, setDemandNotice] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<DecisionCategory>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'dec-rover-ch4': true,
    'dec-drone-launch': true,
    'dec-ai-pather': true,
    'dec-survivor-lock': false,
    'dec-battery-rtb': false,
  });

  // Extract key real-time sensor variables
  const ch4Ppm = roverTelemetry?.ch4Ppm ?? 420;
  const coPpm = roverTelemetry?.coPpm ?? 12;
  const tempC = roverTelemetry?.temperatureC ?? 18.2;
  const roverX = roverTelemetry?.position?.x ?? 0;
  const roverZ = roverTelemetry?.position?.z ?? 0;
  
  const droneState = droneTelemetry?.state ?? 'docked';
  const droneAltitude = droneTelemetry?.altitude ?? 0;
  const droneBatt = droneTelemetry?.batteryPct ?? 96;
  const droneFlightSec = droneTelemetry?.flightDurationSeconds ?? 0;
  const droneEstRemainingSec = droneTelemetry?.estimatedFlightSecondsRemaining ?? 600;

  const survivorDetected = survivorData?.detected ?? false;
  const fusedProb = survivorData?.fusedProbability ?? 0;
  const respirationBpm = survivorData?.respirationBpm ?? 14;

  // Real-time Tactical Reasoning Log Generator
  const tacticalDecisions = useMemo<TacticalReasoningEntry[]>(() => {
    // 1. Rover Autonomous Diversion (Methane Combustion Avoidance)
    const isMethaneAlarm = ch4Ppm > 5000;
    const isNearWestBranch = roverZ > 7.0 && roverZ < 15.0;
    const roverDivertedEast = roverX > 0.4 || roverZ >= 16.0;
    
    const roverStatus = isMethaneAlarm || (isNearWestBranch && roverDivertedEast)
      ? 'triggered'
      : ch4Ppm > 1000 
      ? 'active' 
      : 'standby';

    const roverDiversionEntry: TacticalReasoningEntry = {
      id: 'dec-rover-ch4',
      category: 'rover_diversion',
      categoryLabel: 'Atmospheric Combustion Hazard',
      title: 'Rover Autonomous Diversion (West Drift Methane Evasion)',
      status: roverStatus,
      statusLabel: roverStatus === 'triggered' ? 'TRIGGERED & DIVERTED' : roverStatus === 'active' ? 'ALERT ACTIVE' : 'MONITORING',
      summary: `Ground rover steering automatically deflected east away from West Drift to eliminate deflagration spark hazard from high-amp wheel inverters in ${ch4Ppm.toLocaleString()} ppm CH4.`,
      sensorSnapshot: {
        name: 'NDIR CH4 Laser Absorption Spectrometer',
        reading: `${ch4Ppm.toLocaleString()} ppm CH4 (${((ch4Ppm / 50000) * 100).toFixed(1)}% LEL)`,
        threshold: 'MSHA LEL Limit: 10,000 ppm (20% LEL) / Combustible at 50,000 ppm (100% LEL)',
        severity: ch4Ppm > 10000 ? 'critical' : ch4Ppm > 1000 ? 'elevated' : 'nominal',
      },
      protocolRule: 'MSHA 30 CFR § 75.323 & NFPA 122 Subterranean Electric Drive Spark Standoff Protocol',
      tacticalExplanation: `The heavy 6-wheel rover utilizes 48V DC brushless hub motors, high-current MOSFET inverters, and mechanical wheel contact points capable of generating electrostatic discharge or inductive arcing. At ${ch4Ppm.toLocaleString()} ppm (${((ch4Ppm / 50000) * 100).toFixed(1)}% of Lower Explosive Limit), ambient atmosphere in West Drift presents severe explosive deflagration risk. The Nav2 costmap dynamically injected a 5.5m LETHAL cost obstacle circle centered at (X=-8.0, Z=10.0), causing the global A* path planner to execute a hard eastward avoidance trajectory (+0.4 rad) and strictly lock out West Drift ingress.`,
      actionExecuted: 'Turned rover heading eastward; locked out West Drift waypoint sequence; commanded 48V inverters into current-limiting intrinsically safe mode.',
    };

    // 2. Scout Drone Autonomous Deployment (Obstacle Hand-Off)
    const isRoverAtRubble = roverX > 5.5 && roverZ > 17.5;
    const isDroneInAir = droneState !== 'docked' && droneState !== 'landed';
    const droneDeployStatus = isDroneInAir
      ? 'active'
      : isRoverAtRubble
      ? 'triggered'
      : 'standby';

    const droneDeployEntry: TacticalReasoningEntry = {
      id: 'dec-drone-launch',
      category: 'drone_deployment',
      categoryLabel: 'Physical Barrier Hand-Off',
      title: 'Scout Quadcopter Autonomous Launch (Rubble Barrier Leapfrog)',
      status: droneDeployStatus,
      statusLabel: isDroneInAir ? 'AIRBORNE SCOUTING' : isRoverAtRubble ? 'BARRIER DETECTED' : 'DOCKED ON ROVER',
      summary: '3D LiDAR volumetric scanning detected 18.4 m³ roof slate collapse blocking ground mobility (0.0% passability). Quadcopter commanded to launch and bridge rubble barrier.',
      sensorSnapshot: {
        name: 'Ouster 16-Beam 3D LiDAR & Wheel Slip Odometry',
        reading: 'Obstacle Height: 1.15m | Boulder Diameter: 0.85m | Incline: 52° | Ground Wheel Passability: 0.0%',
        threshold: 'Rover Max Surmountable Obstacle: 0.35m | Required Aerial Clearance: > 1.20m',
        severity: isRoverAtRubble || isDroneInAir ? 'critical' : 'nominal',
      },
      protocolRule: 'Subterranean Air-Ground Teaming Protocol #4 (Ground-to-Air Obstacle Hand-Off)',
      tacticalExplanation: 'LiDAR point cloud analysis and stereo depth cameras identified a massive rock roof failure completely sealing the drift cross-section between X=7.5m and X=10.5m. Rocker-bogie wheel kinematics cannot surmount 1.15m jagged boulders without irreversible chassis rollover. However, LiDAR vertical ceiling profiling confirmed an open aerial flight envelope with 1.45m clearance between the boulder crest and ceiling timbers. The mission supervisor autonomous state machine disengaged the magnetic docking deck, commanded rotor spin-up, and launched the quadcopter to leapfrog the impassable rubble.',
      actionExecuted: 'Released magnetic landing clamp; spun quadcopter rotors to 9,400 RPM; ascended to 1.9m AGL flight altitude to cross barrier.',
    };

    // 3. AI Pather Safe Mine Corridor Flight Conformance
    const isTrackingPath = droneState === 'scouting' || droneState === 'returning';
    const patherStatus = isTrackingPath ? 'active' : isDroneInAir ? 'triggered' : 'standby';

    const aiPatherEntry: TacticalReasoningEntry = {
      id: 'dec-ai-pather',
      category: 'ai_pather',
      categoryLabel: 'GPS-Denied Autonomous Corridor',
      title: 'AI Pather Safe Mine Corridor Conformance (Restricted Flight Envelope)',
      status: patherStatus,
      statusLabel: isTrackingPath ? 'TRACKING AI CORRIDOR' : isDroneInAir ? 'STABILIZED HOVER' : 'CORRIDOR MAPPED',
      summary: 'Quadcopter strictly follows the 3D Nav2 AI Pather safe rescue corridor (WP0 through WP8) to prevent rock wall collisions under GPS denial and magnetic flux distortion.',
      sensorSnapshot: {
        name: 'Downward Optical Flow, Sonar Altimeter & Nav2 3D Corridor',
        reading: `Flight Altitude: ${droneAltitude > 0 ? droneAltitude.toFixed(2) : (droneState === 'docked' ? '0.44' : '1.85')}m AGL | Lateral Centerline Drift: < 0.12m`,
        threshold: 'Corridor Safety Envelope: 1.80m – 2.15m AGL | Max Wall Proximity: > 0.60m',
        severity: isTrackingPath ? 'elevated' : 'nominal',
      },
      protocolRule: 'Subterranean Nav2 3D Safe Flight Envelope & Collision Avoidance Directive',
      tacticalExplanation: 'Subterranean hard-rock drifts suffer from complete satellite GPS denial and severe magnetic compass declination caused by iron-bearing rock strata. Free-space trajectory generation poses high probability of high-speed collision with irregular tunnel walls or hanging ventilation conduits. The onboard flight computer is constrained to the verified Nav2 AI Pather safe rescue corridor (WP0–WP8). It steers around the West methane plume, enters the East Drift junction smoothly, climbs to 2.15m over the rock collapse crest, and descends to 1.85m directly inside the survivor chamber.',
      actionExecuted: 'Flight controller locked to AI Pather sequential waypoints; dynamic banking tilt constrained to ±0.15 rad.',
    };

    // 4. Multi-Modal Life-Sign Fusion & Thermal Lock
    const isLifeSignConfirmed = survivorDetected || fusedProb > 0.8;
    const isLifeSignProbable = fusedProb > 0.4;
    const lifeSignStatus = isLifeSignConfirmed ? 'completed' : isLifeSignProbable ? 'active' : 'standby';

    const lifeSignEntry: TacticalReasoningEntry = {
      id: 'dec-survivor-lock',
      category: 'life_signs',
      categoryLabel: 'Biometric Target Acquisition',
      title: 'Multi-Sensor Life-Sign Fusion & Thermal Lock (Miner Randy)',
      status: lifeSignStatus,
      statusLabel: isLifeSignConfirmed ? 'LIFE SIGNS CONFIRMED' : isLifeSignProbable ? 'PROBABLE DETECTION' : 'SEARCHING',
      summary: `5-modality sensor fusion confirmed trapped miner with ${(fusedProb * 100).toFixed(0)}% certainty. Quadcopter engaged autonomous hover at 1.85m AGL and activated 400-lumen spotlight.`,
      sensorSnapshot: {
        name: 'FLIR Lepton 3.5 LWIR Thermal Camera + 24GHz UWB Radar + Geophone ANC',
        reading: `Fused Probability: ${(fusedProb * 100).toFixed(0)}% | Body Temp: 37.1°C (vs 16.4°C rock) | Respiration: ${respirationBpm} BPM`,
        threshold: 'Incident Command Confirmation Threshold: > 80.0% Fused Certainty',
        severity: isLifeSignConfirmed ? 'critical' : isLifeSignProbable ? 'elevated' : 'nominal',
      },
      protocolRule: 'Bayesian 5-Modality Life-Sign Verification Protocol (FLIR + UWB + Acoustic + CO2 + Visual)',
      tacticalExplanation: 'FLIR LWIR imaging isolated a 37.1°C thermal signature behind the secondary rubble pile, distinctly contrasting against the cold 16.4°C drift rock. 24GHz micro-power UWB radar penetrated rock gaps to detect rhythmic 14 BPM chest wall displacement, confirming respiratory movement. Acoustic neural filtering removed drone rotor blade harmonics (120 Hz) to verify faint conscious tap responses. With fused Bayesian confidence surpassing 85%, the flight computer transitioned from transit mode to autonomous position-hold hover at 1.85m AGL and illuminated the casualty.',
      actionExecuted: 'Switched quadcopter to autonomous position-hold hover; activated 400-lumen high-CRI LED spotlight; transmitted biometric vitals to base camp.',
    };

    // 5. Battery Endurance & Return-To-Base (RTB) Margin
    const isLowBattery = droneBatt < 25;
    const isCautionBattery = droneBatt < 40;
    const batteryStatus = isLowBattery ? 'triggered' : isCautionBattery ? 'active' : 'standby';

    const batteryEntry: TacticalReasoningEntry = {
      id: 'dec-battery-rtb',
      category: 'battery_safety',
      categoryLabel: 'Energy & Safe RTL Budget',
      title: 'Battery Energy Budget & Return-To-Rover (RTL) Reserve Standoff',
      status: batteryStatus,
      statusLabel: isLowBattery ? 'RTL TRIGGER LIMIT' : isCautionBattery ? 'CAUTION MARGIN' : 'BUDGET NOMINAL',
      summary: `4S LiHV battery at ${droneBatt.toFixed(1)}% (${Math.round(droneEstRemainingSec / 60)} min endurance). Energy budget monitored to ensure guaranteed return flight over rubble barrier.`,
      sensorSnapshot: {
        name: 'Smart LiHV 4S SMBus Telemetry & Real-Time Power Monitor',
        reading: `Battery: ${droneBatt.toFixed(1)}% | Current Draw: 14.8A (hover) / 18.2A (transit) | Flight Time: ${Math.round(droneFlightSec)}s`,
        threshold: 'Critical Return-To-Base (RTB) Threshold: 20.0% + Distance Transit Reserve',
        severity: isLowBattery ? 'critical' : isCautionBattery ? 'elevated' : 'nominal',
      },
      protocolRule: 'Subterranean Aerial Energy Reservation & Failsafe Return-to-Base Directive',
      tacticalExplanation: 'Subterranean drone flights carry zero margin for unexpected landings, as touching down on jagged rubble risks prop destruction and permanent stranding behind the collapse. The onboard BMS constantly computes the dynamic energy required to retrace the AI Pather corridor backwards to the rover: [Transit Distance × 2.4 m/s draw + 20% Contingency Buffer]. If remaining battery approaches the calculated RTL threshold, an autonomous abort-and-return sequence is triggered to safely land on the rover dock.',
      actionExecuted: droneBatt > 25 
        ? 'Energy reserve nominal; continuous aerial scouting and thermal hovering authorized.' 
        : 'Approaching RTL margin; preparing automated reverse corridor transit back to rover docking pad.',
    };

    return [
      roverDiversionEntry,
      droneDeployEntry,
      aiPatherEntry,
      lifeSignEntry,
      batteryEntry,
    ];
  }, [ch4Ppm, coPpm, tempC, roverX, roverZ, droneState, droneAltitude, droneBatt, droneFlightSec, droneEstRemainingSec, survivorDetected, fusedProb, respirationBpm]);

  // Filtered decisions
  const filteredDecisions = useMemo(() => {
    if (activeCategory === 'all') return tacticalDecisions;
    return tacticalDecisions.filter((d) => d.category === activeCategory);
  }, [tacticalDecisions, activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    tacticalDecisions.forEach((d) => { allExpanded[d.id] = true; });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    tacticalDecisions.forEach((d) => { allCollapsed[d.id] = false; });
    setExpandedIds(allCollapsed);
  };

  // Copy complete tactical reasoning audit trail
  const handleCopyAuditTrail = () => {
    const auditText = tacticalDecisions.map((d, index) => {
      return `========================================================
DECISION #${index + 1}: ${d.title}
STATUS: ${d.statusLabel} [Category: ${d.categoryLabel}]
--------------------------------------------------------
SUMMARY:
${d.summary}

SENSOR TELEMETRY SNAPSHOT:
• Primary Sensor: ${d.sensorSnapshot.name}
• Live Reading: ${d.sensorSnapshot.reading}
• Safety Threshold: ${d.sensorSnapshot.threshold}
• Threat Severity: ${d.sensorSnapshot.severity.toUpperCase()}

REGULATORY PROTOCOL & RULE:
${d.protocolRule}

TACTICAL REASONING & FORENSIC LOGIC:
${d.tacticalExplanation}

AUTONOMOUS ACTION EXECUTED:
${d.actionExecuted}
`;
    }).join('\n');

    navigator.clipboard.writeText(`SUBTERRANEAN SAR TACTICAL REASONING & DECISION AUDIT TRAIL
Generated: ${new Date().toISOString()} | Mission Phase: ${missionPhase}
Rover Position: (X=${roverX.toFixed(1)}m, Z=${roverZ.toFixed(1)}m) | Methane: ${ch4Ppm} ppm
Drone State: ${droneState.toUpperCase()} | Battery: ${droneBatt.toFixed(1)}% | Altitude: ${droneAltitude.toFixed(2)}m
Survivor Status: ${survivorDetected ? 'CONFIRMED' : 'SEARCHING'} (${(fusedProb * 100).toFixed(0)}% Probability)

${auditText}`);

    setAuditTrailCopied(true);
    setTimeout(() => setAuditTrailCopied(false), 2500);
  };

  // Fetch AI Tactical Analysis from server
  const runAiAnalysis = async (queryText?: string) => {
    setIsLoading(true);
    setDemandNotice(null);
    try {
      const payload = {
        missionPhase,
        roverTelemetry,
        droneTelemetry,
        survivorData,
        query: queryText || customQuery || 'Generate authoritative subterranean SAR tactical briefing',
      };

      const res = await fetch('/api/ai/analyze-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (data && data.analysis) {
        setAnalysisText(data.analysis);
        setModelSource(data.source || 'ai-engine');
        if (data.demandNotice) {
          setDemandNotice(data.demandNotice);
        }
      } else {
        throw new Error(`Server returned status ${res.status}`);
      }
    } catch (err: any) {
      console.warn('Fallback triggered for AI analysis:', err);
      // Seamless failover to subterranean rescue reasoning engine
      const ch4 = roverTelemetry?.ch4Ppm ?? 450;
      setAnalysisText(`### 🚨 SUBTERRANEAN SAR TACTICAL ASSESSMENT REPORT
**Generated by Subterranean Rescue Reasoning Engine**

#### 1. Environmental Threat & Atmospheric Risk
- **Methane (CH4) Threat**: ${
        ch4 > 10000 
          ? 'CRITICAL — Methane pocket detected above 42,000 ppm in West Drift. Explosive concentration window. Avoid rover ingress and prohibit electric motor ignition.'
          : 'MONITORED — Ambient corridor levels within allowable OSHA ranges.'
      }
- **Structural Barrier**: 18.4 m³ rock roof collapse blocks ground rover at (X=8.5m, Z=20.0m).

#### 2. Survivor Triage & Life-Sign Fusion (Miner Randy)
- **Status**: ${survivorData.detected ? 'CONFIRMED' : 'PROBABLE'} (Fused Probability: ${Math.round(survivorData.fusedProbability * 100)}%)
- **Vital Indicators**: Respiration ~${survivorData.respirationBpm} BPM, Heart Rate ~${survivorData.heartRateBpm} BPM.
- **Estimated Survival Window**: ~3.5 to 4.5 hours before air quality deterioration and hypothermia escalate.

#### 3. Recommended Incident Command Sequence
1. Divert ground rover away from West Drift Methane pocket.
2. Deploy aerial scout drone over rubble barrier (1.4m vertical clearance confirmed).
3. Maintain aerial thermal lock and deploy secondary human rescue squad with hydraulic rescue spreaders.`);
      setModelSource('subterranean-sar-expert-engine');
      setDemandNotice('Synthesized via Subterranean Expert Reasoning System.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runAiAnalysis();
  }, []);

  const handleCopy = () => {
    if (!analysisText) return;
    navigator.clipboard.writeText(analysisText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePromptChip = (prompt: string) => {
    setCustomQuery(prompt);
    runAiAnalysis(prompt);
  };

  return (
    <div id="ai-analysis-panel" className="flex flex-col gap-3.5 h-full bg-slate-900/95 border border-slate-800 rounded-xl p-4 text-slate-100 shadow-xl backdrop-blur-md overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-100 flex items-center gap-2">
              Autonomous AI Mission Analysis & Tactical Reasoning
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Gemini 3.8 Flash Engine
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry parsing, autonomous vehicle maneuver justifications, and survivor survival prognosis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-reanalyze"
            onClick={() => runAiAnalysis()}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-indigo-950/40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Synthesizing...' : 'Run Real-Time AI Analysis'}
          </button>
        </div>
      </div>

      {/* Live Telemetry Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-950/70 border border-slate-800/90 rounded-lg p-2.5 text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            Rover Methane
          </span>
          <span className={`font-mono font-bold mt-0.5 ${ch4Ppm > 10000 ? 'text-rose-400 animate-pulse' : ch4Ppm > 1000 ? 'text-amber-300' : 'text-emerald-400'}`}>
            {ch4Ppm.toLocaleString()} ppm
          </span>
          <span className="text-[10px] text-slate-500">
            {ch4Ppm > 10000 ? 'Combustion Risk (>80% LEL)' : ch4Ppm > 1000 ? 'Elevated Drift' : 'Atmosphere Nominal'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            Ground Passability
          </span>
          <span className={`font-mono font-bold mt-0.5 ${roverX > 6.0 && roverZ > 17.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {roverX > 6.0 && roverZ > 17.5 ? '0.0% (IMPASSABLE)' : '100% (TRAVERSABLE)'}
          </span>
          <span className="text-[10px] text-slate-500">
            {roverX > 6.0 && roverZ > 17.5 ? '18m³ Rock Collapse' : 'Main Corridor Clear'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Bot className="w-3 h-3 text-sky-400" />
            Drone Status
          </span>
          <span className="font-mono font-bold text-sky-300 uppercase mt-0.5">
            {droneState.replace('_', ' ')}
          </span>
          <span className="text-[10px] text-slate-500">
            Alt: {droneAltitude > 0 ? `${droneAltitude.toFixed(1)}m` : '0.44m (Docked)'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Navigation className="w-3 h-3 text-teal-400" />
            AI Pather Safe Route
          </span>
          <span className="font-mono font-bold text-teal-300 mt-0.5">
            CORRIDOR WP0–WP8
          </span>
          <span className="text-[10px] text-slate-500">
            3D Mine Path Locked
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400" />
            Survivor Lock
          </span>
          <span className={`font-mono font-bold mt-0.5 ${survivorDetected ? 'text-emerald-400' : fusedProb > 0.4 ? 'text-amber-300' : 'text-slate-400'}`}>
            {(fusedProb * 100).toFixed(0)}% Probability
          </span>
          <span className="text-[10px] text-slate-500">
            {survivorDetected ? 'Miner Randy Confirmed' : fusedProb > 0.4 ? 'Probable Vital Signal' : 'Scanning Drift...'}
          </span>
        </div>
      </div>

      {/* SECTION: Real-Time On-The-Spot Predictive Engine & Pather Optimization */}
      <div className="bg-slate-950/90 border border-indigo-500/40 rounded-xl p-4 shadow-xl space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Real-Time On-The-Spot Predictive Engine & Pather Optimization
                </h3>
                {onTheSpotDecision && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    onTheSpotDecision.threatLevel === 'EMERGENCY' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    onTheSpotDecision.threatLevel === 'WARNING' ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' :
                    onTheSpotDecision.threatLevel === 'ADVISORY' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {onTheSpotDecision.badgeText}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Dynamic potential-field costmaps, kinematic curvature smoothing, and survivor golden-hour telemetry prognosis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
<<<<<<< HEAD
            {onGenerateAiPlanOnSpot && (
              <button
                id="btn-panel-ai-plan-on-spot"
                onClick={onGenerateAiPlanOnSpot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-amber-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 ring-1 ring-amber-300/50"
                title="Run AI Planner On The Spot: Automatically computes optimized obstacle & hazard-averse Rover and Drone patrol routes [O]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-current" />
                <span>⚡ AI Plan on Spot [O]</span>
              </button>
            )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            {onRecomputePath && (
              <button
                id="btn-recompute-path-panel"
                onClick={onRecomputePath}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                title="Re-optimize 3D rescue path with current hyperparameter weights"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Re-Plan Corridor</span>
              </button>
            )}

            {onOpenTrainingStudio && (
              <button
                id="btn-open-training-from-panel"
                onClick={onOpenTrainingStudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-colors cursor-pointer"
                title="Open Online AI Training Studio to tune weights and run live epochs"
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-200" />
                <span>Train / Tune AI Weights</span>
              </button>
            )}
          </div>
        </div>

        {/* Live On-the-Spot Directive Alert */}
        {onTheSpotDecision && (
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-white">{onTheSpotDecision.headline}: </span>
              <span className="text-slate-300">{onTheSpotDecision.actionDirective}</span>
              {onTheSpotDecision.reasoningNotes.length > 0 && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-800 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400 font-mono">
                  {onTheSpotDecision.reasoningNotes.map((note, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-indigo-400">›</span>
                      <span>{note}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4 Real-Time Predictive Indicators */}
        {aiPredictiveReport && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* 1. Golden Hour Survival Prognosis */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    Survivor Golden Hour
                  </span>
                  <span className="font-mono text-rose-300 font-bold">
                    {aiPredictiveReport.survivorGoldenHourRemainingMinutes}m left
                  </span>
                </div>
                <div className="mt-1.5 text-base font-bold text-white font-mono">
                  {aiPredictiveReport.survivorPredictedTempC}°C
                  <span className="text-[10px] text-slate-400 font-normal ml-1">core temperature</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                Rate: {(currentHyperparams?.goldenHourDecayRate ?? 0.00035).toFixed(5)} decay/min
              </div>
            </div>

            {/* 2. Methane Atmospheric Diffusion */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    CH4 Diffusion Arrival
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {aiPredictiveReport.methaneArrivalMinutes !== null ? `${aiPredictiveReport.methaneArrivalMinutes}m` : 'Standoff Safe'}
                  </span>
                </div>
                <div className="mt-1.5 text-base font-bold text-white font-mono">
                  {aiPredictiveReport.methanePlumeRadiusMeters}m
                  <span className="text-[10px] text-slate-400 font-normal ml-1">LEL plume radius</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                Diff Rate: {(currentHyperparams?.diffusionRate ?? 0.035).toFixed(3)} m²/s
              </div>
            </div>

            {/* 3. Drone Flight Reserve */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    Quadcopter Flight Time
                  </span>
                  <span className="font-mono text-sky-300 font-bold">
                    {aiPredictiveReport.dronePredictedFlightRemainingMinutes}m reserve
                  </span>
                </div>
                <div className="mt-1.5 text-base font-bold text-white font-mono">
                  {(droneTelemetry?.batteryPct ?? 96).toFixed(1)}%
                  <span className="text-[10px] text-slate-400 font-normal ml-1">batt / state: {droneTelemetry?.state ?? 'docked'}</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                Safe RTB threshold: 22.0%
              </div>
            </div>

            {/* 4. Forward Collision Risk & Safety Clearance */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
                    Trajectory Risk
                  </span>
                  <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    aiPredictiveReport.predictedCollisionRisk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                    aiPredictiveReport.predictedCollisionRisk === 'ELEVATED' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {aiPredictiveReport.predictedCollisionRisk}
                  </span>
                </div>
                <div className="mt-1.5 text-base font-bold text-white font-mono">
                  {aiPredictiveReport.optimalPathMetrics.safetyClearanceScore}/100
                  <span className="text-[10px] text-slate-400 font-normal ml-1">clearance score</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                Path dist: {aiPredictiveReport.optimalPathMetrics.totalDistanceM}m (~{aiPredictiveReport.optimalPathMetrics.estTransitSeconds}s)
              </div>
            </div>
          </div>
        )}

        {/* Hyperparameter Quick Calibration Bar */}
        {currentHyperparams && (
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-indigo-300 uppercase">
                Active AI Profile:
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                {currentHyperparams.profileName === 'safety_first' ? '🛡️ Hazmat Defense First' :
                 currentHyperparams.profileName === 'fast_response' ? '⚡ Rapid Golden-Hour Sprint' :
                 currentHyperparams.profileName === 'custom' ? '⚙️ Custom User-Tuned' :
                 '⚖️ Balanced Autonomous'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
              <span>ω_haz: <strong className="text-amber-300">{currentHyperparams.hazardAversionWeight.toFixed(1)}</strong></span>
              <span>λ_smooth: <strong className="text-sky-300">{currentHyperparams.smoothnessWeight.toFixed(1)}</strong></span>
              <span>ρ_wall: <strong className="text-indigo-300">{currentHyperparams.obstacleBufferMeters.toFixed(2)}m</strong></span>
              <span>H_pred: <strong className="text-purple-300">{currentHyperparams.lookaheadHorizonSeconds.toFixed(1)}s</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: Autonomous Tactical Reasoning Log (Audit Trail) */}
      <div className="bg-slate-950/80 border border-indigo-900/40 rounded-xl p-3.5 shadow-lg space-y-3">
        {/* Section Header with Category Filters and Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/60 text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                Tactical Reasoning Log
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Forensic Decision Audit Trail
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Real-time sensor triggers explaining why the rover diverted and why the drone deployed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={expandAll}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Collapse All
            </button>
            <button
              onClick={handleCopyAuditTrail}
              className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium transition-colors cursor-pointer shadow"
              title="Copy complete forensic audit trail to clipboard"
            >
              {auditTrailCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>Copied Audit Trail</span>
                </>
              ) : (
                <>
                  <FileText className="w-3 h-3" />
                  <span>Export Forensic Log</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium mr-1">Filter Decision:</span>
          {(
            [
              { key: 'all', label: 'All Decisions', count: 5 },
              { key: 'rover_diversion', label: 'Rover Diversion', count: 1 },
              { key: 'drone_deployment', label: 'Drone Deployment', count: 1 },
              { key: 'ai_pather', label: 'AI Pather Corridor', count: 1 },
              { key: 'life_signs', label: 'Life-Sign Fusion', count: 1 },
              { key: 'battery_safety', label: 'Battery & RTL', count: 1 },
            ] as { key: DecisionCategory; label: string; count: number }[]
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveCategory(filter.key)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === filter.key
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                activeCategory === filter.key ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Decision Cards List */}
        <div className="space-y-2.5 mt-2">
          {filteredDecisions.map((decision) => {
            const isExpanded = expandedIds[decision.id] ?? false;

            return (
              <div
                key={decision.id}
                className="bg-slate-900/90 border border-slate-800 rounded-lg overflow-hidden transition-colors hover:border-slate-700"
              >
                {/* Card Title Bar */}
                <div
                  onClick={() => toggleExpand(decision.id)}
                  className="flex items-center justify-between p-3 cursor-pointer select-none bg-slate-950/50 hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button className="p-0.5 text-slate-400 hover:text-slate-200">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-indigo-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-200 tracking-wide truncate">
                          {decision.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {decision.categoryLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xl">
                        {decision.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        decision.status === 'triggered'
                          ? 'bg-rose-950/70 text-rose-300 border-rose-800 animate-pulse'
                          : decision.status === 'active'
                          ? 'bg-sky-950/70 text-sky-300 border-sky-800'
                          : decision.status === 'completed'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700'
                      }`}
                    >
                      {decision.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Expanded Forensic Detail Drawer */}
                {isExpanded && (
                  <div className="p-3.5 pt-2 border-t border-slate-800/80 space-y-3 bg-slate-950/30 text-xs">
                    {/* 1. Sensor Trigger Snapshot Box */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 pb-1 border-b border-slate-800/60">
                        <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-indigo-400" />
                          Multi-Modal Sensor Telemetry Snapshot
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                            decision.sensorSnapshot.severity === 'critical'
                              ? 'bg-rose-900/40 text-rose-300 border border-rose-800'
                              : decision.sensorSnapshot.severity === 'elevated'
                              ? 'bg-amber-900/40 text-amber-300 border border-amber-800'
                              : 'bg-emerald-900/40 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {decision.sensorSnapshot.severity} Trigger Level
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-slate-500 font-mono">PRIMARY SENSOR:</span>{' '}
                          <span className="text-slate-200 font-semibold">{decision.sensorSnapshot.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono">LIVE READING:</span>{' '}
                          <span className="text-amber-300 font-mono font-bold">{decision.sensorSnapshot.reading}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-slate-500 font-mono">SAFETY THRESHOLD:</span>{' '}
                          <span className="text-slate-300 font-mono">{decision.sensorSnapshot.threshold}</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Algorithmic Rule & Safety Protocol */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                      <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                        <Compass className="w-3 h-3 text-sky-400" />
                        Regulatory Rule & Algorithmic Constraint
                      </div>
                      <div className="text-xs font-semibold text-indigo-200">
                        {decision.protocolRule}
                      </div>
                    </div>

                    {/* 3. Deep Tactical Reasoning Explanation */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                        <BrainCircuit className="w-3 h-3 text-amber-400" />
                        Tactical Reasoning Justification (Algorithmic "Why")
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                        {decision.tacticalExplanation}
                      </p>
                    </div>

                    {/* 4. Action Executed */}
                    <div className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-lg text-emerald-200 text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300 font-mono uppercase tracking-wider text-[10px] block mb-0.5">
                          Autonomous Vehicle Action Executed
                        </strong>
                        <span>{decision.actionExecuted}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Situational Matrix Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Dynamic Threat Level */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Dynamic Threat Level
            </span>
            <span className="font-mono text-rose-400 font-bold">LEVEL 4 / 5</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-rose-500 rounded-full w-4/5 animate-pulse" />
          </div>
          <div className="text-xs font-medium text-rose-300">
            {ch4Ppm > 10000 ? 'CRITICAL DUAL-THREAT HAZARD' : 'MODERATE SUBTERRANEAN HAZARD'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Methane gas pocket in West drift presents explosion hazard. East drift is blocked by 18m³ of rock collapse.
          </div>
        </div>

        {/* Survivor Triage Prognosis */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Survivor Prognosis
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              {Math.round(fusedProb * 100)}% Locked
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-200">
            Trapped Miner #4 "Randy" (Coordinates: 13.5m, 20.0m)
          </div>
          <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
            <div>Respiration: <strong className="text-rose-300">{respirationBpm} BPM</strong> (shallow)</div>
            <div>Estimated Survival Window: <strong className="text-amber-300">~3.5 to 4.5 Hours</strong></div>
            <div>Hypothermia Threat: <strong className="text-slate-300">Moderate ({tempC}°C Drift)</strong></div>
          </div>
        </div>

        {/* Cooperative Robot Tactics */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              Robot Collaboration Tactics
            </span>
            <span className="font-mono text-sky-400 font-bold">COOPERATIVE</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <div className="flex items-start gap-1">
              <span className="text-sky-400 font-bold">•</span>
              <span><strong>Ground Rover:</strong> Hold relay base at East Drift junction; provide high-power mesh comms.</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-sky-400 font-bold">•</span>
              <span><strong>Aerial Drone:</strong> Fly 1.85m AGL following AI Pather corridor over rubble. Battery: <strong>{droneBatt.toFixed(1)}%</strong>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Tactical Queries:
        </span>
        <button
          onClick={() => handlePromptChip('Evaluate electrical ignition hazard for drone brushless motors near West drift methane pocket')}
          className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
        >
          ⚡ Methane Ignition Risk
        </button>
        <button
          onClick={() => handlePromptChip('Why does the drone fly strictly along the AI Pather mine path instead of free space?')}
          className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
        >
          🛰️ AI Pather Corridor Flight Logic
        </button>
        <button
          onClick={() => handlePromptChip('Calculate survivor hypothermia risk and available extraction golden-hour window')}
          className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
        >
          ⏱️ Golden-Hour Window
        </button>
        <button
          onClick={() => handlePromptChip('Recommend extraction equipment and shoring protocol for the 18m³ collapsed rubble barrier')}
          className="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
        >
          ⛏️ Rubble Extraction Equipment
        </button>
      </div>

      {/* Custom Query Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runAiAnalysis();
          }}
          placeholder="Ask Gemini AI for specific tactical recommendations, gas safety limits, or drone flight advice..."
          className="flex-1 bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          id="btn-submit-ai-query"
          onClick={() => runAiAnalysis()}
          disabled={isLoading}
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Ask AI
        </button>
      </div>

      {/* Main Analysis Output Area */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 relative font-sans text-xs text-slate-200 leading-relaxed shadow-inner">
        {/* Top bar inside output */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-indigo-300">
              <BrainCircuit className="w-3.5 h-3.5" />
              SAR Tactical Briefing Document
            </span>
            <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {modelSource}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-[10px]"
            title="Copy analysis to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {demandNotice && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-800/60 text-indigo-200 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{demandNotice}</span>
          </div>
        )}

        {/* Content rendering */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <div className="text-xs font-medium text-indigo-200">
              Processing Multi-Modal Subterranean Telemetry...
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Evaluating Methane PPM, LiDAR obstacle cloud, FLIR thermal signals, and drone flight battery...
            </div>
          </div>
        ) : (
          <div className="space-y-3 prose prose-invert max-w-none text-xs">
            {analysisText.split('\n').map((line, idx) => {
              if (line.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-sm font-bold text-sky-300 mt-2 mb-1 flex items-center gap-1.5">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-xs font-bold text-amber-300 mt-2.5 mb-1 uppercase tracking-wider">
                    {line.replace('#### ', '')}
                  </h4>
                );
              }
              if (line.startsWith('- **')) {
                const parts = line.replace('- **', '').split('**:');
                return (
                  <div key={idx} className="flex items-start gap-1.5 ml-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>
                      <strong className="text-slate-100">{parts[0]}:</strong>
                      <span className="text-slate-300">{parts[1]}</span>
                    </span>
                  </div>
                );
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                return (
                  <div key={idx} className="flex items-start gap-2 ml-2 bg-slate-900/50 p-1.5 rounded border border-slate-800/80">
                    <span className="font-mono font-bold text-indigo-400">{line.slice(0, 3)}</span>
                    <span className="text-slate-200">{line.slice(3)}</span>
                  </div>
                );
              }
              if (line.trim().length === 0) {
                return <div key={idx} className="h-1" />;
              }
              return (
                <p key={idx} className="text-slate-300 leading-normal">
                  {line}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
