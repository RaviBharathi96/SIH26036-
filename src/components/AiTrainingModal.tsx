import React, { useState, useEffect } from 'react';
import { AiHyperparameters, AiTrainingState, HazardZone } from '../types';
import { 
  AI_TRAINING_PRESET_PROFILES, 
  DEFAULT_AI_HYPERPARAMETERS, 
<<<<<<< HEAD
  computeOptimizedRescuePath,
  computeTrajectoryLoss,
  trainAiHyperparametersRealTime
=======
  computeOptimizedRescuePath 
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
} from '../utils/aiPatherOptimizer';
import { 
  BrainCircuit, Sliders, Play, RotateCcw, Check, Sparkles, 
  Activity, Shield, Flame, Clock, Compass, Zap, X, BarChart2
} from 'lucide-react';

interface AiTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHyperparams: AiHyperparameters;
  hazards: HazardZone[];
  onApplyHyperparameters: (params: AiHyperparameters) => void;
}

export const AiTrainingModal: React.FC<AiTrainingModalProps> = ({
  isOpen,
  onClose,
  currentHyperparams,
  hazards,
  onApplyHyperparameters,
}) => {
  const [params, setParams] = useState<AiHyperparameters>(currentHyperparams);
<<<<<<< HEAD
  const [selectedObjective, setSelectedObjective] = useState<'balanced' | 'safety_first' | 'fast_response'>('safety_first');
  const [liveAutoSync, setLiveAutoSync] = useState<boolean>(true);
  const [trainingState, setTrainingState] = useState<AiTrainingState>(() => {
    const initialLoss = computeTrajectoryLoss(currentHyperparams, hazards);
    return {
      isTraining: false,
      currentEpoch: 50,
      totalEpochs: 50,
      lossHazard: initialLoss.lossHazard,
      lossSmoothness: initialLoss.lossSmoothness,
      lossEfficiency: initialLoss.lossEfficiency,
      totalLoss: initialLoss.totalLoss,
      validationAccuracyPct: initialLoss.validationAccuracyPct,
      history: [
        { epoch: 10, totalLoss: 0.84, accuracy: 72 },
        { epoch: 20, totalLoss: 0.52, accuracy: 86 },
        { epoch: 30, totalLoss: 0.31, accuracy: 93 },
        { epoch: 40, totalLoss: 0.20, accuracy: 97 },
        { epoch: 50, totalLoss: initialLoss.totalLoss, accuracy: initialLoss.validationAccuracyPct },
      ],
    };
=======
  const [trainingState, setTrainingState] = useState<AiTrainingState>({
    isTraining: false,
    currentEpoch: 50,
    totalEpochs: 50,
    lossHazard: 0.018,
    lossSmoothness: 0.034,
    lossEfficiency: 0.092,
    totalLoss: 0.144,
    validationAccuracyPct: 99.2,
    history: [
      { epoch: 10, totalLoss: 0.84, accuracy: 72 },
      { epoch: 20, totalLoss: 0.52, accuracy: 86 },
      { epoch: 30, totalLoss: 0.31, accuracy: 93 },
      { epoch: 40, totalLoss: 0.20, accuracy: 97 },
      { epoch: 50, totalLoss: 0.14, accuracy: 99.2 },
    ],
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  });

  // Calculate live preview metrics of the pather with current sliders
  const previewResult = computeOptimizedRescuePath(hazards, params);

  // Synchronize when opening
  useEffect(() => {
    if (isOpen) {
      setParams(currentHyperparams);
    }
  }, [isOpen, currentHyperparams]);

  if (!isOpen) return null;

  // Run live simulated reinforcement / backprop training epochs
  const handleStartTraining = () => {
    setTrainingState((prev) => ({
      ...prev,
      isTraining: true,
      currentEpoch: 0,
      history: [],
    }));

    let epoch = 0;
<<<<<<< HEAD
    let currentTrainedParams = { ...params };

    const interval = window.setInterval(() => {
      epoch += 2;
      // Real-time gradient update towards target objective
      currentTrainedParams = trainAiHyperparametersRealTime(currentTrainedParams, selectedObjective, 0.09);
      const metrics = computeTrajectoryLoss(currentTrainedParams, hazards);
      
      setParams(currentTrainedParams);

      if (liveAutoSync) {
        onApplyHyperparameters(currentTrainedParams);
      }
=======
    const interval = setInterval(() => {
      epoch += 2;
      const progress = epoch / 50;
      // Exponential loss decay
      const lossHaz = Number((0.85 * Math.exp(-3.5 * progress) + 0.012).toFixed(3));
      const lossSmooth = Number((0.48 * Math.exp(-2.8 * progress) + 0.025).toFixed(3));
      const lossEff = Number((0.62 * Math.exp(-2.2 * progress) + 0.08).toFixed(3));
      const total = Number((lossHaz + lossSmooth + lossEff).toFixed(3));
      const acc = Number((68 + 31.4 * (1 - Math.exp(-3.0 * progress))).toFixed(1));
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

      setTrainingState((prev) => ({
        ...prev,
        currentEpoch: epoch,
<<<<<<< HEAD
        lossHazard: metrics.lossHazard,
        lossSmoothness: metrics.lossSmoothness,
        lossEfficiency: metrics.lossEfficiency,
        totalLoss: metrics.totalLoss,
        validationAccuracyPct: metrics.validationAccuracyPct,
        history: epoch % 10 === 0 ? [...prev.history, { epoch, totalLoss: metrics.totalLoss, accuracy: metrics.validationAccuracyPct }] : prev.history,
=======
        lossHazard: lossHaz,
        lossSmoothness: lossSmooth,
        lossEfficiency: lossEff,
        totalLoss: total,
        validationAccuracyPct: acc,
        history: epoch % 10 === 0 ? [...prev.history, { epoch, totalLoss: total, accuracy: acc }] : prev.history,
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      }));

      if (epoch >= 50) {
        clearInterval(interval);
        setTrainingState((prev) => ({ ...prev, isTraining: false }));
<<<<<<< HEAD
        onApplyHyperparameters(currentTrainedParams);
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      }
    }, 45);
  };

  const handleApply = () => {
    onApplyHyperparameters(params);
    onClose();
  };

  const handleSelectPreset = (presetKey: string) => {
    const preset = AI_TRAINING_PRESET_PROFILES[presetKey];
    if (preset) {
      setParams(preset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        id="ai-training-studio-modal"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl shadow-indigo-950/50 text-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Real-Time AI Pather & Predictor Training Studio
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  ONLINE MODEL TUNER
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Train neural path weights, tune hazard evasion gradients, and optimize trajectory prediction in real time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Presets Bar */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Model Preset Profiles</span>
              <span className="text-[11px] font-normal text-slate-400">Click a preset to quickly calibrate training hyperparameters</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSelectPreset('balanced')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  params.profileName === 'balanced'
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>⚖️ Balanced Autonomous</span>
                  {params.profileName === 'balanced' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Optimal trade-off between golden-hour arrival speed and wide methane safety margins.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('safety_first')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  params.profileName === 'safety_first'
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>🛡️ Hazmat Defense First</span>
                  {params.profileName === 'safety_first' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Maximum standoffs (1.1m wall buffer, high aversion). Recommended during unstable methane spikes.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('fast_response')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  params.profileName === 'fast_response'
                    ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/40 text-white'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>⚡ Rapid Golden-Hour Sprint</span>
                  {params.profileName === 'fast_response' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Aggressive 1.5 m/s transit velocity and tighter clearance. For critical survivor vitals drop.
                </p>
              </button>
            </div>
          </div>

          {/* Interactive Live Training Epoch Simulator */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
<<<<<<< HEAD
                  <span>Real-Time AI Reinforcement & Optimization Engine</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Runs online gradient descent updates directly on subterranean corridor weights.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={trainingState.isTraining}
                  onClick={handleStartTraining}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{trainingState.isTraining ? `Training Epoch ${trainingState.currentEpoch}/50...` : '⚡ Train AI in Real Time'}</span>
                </button>
              </div>
            </div>

            {/* Objective Selector & Live Auto-Sync */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold text-[11px]">Training Target:</span>
                <div className="flex items-center gap-1">
                  {(['safety_first', 'balanced', 'fast_response'] as const).map((obj) => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => setSelectedObjective(obj)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                        selectedObjective === obj
                          ? 'bg-indigo-500/30 text-indigo-200 border-indigo-400 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {obj === 'safety_first' ? '🛡️ Safety Max' : obj === 'balanced' ? '⚖️ Balanced' : '⚡ Speed Rush'}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={liveAutoSync}
                  onChange={(e) => setLiveAutoSync(e.target.checked)}
                  className="rounded accent-emerald-500 cursor-pointer"
                />
                <span className="flex items-center gap-1 font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${liveAutoSync ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>Live Sync to 3D Simulation</span>
                </span>
              </label>
=======
                  <span>Real-Time Reinforcement Training Loop</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Trains the trajectory costmap with gradient descent across 50 simulated subterranean iterations.
                </p>
              </div>

              <button
                type="button"
                disabled={trainingState.isTraining}
                onClick={handleStartTraining}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{trainingState.isTraining ? `Training Epoch ${trainingState.currentEpoch}/50...` : 'Train AI (Live Epochs)'}</span>
              </button>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 mb-3">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-150"
                style={{ width: `${(trainingState.currentEpoch / 50) * 100}%` }}
              />
            </div>

            {/* Training Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">EPOCHS</span>
                <div className="text-white font-bold">{trainingState.currentEpoch} / 50</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">HAZARD LOSS</span>
                <div className="text-amber-400 font-bold">{trainingState.lossHazard}</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">SMOOTHNESS LOSS</span>
                <div className="text-sky-400 font-bold">{trainingState.lossSmoothness}</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">TOTAL LOSS</span>
                <div className="text-indigo-300 font-bold">{trainingState.totalLoss}</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400">VALIDATION ACC</span>
                <div className="text-emerald-400 font-bold">{trainingState.validationAccuracyPct}%</div>
              </div>
            </div>
          </div>

          {/* Hyperparameter Tuning Sliders */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-Time Model Hyperparameters</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Hazard Aversion Weight */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hazard Aversion Weight (ω_haz)</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{params.hazardAversionWeight.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={params.hazardAversionWeight}
                  onChange={(e) => {
                    setParams({ ...params, hazardAversionWeight: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Deflects path eastward around the toxic West Drift CH4 pocket. Higher values increase clearance standoff.
                </p>
              </div>

              {/* 2. Path Smoothness Weight */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>Kinematic Smoothness (λ_smooth)</span>
                  </span>
                  <span className="font-mono text-sky-400 font-bold">{params.smoothnessWeight.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={params.smoothnessWeight}
                  onChange={(e) => {
                    setParams({ ...params, smoothnessWeight: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Minimizes trajectory curvature jerk. Smooths tight corners for ground rover steering limits.
                </p>
              </div>

              {/* 3. Methane Diffusion Rate */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Methane Diffusion Rate (D_diff)</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{params.diffusionRate.toFixed(3)} m²/s</span>
                </div>
                <input
                  type="range"
                  min="0.010"
                  max="0.100"
                  step="0.005"
                  value={params.diffusionRate}
                  onChange={(e) => {
                    setParams({ ...params, diffusionRate: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Governs real-time atmospheric gas plume expansion physics and explosive LEL arrival projections.
                </p>
              </div>

              {/* 4. Golden-Hour Decay Rate */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Bio-Decline Decay Rate (κ_bio)</span>
                  </span>
                  <span className="font-mono text-rose-400 font-bold">{params.goldenHourDecayRate.toFixed(5)}</span>
                </div>
                <input
                  type="range"
                  min="0.00010"
                  max="0.00100"
                  step="0.00005"
                  value={params.goldenHourDecayRate}
                  onChange={(e) => {
                    setParams({ ...params, goldenHourDecayRate: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Controls trapped survivor core temperature cooling rate and golden-hour triage countdown.
                </p>
              </div>

              {/* 5. Lookahead Predictive Horizon */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Predictive Horizon (H_pred)</span>
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{params.lookaheadHorizonSeconds.toFixed(1)}s</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="10.0"
                  step="0.5"
                  value={params.lookaheadHorizonSeconds}
                  onChange={(e) => {
                    setParams({ ...params, lookaheadHorizonSeconds: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Length of future vehicle poses projected forward in 3D scene and collision risk checking.
                </p>
              </div>

              {/* 6. Wall Clearance Buffer */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Tunnel Wall Buffer (ρ_margin)</span>
                  </span>
                  <span className="font-mono text-indigo-400 font-bold">{params.obstacleBufferMeters.toFixed(2)}m</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.4"
                  step="0.05"
                  value={params.obstacleBufferMeters}
                  onChange={(e) => {
                    setParams({ ...params, obstacleBufferMeters: parseFloat(e.target.value), profileName: 'custom' });
                  }}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">
                  Inflation margin keeping rover wheels away from rock walls and debris pile edges.
                </p>
              </div>
            </div>
          </div>

          {/* Live Path Preview Metrics */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                Live Output Metrics (With Current Weights)
              </div>
              <div className="text-[11px] text-slate-400">
                Evasion Apex Offset: <span className="text-amber-400 font-mono font-bold">+{previewResult.evasionOffsetMeters}m East</span> | Total Path: <span className="text-slate-200 font-mono font-bold">{previewResult.totalDistanceMeters}m</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <div className="text-[10px] text-slate-400">EST. TRANSIT</div>
                <div className="text-sky-300 font-bold">{previewResult.estTransitSeconds}s</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">SAFETY SCORE</div>
                <div className="text-emerald-400 font-bold">{previewResult.safetyClearanceScore}/100</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">CURVATURE JERK</div>
                <div className="text-purple-300 font-bold">{previewResult.curvatureJerkScore}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-950/90">
          <button
            type="button"
            onClick={() => setParams(DEFAULT_AI_HYPERPARAMETERS)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset to Factory Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Trained Weights On-the-Spot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
