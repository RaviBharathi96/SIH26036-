import React, { useState } from 'react';
import { ROS_WORKSPACE_FILES } from '../data/rosWorkspaceFiles';
import { RosPackageFile } from '../types';
import JSZip from 'jszip';
import { 
  X, Download, Copy, Check, FileCode, Folder, Terminal, 
  ExternalLink, Layers, Box, Cpu, FileText
} from 'lucide-react';

interface RosCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RosCodeViewerModal: React.FC<RosCodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<RosPackageFile>(ROS_WORKSPACE_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Create folder structure
      const rootFolder = zip.folder('mine_rescue_ws');
      const srcFolder = rootFolder?.folder('src');
      const pkgFolder = srcFolder?.folder('mine_rescue_sim');

      ROS_WORKSPACE_FILES.forEach((f) => {
        // Strip out 'mine_rescue_sim/' prefix to place inside the package
        const relPath = f.path.replace('mine_rescue_sim/', '');
        pkgFolder?.file(relPath, f.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mine_rescue_ws_ros2_jazzy.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP archive', err);
    } finally {
      setIsZipping(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sdf': return Box;
      case 'urdf': return Cpu;
      case 'launch': return Terminal;
      case 'config': return Layers;
      case 'scripts': return FileCode;
      default: return FileText;
    }
  };

  return (
    <div id="ros-code-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="flex flex-col w-full max-w-6xl h-[88vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                ROS 2 Jazzy & Gazebo Harmonic Source Packages
              </h2>
              <p className="text-xs text-slate-400">
                Complete, production-ready workspace: SDF World, URDF xacro, ROS-GZ Bridge, SLAM Toolbox, Nav2, Python Nodes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-download-zip"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors shadow cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Packaging ZIP...' : 'Download ROS 2 Workspace (.zip)'}</span>
            </button>

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: File Tree (Left) + Code Viewer (Right) */}
        <div className="flex flex-1 overflow-hidden">
          {/* File Tree Navigator */}
          <div className="w-80 border-r border-slate-800/80 bg-slate-900/40 p-3 overflow-y-auto flex flex-col gap-1">
            <div className="text-[11px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span>mine_rescue_sim /</span>
            </div>

            {ROS_WORKSPACE_FILES.map((file) => {
              const Icon = getCategoryIcon(file.category);
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 font-medium' 
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div className="truncate">
                    <div className="font-mono text-slate-200">{file.filename}</div>
                    <div className="text-[10px] text-slate-500 truncate">{file.path}</div>
                  </div>
                </button>
              );
            })}

            {/* Quick Build Instructions Card */}
            <div className="mt-auto pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
              <div className="text-slate-300 font-semibold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Build in Ubuntu 24.04:</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px] text-emerald-400 select-all">
                cd ~/mine_rescue_ws<br/>
                colcon build --symlink-install<br/>
                source install/setup.bash<br/>
                ros2 launch mine_rescue_sim simulation.launch.py
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* File info bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-200">{selectedFile.filename}</span>
                <span className="text-[10px] font-mono text-slate-500">({selectedFile.path})</span>
              </div>

              <button
                id="btn-copy-code"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* File description note */}
            <div className="px-4 py-2 bg-slate-900/30 border-b border-slate-800/50 text-[11px] text-slate-400 italic">
              {selectedFile.description}
            </div>

            {/* Source Code text area */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed select-text bg-[#0a0d14]">
              <pre><code>{selectedFile.content}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
