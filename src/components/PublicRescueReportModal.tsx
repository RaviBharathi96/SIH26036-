import React, { useState } from 'react';
import { 
  X, Printer, Copy, Check, HardHat, Heart, ShieldAlert, 
  Wind, MapPin, Radio, AlertTriangle, Compass, CheckCircle2, 
<<<<<<< HEAD
  HelpCircle, Clock, FileText, ArrowRight, Share2, Sparkles,
  CornerUpRight, ShieldCheck, UserCheck, Flame, Layers
} from 'lucide-react';
import { RoverTelemetry, DroneTelemetry, SurvivorData, MineSectorSurveyData } from '../types';
=======
  HelpCircle, Clock, FileText, ArrowRight, Share2, Sparkles 
} from 'lucide-react';
import { RoverTelemetry, DroneTelemetry, SurvivorData } from '../types';
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

interface PublicRescueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  survivorData: SurvivorData;
<<<<<<< HEAD
  environmentalSectors?: MineSectorSurveyData[];
=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
}

export const PublicRescueReportModal: React.FC<PublicRescueReportModalProps> = ({
  isOpen,
  onClose,
  roverTelemetry,
  droneTelemetry,
  survivorData,
<<<<<<< HEAD
  environmentalSectors,
}) => {
  const [activeTab, setActiveTab] = useState<'public' | 'tactical' | 'environmental' | 'press'>('public');
=======
}) => {
  const [activeTab, setActiveTab] = useState<'public' | 'tactical' | 'press'>('public');
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

<<<<<<< HEAD
  const defaultSurveys: MineSectorSurveyData[] = environmentalSectors && environmentalSectors.length > 0
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
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
  const handleCopyPressBriefing = () => {
    const text = `
MINE RESCUE INCIDENT UPDATE - OFFICIAL PUBLIC BRIEFING
Incident: Blackwood Subterranean Drift Collapse
Survivor: Randy Miller (Equipment Operator) - CONFIRMED ALIVE
Location: East Drift Shelter Cavern, 24.8m from Mine Portal

STATUS SUMMARY:
Autonomous search robotics (ground rover and aerial scout drone) have successfully navigated the collapsed tunnel and established biometric confirmation of trapped miner Randy Miller. He is conscious and sheltered in a structurally stable air pocket.

<<<<<<< HEAD
KEY RESCUE FACTORS & ROUTE:
1. 90-Degree Strategic Turn: Rescuers enter through the south portal and make a calibrated 90-degree right turn at the central crosscut junction (WP4, 20.0m) directly into the East Drift.
2. Gas Safety: Explosive methane gas (42,500 ppm) was detected in the West drift. Rescuers strictly hug the east flank, avoiding any exposure.
3. Ground Obstacle: An 18.4 m³ (approx. 45 ton) rockfall barrier blocked ground vehicles at 20 meters. A 1.4m high ceiling void permits human rescuers with crawl harnesses and hydraulic shoring to reach the survivor.

RESCUE TEAM ACTION PLAN:
Human rescue teams are authorized to enter along the verified Green Safety Corridor with hydraulic shoring jacks and fresh air ventilation tubes. Estimated extraction within 35 minutes.
=======
KEY RESCUE FACTORS:
1. Ground Obstacle: An 18.4 m³ (approx. 45 ton) rockfall barrier blocked ground vehicles at 20 meters.
2. Gas Safety: Explosive methane gas (42,500 ppm) was detected in the West drift. The autonomous system bypassed this area safely without triggering any ignition risk.
3. Aerial Drone Ingress: The scout drone took off from the rover and flew over the rock collapse through a 1.4m ceiling clearance, pinpointing Randy with thermal imaging and radar.

RESCUE TEAM ACTION PLAN:
Human rescue teams are preparing to enter along the verified Green Safety Corridor with hydraulic shoring jacks and fresh air ventilation tubes. Estimated entry within 35 minutes.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="public-rescue-report-modal"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
<<<<<<< HEAD
                  Official Mine Rescue 3D Mapping & Safety Report
=======
                  Official Mine Rescue & Public Information Report
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/40">
                  SURVIVOR CONFIRMED ALIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prepared by Autonomous Multi-Agent Robotics System for First Responders, Families & Media
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Print official report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
<<<<<<< HEAD
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
=======
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2">
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          <button
            onClick={() => setActiveTab('public')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'public'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
<<<<<<< HEAD
            Plain-English Report (Families & Public)
=======
            Plain-English Report (For Families & Public)
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </button>
          <button
            onClick={() => setActiveTab('tactical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'tactical'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
<<<<<<< HEAD
            First Responder Safe Rescue Path & 90° Turn
          </button>
          <button
            onClick={() => setActiveTab('environmental')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'environmental'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All-Sides Environmental Survey (6 Sectors)
=======
            First Responder Operational Plan
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'press'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Press & Media Briefing Draft
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {activeTab === 'public' && (
            <div className="space-y-6">
              {/* Survivor Status Hero Banner */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-500/40 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                      <Heart className="w-8 h-8 animate-pulse text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        Trapped Miner Status
                      </div>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Miner Randy Miller is Confirmed Alive & Responsive
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
<<<<<<< HEAD
                        Location: Sheltered in a dry, stable air pocket <strong>24.8 meters (81 feet)</strong> deep inside the East Cavern, reached via the calibrated 90° right turn corridor.
=======
                        Location: Sheltered in a dry, stable air pocket <strong>24.8 meters (81 feet)</strong> deep inside the East Cavern, behind the ceiling rockfall.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs font-mono shrink-0 space-y-1">
                    <div>Respiration: <span className="text-emerald-400 font-bold">14 breaths / min</span></div>
                    <div>Body Heat: <span className="text-emerald-400 font-bold">37.1°C (Normal)</span></div>
<<<<<<< HEAD
                    <div>Air in Pocket: <span className="text-emerald-400 font-bold">Safe (38 ppm CH4)</span></div>
=======
                    <div>Air in Pocket: <span className="text-emerald-400 font-bold">Safe (40 ppm CH4)</span></div>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                    <div>Golden Hour: <span className="text-amber-400 font-bold">~3.5 Hours Remaining</span></div>
                  </div>
                </div>
              </div>

              {/* Three Understandable Questions Answered */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
<<<<<<< HEAD
                {/* Card 1: 90 Degree Turn & Path */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <CornerUpRight className="w-4 h-4" />
                    <h4>1. Defined Path & 90° Turn</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    The robotic scout mapped all sides of the mine and determined a safe path that makes a precision <strong>90-degree right turn</strong> at the central crosscut junction into the East Drift, completely avoiding the lethal methane gas on the west side.
=======
                {/* Card 1: Why the ground rover stopped */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <h4>1. Why the Ground Car Stopped</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    At 20 meters into the mine, a massive ceiling collapse dumped <strong>18.4 cubic meters (approx. 45 metric tons)</strong> of heavy jagged boulders. This created a 1.2-meter high wall that blocked wheeled vehicles completely.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                  </p>
                </div>

                {/* Card 2: Why the left tunnel wasn't used */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <h4>2. The Explosive Gas Danger</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
<<<<<<< HEAD
                    The rover's gas sensors detected a lethal cloud of <strong>42,500 ppm methane (85% LEL)</strong> in the West drift. Rescuers will hug the East wall during ingress to guarantee zero exposure.
                  </p>
                </div>

                {/* Card 3: Rockfall barrier */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <h4>3. Reaching Randy Over Rubble</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    An 18.4 m³ rockfall blocked wheels at 20 meters, but the drone flew through a <strong>1.4-meter ceiling void</strong> to confirm Randy. Rescuers will shore this gap with hydraulic jacks to extract Randy safely on a Stokes stretcher.
=======
                    The rover's gas sniffers detected an invisible, lethal cloud of <strong>42,500 parts per million methane</strong> in the left tunnel. Driving electric vehicles into that gas could cause an explosion, so the robots safely avoided it.
                  </p>
                </div>

                {/* Card 3: How the flying drone reached Randy */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <h4>3. How the Scout Drone Flew In</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    The rover stopped, locked its brakes, and launched an aerial scout drone from its rear helipad. The drone flew over the rock pile through a <strong>1.4-meter gap near the ceiling</strong>, using heat cameras and radar through the rocks to find Randy.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                  </p>
                </div>
              </div>

              {/* Step-by-Step Human Rescue Plan */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Compass className="w-4 h-4" />
                  <h4>How Human Rescue Teams Will Safely Bring Randy Out (Green Path)</h4>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-white">Walk the Safe Green Corridor: </strong>
                      Rescuers enter through the main tunnel, strictly staying on the eastern wall to avoid any stray methane fumes from the west side.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
<<<<<<< HEAD
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-white">Execute 90-Degree Right Turn: </strong>
                      At the 20.0-meter junction beacon, rescuers pivot 90 degrees right into the East Drift toward the survivor's chamber.
=======
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-white">Setup Temporary Fresh Air Ducts: </strong>
                      Blow fresh surface air directly through the 1.4-meter ceiling gap to keep Randy's air clean and flush away any remaining dust.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-white">Install Rock Shoring Supports: </strong>
<<<<<<< HEAD
                      Place hydraulic steel jacks and timber supports underneath the ceiling over the rock pile so no further rocks can fall while crossing the 1.4m crawlway.
=======
                      Place hydraulic steel jacks and timber supports underneath the ceiling over the rock pile so no further rocks can fall while crossing.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">4</span>
                    <div>
                      <strong className="text-white">Extricate on Stretcher: </strong>
<<<<<<< HEAD
                      Provide Randy with thermal blankets, bottled oxygen, and safely carry him out on a basket stretcher along the verified safe path to the surface medical tent.
=======
                      Provide Randy with thermal blankets, bottled oxygen, and safely carry him out on a basket stretcher to the surface medical tent.
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tactical' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-sky-400" />
                    First Responder Ingress Protocol (MSHA 30 CFR Part 49)
                  </h4>
<<<<<<< HEAD
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-400" />
                    PATH CLEARED FOR HUMAN ENTRY
=======
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px]">
                    INCIDENT COMMAND AUTHORIZED
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CORRIDOR LENGTH</span>
<<<<<<< HEAD
                    <span className="text-emerald-400 font-bold">28.5 METERS</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CRITICAL MANEUVER</span>
                    <span className="text-amber-400 font-bold">90° RIGHT TURN (WP4)</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MIN OVERHEAD CLEARANCE</span>
                    <span className="text-amber-400 font-bold">1.4 METERS (RUBBLE)</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">ATMOSPHERIC O2</span>
                    <span className="text-emerald-400 font-bold">20.6% NOMINAL</span>
                  </div>
                </div>

                {/* 90 Degree Turn Operational Directive */}
                <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-lg space-y-1 text-slate-300">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <CornerUpRight className="w-4 h-4" />
                    <span>90-Degree Right Turn Navigation Landmark (WP4 to WP5)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    At chainage 20.0m (beacon coordinates x: 0.0, z: 20.0), human rescuers must execute a 90-degree right turn into the East Drift. Dual boundary guide rails mark the 1.1m safe footway envelope. Do NOT proceed straight into Sector 4 (high heat zone) or left into Sector 2 (42,500 ppm methane).
                  </p>
                </div>

                <div className="space-y-2 text-slate-300">
                  <h5 className="font-bold text-slate-200">Mandatory Gear Checklist for Rescuers:</h5>
=======
                    <span className="text-emerald-400 font-bold">24.8 METERS</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MIN OVERHEAD CLEARANCE</span>
                    <span className="text-amber-400 font-bold">1.4 METERS</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">AMBIENT TEMP</span>
                    <span className="text-slate-200 font-bold">16.4°C</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">ATMOSPHERIC O2</span>
                    <span className="text-emerald-400 font-bold">20.8% NOMINAL</span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-300">
                  <h5 className="font-bold text-slate-200">Mandatory Gear Checklist:</h5>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>4-Hour Self-Contained Breathing Apparatus (SCBA) certified for underground mine rescue.</li>
                    <li>Dual-Frequency Intrinsically Safe Gas Detectors (CH4, CO, CO2, O2, H2S).</li>
                    <li>Lightweight aluminum hydraulic ceiling shoring shores (3.0m - 4.5m reach).</li>
                    <li>Stokes rescue basket with high-angle rigging harness and thermal insulation sleeve.</li>
                    <li>Portable Intrinsically Safe (Class I, Div 1) axial ventilation fan and 12-inch ducting.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

<<<<<<< HEAD
          {activeTab === 'environmental' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                      <Wind className="w-4 h-4 text-cyan-400" />
                      All-Sides Environmental Survey Matrix
                    </h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Robotic multi-gas reconnaissance covering South, West, North, and East sectors
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                    6 SECTORS MAPPED
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[11px] border border-slate-800">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2">Sector &amp; Location</th>
                        <th className="p-2">CH4 (LEL)</th>
                        <th className="p-2">O2 %</th>
                        <th className="p-2">Temp</th>
                        <th className="p-2">Stability</th>
                        <th className="p-2">Human Safety</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {defaultSurveys.map((s) => (
                        <tr key={s.sectorId} className="hover:bg-slate-900/50">
                          <td className="p-2 font-sans font-semibold text-slate-200">
                            {s.sideName}
                          </td>
                          <td className={`p-2 font-bold ${s.ch4Ppm > 1000 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {s.ch4Ppm} ppm ({s.ch4LelPct}%)
                          </td>
                          <td className={`p-2 ${s.o2Pct < 19.5 ? 'text-rose-400' : 'text-slate-200'}`}>
                            {s.o2Pct}%
                          </td>
                          <td className={`p-2 ${s.tempC > 30 ? 'text-amber-400' : 'text-slate-300'}`}>
                            {s.tempC}°C
                          </td>
                          <td className="p-2 text-emerald-400 font-semibold">
                            {s.structuralStabilityPct}% ({s.roofCondition})
                          </td>
                          <td className="p-2">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              s.humanRescuerSafe 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              {s.humanRescuerSafe ? 'SAFE' : 'LETHAL'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1 text-slate-300 text-[11px]">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Summary Assessment for Rescuers</span>
                  </div>
                  <p className="leading-relaxed">
                    The survey proves that by avoiding Sector 2 (West Methane Plume) and executing the <strong>90-degree right turn</strong> at Sector 3, human rescuers have an atmospherically benign (38-185 ppm CH4, &gt;20% O2) path directly into Sector 6 to extract Randy safely.
                  </p>
                </div>
              </div>
            </div>
          )}

=======
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          {activeTab === 'press' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <h4>Public Information Officer (PIO) Press Release</h4>
                  </div>

                  <button
                    onClick={handleCopyPressBriefing}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Official Press Release'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-line select-all">
{`FOR IMMEDIATE RELEASE - MINE INCIDENT UPDATE
Date: September 19, 2026 | Location: Appalachian Coal Seam Mine No. 4

OFFICIAL STATEMENT:
At approximately 13:10 hours today, an autonomous robotic ground-and-air reconnaissance team reached the subterranean collapse zone at Appalachian Coal Seam Mine No. 4. 

We can confirm that trapped miner Randy Miller has been located alive and conscious in an East Drift air shelter, approximately 25 meters from the surface portal. 

<<<<<<< HEAD
Biometric sensors on the reconnaissance drone indicate normal body temperature and steady respiration. Ground teams have mapped all mine sides and verified a 90-degree turn safe passage that completely bypasses hazardous gas pockets. 
=======
Biometric sensors on the reconnaissance drone indicate normal body temperature and steady respiration. Ground teams have verified the safest route, completely bypassing hazardous gas pockets. 
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403

First responder rescue teams equipped with hydraulic roof supports and portable fresh-air equipment have mobilized at the surface portal to initiate extraction.

Next briefing will occur in 30 minutes.`}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
<<<<<<< HEAD
            <span>Subterranean Multi-Agent Autonomous Reconnaissance System</span>
=======
            <span>Digital Twin Simulation verified via ROS 2 Jazzy &amp; Gazebo Harmonic</span>
>>>>>>> 9a731b2164be119fc109637d2b6e9db0937da403
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
