import React from 'react';
import { SurvivorData, RoverTelemetry, DroneTelemetry } from '../types';
import { Eye, Flame, Mic, Wind, Radio, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SensorFusionPanelProps {
  survivorData: SurvivorData;
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
}

const SensorFusionPanelComponent: React.FC<SensorFusionPanelProps> = ({
  survivorData,
  roverTelemetry,
  droneTelemetry,
}) => {
  const isDetected = survivorData.detected;

  const modalities = [
    {
      id: 'visual',
      label: 'Visual (YOLOv8)',
      icon: Eye,
      confidence: survivorData.visualConfidence,
      weight: '15%',
      detail: isDetected ? 'Detected Helmet & Reflective Vest (Class: Miner)' : 'Searching dark debris field...',
      color: 'text-sky-400',
      barColor: 'bg-sky-500',
    },
    {
      id: 'thermal',
      label: 'Thermal IR (FLIR)',
      icon: Flame,
      confidence: survivorData.thermalConfidence,
      weight: '25%',
      detail: isDetected ? `Body Core: 37.1°C (Ambient Mine: 16.4°C, ΔT: +20.7°C)` : 'Background cold rock signature',
      color: 'text-amber-400',
      barColor: 'bg-amber-500',
    },
    {
      id: 'acoustic',
      label: 'Acoustic (MEMS + ANC)',
      icon: Mic,
      confidence: survivorData.acousticConfidence,
      weight: '15%',
      detail: isDetected ? 'Rhythmic Rapping Pattern (0.8 Hz) Filtered' : 'Ambient ventilation rush',
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500',
    },
    {
      id: 'co2',
      label: 'CO2 Plume Sniffer',
      icon: Wind,
      confidence: survivorData.co2Confidence,
      weight: '15%',
      detail: `Current: ${roverTelemetry?.co2Ppm || 420} ppm (Breathing Plume Baseline > 950)`,
      color: 'text-teal-400',
      barColor: 'bg-teal-500',
    },
    {
      id: 'uwb',
      label: 'UWB Radar (Through-Rubble)',
      icon: Radio,
      confidence: survivorData.uwbConfidence,
      weight: '30%',
      detail: isDetected ? `Respiration: 14 bpm | Chest Motion: 3.2mm | Heart: 88 bpm` : 'Scanning sub-surface reflections...',
      color: 'text-purple-400',
      barColor: 'bg-purple-500',
    },
  ];

  return (
    <div id="sensor-fusion-panel" className="flex flex-col h-full bg-slate-900/95 border border-slate-800 rounded-xl p-3.5 text-slate-100 shadow-xl backdrop-blur-md">
      {/* Header with probability badge */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isDetected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide text-white">AI Multi-Modal Life-Sign Fusion</h3>
            <p className="text-[11px] text-slate-400 font-mono">XGBoost & Bayesian Sensor Integration</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-mono text-slate-400">Survivor Probability</span>
          <div className="flex items-baseline gap-1 justify-end">
            <span className={`text-xl font-bold font-mono ${survivorData.fusedProbability > 0.8 ? 'text-emerald-400' : survivorData.fusedProbability > 0.4 ? 'text-amber-400' : 'text-slate-400'}`}>
              {(survivorData.fusedProbability * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Target status card */}
      <div className={`rounded-lg p-2.5 mb-3 border text-xs flex items-center justify-between ${
        isDetected 
          ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200' 
          : 'bg-slate-800/40 border-slate-700/50 text-slate-300'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDetected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="font-medium">
            {isDetected ? 'Target Locked: Rescue Randy (Miner #4)' : 'Scanning Multi-Tunnel Grid...'}
          </span>
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          Grid: [X: {survivorData.position.x}m, Z: {survivorData.position.z}m]
        </div>
      </div>

      {/* 5 Modalities list */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {modalities.map((m) => {
          const Icon = m.icon;
          const pct = Math.round(m.confidence * 100);
          return (
            <div key={m.id} className="bg-slate-950/60 rounded-lg p-2 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                  <span className="font-medium text-slate-200">{m.label}</span>
                  <span className="text-[10px] text-slate-500 font-mono">wt: {m.weight}</span>
                </div>
                <span className="font-mono font-bold text-xs text-slate-300">{pct}%</span>
              </div>

              {/* Confidence Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full ${m.barColor} transition-all duration-300`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-400 font-mono truncate">
                {m.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gas Hazard Alert Pill */}
      {roverTelemetry && roverTelemetry.ch4Ppm > 10000 && (
        <div className="mt-2 p-2 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center gap-2 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <div className="truncate">
            <span className="font-bold">Methane Spike: {roverTelemetry.ch4Ppm} ppm</span> (Intrinsically Safe Mode Active)
          </div>
        </div>
      )}
    </div>
  );
};

export const SensorFusionPanel = React.memo(SensorFusionPanelComponent);

