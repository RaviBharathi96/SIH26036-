import React, { useEffect, useRef, useState } from 'react';
import { MineSimulation } from '../simulation/MineSimulation';
import { 
  CameraViewMode, RoverTelemetry, DroneTelemetry, HazardZone, 
  SurvivorData, ActiveVehicle, OnTheSpotAiDecision, AiPredictiveReport 
} from '../types';
import { SlamMapCanvas } from './SlamMapCanvas';
<<<<<<< HEAD
import { Maximize2, Minimize2, Video, Flame, AlertTriangle, Crosshair, Plane, Bot, Sparkles, Radar, Wind, ShieldCheck } from 'lucide-react';
=======
import { OnTheSpotAiCopilot } from './OnTheSpotAiCopilot';
import { Maximize2, Minimize2, Video, Flame, AlertTriangle, Crosshair, Plane, Bot, Keyboard, BrainCircuit } from 'lucide-react';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

interface Viewport3DProps {
  viewMode: CameraViewMode;
  onViewModeChange: (m: CameraViewMode) => void;
  activeVehicle: ActiveVehicle;
  onToggleActiveVehicle: () => void;
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  hazardZones: HazardZone[];
  survivorData: SurvivorData | null;
  scanPoints: { x: number; y: number }[];
  pathHistory: { x: number; y: number }[];
  safePath: { x: number; y: number }[];
  simInstanceRef: React.MutableRefObject<MineSimulation | null>;
  onInitSim: (sim: MineSimulation) => void;
  onTheSpotDecision?: OnTheSpotAiDecision | null;
  predictiveReport?: AiPredictiveReport | null;
  onOpenTrainingStudio?: () => void;
  onLaunchDrone?: () => void;
  onReturnDrone?: () => void;
  onRecomputePath?: () => void;
<<<<<<< HEAD
  isAutonomousAiActive?: boolean;
  onToggleAutonomousAi?: () => void;
  onExecuteActionOnSpot?: (actionType?: string) => void;
  lastExecutedActionFeedback?: { action: string; detail: string; time: number } | null;
  onQuickTrainAi?: () => void;
  onAiPlanOnSpot?: () => void;
  onToggleGasInspection?: () => void;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

const Viewport3DComponent: React.FC<Viewport3DProps> = ({
  viewMode,
  onViewModeChange,
  activeVehicle,
  onToggleActiveVehicle,
  roverTelemetry,
  droneTelemetry,
  hazardZones,
  survivorData,
  scanPoints,
  pathHistory,
  safePath,
  simInstanceRef,
  onInitSim,
  onTheSpotDecision,
  predictiveReport,
  onOpenTrainingStudio,
  onLaunchDrone,
  onReturnDrone,
  onRecomputePath,
<<<<<<< HEAD
  isAutonomousAiActive,
  onToggleAutonomousAi,
  onExecuteActionOnSpot,
  lastExecutedActionFeedback,
  onQuickTrainAi,
  onAiPlanOnSpot,
  onToggleGasInspection,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showPipMap, setShowPipMap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
<<<<<<< HEAD
  const [showLidarRangerHud, setShowLidarRangerHud] = useState(true);
  const [lidarRangersActive, setLidarRangersActive] = useState(true);
  const [showGasHud, setShowGasHud] = useState(true);
=======
  const [showKeyboardHud, setShowKeyboardHud] = useState(false);
  const [showAiCopilot, setShowAiCopilot] = useState(true);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  const activeVehicleRef = useRef<ActiveVehicle>(activeVehicle);
  useEffect(() => {
    activeVehicleRef.current = activeVehicle;
  }, [activeVehicle]);

  const onToggleActiveVehicleRef = useRef(onToggleActiveVehicle);
  useEffect(() => {
    onToggleActiveVehicleRef.current = onToggleActiveVehicle;
  }, [onToggleActiveVehicle]);

  const onInitSimRef = useRef(onInitSim);
  useEffect(() => {
    onInitSimRef.current = onInitSim;
  }, [onInitSim]);

  useEffect(() => {
    if (!containerRef.current) return;
    const sim = new MineSimulation(containerRef.current, {
      onRoverTelemetry: () => {},
      onDroneTelemetry: () => {},
      onSurvivorUpdate: () => {},
      onScanData: () => {},
    });

    simInstanceRef.current = sim;
    onInitSimRef.current(sim);

    // Global keyboard listener for Rover and Drone teleop
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const keyLower = e.key.toLowerCase();
<<<<<<< HEAD
=======
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(keyLower);
        return next;
      });
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

      // Tab or V to switch between Rover and Drone
      if (e.key === 'Tab' || keyLower === 'v') {
        e.preventDefault();
        onToggleActiveVehicleRef.current?.();
        return;
      }

      if (activeVehicleRef.current === 'drone') {
        // Drone Controls
        if (keyLower === 'w' || e.key === 'ArrowUp') sim.setDronePitch(1.4);
        if (keyLower === 's' || e.key === 'ArrowDown') sim.setDronePitch(-1.2);
        if (keyLower === 'a' || e.key === 'ArrowLeft') sim.setDroneRoll(-1.2);
        if (keyLower === 'd' || e.key === 'ArrowRight') sim.setDroneRoll(1.2);
        if (keyLower === 'q') sim.setDroneYaw(1.2);
        if (keyLower === 'e') sim.setDroneYaw(-1.2);
        if (keyLower === 'r' || keyLower === ' ' || e.key === 'PageUp') {
          e.preventDefault();
          sim.setDroneVertical(1.2);
        }
        if (keyLower === 'f' || e.key === 'Shift' || e.key === 'PageDown') sim.setDroneVertical(-1.0);
        if (keyLower === 'h' || keyLower === 'x') sim.hoverDrone();
        if (keyLower === 't') sim.toggleDroneSpotlight();
        if (keyLower === 'g') sim.sendDroneToScoutRubble();
        if (keyLower === 'b') sim.returnDroneToRover();
        if (e.key === '1') sim.setDroneAltitudePreset(1.2);
        if (e.key === '2') sim.setDroneAltitudePreset(2.0);
        if (e.key === '3') sim.setDroneAltitudePreset(2.7);
      } else {
        // Rover Controls (pass isManual = true for smooth user override)
        if (keyLower === 'w' || e.key === 'ArrowUp') sim.setRoverSpeed(1.2, true);
        if (keyLower === 's' || e.key === 'ArrowDown') sim.setRoverSpeed(-0.9, true);
        if (keyLower === 'a' || e.key === 'ArrowLeft') sim.setRoverSteering(0.8, true);
        if (keyLower === 'd' || e.key === 'ArrowRight') sim.setRoverSteering(-0.8, true);
        if (keyLower === 'l') sim.toggleRoverHeadlights();
        if (keyLower === 'r') sim.toggleRoverLidar();
        if (keyLower === ' ' || keyLower === 'x') {
          e.preventDefault();
          sim.brakeRover();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyLower = e.key.toLowerCase();
<<<<<<< HEAD
=======
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(keyLower);
        return next;
      });
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

      if (activeVehicleRef.current === 'drone') {
        if (['w', 's', 'arrowup', 'arrowdown'].includes(keyLower)) sim.setDronePitch(0);
        if (['a', 'd', 'arrowleft', 'arrowright'].includes(keyLower)) sim.setDroneRoll(0);
        if (['q', 'e'].includes(keyLower)) sim.setDroneYaw(0);
        if (['r', 'f', ' ', 'shift', 'pageup', 'pagedown'].includes(keyLower)) sim.setDroneVertical(0);
      } else {
        if (['w', 's', 'arrowup', 'arrowdown'].includes(keyLower)) sim.setRoverSpeed(0, true);
        if (['a', 'd', 'arrowleft', 'arrowright'].includes(keyLower)) sim.setRoverSteering(0, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      sim.dispose();
    };
  }, []);

  // Update camera mode when changed externally
  useEffect(() => {
    if (simInstanceRef.current) {
      simInstanceRef.current.setViewMode(viewMode);
    }
  }, [viewMode, simInstanceRef]);

  const toggleFullscreen = () => {
    const el = document.getElementById('viewport-3d-wrapper');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const isMethaneCritical = (roverTelemetry?.ch4Ppm || 0) > 10000;

  return (
    <div
      id="viewport-3d-wrapper"
      className="relative w-full h-full min-h-[420px] bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col select-none"
    >
      {/* 3D WebGL Canvas container */}
      <div ref={containerRef} className="w-full h-full flex-1" />

      {/* Thermal IR Camera Visual Filter Overlay */}
      {viewMode === 'thermal_ir' && (
        <div className="pointer-events-none absolute inset-0 mix-blend-color-dodge bg-gradient-to-t from-purple-900/40 via-amber-700/20 to-cyan-500/20">
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-amber-500/20 border border-amber-500/60 px-3 py-1 rounded text-amber-300 text-xs font-mono">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>FLIR INFRARED [IRONBOW PALETTE] - TEMP RANGE: 10°C to 45°C</span>
          </div>
          {/* Target reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Crosshair className="w-16 h-16 text-amber-400/60 animate-pulse" />
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Tactical LiDAR View Ranger Overlay */}
      {viewMode === 'lidar_ranger' && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-cyan-950/90 border border-cyan-500/70 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-mono shadow-xl backdrop-blur-md">
            <Radar className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-bold tracking-wider">LIDAR VIEW RANGERS ACTIVE</span>
            <span className="text-cyan-500">|</span>
            <span className="text-cyan-300">HORIZON: 1.0m / 2.0m / 3.0m / 5.0m</span>
          </div>
        </div>
      )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
        {/* Left: Camera View & Robot Tag */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-slate-200">
          <Video className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white uppercase">{viewMode.replace('_', ' ')}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">FPS: 60</span>
<<<<<<< HEAD
=======
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">ROS 2: JAZZY</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
        </div>

        {/* Center: Active Vehicle Switcher Badge & Hazard Banner */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            id="hud-toggle-vehicle"
            onClick={onToggleActiveVehicle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs cursor-pointer shadow-md transition-all ${
              activeVehicle === 'drone'
                ? 'bg-sky-950/85 border-sky-500/80 text-sky-300 hover:bg-sky-900'
                : 'bg-amber-950/85 border-amber-500/80 text-amber-300 hover:bg-amber-900'
            }`}
            title="Click or press TAB to switch active pilot control between Rover and Drone"
          >
            {activeVehicle === 'drone' ? (
              <>
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold">PILOTING: SCOUT DRONE</span>
                <span className="text-[10px] text-sky-400/80 font-sans hidden sm:inline">[TAB: Rover]</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">PILOTING: ROVER</span>
                <span className="text-[10px] text-amber-400/80 font-sans hidden sm:inline">[TAB: Drone]</span>
              </>
            )}
          </button>

          {isMethaneCritical && (
            <div className="flex items-center gap-2 bg-red-950/90 border border-red-700 text-red-300 px-3 py-1.5 rounded-lg shadow-lg font-mono text-xs animate-bounce">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-bold hidden md:inline">METHANE SPIKE: {roverTelemetry?.ch4Ppm} PPM</span>
            </div>
          )}
        </div>

        {/* Right: Controls & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
<<<<<<< HEAD
          {onAiPlanOnSpot && (
            <button
              id="btn-hud-ai-plan-on-spot"
              onClick={onAiPlanOnSpot}
              className="flex items-center gap-1.5 px-2.5 py-1 border border-amber-500/60 bg-amber-950/70 hover:bg-amber-900 text-amber-200 rounded-lg text-xs font-mono transition-all cursor-pointer shadow hover:scale-105 active:scale-95"
              title="Run AI Planner On The Spot: Compute optimal rescue corridor and update waypoints [O]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span className="hidden sm:inline font-bold">AI Plan [O]</span>
            </button>
          )}
          <button
            id="btn-hud-lidar-view"
            onClick={() => {
              if (viewMode === 'lidar_ranger') {
                onViewModeChange('orbit');
              } else {
                onViewModeChange('lidar_ranger');
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer shadow ${
              viewMode === 'lidar_ranger'
                ? 'bg-cyan-600 text-white font-bold border border-cyan-400'
                : 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60'
            }`}
            title="Toggle LiDAR View Ranger Mode [Concentric Range Rings & Beams]"
          >
            <Radar className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">LiDAR Rangers</span>
          </button>
          <button
            id="btn-hud-gas-inspect"
            onClick={() => {
              if (onToggleGasInspection) {
                onToggleGasInspection();
              } else {
                simInstanceRef.current?.toggleGasInspection();
              }
              setShowGasHud(true);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer shadow ${
              roverTelemetry?.gasInspection?.active
                ? 'bg-emerald-600 text-white font-bold border border-emerald-400 shadow-emerald-500/20 shadow-lg'
                : 'bg-slate-900/80 hover:bg-slate-800 text-emerald-300 border border-emerald-800/60'
            }`}
            title="Toggle Rover Multi-Gas & Air Quality Inspection Sweep"
          >
            <Wind className={`w-3.5 h-3.5 ${roverTelemetry?.gasInspection?.active ? 'animate-bounce text-emerald-200' : 'text-emerald-400'}`} />
            <span className="hidden sm:inline">Gas & Air Check</span>
=======
          <button
            id="btn-toggle-ai-copilot"
            onClick={() => setShowAiCopilot(!showAiCopilot)}
            className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              showAiCopilot 
                ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-950/50' 
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
            }`}
            title="Toggle Real-Time On-The-Spot AI Copilot Overlay"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
          <button
            id="btn-toggle-keyhud"
            onClick={() => setShowKeyboardHud(!showKeyboardHud)}
            className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              showKeyboardHud 
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300' 
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
            }`}
            title="Toggle Visual Keyboard Teleoperation HUD"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keyboard HUD</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </button>
          <button
            id="btn-toggle-pip"
            onClick={() => setShowPipMap(!showPipMap)}
            className="px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            {showPipMap ? 'Hide SLAM PIP' : 'Show SLAM PIP'}
          </button>
          <button
            id="btn-fullscreen"
            onClick={toggleFullscreen}
            className="p-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-slate-300 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Bottom Floating Telemetry Bar */}
=======
      {/* Real-Time On-The-Spot AI Copilot Floating HUD */}
      {showAiCopilot && onTheSpotDecision && predictiveReport && (
        <div className="absolute top-14 right-3 pointer-events-auto max-w-sm sm:max-w-md w-full z-20 transition-all animate-in fade-in duration-200">
          <OnTheSpotAiCopilot
            decision={onTheSpotDecision}
            prediction={predictiveReport}
            roverTelemetry={roverTelemetry}
            droneTelemetry={droneTelemetry}
            survivorData={survivorData}
            onOpenTrainingStudio={onOpenTrainingStudio || (() => {})}
            onLaunchDrone={onLaunchDrone}
            onReturnDrone={onReturnDrone}
            onRecomputePath={onRecomputePath}
          />
        </div>
      )}

      {/* Interactive On-Screen Keyboard Teleop HUD */}
      {showKeyboardHud && (
        <div className="absolute top-16 left-3 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-2xl font-mono text-xs max-w-xs transition-all">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-200">
              <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeVehicle === 'drone' ? 'Drone Flight Keys' : 'Rover Drive Keys'}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300">
              [TAB] TO SWITCH
            </span>
          </div>

          {activeVehicle === 'rover' ? (
            <div className="space-y-2">
              {/* Rover Movement WASD Matrix */}
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-7 flex items-center justify-center rounded border font-bold text-xs transition-all ${
                  pressedKeys.has('w') || pressedKeys.has('arrowup')
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50 scale-95' 
                    : 'bg-slate-800/90 text-slate-300 border-slate-700'
                }`}>
                  W
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-8 h-7 flex items-center justify-center rounded border font-bold text-xs transition-all ${
                    pressedKeys.has('a') || pressedKeys.has('arrowleft')
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50 scale-95' 
                      : 'bg-slate-800/90 text-slate-300 border-slate-700'
                  }`}>
                    A
                  </div>
                  <div className={`w-8 h-7 flex items-center justify-center rounded border font-bold text-xs transition-all ${
                    pressedKeys.has('s') || pressedKeys.has('arrowdown')
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50 scale-95' 
                      : 'bg-slate-800/90 text-slate-300 border-slate-700'
                  }`}>
                    S
                  </div>
                  <div className={`w-8 h-7 flex items-center justify-center rounded border font-bold text-xs transition-all ${
                    pressedKeys.has('d') || pressedKeys.has('arrowright')
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/50 scale-95' 
                      : 'bg-slate-800/90 text-slate-300 border-slate-700'
                  }`}>
                    D
                  </div>
                </div>
              </div>

              {/* Utility keys */}
              <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
                <div className={`py-1 px-1 text-center rounded border font-bold transition-all ${
                  pressedKeys.has(' ') || pressedKeys.has('x')
                    ? 'bg-rose-500 text-white border-rose-300 shadow'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}>
                  [SPACE] HALT
                </div>
                <div className={`py-1 px-1 text-center rounded border font-bold transition-all ${
                  pressedKeys.has('l')
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}>
                  [L] LIGHTS
                </div>
                <div className={`py-1 px-1 text-center rounded border font-bold transition-all ${
                  pressedKeys.has('r')
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}>
                  [R] LIDAR
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Drone Keys */}
              <div className="grid grid-cols-4 gap-1 text-[10px] text-center">
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('w') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[W] PITCH+</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('s') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[S] PITCH-</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('a') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[A] ROLL L</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('d') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[D] ROLL R</div>

                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('q') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[Q] YAW L</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('e') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[E] YAW R</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has(' ') || pressedKeys.has('r') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[SPC] CLIMB</div>
                <div className={`py-1 rounded border font-bold transition-all ${
                  pressedKeys.has('shift') || pressedKeys.has('f') ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>[SHF] SINK</div>
              </div>

              <div className="grid grid-cols-4 gap-1 text-[9px] text-center pt-1 border-t border-slate-800">
                <div className={`py-0.5 rounded border font-bold ${
                  pressedKeys.has('h') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                }`}>[H] HOVER</div>
                <div className={`py-0.5 rounded border font-bold ${
                  pressedKeys.has('t') ? 'bg-amber-500 text-slate-950' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                }`}>[T] LIGHT</div>
                <div className={`py-0.5 rounded border font-bold ${
                  pressedKeys.has('g') ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                }`}>[G] SCOUT</div>
                <div className={`py-0.5 rounded border font-bold ${
                  pressedKeys.has('b') ? 'bg-purple-500 text-slate-950' : 'bg-slate-800/60 text-slate-400 border-slate-700'
                }`}>[B] DOCK</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Telemetry & Keyboard Controls Bar */}
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-[11px] text-slate-300 flex items-center gap-3">
          <div>
            <span className="text-slate-500">CH4: </span>
            <span className={(roverTelemetry?.ch4Ppm || 0) > 5000 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
              {roverTelemetry?.ch4Ppm || 20} ppm
            </span>
          </div>
          <div>
<<<<<<< HEAD
            <span className="text-slate-500">O2: </span>
            <span className={(roverTelemetry?.o2Percent ?? 20.9) < 19.5 ? 'text-amber-400 font-bold' : 'text-cyan-300 font-bold'}>
              {roverTelemetry?.o2Percent ?? 20.9}%
            </span>
          </div>
          <div>
            <span className="text-slate-500">AIR QUAL: </span>
            <span className={
              (roverTelemetry?.gasInspection?.airQualityStatus === 'EXPLOSIVE_RISK' || (roverTelemetry?.airQualityScore ?? 96) < 40)
                ? 'text-red-400 font-bold animate-pulse'
                : (roverTelemetry?.gasInspection?.airQualityStatus === 'HAZARDOUS' || (roverTelemetry?.airQualityScore ?? 96) < 70)
                ? 'text-amber-400 font-bold'
                : 'text-emerald-400 font-bold'
            }>
              {roverTelemetry?.airQualityScore ?? 96}/100
            </span>
          </div>
          <div>
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            <span className="text-slate-500">ALT: </span>
            <span className="text-sky-300 font-bold">
              {droneTelemetry?.altitude || 0}m
            </span>
          </div>
          <div>
            <span className="text-slate-500">TEMP: </span>
            <span>{roverTelemetry?.temperatureC || 16.4}°C</span>
          </div>
<<<<<<< HEAD
        </div>
      </div>

      {/* Floating LiDAR View Rangers Widget */}
      {showLidarRangerHud && (
        <div className="absolute top-14 left-3 pointer-events-auto bg-slate-950/85 backdrop-blur-md border border-cyan-700/60 rounded-xl p-3 shadow-2xl text-xs font-mono text-slate-200 w-64 transition-all">
          <div className="flex items-center justify-between border-b border-cyan-800/40 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Radar className="w-4 h-4 text-cyan-400" />
              <span>LIDAR RANGERS</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const next = simInstanceRef.current?.toggleLidarRangers() ?? !lidarRangersActive;
                  setLidarRangersActive(next);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                  lidarRangersActive
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500 hover:bg-cyan-900'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
                title="Toggle LiDAR range rings and 36-ray laser beams on/off"
              >
                {lidarRangersActive ? 'BEAMS: ON' : 'BEAMS: OFF'}
              </button>
              <button
                onClick={() => setShowLidarRangerHud(false)}
                className="text-slate-500 hover:text-slate-300 px-1 text-xs cursor-pointer"
                title="Hide Rangers HUD"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 4-Directional Laser Rangefinder Readouts */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">FORWARD (0°):</span>
              <span className={`font-bold ${
                (roverTelemetry?.lidarRanges?.front ?? 5) < 1.2
                  ? 'text-red-400 animate-pulse'
                  : (roverTelemetry?.lidarRanges?.front ?? 5) < 2.2
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {(roverTelemetry?.lidarRanges?.front ?? 5.0).toFixed(2)} m
              </span>
            </div>
            {/* Front Range Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${
                  (roverTelemetry?.lidarRanges?.front ?? 5) < 1.2
                    ? 'bg-red-500'
                    : (roverTelemetry?.lidarRanges?.front ?? 5) < 2.2
                    ? 'bg-amber-400'
                    : 'bg-cyan-400'
                }`}
                style={{ width: `${Math.min(100, ((roverTelemetry?.lidarRanges?.front ?? 5) / 8.0) * 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">LEFT (-90°)</div>
                <div className="text-sky-300 font-bold">
                  {(roverTelemetry?.lidarRanges?.left ?? 2.1).toFixed(2)} m
                </div>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">RIGHT (+90°)</div>
                <div className="text-sky-300 font-bold">
                  {(roverTelemetry?.lidarRanges?.right ?? 2.1).toFixed(2)} m
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-slate-400">REAR (180°):</span>
              <span className="text-slate-300 font-bold">
                {(roverTelemetry?.lidarRanges?.rear ?? 8.0).toFixed(2)} m
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">MIN CLEARANCE:</span>
              <span className={`font-bold ${
                (roverTelemetry?.lidarRanges?.minRange ?? 2.1) < 1.0
                  ? 'text-red-400'
                  : 'text-cyan-300'
              }`}>
                {(roverTelemetry?.lidarRanges?.minRange ?? 2.1).toFixed(2)} m
              </span>
            </div>
          </div>

          {/* Bottom Card Controls */}
          <div className="mt-2 pt-2 border-t border-cyan-800/30 flex items-center justify-between">
            <span className="text-[10px] text-cyan-400/80">RINGS: 1m / 2m / 3m / 5m</span>
            <button
              onClick={() => {
                if (viewMode === 'lidar_ranger') {
                  onViewModeChange('orbit');
                } else {
                  onViewModeChange('lidar_ranger');
                }
              }}
              className="text-[10px] px-2 py-0.5 rounded bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700/60 cursor-pointer"
            >
              {viewMode === 'lidar_ranger' ? 'Exit Cam' : 'Ranger Cam'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Tactical Gas & Air Quality Inspection Widget */}
      {showGasHud && (roverTelemetry?.gasInspection?.active || roverTelemetry?.gasInspection?.phase === 'inspection_complete') && (
        <div className="absolute top-14 right-3 pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-emerald-600/60 rounded-xl p-3 shadow-2xl text-xs font-mono text-slate-200 w-80 transition-all z-20">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <Wind className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>ROVER GAS & AIR SWEEP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                roverTelemetry?.gasInspection?.phase === 'inspection_complete'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse'
              }`}>
                {roverTelemetry?.gasInspection?.phase === 'inspection_complete' ? 'CERTIFIED' : 'ACTIVE'}
              </span>
              <button
                onClick={() => setShowGasHud(false)}
                className="text-slate-500 hover:text-slate-300 px-1 text-xs cursor-pointer"
                title="Hide Gas HUD"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Inspection Phase & Progress */}
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-semibold">{roverTelemetry?.gasInspection?.phaseLabel}</span>
              <span className="text-emerald-400 font-bold">{roverTelemetry?.gasInspection?.progressPct ?? 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${roverTelemetry?.gasInspection?.progressPct ?? 0}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              📍 <span className="text-slate-300">{roverTelemetry?.gasInspection?.targetLocationName}</span>
            </div>
          </div>

          {/* Multi-Gas Grid */}
          <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900/80 rounded-lg border border-slate-800 mb-2">
            <div>
              <span className="text-[10px] text-slate-400 block">OXYGEN (O2):</span>
              <span className={`text-xs font-bold ${
                (roverTelemetry?.o2Percent ?? 20.9) < 19.5 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {roverTelemetry?.o2Percent ?? 20.9}%
              </span>
              <span className="text-[9px] text-slate-500 ml-1">Safe &gt;19.5%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">METHANE (CH4):</span>
              <span className={`text-xs font-bold ${
                (roverTelemetry?.ch4Ppm ?? 20) > 5000 ? 'text-red-400' : (roverTelemetry?.ch4Ppm ?? 20) > 1000 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {roverTelemetry?.ch4Ppm ?? 20} ppm
              </span>
              <span className="text-[9px] text-slate-500 ml-1">
                ({(((roverTelemetry?.ch4Ppm ?? 20) / 50000) * 100).toFixed(1)}% LEL)
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">CARBON MONOXIDE:</span>
              <span className="text-xs font-bold text-slate-300">
                {roverTelemetry?.coPpm ?? 12} ppm
              </span>
              <span className="text-[9px] text-slate-500 ml-1">TLV: 25 ppm</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">AIR QUALITY SCORE:</span>
              <span className={`text-xs font-bold ${
                (roverTelemetry?.airQualityScore ?? 96) > 85 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {roverTelemetry?.airQualityScore ?? 96}/100
              </span>
              <span className="text-[9px] text-slate-500 ml-1">
                [{roverTelemetry?.gasInspection?.airQualityStatus ?? 'OPTIMAL'}]
              </span>
            </div>
          </div>

          {/* Operational Notes */}
          <div className="text-[10px] text-slate-300 bg-emerald-950/30 border border-emerald-800/40 p-1.5 rounded mb-2">
            💡 {roverTelemetry?.gasInspection?.notes}
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between pt-1 border-t border-emerald-800/30">
            <span className="text-[9px] text-slate-400">Continuous sniffer mast active</span>
            <button
              onClick={() => {
                if (onToggleGasInspection) {
                  onToggleGasInspection();
                } else {
                  simInstanceRef.current?.toggleGasInspection();
                }
              }}
              className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 cursor-pointer"
            >
              {roverTelemetry?.gasInspection?.active ? 'Pause Inspection' : 'Resume Inspection'}
            </button>
          </div>
        </div>
      )}

=======
          <div className="text-slate-400 text-[10px] hidden md:block">
            {activeVehicle === 'drone' ? (
              <span className="text-sky-300/90">
                [DRONE: WASD pitch/roll | QE yaw | Space/Shift altitude | H hover | TAB switch]
              </span>
            ) : (
              <span className="text-amber-300/90">
                [ROVER: WASD drive | L lights | R LiDAR | TAB switch]
              </span>
            )}
          </div>
        </div>
      </div>

>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      {/* Mini Picture-in-Picture 2D SLAM Map (Bottom-Right) */}
      {showPipMap && (
        <div className="absolute bottom-3 right-3 w-64 h-48 rounded-lg overflow-hidden border border-slate-700/80 shadow-2xl pointer-events-auto bg-slate-950/90 backdrop-blur-md transition-all">
          <div className="absolute top-1.5 left-2 z-10 flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded">
            <span>RVIZ2 OCCUPANCY GRID</span>
          </div>
          <SlamMapCanvas
            roverTelemetry={roverTelemetry}
            droneTelemetry={droneTelemetry}
            hazardZones={hazardZones}
            survivorData={survivorData}
            scanPoints={scanPoints}
            pathHistory={pathHistory}
            safePath={safePath}
          />
        </div>
      )}
    </div>
  );
};

export const Viewport3D = React.memo(Viewport3DComponent);

