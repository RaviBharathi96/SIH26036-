import React, { useState } from 'react';
import { PatrolPlanState, Vector3D, PatrolExecutionStatus } from '../types';
import {
  MapPin,
  Bot,
  Plane,
  Plus,
  Trash2,
  Play,
  Pause,
  Square,
  Repeat,
  FileCode,
  Keyboard,
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
<<<<<<< HEAD
  Move,
  Sparkles
=======
  Move
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
} from 'lucide-react';

interface MissionPlanningBarProps {
  isPlanningMode: boolean;
  onTogglePlanningMode: () => void;
  patrolPlan: PatrolPlanState;
  patrolStatus?: PatrolExecutionStatus;
  onSetActiveVehicle: (vehicle: 'rover' | 'drone') => void;
  onAddWaypoint: () => void;
  onAddWaypointAtVehicle: () => void;
  onDeleteLastWaypoint: () => void;
  onClearWaypoints: () => void;
  onToggleLoop: () => void;
  onExecuteCustomPatrol: () => void;
  onStopCustomPatrol: () => void;
  onPausePatrol?: () => void;
  onResumePatrol?: () => void;
  onOpenExportModal: () => void;
  onNudgeCursor: (dx: number, dy: number, dz: number) => void;
  roverPos?: Vector3D;
  dronePos?: Vector3D;
<<<<<<< HEAD
  onGenerateAiPlanOnSpot?: () => void;
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

export const MissionPlanningBar: React.FC<MissionPlanningBarProps> = ({
  isPlanningMode,
  onTogglePlanningMode,
  patrolPlan,
  patrolStatus,
  onSetActiveVehicle,
  onAddWaypoint,
  onAddWaypointAtVehicle,
  onDeleteLastWaypoint,
  onClearWaypoints,
  onToggleLoop,
  onExecuteCustomPatrol,
  onStopCustomPatrol,
  onPausePatrol,
  onResumePatrol,
  onOpenExportModal,
  onNudgeCursor,
  roverPos,
  dronePos,
<<<<<<< HEAD
  onGenerateAiPlanOnSpot,
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}) => {
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  const activeWpList =
    patrolPlan.activeVehicle === 'rover'
      ? patrolPlan.roverWaypoints
      : patrolPlan.droneWaypoints;

  const vehicleColor =
    patrolPlan.activeVehicle === 'rover'
      ? 'text-amber-400 border-amber-500/50 bg-amber-500/10'
      : 'text-sky-400 border-sky-500/50 bg-sky-500/10';

  const vehicleAccentBg =
    patrolPlan.activeVehicle === 'rover' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-sky-600 hover:bg-sky-500';

  return (
    <div
      id="mission-planning-bar"
      className={`transition-all duration-300 rounded-xl border backdrop-blur-md shadow-2xl ${
        isPlanningMode
          ? 'bg-slate-900/95 border-amber-500/60 shadow-amber-950/40 p-3'
          : 'bg-slate-900/80 border-slate-800 p-2'
      }`}
    >
      {/* Header bar row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Mode toggle & Vehicle switch */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-planning-mode"
            onClick={onTogglePlanningMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow ${
              isPlanningMode
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/60 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30'
            }`}
            title="Press [P] to toggle keyboard mission planner mode"
          >
            <Compass className="w-4 h-4" />
            <span>{isPlanningMode ? 'PLANNING MODE ACTIVE [P]' : 'KEYBOARD MISSION PLANNER [P]'}</span>
          </button>

          {isPlanningMode && (
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                id="btn-plan-select-rover"
                onClick={() => onSetActiveVehicle('rover')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  patrolPlan.activeVehicle === 'rover'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Edit Ground Rover Patrol Route [Tab or V]"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Rover Ground ({patrolPlan.roverWaypoints.length})</span>
              </button>
              <button
                id="btn-plan-select-drone"
                onClick={() => onSetActiveVehicle('drone')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  patrolPlan.activeVehicle === 'drone'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Edit Aerial Scout Drone Patrol Route [Tab or V]"
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Drone Aerial ({patrolPlan.droneWaypoints.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Center: Realtime Cursor & Reticle coordinates */}
        {isPlanningMode && (
          <div className="flex items-center gap-3 bg-slate-950/90 px-3 py-1 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300">
            <div className="flex items-center gap-1 text-slate-400">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <span>3D RETICLE:</span>
            </div>
            <span>
              X: <strong className="text-white">{patrolPlan.cursorPosition.x.toFixed(2)}</strong>m
            </span>
            <span>
              Y: <strong className="text-white">{patrolPlan.cursorPosition.y.toFixed(2)}</strong>m
            </span>
            <span>
              Z: <strong className="text-white">{patrolPlan.cursorPosition.z.toFixed(2)}</strong>m
            </span>
          </div>
        )}

        {/* Right: Primary actions */}
        <div className="flex items-center gap-1.5 ml-auto">
          {isPlanningMode ? (
            <>
              <button
                id="btn-plan-add-wp"
                onClick={onAddWaypoint}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-md transition-colors cursor-pointer ${vehicleAccentBg}`}
                title="Record Waypoint at current 3D cursor position [Space or Enter]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Drop WP [Space]</span>
              </button>

              <button
                id="btn-plan-add-at-robot"
                onClick={onAddWaypointAtVehicle}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-colors cursor-pointer"
                title="Drop Waypoint at Current Robot Position [Shift + Space]"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>At Robot</span>
              </button>

              <button
                id="btn-plan-toggle-loop"
                onClick={onToggleLoop}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  patrolPlan.isLoop
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                }`}
                title="Toggle continuous patrol loop [L]"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Loop: {patrolPlan.isLoop ? 'ON' : 'OFF'}</span>
              </button>

              <button
                id="btn-plan-undo-wp"
                onClick={onDeleteLastWaypoint}
                disabled={activeWpList.length === 0}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 transition-colors cursor-pointer"
                title="Delete last waypoint [Backspace or Delete]"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <button
                id="btn-plan-clear-all"
                onClick={onClearWaypoints}
                disabled={activeWpList.length === 0}
                className="px-2 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed border border-rose-900/40 text-xs font-medium transition-colors cursor-pointer"
                title="Clear all waypoints for active vehicle [C]"
              >
                Clear [C]
              </button>
            </>
          ) : null}

<<<<<<< HEAD
          {/* AI Plan on Spot Button */}
          {onGenerateAiPlanOnSpot && (
            <button
              id="btn-plan-ai-on-spot"
              onClick={onGenerateAiPlanOnSpot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all cursor-pointer ring-1 ring-amber-300/70 hover:scale-105 active:scale-95"
              title="Run AI Planner On The Spot: Automatically generates optimized obstacle-averse Rover and Drone rescue patrol routes [O]"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span>⚡ AI Plan on Spot [O]</span>
            </button>
          )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          {/* Execute / Control Route button */}
          {(patrolPlan.isExecutingPatrol || (patrolStatus && (patrolStatus.phase === 'running' || patrolStatus.phase === 'paused'))) ? (
            <div className="flex items-center gap-1.5">
              {patrolStatus && (
                <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className={`w-2 h-2 rounded-full ${patrolStatus.phase === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>Step {patrolStatus.step}/{patrolStatus.totalSteps} ({patrolStatus.progressPct}%)</span>
                </div>
              )}

              {patrolStatus?.phase === 'running' && onPausePatrol ? (
                <button
                  id="btn-bar-pause-patrol"
                  onClick={onPausePatrol}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow transition-colors cursor-pointer"
                  title="Pause autonomous patrol execution"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </button>
              ) : patrolStatus?.phase === 'paused' && onResumePatrol ? (
                <button
                  id="btn-bar-resume-patrol"
                  onClick={onResumePatrol}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition-colors cursor-pointer"
                  title="Resume autonomous patrol execution"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </button>
              ) : null}

              <button
                id="btn-stop-custom-patrol"
                onClick={onStopCustomPatrol}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow transition-colors cursor-pointer"
                title="Stop custom patrol navigation [R]"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Patrol [R]</span>
              </button>
            </div>
          ) : (
            <button
              id="btn-run-custom-patrol"
              onClick={onExecuteCustomPatrol}
              disabled={patrolPlan.roverWaypoints.length === 0 && patrolPlan.droneWaypoints.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-md shadow-emerald-950/40 transition-colors cursor-pointer"
              title="Execute Autonomous Multi-Point Patrol in Simulation [R]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Patrol [R]</span>
            </button>
          )}

          {/* Export to ROS 2 Nav2 button */}
          <button
            id="btn-open-nav2-export"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-950/40 transition-colors cursor-pointer"
            title="Export Planned Multi-Point Waypoints to ROS 2 Nav2 Navigation Stack [X]"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export ROS 2 Nav2 [X]</span>
          </button>

          {/* Toggle key help drawer */}
          <button
            id="btn-toggle-key-help"
            onClick={() => setShowKeyHelp(!showKeyHelp)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Show Keyboard Controls Cheat Sheet"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Keyboard Shortcuts & Nudge Controls (when in planning mode or help is open) */}
      {isPlanningMode && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          {/* Quick cursor nudge directional buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-medium">Nudge Cursor:</span>
            <button
              onClick={() => onNudgeCursor(0, 0, 1.0)}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
              title="Forward north (+Z) [W or Up]"
            >
              +Z (Fwd)
            </button>
            <button
              onClick={() => onNudgeCursor(0, 0, -1.0)}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
              title="Backward south (-Z) [S or Down]"
            >
              -Z (Back)
            </button>
            <button
              onClick={() => onNudgeCursor(-1.0, 0, 0)}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
              title="West left (-X) [A or Left]"
            >
              -X (West)
            </button>
            <button
              onClick={() => onNudgeCursor(1.0, 0, 0)}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono"
              title="East right (+X) [D or Right]"
            >
              +X (East)
            </button>

            {patrolPlan.activeVehicle === 'drone' && (
              <>
                <span className="text-slate-500">|</span>
                <button
                  onClick={() => onNudgeCursor(0, 0.25, 0)}
                  className="px-1.5 py-0.5 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 font-mono"
                  title="Altitude Up (+Y) [E or PageUp]"
                >
                  +Alt (E)
                </button>
                <button
                  onClick={() => onNudgeCursor(0, -0.25, 0)}
                  className="px-1.5 py-0.5 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 font-mono"
                  title="Altitude Down (-Y) [Q or PageDown]"
                >
                  -Alt (Q)
                </button>
              </>
            )}
          </div>

          {/* Quick keyboard instruction legend */}
          <div className="flex flex-wrap items-center gap-2 text-slate-400 font-mono text-[10.5px]">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Space</kbd> Drop WP
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">W/A/S/D</kbd> Move
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">Tab</kbd> Rover/Drone
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">L</kbd> Loop
            </span>
            <span>
<<<<<<< HEAD
              <kbd className="px-1 py-0.5 rounded bg-amber-900/60 border border-amber-500/60 text-amber-300 font-bold">O</kbd> AI Plan
            </span>
            <span>
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">R</kbd> Run
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">X</kbd> ROS 2 Nav2
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white">P</kbd> Exit
            </span>
          </div>
        </div>
      )}

      {/* Standalone Key Cheat Sheet Popup when requested */}
      {showKeyHelp && (
        <div className="mt-2.5 p-3 rounded-lg bg-slate-950/95 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-emerald-400" />
              Keyboard Mission Planning & Multi-Point Patrol Reference
            </span>
            <button
              onClick={() => setShowKeyHelp(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-amber-400">[P] Toggle Planning Mode</div>
              <div className="text-slate-400">Activates the 3D interactive waypoint cursor and visual reticle.</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-sky-400">[Tab] or [V] Switch Vehicle</div>
              <div className="text-slate-400">Toggle between Ground Rover and Aerial Scout Drone paths.</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-emerald-400">[Space] / [Enter] Place Waypoint</div>
              <div className="text-slate-400">Drops a waypoint with 3D tube and beacon at cursor position.</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-indigo-400">[W/A/S/D] or [Arrows] Move Reticle</div>
              <div className="text-slate-400">Nudges cursor along mine tunnel corridors (X and Z coordinates).</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-purple-400">[Q] / [E] or [PgUp/PgDn] Altitude</div>
              <div className="text-slate-400">Adjusts aerial drone waypoint elevation (0.5m to 2.8m).</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-rose-400">[X] Export ROS 2 Nav2</div>
              <div className="text-slate-400">Generates YAML coordinates, launch files, and python nodes.</div>
            </div>
<<<<<<< HEAD
            <div className="p-2 rounded bg-amber-950/40 border border-amber-500/40">
              <div className="font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 fill-current" />
                <span>[O] AI Plan on Spot</span>
              </div>
              <div className="text-amber-200/80">Generates optimal obstacle & methane-averse Rover & Drone patrol route on the spot.</div>
            </div>
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </div>
        </div>
      )}
    </div>
  );
};
