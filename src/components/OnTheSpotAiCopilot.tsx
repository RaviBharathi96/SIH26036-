import React, { useState } from 'react';
import { OnTheSpotAiDecision, AiPredictiveReport, RoverTelemetry, DroneTelemetry, SurvivorData } from '../types';
import { 
  BrainCircuit, ShieldAlert, AlertTriangle, ShieldCheck, Flame, 
  Clock, Zap, Compass, ChevronDown, ChevronUp, Sliders, Play, 
  ArrowRight, Activity, Crosshair, Sparkles
} from 'lucide-react';

interface OnTheSpotAiCopilotProps {
  decision: OnTheSpotAiDecision;
  prediction: AiPredictiveReport;
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  survivorData: SurvivorData | null;
  onOpenTrainingStudio: () => void;
  onTriggerAutoEvasion?: () => void;
  onLaunchDrone?: () => void;
  onRecomputePath?: () => void;
  onReturnDrone?: () => void;
<<<<<<< HEAD
  isAutonomousAiActive?: boolean;
  onToggleAutonomousAi?: () => void;
  onExecuteActionOnSpot?: (actionType?: string) => void;
  lastExecutedActionFeedback?: { action: string; detail: string; time: number } | null;
  onQuickTrainAi?: () => void;
  onAiPlanOnSpot?: () => void;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

export const OnTheSpotAiCopilot: React.FC<OnTheSpotAiCopilotProps> = ({
  decision,
  prediction,
  roverTelemetry,
  droneTelemetry,
  survivorData,
  onOpenTrainingStudio,
  onTriggerAutoEvasion,
  onLaunchDrone,
  onRecomputePath,
  onReturnDrone,
<<<<<<< HEAD
  isAutonomousAiActive = true,
  onToggleAutonomousAi,
  onExecuteActionOnSpot,
  lastExecutedActionFeedback,
  onQuickTrainAi,
  onAiPlanOnSpot,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Badge styling
  const threatStyles = {
    NOMINAL: {
      border: 'border-emerald-500/50',
      bg: 'bg-emerald-950/80',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      glow: 'shadow-emerald-950/40',
      iconColor: 'text-emerald-400',
    },
    ADVISORY: {
      border: 'border-amber-500/50',
      bg: 'bg-amber-950/80',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      glow: 'shadow-amber-950/40',
      iconColor: 'text-amber-400',
    },
    WARNING: {
      border: 'border-orange-500/60',
      bg: 'bg-orange-950/85',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-400/50',
      glow: 'shadow-orange-950/50',
      iconColor: 'text-orange-400',
    },
    EMERGENCY: {
      border: 'border-rose-500/70',
      bg: 'bg-rose-950/90',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-400/60',
      glow: 'shadow-rose-950/60',
      iconColor: 'text-rose-400',
    },
  }[decision.threatLevel];

  return (
    <aside 
      aria-label="On-the-spot AI Copilot"
      id="on-the-spot-ai-copilot" 
      className={`rounded-xl border backdrop-blur-md shadow-2xl transition-all ${threatStyles.border} ${threatStyles.bg} ${threatStyles.glow} text-slate-100 overflow-hidden`}
    >
      {/* Header Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between gap-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-slate-900 border border-slate-700/80">
            <BrainCircuit className={`w-4 h-4 ${threatStyles.iconColor}`} />
            <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              decision.threatLevel === 'EMERGENCY' ? 'bg-rose-500 animate-ping' :
              decision.threatLevel === 'WARNING' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-400'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                On-The-Spot AI Copilot
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${threatStyles.badge}`}>
                {decision.badgeText}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
<<<<<<< HEAD
          {onToggleAutonomousAi && (
            <button
              id="btn-toggle-auto-copilot"
              onClick={onToggleAutonomousAi}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer border ${
                isAutonomousAiActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Toggle Autonomous Real-Time Execution by AI on the Spot"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isAutonomousAiActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isAutonomousAiActive ? 'Auto-Spot: ON' : 'Auto-Spot: OFF'}</span>
            </button>
          )}

          {onQuickTrainAi && (
            <button
              id="btn-quick-train-ai"
              onClick={onQuickTrainAi}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-[10px] font-mono font-bold transition-colors cursor-pointer"
              title="Train AI weights in real time on the spot"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Quick Train</span>
            </button>
          )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          <button
            id="btn-open-ai-training-studio"
            onClick={onOpenTrainingStudio}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow"
            title="Train & Tune Real-Time AI Pather & Predictor Parameters"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Train / Tune AI</span>
          </button>

          <button
            id="btn-toggle-ai-copilot-details"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse Copilot Panel' : 'Expand Copilot Panel'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Action Execution Live Feedback Strip */}
      {lastExecutedActionFeedback && (Date.now() - lastExecutedActionFeedback.time < 8000) && (
        <div className="px-3 py-1.5 bg-emerald-950/90 border-b border-emerald-500/40 flex items-center justify-between text-[11px] text-emerald-200 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-emerald-300">AI Done On Spot:</span>
            <span className="text-white truncate max-w-[280px]">{lastExecutedActionFeedback.detail}</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400/80 shrink-0">ACTIVE</span>
        </div>
      )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      {/* Main Directive Strip */}
      <div className="px-3.5 py-2 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px]">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>{decision.headline}</span>
            {decision.autonomousOverrideActive && (
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-rose-500/30 text-rose-300 border border-rose-500/40">
                AUTO-OVERRIDE ENGAGED
              </span>
            )}
          </h4>
          <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
            {decision.actionDirective}
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-1.5 shrink-0">
<<<<<<< HEAD
          {onExecuteActionOnSpot && (
            <button
              id="btn-execute-on-spot"
              onClick={() => onExecuteActionOnSpot()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95"
              title="Execute AI decision directly on the spot right now"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300 animate-pulse" />
              <span>⚡ Execute On Spot</span>
            </button>
          )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          {decision.droneAction === 'LAUNCH_SCOUT' && onLaunchDrone && (
            <button
              id="btn-copilot-launch-drone"
              onClick={onLaunchDrone}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow animate-bounce"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Deploy Drone Scout</span>
            </button>
          )}

          {decision.droneAction === 'RETURN_TO_BASE' && onReturnDrone && (
            <button
              id="btn-copilot-return-drone"
              onClick={onReturnDrone}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow"
            >
              <span>Return Drone to Rover</span>
            </button>
          )}

<<<<<<< HEAD
          {onAiPlanOnSpot && (
            <button
              id="btn-copilot-plan-on-spot"
              onClick={onAiPlanOnSpot}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-[10px] transition-all cursor-pointer shadow shadow-amber-950/40 hover:scale-105 active:scale-95 ring-1 ring-amber-300/40"
              title="Run AI Planner On The Spot: Automatically generates optimized obstacle-averse Rover and Drone rescue patrol routes [O]"
            >
              <Sparkles className="w-3 h-3 text-amber-200 fill-current" />
              <span>AI Plan On Spot [O]</span>
            </button>
          )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          {onRecomputePath && (
            <button
              id="btn-copilot-recompute-path"
              onClick={onRecomputePath}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[10px] font-medium transition-colors cursor-pointer"
              title="Re-optimize path in real-time"
            >
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>Re-Plan Corridor</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Real-Time Predictive Indicators */}
      {isExpanded && (
        <div className="px-3.5 py-2.5 bg-slate-900/70 border-t border-slate-800/80 space-y-2 text-xs">
          {/* 4 Real-time Predictive Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Golden Hour Prognosis */}
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>Golden Hour</span>
                </span>
                <span className="font-mono text-rose-300 font-bold">
                  {prediction.survivorGoldenHourRemainingMinutes}m
                </span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-slate-200 font-semibold">
                Core: {prediction.survivorPredictedTempC}°C
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                Bio-decline rate modeled
              </div>
            </div>

            {/* Methane Diffusion Arrival */}
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>CH4 Plume Arrival</span>
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {prediction.methaneArrivalMinutes !== null ? `${prediction.methaneArrivalMinutes}m` : 'Stable'}
                </span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-slate-200 font-semibold">
                Radius: {prediction.methanePlumeRadiusMeters}m
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                LEL diffusion projected
              </div>
            </div>

            {/* Scout Drone Battery Endurance */}
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-sky-400" />
                  <span>Flight Reserve</span>
                </span>
                <span className="font-mono text-sky-300 font-bold">
                  {prediction.dronePredictedFlightRemainingMinutes}m
                </span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-slate-200 font-semibold">
                Battery: {(droneTelemetry?.batteryPct ?? 96).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                State: {droneTelemetry?.state ?? 'docked'}
              </div>
            </div>

            {/* Forward Trajectory Collision Risk */}
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Crosshair className="w-3 h-3 text-emerald-400" />
                  <span>Forward Risk</span>
                </span>
                <span className={`font-mono font-bold text-[10px] px-1 rounded ${
                  prediction.predictedCollisionRisk === 'CRITICAL' ? 'bg-rose-500/30 text-rose-300' :
                  prediction.predictedCollisionRisk === 'ELEVATED' ? 'bg-amber-500/30 text-amber-300' :
                  'bg-emerald-500/30 text-emerald-300'
                }`}>
                  {prediction.predictedCollisionRisk}
                </span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-slate-200 font-semibold">
                Path Score: {prediction.optimalPathMetrics.safetyClearanceScore}/100
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                Dist: {prediction.optimalPathMetrics.totalDistanceM}m (~{prediction.optimalPathMetrics.estTransitSeconds}s)
              </div>
            </div>
          </div>

          {/* Reasoning Audit Trail snippet */}
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Real-Time On-The-Spot Reasoning Logic</span>
              <span className="text-[9px] text-slate-500">Updated: {new Date(decision.lastUpdatedIso).toLocaleTimeString()}</span>
            </div>
            <ul className="space-y-0.5 text-[11px] text-slate-300">
              {decision.reasoningNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">›</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};
