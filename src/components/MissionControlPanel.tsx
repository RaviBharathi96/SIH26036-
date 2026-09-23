import React, { useState } from 'react';
import { RoverTelemetry, DroneTelemetry, CameraViewMode, ActiveVehicle, PatrolExecutionStatus } from '../types';
import { 
  Play, Pause, Square, RotateCcw, Lightbulb, Radar, Send, Home, 
  Battery, BatteryCharging, BatteryWarning, Wifi, Compass, Gauge, AlertOctagon,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  RotateCw, RotateCcw as RotateCounterClockwise,
  Plane, Bot, Crosshair, ArrowUpCircle, ArrowDownCircle,
  Sliders, ShieldCheck, Zap, ChevronsUp, ChevronsDown, Clock, Activity,
<<<<<<< HEAD
  FileText, MapPin, CheckCircle2, Wind
=======
  FileText, MapPin, CheckCircle2
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
} from 'lucide-react';

interface MissionControlPanelProps {
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  currentView: CameraViewMode;
  onSetView: (v: CameraViewMode) => void;
  onStartMission: () => void;
  onStartFullPatrol?: () => void;
  onPausePatrol?: () => void;
  onResumePatrol?: () => void;
  onStopPatrol?: () => void;
  patrolStatus?: PatrolExecutionStatus;
  onOpenReport?: () => void;
  onResetSimulation: () => void;
  // Rover
  onRoverSpeed: (speed: number) => void;
  onRoverSteer: (steer: number) => void;
  onToggleHeadlights: () => void;
  onToggleLidar: () => void;
<<<<<<< HEAD
  onToggleGasInspection?: () => void;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  // Drone
  activeVehicle: ActiveVehicle;
  onSetActiveVehicle: (v: ActiveVehicle) => void;
  onDeployDrone: () => void;
  onScoutRubble: () => void;
  onReturnDrone: () => void;
  onDronePitch: (pitch: number) => void;
  onDroneRoll: (roll: number) => void;
  onDroneVertical: (vert: number) => void;
  onDroneYaw: (rate: number) => void;
  onDroneHover: () => void;
  onDroneLand: () => void;
  onDroneAltitudePreset: (alt: number) => void;
  onToggleDroneSpotlight: () => void;
}

const MissionControlPanelComponent: React.FC<MissionControlPanelProps> = ({
  roverTelemetry,
  droneTelemetry,
  currentView,
  onSetView,
  onStartMission,
  onStartFullPatrol,
  onPausePatrol,
  onResumePatrol,
  onStopPatrol,
  patrolStatus,
  onOpenReport,
  onResetSimulation,
  onRoverSpeed,
  onRoverSteer,
  onToggleHeadlights,
  onToggleLidar,
<<<<<<< HEAD
  onToggleGasInspection,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  activeVehicle,
  onSetActiveVehicle,
  onDeployDrone,
  onScoutRubble,
  onReturnDrone,
  onDronePitch,
  onDroneRoll,
  onDroneVertical,
  onDroneYaw,
  onDroneHover,
  onDroneLand,
  onDroneAltitudePreset,
  onToggleDroneSpotlight,
}) => {
  const isDroneAirborne = droneTelemetry?.state && droneTelemetry.state !== 'docked';

  const isPatrolActive = patrolStatus && (patrolStatus.phase === 'running' || patrolStatus.phase === 'paused');
  const isPatrolCompleted = patrolStatus && patrolStatus.phase === 'completed';

  const formatFlightTime = (seconds?: number) => {
    if (seconds === undefined || seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const droneBattPct = droneTelemetry?.batteryPct ?? 94;
  const isBattCritical = droneBattPct < 20;
  const isBattWarning = droneBattPct >= 20 && droneBattPct < 35;
  const battBarColor = isBattCritical ? 'bg-rose-500' : isBattWarning ? 'bg-amber-500' : 'bg-emerald-500';
  const battTextColor = isBattCritical ? 'text-rose-400' : isBattWarning ? 'text-amber-400' : 'text-emerald-400';

  return (
    <div id="mission-control-panel" className="flex flex-col gap-3 h-full bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 text-slate-100 shadow-xl backdrop-blur-md overflow-y-auto">
      {/* Real-time Patrol Status & Control Card */}
      {patrolStatus && (isPatrolActive || isPatrolCompleted) && (
        <div id="active-patrol-status-card" className="p-3 bg-slate-950/90 border border-emerald-500/40 rounded-xl space-y-2.5 shadow-lg shadow-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {patrolStatus.phase === 'running' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  patrolStatus.phase === 'running' ? 'bg-emerald-500' :
                  patrolStatus.phase === 'paused' ? 'bg-amber-400' : 'bg-sky-400'
                }`}></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                {patrolStatus.mode === 'full_patrol' ? 'Full Tunnel Patrol' :
                 patrolStatus.mode === 'direct_rescue' ? 'Direct Rescue Mission' : 'Custom Waypoint Patrol'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                patrolStatus.phase === 'running' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                patrolStatus.phase === 'paused' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                'bg-sky-500/20 text-sky-300 border-sky-500/40'
              }`}>
                {patrolStatus.phase}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {patrolStatus.step}/{patrolStatus.totalSteps}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span className="truncate pr-2">{patrolStatus.stepName}</span>
              <span className="font-semibold text-slate-200 shrink-0">{patrolStatus.progressPct}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  patrolStatus.phase === 'paused' ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${patrolStatus.progressPct}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-tight">
            {patrolStatus.stepDescription}
          </p>

          {/* Patrol Action Buttons */}
          <div className="flex items-center gap-1.5 pt-1">
            {patrolStatus.phase === 'running' ? (
              <button
                id="btn-patrol-pause"
                onClick={onPausePatrol}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-amber-600/90 hover:bg-amber-500 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer"
                title="Pause Patrol"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            ) : patrolStatus.phase === 'paused' ? (
              <button
                id="btn-patrol-resume"
                onClick={onResumePatrol}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer"
                title="Resume Patrol"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            ) : null}

            <button
              id="btn-patrol-stop"
              onClick={onStopPatrol}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-rose-600/80 hover:bg-rose-500 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer"
              title="Stop & Abort Patrol"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Abort</span>
            </button>
          </div>
        </div>
      )}

      {/* Top action rows */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <button
            id="btn-start-mission"
            onClick={onStartMission}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-md shadow-emerald-900/30 cursor-pointer"
            title="Deploy Direct Autonomous Rescue Mission to East Drift"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Direct Rescue</span>
          </button>

          {onStartFullPatrol && (
            <button
              id="btn-start-full-patrol"
              onClick={onStartFullPatrol}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-md shadow-amber-900/30 cursor-pointer"
              title="Full Multi-Tunnel Patrol across all 9 mine sectors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Full Patrol</span>
            </button>
          )}

          <button
            id="btn-reset-sim"
            onClick={onResetSimulation}
            className="flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {onOpenReport && (
          <button
            id="btn-open-report-panel"
            onClick={onOpenReport}
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 bg-sky-950/70 hover:bg-sky-900/90 border border-sky-700/60 text-sky-300 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Generate Understandable Rescue Report</span>
          </button>
        )}
      </div>

      {/* Vehicle Control Selector Tabs */}
      <div className="flex bg-slate-950/80 p-1 rounded-lg border border-slate-800 gap-1">
        <button
          id="tab-rover-control"
          onClick={() => onSetActiveVehicle('rover')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            activeVehicle === 'rover'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-amber-400" />
          <span>Rover (Ground)</span>
        </button>

        <button
          id="tab-drone-control"
          onClick={() => onSetActiveVehicle('drone')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            activeVehicle === 'drone'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Plane className="w-3.5 h-3.5 text-sky-400" />
          <span>Drone (Aerial)</span>
          {isDroneAirborne && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          )}
        </button>
      </div>

      {/* Dual Vehicle Telemetry Summary */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Rover Telemetry Box */}
        <div className={`bg-slate-950/80 border rounded-lg p-2.5 transition-colors ${
          activeVehicle === 'rover' ? 'border-amber-500/40 shadow-sm shadow-amber-950/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between font-bold text-amber-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Bot className="w-3 h-3" />
              ROVER
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
              {roverTelemetry?.mode || 'STANDBY'}
            </span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1"><Gauge className="w-3 h-3" /> Speed</span>
              <span>{roverTelemetry?.speed || 0} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3" /> Battery</span>
              <span className="text-emerald-400">{roverTelemetry?.batteryPct || 100}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1"><Compass className="w-3 h-3" /> Position</span>
              <span>[{roverTelemetry?.position.x}, {roverTelemetry?.position.z}]</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1"><Wifi className="w-3 h-3" /> LoRa Mesh</span>
              <span>{roverTelemetry?.commsRssi || -45} dBm</span>
            </div>
          </div>
        </div>

        {/* Drone Telemetry Box */}
        <div className={`bg-slate-950/80 border rounded-lg p-2.5 transition-colors ${
          activeVehicle === 'drone' ? 'border-sky-500/40 shadow-sm shadow-sky-950/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between font-bold text-sky-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Plane className="w-3 h-3" />
              DRONE
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
              {droneTelemetry?.state || 'DOCKED'}
            </span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Altitude</span>
              <span className="text-sky-300 font-bold">{droneTelemetry?.altitude || 0} m</span>
            </div>

            {/* Visual Battery Level Indicator */}
            <div className="space-y-1 py-1 px-1.5 bg-slate-950/50 rounded border border-slate-800/60">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 flex items-center gap-1 font-sans font-medium">
                  {droneTelemetry?.state === 'docked' ? (
                    <BatteryCharging className="w-3 h-3 text-sky-400 animate-pulse" />
                  ) : isBattCritical ? (
                    <BatteryWarning className="w-3 h-3 text-rose-400 animate-bounce" />
                  ) : (
                    <Battery className="w-3 h-3 text-emerald-400" />
                  )}
                  Battery
                </span>
                <span className={`font-bold font-mono ${battTextColor}`}>
                  {droneBattPct}%
                </span>
              </div>
              {/* Visual gauge bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${battBarColor}`}
                  style={{ width: `${Math.max(4, Math.min(100, droneBattPct))}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400">
                <span className="flex items-center gap-0.5 text-slate-500 font-sans">
                  <Clock className="w-2.5 h-2.5" />
                  {droneTelemetry?.state === 'docked' ? 'Docked' : 'Flight Left'}
                </span>
                <span className="font-semibold text-sky-300 font-mono">
                  {droneTelemetry?.state === 'docked' ? 'Full Reserve' : formatFlightTime(droneTelemetry?.estimatedFlightSecondsRemaining)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Rel Dist</span>
              <span>{droneTelemetry?.relDistanceToRover || 0} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Lock</span>
              <span className={droneTelemetry?.thermalLocked ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                {droneTelemetry?.thermalLocked ? 'ACQUIRED' : 'SEARCHING'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED DRONE FLIGHT DECK (When Drone is Active) */}
      {activeVehicle === 'drone' ? (
        <div className="flex flex-col gap-2.5">
          {/* Visual Battery Level & Scouting Endurance Card */}
          <div className={`p-2.5 rounded-lg border transition-all ${
            isBattCritical 
              ? 'bg-rose-950/40 border-rose-600/70 shadow-lg shadow-rose-950/50' 
              : 'bg-slate-950/70 border-sky-900/50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {droneTelemetry?.state === 'docked' ? (
                  <BatteryCharging className="w-4 h-4 text-sky-400 animate-pulse" />
                ) : isBattCritical ? (
                  <BatteryWarning className="w-4 h-4 text-rose-400 animate-bounce" />
                ) : (
                  <Battery className="w-4 h-4 text-emerald-400" />
                )}
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Scout Flight Battery
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                  isBattCritical 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                    : isBattWarning 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {droneBattPct}%
                </span>
              </div>
            </div>

            {/* Segmented & Continuous Visual Battery Gauge */}
            <div className="space-y-1 mb-2">
              <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
                <div 
                  className={`h-full rounded-full transition-all duration-300 shadow-sm ${battBarColor} ${
                    isBattCritical ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${Math.max(3, Math.min(100, droneBattPct))}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-mono px-0.5">
                <span>0% (Cutoff)</span>
                <span className="text-amber-400/80">20% RTB Limit</span>
                <span className="text-emerald-400/80">100% (18.5m)</span>
              </div>
            </div>

            {/* Primary Remaining Flight Time Display */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/80 rounded-lg p-2 border border-slate-800 font-mono">
              <div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                  <Clock className="w-3 h-3 text-sky-400" />
                  Remaining Flight
                </div>
                <div className="text-sm font-bold text-sky-300 mt-0.5">
                  {droneTelemetry?.state === 'docked' 
                    ? '18m 30s' 
                    : formatFlightTime(droneTelemetry?.estimatedFlightSecondsRemaining)}
                </div>
                <div className="text-[9px] text-slate-500">
                  {droneTelemetry?.state === 'docked' ? 'Standby capacity' : 'Safe endurance window'}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  Power Draw
                </div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">
                  {droneTelemetry?.state === 'docked' 
                    ? '+0.4% /s (CHG)' 
                    : `${droneTelemetry?.batteryDischargeRate || 4.9}% /min`}
                </div>
                <div className="text-[9px] text-slate-500">
                  {droneTelemetry?.spotlight ? 'High (LED active)' : 'Nominal hover'}
                </div>
              </div>
            </div>

            {/* Low Battery Warning / Return to Rover Alert */}
            {isBattCritical && (
              <div className="mt-2 p-1.5 rounded bg-rose-950/80 border border-rose-500/60 text-rose-200 text-[10px] flex items-center gap-1.5 animate-pulse">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span><strong>CRITICAL FLIGHT RESERVE:</strong> Initiate RTB Dock immediately to prevent crash!</span>
              </div>
            )}
          </div>

          {/* Quick Flight Commands */}
          <div className="bg-slate-950/60 border border-sky-900/40 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-sky-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              <span>Aerial Flight Commands</span>
              <span className="text-[10px] text-sky-400/80 font-mono">
                {isDroneAirborne ? 'AIRBORNE' : 'ON ROVER DOCK'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-xs">
              <button
                id="btn-drone-takeoff"
                onClick={onDeployDrone}
                className="flex flex-col items-center justify-center p-2 rounded bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/60 text-sky-200 transition-colors cursor-pointer"
                title="Launch drone from rover deck to 1.8m altitude"
              >
                <Send className="w-3.5 h-3.5 mb-1 text-sky-400" />
                <span className="text-[10px] font-medium">Takeoff</span>
              </button>

              <button
                id="btn-drone-scout-rubble"
                onClick={onScoutRubble}
                className="flex flex-col items-center justify-center p-2 rounded bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/60 text-purple-200 transition-colors cursor-pointer"
                title="Autonomously fly over collapsed rock barrier to find survivor"
              >
                <AlertOctagon className="w-3.5 h-3.5 mb-1 text-purple-400" />
                <span className="text-[10px] font-medium">Over Rubble</span>
              </button>

              <button
                id="btn-drone-hover"
                onClick={onDroneHover}
                className="flex flex-col items-center justify-center p-2 rounded bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-200 transition-colors cursor-pointer"
                title="Hold current altitude and horizontal position"
              >
                <ShieldCheck className="w-3.5 h-3.5 mb-1 text-amber-400" />
                <span className="text-[10px] font-medium">Hover Lock</span>
              </button>

              <button
                id="btn-drone-rtb"
                onClick={onReturnDrone}
                className="flex flex-col items-center justify-center p-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Return and land on rover docking deck"
              >
                <Home className="w-3.5 h-3.5 mb-1 text-slate-400" />
                <span className="text-[10px] font-medium">RTB Dock</span>
              </button>
            </div>
          </div>

          {/* Dual Manual Flight Sticks (Left: Alt & Yaw, Right: Pitch & Roll) */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              <span>Manual Flight Control</span>
              <span className="text-[10px] text-sky-400 font-mono">/scout_drone/cmd_vel</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Left Stick: Altitude & Yaw */}
              <div className="flex flex-col items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 mb-1.5">ALTITUDE & YAW</span>
                
                {/* Climb Up */}
                <button
                  id="pad-drone-climb"
                  onMouseDown={() => onDroneVertical(1.2)}
                  onMouseUp={() => onDroneVertical(0)}
                  onTouchStart={() => onDroneVertical(1.2)}
                  onTouchEnd={() => onDroneVertical(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer mb-1 shadow"
                  title="Climb / Ascend (+Z)"
                >
                  <ChevronsUp className="w-4 h-4 text-sky-400" />
                </button>

                {/* Yaw Left / Hover / Yaw Right */}
                <div className="flex items-center gap-1.5 my-1">
                  <button
                    id="pad-drone-yaw-left"
                    onMouseDown={() => onDroneYaw(1.2)}
                    onMouseUp={() => onDroneYaw(0)}
                    onTouchStart={() => onDroneYaw(1.2)}
                    onTouchEnd={() => onDroneYaw(0)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer shadow"
                    title="Yaw Turn Left (Q)"
                  >
                    <RotateCounterClockwise className="w-4 h-4 text-sky-300" />
                  </button>

                  <button
                    id="pad-drone-hover-center"
                    onClick={onDroneHover}
                    className="px-2 py-1 bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-300 rounded text-[10px] font-mono font-bold cursor-pointer"
                    title="Hover Brake (Space / H)"
                  >
                    HOVER
                  </button>

                  <button
                    id="pad-drone-yaw-right"
                    onMouseDown={() => onDroneYaw(-1.2)}
                    onMouseUp={() => onDroneYaw(0)}
                    onTouchStart={() => onDroneYaw(-1.2)}
                    onTouchEnd={() => onDroneYaw(0)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer shadow"
                    title="Yaw Turn Right (E)"
                  >
                    <RotateCw className="w-4 h-4 text-sky-300" />
                  </button>
                </div>

                {/* Descend Down */}
                <button
                  id="pad-drone-descend"
                  onMouseDown={() => onDroneVertical(-1.0)}
                  onMouseUp={() => onDroneVertical(0)}
                  onTouchStart={() => onDroneVertical(-1.0)}
                  onTouchEnd={() => onDroneVertical(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer mt-1 shadow"
                  title="Descend (-Z)"
                >
                  <ChevronsDown className="w-4 h-4 text-sky-400" />
                </button>
              </div>

              {/* Right Stick: Pitch & Roll (Translation) */}
              <div className="flex flex-col items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 mb-1.5">PITCH & ROLL</span>
                
                {/* Pitch Forward */}
                <button
                  id="pad-drone-forward"
                  onMouseDown={() => onDronePitch(1.4)}
                  onMouseUp={() => onDronePitch(0)}
                  onTouchStart={() => onDronePitch(1.4)}
                  onTouchEnd={() => onDronePitch(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer mb-1 shadow"
                  title="Pitch Forward (W)"
                >
                  <ArrowUp className="w-4 h-4 text-sky-300" />
                </button>

                {/* Strafe Left / Brake / Strafe Right */}
                <div className="flex items-center gap-1.5 my-1">
                  <button
                    id="pad-drone-strafe-left"
                    onMouseDown={() => onDroneRoll(-1.2)}
                    onMouseUp={() => onDroneRoll(0)}
                    onTouchStart={() => onDroneRoll(-1.2)}
                    onTouchEnd={() => onDroneRoll(0)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer shadow"
                    title="Strafe Left (A)"
                  >
                    <ArrowLeft className="w-4 h-4 text-sky-300" />
                  </button>

                  <button
                    id="pad-drone-brake-center"
                    onClick={() => { onDronePitch(0); onDroneRoll(0); }}
                    className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded text-[10px] font-mono font-bold cursor-pointer"
                    title="Zero Horizontal Vel (X)"
                  >
                    HALT
                  </button>

                  <button
                    id="pad-drone-strafe-right"
                    onMouseDown={() => onDroneRoll(1.2)}
                    onMouseUp={() => onDroneRoll(0)}
                    onTouchStart={() => onDroneRoll(1.2)}
                    onTouchEnd={() => onDroneRoll(0)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer shadow"
                    title="Strafe Right (D)"
                  >
                    <ArrowRight className="w-4 h-4 text-sky-300" />
                  </button>
                </div>

                {/* Pitch Backward */}
                <button
                  id="pad-drone-backward"
                  onMouseDown={() => onDronePitch(-1.2)}
                  onMouseUp={() => onDronePitch(0)}
                  onTouchStart={() => onDronePitch(-1.2)}
                  onTouchEnd={() => onDronePitch(0)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-sky-600 rounded-lg text-slate-200 cursor-pointer mt-1 shadow"
                  title="Pitch Backward (S)"
                >
                  <ArrowDown className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </div>

            {/* Drone Altitude Presets */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span>ALTITUDE PRESETS</span>
                <span className="text-sky-400">Current: {droneTelemetry?.altitude || 0}m</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  id="btn-alt-1"
                  onClick={() => onDroneAltitudePreset(1.2)}
                  className="py-1 px-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[10px] transition-colors cursor-pointer text-center"
                >
                  1.2m (Floor)
                </button>
                <button
                  id="btn-alt-2"
                  onClick={() => onDroneAltitudePreset(2.0)}
                  className="py-1 px-1.5 rounded bg-sky-950/40 hover:bg-sky-900 border border-sky-800/50 text-sky-300 font-mono text-[10px] transition-colors cursor-pointer text-center"
                >
                  2.0m (Rubble)
                </button>
                <button
                  id="btn-alt-3"
                  onClick={() => onDroneAltitudePreset(2.7)}
                  className="py-1 px-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[10px] transition-colors cursor-pointer text-center"
                >
                  2.7m (Ceiling)
                </button>
              </div>
            </div>

            {/* Spotlight & Land button row */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80">
              <button
                id="btn-drone-spotlight"
                onClick={onToggleDroneSpotlight}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border text-xs cursor-pointer ${
                  droneTelemetry?.spotlight
                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Search Spotlight</span>
              </button>

              <button
                id="btn-drone-land"
                onClick={onDroneLand}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs cursor-pointer"
              >
                <ArrowDownCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Soft Land</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ROVER CONTROL DECK (When Rover is Active) */
        <div className="flex flex-col gap-2.5">
          {/* Drone Launch Quick Launcher on Rover Deck */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              <span>Aerial Scout Deployment</span>
              <button 
                onClick={() => onSetActiveVehicle('drone')}
                className="text-[10px] text-sky-400 hover:underline cursor-pointer"
              >
                Open Flight Deck &rarr;
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                id="btn-rover-deploy-drone"
                onClick={onDeployDrone}
                className="flex flex-col items-center justify-center p-2 rounded bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/60 text-sky-200 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 mb-1 text-sky-400" />
                <span className="text-[10px] font-medium">1. Launch</span>
              </button>

              <button
                id="btn-rover-drone-scout"
                onClick={onScoutRubble}
                className="flex flex-col items-center justify-center p-2 rounded bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/60 text-purple-200 transition-colors cursor-pointer"
              >
                <AlertOctagon className="w-3.5 h-3.5 mb-1 text-purple-400" />
                <span className="text-[10px] font-medium">2. Over Rubble</span>
              </button>

              <button
                id="btn-rover-drone-return"
                onClick={onReturnDrone}
                className="flex flex-col items-center justify-center p-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 mb-1 text-slate-400" />
                <span className="text-[10px] font-medium">3. RTB Dock</span>
              </button>
            </div>
<<<<<<< HEAD
            {/* Note on Post-Deploy sweep */}
            <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-800/80 pt-1.5 flex items-center gap-1.5">
              <span className="text-emerald-400">⚡</span>
              <span>Deploying drone triggers autonomous Rover Gas & Air Quality sweep.</span>
            </div>
          </div>

          {/* Autonomous Gas & Air Quality Sweep Panel */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atmospheric Gas & Air Quality Sweep</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border ${
                roverTelemetry?.gasInspection?.phase === 'inspection_complete'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                  : roverTelemetry?.gasInspection?.active
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}>
                {roverTelemetry?.gasInspection?.phase === 'inspection_complete'
                  ? 'CERTIFIED'
                  : roverTelemetry?.gasInspection?.active
                  ? 'SWEEPING'
                  : 'STANDBY'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Phase:</span>
                <span className="text-emerald-300 font-semibold">{roverTelemetry?.gasInspection?.phaseLabel ?? 'Idle'}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${roverTelemetry?.gasInspection?.progressPct ?? 0}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">OXYGEN LEVEL:</span>
                  <span className={`font-bold ${(roverTelemetry?.o2Percent ?? 20.9) < 19.5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {roverTelemetry?.o2Percent ?? 20.9}%
                  </span>
                </div>
                <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">AIR QUALITY:</span>
                  <span className={`font-bold ${(roverTelemetry?.airQualityScore ?? 96) > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {roverTelemetry?.airQualityScore ?? 96}/100
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 pt-0.5">
                Target: <span className="text-slate-200">{roverTelemetry?.gasInspection?.targetLocationName ?? 'Awaiting deployment'}</span>
              </div>

              {roverTelemetry?.gasInspection?.notes && (
                <div className="text-[10px] text-slate-400 bg-slate-900/80 p-1.5 rounded border border-slate-800">
                  {roverTelemetry.gasInspection.notes}
                </div>
              )}

              {onToggleGasInspection && (
                <button
                  id="btn-toggle-gas-inspection"
                  onClick={onToggleGasInspection}
                  className="w-full mt-1 py-1.5 px-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {roverTelemetry?.gasInspection?.active ? 'Pause Gas & Air Quality Sweep' : 'Trigger Gas & Air Quality Sweep'}
                  </span>
                </button>
              )}
            </div>
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </div>

          {/* Rover Hardware Toggles */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide">
              Rover Payloads & Sensors
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-toggle-lights"
                onClick={onToggleHeadlights}
                className={`flex items-center justify-center gap-1.5 p-2 rounded border text-xs cursor-pointer ${
                  roverTelemetry?.headlights 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Headlights</span>
              </button>

              <button
                id="btn-toggle-lidar"
                onClick={onToggleLidar}
                className={`flex items-center justify-center gap-1.5 p-2 rounded border text-xs cursor-pointer ${
                  roverTelemetry?.lidarActive 
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Radar className="w-3.5 h-3.5" />
                <span>LiDAR Rays</span>
              </button>
            </div>
          </div>

          {/* Manual Teleop Driving Pad */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              <span>Manual Driving Pad</span>
              <span className="text-[10px] text-amber-400 font-mono">/model/rover/cmd_vel</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <button
                id="pad-forward"
                onMouseDown={() => onRoverSpeed(1.2)}
                onMouseUp={() => onRoverSpeed(0)}
                onTouchStart={() => onRoverSpeed(1.2)}
                onTouchEnd={() => onRoverSpeed(0)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 rounded-lg text-slate-200 cursor-pointer shadow"
                title="Forward (W / ArrowUp)"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                <button
                  id="pad-left"
                  onMouseDown={() => onRoverSteer(0.8)}
                  onMouseUp={() => onRoverSteer(0)}
                  onTouchStart={() => onRoverSteer(0.8)}
                  onTouchEnd={() => onRoverSteer(0)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 rounded-lg text-slate-200 cursor-pointer shadow"
                  title="Steer Left (A / ArrowLeft)"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  id="pad-stop"
                  onClick={() => { onRoverSpeed(0); onRoverSteer(0); }}
                  className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg text-xs font-mono font-bold cursor-pointer"
                >
                  HALT
                </button>
                <button
                  id="pad-right"
                  onMouseDown={() => onRoverSteer(-0.8)}
                  onMouseUp={() => onRoverSteer(0)}
                  onTouchStart={() => onRoverSteer(-0.8)}
                  onTouchEnd={() => onRoverSteer(0)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 rounded-lg text-slate-200 cursor-pointer shadow"
                  title="Steer Right (D / ArrowRight)"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                id="pad-reverse"
                onMouseDown={() => onRoverSpeed(-0.9)}
                onMouseUp={() => onRoverSpeed(0)}
                onTouchStart={() => onRoverSpeed(-0.9)}
                onTouchEnd={() => onRoverSpeed(0)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 rounded-lg text-slate-200 cursor-pointer shadow"
                title="Reverse (S / ArrowDown)"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Viewpoints Selector */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5">
        <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
          <span>Camera Viewpoints</span>
          <span className="text-[10px] text-slate-500 font-mono">GZ Camera</span>
        </div>

        <div className="grid grid-cols-3 gap-1 text-[11px]">
          {[
            { id: 'orbit', label: '3D Orbit' },
            { id: 'rover_chase', label: 'Rover 3rd' },
            { id: 'rover_fpv', label: 'Rover Mast' },
            { id: 'drone_chase', label: 'Drone 3rd' },
            { id: 'drone_fpv', label: 'Drone Cam' },
            { id: 'thermal_ir', label: 'Thermal IR' },
<<<<<<< HEAD
            { id: 'lidar_ranger', label: 'LiDAR Ranger' },
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          ].map((cam) => (
            <button
              key={cam.id}
              onClick={() => onSetView(cam.id as CameraViewMode)}
              className={`p-1.5 rounded text-center truncate cursor-pointer transition-colors ${
                currentView === cam.id 
                  ? 'bg-emerald-600 text-white font-medium' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MissionControlPanel = React.memo(MissionControlPanelComponent);

