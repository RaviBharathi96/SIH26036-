import React, { useState } from 'react';
import { RoverTelemetry, DroneTelemetry, SurvivorData } from '../types';
import { 
  Database, Download, FileJson, FileSpreadsheet, Activity, Wind, 
  Flame, Heart, Radio, MapPin, Gauge, ShieldAlert, Cpu, Eye,
  Clock, CheckCircle, AlertTriangle, RefreshCw
} from 'lucide-react';

interface DataCollectedPanelProps {
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  survivorData: SurvivorData;
  missionPhase: string;
}

type SensorFilter = 'all' | 'gas' | 'survivor' | 'spatial' | 'vehicles';

export const DataCollectedPanel: React.FC<DataCollectedPanelProps> = ({
  roverTelemetry,
  droneTelemetry,
  survivorData,
  missionPhase,
}) => {
  const [filter, setFilter] = useState<SensorFilter>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const ch4 = roverTelemetry?.ch4Ppm ?? 450;
  const co = roverTelemetry?.coPpm ?? 12;
  const co2 = roverTelemetry?.co2Ppm ?? 410;
  const temp = roverTelemetry?.temperatureC ?? 16.4;
<<<<<<< HEAD
  const o2Est = roverTelemetry?.o2Percent ?? Number(Math.max(14.8, 20.9 - (ch4 / 50000) * 6).toFixed(1));
  const airScore = roverTelemetry?.airQualityScore ?? 96;
  const gasInspect = roverTelemetry?.gasInspection;
=======
  const o2Est = Math.max(14.8, 20.9 - (ch4 / 50000) * 6).toFixed(1);
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

  // Download Mission Data as JSON
  const handleExportJSON = () => {
    const exportData = {
      missionMetadata: {
        timestamp: new Date().toISOString(),
        site: 'Sector 7 North Drift - Subterranean Rescue',
        missionPhase,
        systemVersion: 'SAR-Autonomous-v3.4',
      },
      atmosphericSensors: {
        ch4Ppm: ch4,
        coPpm: co,
        co2Ppm: co2,
        ambientTempC: temp,
<<<<<<< HEAD
        o2Percent: o2Est,
        airQualityScore: airScore,
        flammabilityWarning: ch4 > 10000 ? 'EXPLOSIVE_RISK' : 'NORMAL',
        gasInspectionSweep: gasInspect ? {
          active: gasInspect.active,
          phase: gasInspect.phase,
          phaseLabel: gasInspect.phaseLabel,
          progressPct: gasInspect.progressPct,
          airQualityStatus: gasInspect.airQualityStatus,
          targetLocationName: gasInspect.targetLocationName,
          notes: gasInspect.notes,
        } : null,
=======
        estimatedO2Percent: Number(o2Est),
        flammabilityWarning: ch4 > 10000 ? 'EXPLOSIVE_RISK' : 'NORMAL',
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
      },
      survivorTelemetry: {
        identity: 'Miner #4 (Randy)',
        confirmed: survivorData.detected,
        fusedProbabilityPercent: Math.round(survivorData.fusedProbability * 100),
        vitals: {
          respirationBpm: survivorData.respirationBpm,
          heartRateBpm: survivorData.heartRateBpm,
          coreTemperatureC: survivorData.temperatureC,
        },
        sensorBreakdown: {
          thermalInfrared: Math.round(survivorData.thermalConfidence * 100),
          acousticMicroVibrations: Math.round(survivorData.acousticConfidence * 100),
          exhaledCO2Plume: Math.round(survivorData.co2Confidence * 100),
          uwbRadarPenetration: Math.round(survivorData.uwbConfidence * 100),
        },
      },
      roverTelemetry: {
        position: roverTelemetry?.position,
        batteryPct: roverTelemetry?.batteryPct,
        commsRssi: roverTelemetry?.commsRssi,
        headingDeg: roverTelemetry ? Math.round((roverTelemetry.yaw * 180) / Math.PI) : 0,
        mode: roverTelemetry?.mode,
      },
      scoutDroneTelemetry: {
        state: droneTelemetry?.state,
        position: droneTelemetry?.position,
        altitudeM: droneTelemetry?.altitude,
        batteryPct: droneTelemetry?.batteryPct,
        estimatedFlightSecondsRemaining: droneTelemetry?.estimatedFlightSecondsRemaining,
        relDistanceToRoverM: droneTelemetry?.relDistanceToRover,
        thermalLocked: droneTelemetry?.thermalLocked,
      },
      spatialMapping: {
        lidarPointsMapped: 14850,
        tunnelDimensions: { lengthM: 35.0, widthM: 4.8, heightM: 3.2 },
        rubbleCollapseVolumeM3: 18.4,
        overheadFlightClearanceM: 1.4,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mine-rescue-telemetry-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Telemetry JSON exported successfully');
    setTimeout(() => setExportNotice(null), 3000);
  };

  // Download Sensor Log as CSV
  const handleExportCSV = () => {
    const rows = [
      ['Timestamp', 'Subsystem', 'Parameter', 'Value', 'Unit', 'Status'],
      [new Date().toISOString(), 'Gas Sensor', 'Methane CH4', ch4, 'ppm', ch4 > 10000 ? 'CRITICAL' : 'NORMAL'],
      [new Date().toISOString(), 'Gas Sensor', 'Carbon Monoxide CO', co, 'ppm', co > 50 ? 'WARNING' : 'NORMAL'],
      [new Date().toISOString(), 'Gas Sensor', 'Carbon Dioxide CO2', co2, 'ppm', 'NORMAL'],
      [new Date().toISOString(), 'Environmental', 'Ambient Temperature', temp, '°C', 'NORMAL'],
      [new Date().toISOString(), 'Environmental', 'Estimated Oxygen O2', o2Est, '%', Number(o2Est) < 18 ? 'WARNING' : 'NOMINAL'],
      [new Date().toISOString(), 'Survivor Vitals', 'Respiration Rate', survivorData.respirationBpm, 'BPM', 'SHALLOW'],
      [new Date().toISOString(), 'Survivor Vitals', 'Heart Rate', survivorData.heartRateBpm, 'BPM', 'ELEVATED'],
      [new Date().toISOString(), 'Survivor Vitals', 'Core Temperature', survivorData.temperatureC, '°C', 'MILD_HYPOTHERMIA'],
      [new Date().toISOString(), 'Survivor Sensors', 'Thermal FLIR Confidence', Math.round(survivorData.thermalConfidence * 100), '%', survivorData.thermalConfidence > 0.5 ? 'ACQUIRED' : 'SEARCHING'],
      [new Date().toISOString(), 'Survivor Sensors', 'Fused Probability', Math.round(survivorData.fusedProbability * 100), '%', survivorData.detected ? 'CONFIRMED' : 'UNCERTAIN'],
      [new Date().toISOString(), 'Rover', 'Battery Level', roverTelemetry?.batteryPct ?? 90, '%', 'NOMINAL'],
      [new Date().toISOString(), 'Drone', 'Battery Level', droneTelemetry?.batteryPct ?? 95, '%', (droneTelemetry?.batteryPct ?? 95) < 20 ? 'CRITICAL' : 'NOMINAL'],
      [new Date().toISOString(), 'Drone', 'Flight Time Remaining', droneTelemetry?.estimatedFlightSecondsRemaining ?? 600, 'sec', 'NOMINAL'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mine-sensors-data-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Sensor CSV logs exported successfully');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div id="data-collected-panel" className="flex flex-col gap-3 h-full bg-slate-900/95 border border-slate-800 rounded-xl p-4 text-slate-100 shadow-xl backdrop-blur-md overflow-y-auto">
      {/* Header with Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-100">
              Subterranean Telemetry & Sensor Repository
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated multi-vehicle ROS 2 sensor topics, fused life-signs, and atmospheric logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {exportNotice && (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-1 rounded animate-fade-in flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              {exportNotice}
            </span>
          )}

          <button
            id="btn-export-json"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
            title="Download full JSON dataset"
          >
            <FileJson className="w-3.5 h-3.5 text-sky-400" />
            Export JSON
          </button>

          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
            title="Download CSV sensor log spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Top Metrics Cards Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Peak CH4 Detected
            </span>
            <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${ch4 > 10000 ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-slate-500'}`}>
              {ch4 > 10000 ? 'EXPLOSIVE' : 'SAFE'}
            </span>
          </div>
          <div className={`text-lg font-bold font-mono ${ch4 > 10000 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
            {ch4.toLocaleString()} <span className="text-xs font-normal text-slate-400">PPM</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">LEL threshold: 50,000 ppm</div>
        </div>

        <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Survivor Probability
            </span>
            <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${survivorData.detected ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-500'}`}>
              {survivorData.detected ? 'LOCKED' : 'SEARCH'}
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-emerald-400">
            {Math.round(survivorData.fusedProbability * 100)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Target: Miner #4 (Randy)</div>
        </div>

        <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Scout Drone Battery
            </span>
            <span className="text-[10px] text-sky-400 font-mono">
              {droneTelemetry?.state?.toUpperCase() || 'STANDBY'}
            </span>
          </div>
          <div className="text-lg font-bold font-mono text-sky-300">
            {droneTelemetry?.batteryPct ?? 94}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {Math.round((droneTelemetry?.estimatedFlightSecondsRemaining ?? 600) / 60)}m endurance remaining
          </div>
        </div>

        <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              LiDAR 3D Points
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">SLAM 10Hz</span>
          </div>
          <div className="text-lg font-bold font-mono text-indigo-300">
            14,820 <span className="text-xs font-normal text-slate-400">PTS</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Subterranean map resolution: 2.5cm</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-950/40 p-1 rounded-lg border border-slate-800 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            filter === 'all' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Data Streams
        </button>
        <button
          onClick={() => setFilter('gas')}
          className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            filter === 'gas' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Atmospheric & Hazardous Gas
        </button>
        <button
          onClick={() => setFilter('survivor')}
          className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            filter === 'survivor' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Survivor Bio-Sensors
        </button>
        <button
          onClick={() => setFilter('spatial')}
          className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            filter === 'spatial' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          LiDAR & Rubble Spatial Geometry
        </button>
        <button
          onClick={() => setFilter('vehicles')}
          className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            filter === 'vehicles' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Rover & Drone Diagnostics
        </button>
      </div>

      {/* Main Data Tables / Sections */}
      <div className="space-y-3">
        {/* ATMOSPHERIC GASES */}
        {(filter === 'all' || filter === 'gas') && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Wind className="w-3.5 h-3.5" />
                Atmospheric & Hazardous Gas Sensors
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Topic: /sensors/gas_array</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-slate-400 text-[11px]">Methane CH4</div>
                  <div className={`text-base font-bold font-mono mt-0.5 ${ch4 > 10000 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {ch4.toLocaleString()} ppm
                  </div>
                  <div className="text-[10px] text-slate-500">Normal &lt; 1,000 ppm</div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    ch4 > 10000 ? 'bg-rose-500/20 text-rose-300 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ch4 > 10000 ? 'LEL HAZARD' : 'SAFE'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-slate-400 text-[11px]">Carbon Monoxide CO</div>
                  <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                    {co} ppm
                  </div>
                  <div className="text-[10px] text-slate-500">OSHA PEL: 50 ppm</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    ACCEPTABLE
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-slate-400 text-[11px]">Carbon Dioxide CO2</div>
                  <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                    {co2} ppm
                  </div>
                  <div className="text-[10px] text-slate-500">Metabolic plume index</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">
                    RESPIRING
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
              <span>Ambient Temp: <strong className="text-slate-200">{temp}°C</strong></span>
              <span>Barometric Depth: <strong className="text-slate-200">-142m MSL</strong></span>
<<<<<<< HEAD
              <span>Oxygen Level (O2): <strong className="text-emerald-400">{o2Est}%</strong></span>
              <span>Air Quality Index: <strong className="text-cyan-300">{airScore}/100</strong></span>
              <span>Humidity: <strong className="text-slate-200">84% RH</strong></span>
            </div>

            {/* Post-Drone Autonomous Rover Gas & Air Quality Sweep Telemetry */}
            {gasInspect && (
              <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-emerald-300 flex items-center gap-1.5 text-[11px]">
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                    POST-DEPLOYMENT ROVER ATMOSPHERIC SWEEP
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold border ${
                    gasInspect.phase === 'inspection_complete'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                      : gasInspect.active
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {gasInspect.phase === 'inspection_complete' ? 'CERTIFIED FOR INGRESS' : gasInspect.active ? `SWEEPING (${gasInspect.progressPct}%)` : 'STANDBY'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Phase: <strong className="text-emerald-300">{gasInspect.phaseLabel}</strong> | Target: <strong className="text-slate-200">{gasInspect.targetLocationName}</strong>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {gasInspect.notes}
                </div>
              </div>
            )}
=======
              <span>Estimated O2 Level: <strong className="text-emerald-400">{o2Est}%</strong></span>
              <span>Humidity: <strong className="text-slate-200">84% RH</strong></span>
            </div>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </div>
        )}

        {/* SURVIVOR LIFE-SIGNS & MULTI-SENSOR FUSION */}
        {(filter === 'all' || filter === 'survivor') && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Heart className="w-3.5 h-3.5" />
                Survivor Multi-Sensor Biometric Telemetry (Miner Randy)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Topic: /sar/survivor_fusion</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 font-mono">
                <div className="text-slate-400 text-[10px]">RESPIRATION</div>
                <div className="text-sm font-bold text-rose-300 mt-0.5">{survivorData.respirationBpm} BPM</div>
                <div className="text-[9px] text-slate-500">Shallow thoracic motion</div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 font-mono">
                <div className="text-slate-400 text-[10px]">HEART RATE</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{survivorData.heartRateBpm} BPM</div>
                <div className="text-[9px] text-slate-500">Sinus tachycardia</div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 font-mono">
                <div className="text-slate-400 text-[10px]">CORE BODY TEMP</div>
                <div className="text-sm font-bold text-amber-300 mt-0.5">{survivorData.temperatureC}°C</div>
                <div className="text-[9px] text-slate-500">Mild hypothermia threat</div>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800 font-mono">
                <div className="text-slate-400 text-[10px]">FUSED CONFIDENCE</div>
                <div className="text-sm font-bold text-sky-400 mt-0.5">{Math.round(survivorData.fusedProbability * 100)}%</div>
                <div className="text-[9px] text-slate-500">Bayesian Kalman Filter</div>
              </div>
            </div>

            {/* Sensor Probability Breakdown Bars */}
            <div className="space-y-1.5 bg-slate-900/40 p-2.5 rounded border border-slate-800/80 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-400" /> FLIR Thermal IR Signature
                </span>
                <span className="font-mono font-bold text-red-400">{Math.round(survivorData.thermalConfidence * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${Math.round(survivorData.thermalConfidence * 100)}%` }} />
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-amber-400" /> Acoustic Micro-Vibrations (Tapping)
                </span>
                <span className="font-mono font-bold text-amber-400">{Math.round(survivorData.acousticConfidence * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${Math.round(survivorData.acousticConfidence * 100)}%` }} />
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-sky-400" /> Ultra-Wideband (UWB) Through-Wall Radar
                </span>
                <span className="font-mono font-bold text-sky-400">{Math.round(survivorData.uwbConfidence * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${Math.round(survivorData.uwbConfidence * 100)}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* SPATIAL GEOMETRY & RUBBLE METRICS */}
        {(filter === 'all' || filter === 'spatial') && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5" />
                LiDAR 3D Point Cloud & Rubble Obstacle Geometry
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Topic: /velodyne_points</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px] font-sans">MAIN DRIFT ENVELOPE</div>
                <div className="text-sm font-bold text-slate-200 mt-1">35.0m × 4.8m × 3.2m</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Total drivable corridor length</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px] font-sans">EAST DRIFT COLLAPSE VOLUME</div>
                <div className="text-sm font-bold text-amber-300 mt-1">18.4 m³ Loose Rubble</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Boulder height: 1.8m (Impassable to rover)</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px] font-sans">AERIAL OVERHEAD CLEARANCE</div>
                <div className="text-sm font-bold text-sky-400 mt-1">1.40m Vertical Window</div>
                <div className="text-[10px] text-emerald-400 font-sans mt-0.5">Scout drone flight path: CLEAR</div>
              </div>
            </div>
          </div>
        )}

        {/* VEHICLE DIAGNOSTICS & TELEMETRY */}
        {(filter === 'all' || filter === 'vehicles') && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Cpu className="w-3.5 h-3.5" />
                Vehicle Subsystem Telemetry & Power Diagnostics
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Topics: /rover/odom & /drone/state</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Rover */}
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="flex justify-between items-center mb-1 font-semibold text-emerald-400">
                  <span>GROUND RESCUE ROVER (UGV-1)</span>
                  <span className="font-mono text-[10px] px-1 bg-emerald-500/10 rounded">{roverTelemetry?.mode || 'MANUAL'}</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Location (X, Y, Z)</span>
                    <span>{roverTelemetry?.position.x ?? 0}m, {roverTelemetry?.position.y ?? 0}m, {roverTelemetry?.position.z ?? 0}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Heading Yaw</span>
                    <span>{roverTelemetry ? ((roverTelemetry.yaw * 180) / Math.PI).toFixed(1) : 0}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Battery Reserve</span>
                    <span className="text-emerald-400">{roverTelemetry?.batteryPct ?? 90}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Subterranean RF RSSI</span>
                    <span>{roverTelemetry?.commsRssi ?? -45} dBm</span>
                  </div>
                </div>
              </div>

              {/* Drone */}
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <div className="flex justify-between items-center mb-1 font-semibold text-sky-400">
                  <span>AERIAL SCOUT QUADCOPTER (UAV-1)</span>
                  <span className="font-mono text-[10px] px-1 bg-sky-500/10 rounded uppercase">{droneTelemetry?.state || 'DOCKED'}</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Flight Altitude</span>
                    <span>{droneTelemetry?.altitude ?? 0}m AGL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Flight Battery</span>
                    <span className="text-sky-300 font-bold">{droneTelemetry?.batteryPct ?? 94}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Endurance Remaining</span>
                    <span className="text-sky-400 font-bold">
                      {Math.floor((droneTelemetry?.estimatedFlightSecondsRemaining ?? 600) / 60)}m {(droneTelemetry?.estimatedFlightSecondsRemaining ?? 600) % 60}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Distance to Rover Relay</span>
                    <span>{droneTelemetry?.relDistanceToRover ?? 0}m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
