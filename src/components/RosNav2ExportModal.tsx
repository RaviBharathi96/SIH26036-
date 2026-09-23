import React, { useState } from 'react';
import { MissionPatrolWaypoint, PatrolPlanState } from '../types';
import { 
  generateNav2WaypointsYaml, 
  generateNav2PatrolClientPy, 
  generateDroneOffboardNavigatorPy, 
  generatePatrolLaunchPy 
} from '../utils/rosNav2Generator';
import JSZip from 'jszip';
import { 
  X, Download, Copy, Check, FileCode, Terminal, 
  Layers, CheckCircle2, Compass, Plane, Bot, ShieldCheck
} from 'lucide-react';

interface RosNav2ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  roverWaypoints?: MissionPatrolWaypoint[];
  droneWaypoints?: MissionPatrolWaypoint[];
  isLoop?: boolean;
  patrolPlan?: PatrolPlanState;
}

export const RosNav2ExportModal: React.FC<RosNav2ExportModalProps> = ({
  isOpen,
  onClose,
  roverWaypoints: propRoverWaypoints,
  droneWaypoints: propDroneWaypoints,
  isLoop: propIsLoop,
  patrolPlan,
}) => {
  const [activeTab, setActiveTab] = useState<'yaml' | 'python_rover' | 'python_drone' | 'launch'>('yaml');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const roverWaypoints = patrolPlan?.roverWaypoints || propRoverWaypoints || [];
  const droneWaypoints = patrolPlan?.droneWaypoints || propDroneWaypoints || [];
  const isLoop = patrolPlan ? patrolPlan.isLoop : (propIsLoop ?? false);

  const yamlContent = generateNav2WaypointsYaml(roverWaypoints, droneWaypoints, isLoop);
  const pythonRoverContent = generateNav2PatrolClientPy(roverWaypoints, droneWaypoints, isLoop);
  const pythonDroneContent = generateDroneOffboardNavigatorPy(droneWaypoints, isLoop);
  const launchContent = generatePatrolLaunchPy();

  const files = [
    {
      id: 'yaml',
      name: 'patrol_waypoints.yaml',
      path: 'config/patrol_waypoints.yaml',
      content: yamlContent,
      type: 'yaml',
      badge: 'Nav2 Config',
      desc: 'Waypoint follow parameters with stamped map poses and orientations'
    },
    {
      id: 'python_rover',
      name: 'patrol_client.py',
      path: 'scripts/patrol_client.py',
      content: pythonRoverContent,
      type: 'python',
      badge: 'Rover Action Client',
      desc: 'ROS 2 Python node using Nav2 BasicNavigator for autonomous waypoint following'
    },
    {
      id: 'python_drone',
      name: 'drone_navigator.py',
      path: 'scripts/drone_navigator.py',
      content: pythonDroneContent,
      type: 'python',
      badge: 'Aerial Trajectory',
      desc: 'Scout drone 3D subterranean waypoint navigator with altitude management'
    },
    {
      id: 'launch',
      name: 'patrol_mission.launch.py',
      path: 'launch/patrol_mission.launch.py',
      content: launchContent,
      type: 'python',
      badge: 'ROS 2 Launch',
      desc: 'Python launch description linking Nav2 bringup and custom patrol nodes'
    },
  ];

  const currentFile = files.find((f) => f.id === activeTab) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      const pkgFolder = zip.folder('mine_rescue_nav2_patrol');
      pkgFolder?.file('config/patrol_waypoints.yaml', yamlContent);
      pkgFolder?.file('scripts/patrol_client.py', pythonRoverContent);
      pkgFolder?.file('scripts/drone_navigator.py', pythonDroneContent);
      pkgFolder?.file('launch/patrol_mission.launch.py', launchContent);
      pkgFolder?.file(
        'README.md',
        `# Mine Rescue ROS 2 Nav2 Patrol Package

## Waypoint Summary
- Ground Rover Waypoints: ${roverWaypoints.length}
- Aerial Drone Waypoints: ${droneWaypoints.length}
- Continuous Loop Mode: ${isLoop ? 'ENABLED' : 'DISABLED'}
- Coordinate Reference Frame: map (subterranean datum)

## Quick Start (ROS 2 Jazzy)
1. Copy into your ROS 2 workspace: \`cp -r mine_rescue_nav2_patrol ~/ros2_ws/src/\`
2. Build workspace: \`colcon build --symlink-install\`
3. Source environment: \`source install/setup.bash\`
4. Launch autonomous patrol: \`ros2 launch mine_rescue_nav2_patrol patrol_mission.launch.py\`
`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ros2_nav2_mine_patrol_route.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create Nav2 zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div id="ros2-nav2-export-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  ROS 2 Navigation Stack Export (Nav2)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold">
                  Jazzy / Iron / Humble Compatible
                </span>
              </div>
              <p className="text-xs text-slate-400">
                User-defined multi-point patrol coordinates exported to ROS 2 Nav2 Waypoint Follower & Action Clients
              </p>
            </div>
          </div>

          <button
            id="btn-close-ros-nav2-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Stats Ribbon */}
        <div className="flex flex-wrap items-center justify-between px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Rover Waypoints:</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold">
                {roverWaypoints.length} poses
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              <span className="text-slate-400">Drone Waypoints:</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-500/40 text-sky-300 font-bold">
                {droneWaypoints.length} poses
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">Patrol Mode:</span>
              <span className={`px-1.5 py-0.5 rounded font-bold border ${
                isLoop 
                  ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}>
                {isLoop ? 'CONTINUOUS LOOP' : 'ONE-WAY TRANSIT'}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Reference Frame: <code className="text-emerald-300 font-bold">map</code></span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              id="btn-copy-nav2-code"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Active File'}</span>
            </button>

            <button
              id="btn-download-nav2-zip"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-md shadow-emerald-950/40 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Generating ZIP...' : 'Download Nav2 Package (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* File Tabs Bar */}
        <div className="flex items-center gap-1 px-6 py-2 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          {files.map((file) => (
            <button
              key={file.id}
              id={`tab-ros-file-${file.id}`}
              onClick={() => setActiveTab(file.id as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === file.id
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] text-slate-400 font-normal">
                {file.badge}
              </span>
            </button>
          ))}
        </div>

        {/* File Description Header */}
        <div className="px-6 py-2 bg-slate-950/30 border-b border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px]">{currentFile.path}</span>
            <span className="text-slate-600">•</span>
            <span>{currentFile.desc}</span>
          </div>
          <span className="text-[11px] text-slate-500">{currentFile.content.split('\n').length} lines</span>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-auto bg-slate-950 p-6 font-mono text-xs leading-relaxed text-slate-200 selection:bg-emerald-900 selection:text-white">
          <pre className="whitespace-pre">
            <code>{currentFile.content}</code>
          </pre>
        </div>

        {/* Footer Terminal Guide */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-semibold">ROS 2 Execution Command:</span>
            <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 text-[11px]">
              ros2 launch mine_rescue_sim patrol_mission.launch.py
            </code>
          </div>
          <span className="text-[11px] text-slate-500">
            Exported parameters automatically feed into costmap_2d & DWBA/MPPI planners
          </span>
        </div>
      </div>
    </div>
  );
};
