import React, { useRef, useEffect } from 'react';
import { RoverTelemetry, DroneTelemetry, HazardZone, SurvivorData } from '../types';

interface SlamMapCanvasProps {
  roverTelemetry: RoverTelemetry | null;
  droneTelemetry: DroneTelemetry | null;
  hazardZones: HazardZone[];
  survivorData: SurvivorData | null;
  scanPoints: { x: number; y: number }[];
  pathHistory: { x: number; y: number }[];
  safePath: { x: number; y: number }[];
  isExpanded?: boolean;
}

const SlamMapCanvasComponent: React.FC<SlamMapCanvasProps> = ({
  roverTelemetry,
  droneTelemetry,
  hazardZones,
  survivorData,
  scanPoints,
  pathHistory,
  safePath,
  isExpanded = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-render static background (Grid, Corridors, Walls, Hazards) to an offscreen canvas
  useEffect(() => {
    const width = isExpanded ? 720 : 380;
    const height = isExpanded ? 520 : 280;

    let staticCanvas = staticCanvasRef.current;
    if (!staticCanvas) {
      staticCanvas = document.createElement('canvas');
      staticCanvasRef.current = staticCanvas;
    }
    staticCanvas.width = width;
    staticCanvas.height = height;

    const ctx = staticCanvas.getContext('2d');
    if (!ctx) return;

    const scale = isExpanded ? 9.5 : 5.8;
    const offsetX = isExpanded ? width * 0.42 : width * 0.44;
    const offsetY = isExpanded ? height * 0.90 : height * 0.88;

    const toCanvas = (mx: number, mz: number) => ({
      cx: offsetX + mx * scale,
      cy: offsetY - mz * scale
    });

    // Clear background (Dark RViz2 Grid)
    ctx.fillStyle = '#0f141c';
    ctx.fillRect(0, 0, width, height);

    // Draw Coordinate Grid (Every 2 meters)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -16; x <= 22; x += 2) {
      const p1 = toCanvas(x, -2);
      const p2 = toCanvas(x, 36);
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
    }
    for (let z = -2; z <= 36; z += 2) {
      const p1 = toCanvas(-16, z);
      const p2 = toCanvas(22, z);
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
    }
    ctx.stroke();

    // 1. Draw Mapped Tunnel Walls (Occupancy Grid Known Corridors)
    ctx.fillStyle = '#1e2430';
    // Main corridor
    const pMainA = toCanvas(-2.2, 0);
    const pMainB = toCanvas(2.2, 34);
    ctx.fillRect(pMainA.cx, pMainB.cy, pMainB.cx - pMainA.cx, pMainA.cy - pMainB.cy);

    // West branch (Branch 1 - Methane)
    const pW1 = toCanvas(-14.0, 8.0);
    const pW2 = toCanvas(-2.2, 12.0);
    ctx.fillRect(pW1.cx, pW2.cy, pW2.cx - pW1.cx, pW1.cy - pW2.cy);

    // East branch (Branch 2 - Collapse & Randy)
    const pE1 = toCanvas(2.2, 18.0);
    const pE2 = toCanvas(18.0, 22.0);
    ctx.fillRect(pE1.cx, pE2.cy, pE2.cx - pE1.cx, pE1.cy - pE2.cy);

    // 2. Draw Obstacle / Wall Boundaries (SLAM Black Lines)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;

    const drawWall = (x1: number, z1: number, x2: number, z2: number) => {
      const p1 = toCanvas(x1, z1);
      const p2 = toCanvas(x2, z2);
      ctx.beginPath();
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
      ctx.stroke();
    };

    // Main walls
    drawWall(-2.4, 0, -2.4, 8);
    drawWall(-2.4, 12, -2.4, 34);
    drawWall(2.4, 0, 2.4, 18);
    drawWall(2.4, 22, 2.4, 34);
    drawWall(-2.4, 34, 2.4, 34); // Terminus

    // Branch 1 (West)
    drawWall(-2.4, 8, -14.4, 8);
    drawWall(-2.4, 12, -14.4, 12);
    drawWall(-14.4, 8, -14.4, 12);

    // Branch 2 (East)
    drawWall(2.4, 18, 18.4, 18);
    drawWall(2.4, 22, 18.4, 22);
    drawWall(18.4, 18, 18.4, 22);

    // 3. Draw Hazard Zones (Costmap Layers)
    hazardZones.forEach((h) => {
      const p = toCanvas(h.position.x, h.position.z);
      const rPix = h.radius * scale;

      ctx.beginPath();
      ctx.arc(p.cx, p.cy, rPix, 0, Math.PI * 2);

      if (h.type === 'methane') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ef4444';
        ctx.font = '9px monospace';
        ctx.fillText('LETHAL CH4', p.cx - 28, p.cy);
      } else if (h.type === 'collapse') {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = '9px monospace';
        ctx.fillText('COLLAPSE', p.cx - 24, p.cy);
      }
    });
  }, [hazardZones, isExpanded]);

  // Dynamic Elements Render pass
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const scale = isExpanded ? 9.5 : 5.8;
    const offsetX = isExpanded ? width * 0.42 : width * 0.44;
    const offsetY = isExpanded ? height * 0.90 : height * 0.88;

    const toCanvas = (mx: number, mz: number) => ({
      cx: offsetX + mx * scale,
      cy: offsetY - mz * scale
    });

    // 1. Draw pre-rendered static background
    if (staticCanvasRef.current) {
      ctx.drawImage(staticCanvasRef.current, 0, 0);
    } else {
      ctx.fillStyle = '#0f141c';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw Safe Nav2 Rescue Path (Green Glowing Route)
    if (safePath && safePath.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      const pStart = toCanvas(safePath[0].x, safePath[0].y);
      ctx.moveTo(pStart.cx, pStart.cy);
      for (let i = 1; i < safePath.length; i++) {
        const pt = toCanvas(safePath[i].x, safePath[i].y);
        ctx.lineTo(pt.cx, pt.cy);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // 3. Draw Rover Trajectory (Blue Trail)
    if (pathHistory && pathHistory.length > 1) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const p0 = toCanvas(pathHistory[0].x, pathHistory[0].y);
      ctx.moveTo(p0.cx, p0.cy);
      for (let i = 1; i < pathHistory.length; i++) {
        const pt = toCanvas(pathHistory[i].x, pathHistory[i].y);
        ctx.lineTo(pt.cx, pt.cy);
      }
      ctx.stroke();
    }

    // 4. Draw Live LiDAR Scan Points (LaserScan Cyan Hits)
    if (scanPoints && scanPoints.length > 0) {
      ctx.fillStyle = '#22d3ee';
      for (let i = 0; i < scanPoints.length; i++) {
        const sp = scanPoints[i];
        const cp = toCanvas(sp.x, sp.y);
        ctx.fillRect(cp.cx - 1, cp.cy - 1, 2.5, 2.5);
      }
    }

    // 5. Draw Trapped Survivor (Randy Marker)
    if (survivorData) {
      const ps = toCanvas(survivorData.position.x, survivorData.position.z);
      // Pulsing radar ring
      ctx.beginPath();
      ctx.arc(ps.cx, ps.cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = survivorData.detected ? 'rgba(34, 197, 94, 0.4)' : 'rgba(234, 88, 12, 0.3)';
      ctx.fill();
      ctx.strokeStyle = survivorData.detected ? '#22c55e' : '#f97316';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(survivorData.detected ? 'VICTIM (93%)' : 'SURVIVOR?', ps.cx - 24, ps.cy - 11);
    }

    // 6. Draw Rover Pose Marker (Ground Commander)
    if (roverTelemetry) {
      const pr = toCanvas(roverTelemetry.position.x, roverTelemetry.position.z);
      ctx.save();
      ctx.translate(pr.cx, pr.cy);
      ctx.rotate(-roverTelemetry.yaw + Math.PI / 2);

      // Chassis footprint
      ctx.fillStyle = '#f97316'; // orange
      ctx.fillRect(-5, -8, 10, 16);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(-5, -8, 10, 16);

      // Heading arrow
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(3, -5);
      ctx.lineTo(-3, -5);
      ctx.closePath();
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.restore();
    }

    // 7. Draw Drone Pose Marker (Aerial Scout)
    if (droneTelemetry && droneTelemetry.state !== 'docked') {
      const pd = toCanvas(droneTelemetry.position.x, droneTelemetry.position.z);
      ctx.save();
      ctx.translate(pd.cx, pd.cy);
      ctx.rotate(-droneTelemetry.yaw + Math.PI / 2);

      // Quadcopter cross
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-6, -6);
      ctx.lineTo(6, 6);
      ctx.moveTo(6, -6);
      ctx.lineTo(-6, 6);
      ctx.stroke();

      // Rotor points
      ctx.fillStyle = '#ec4899';
      [-6, 6].forEach((rx) => {
        [-6, 6].forEach((ry) => {
          ctx.beginPath();
          ctx.arc(rx, ry, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      ctx.restore();
      ctx.fillStyle = '#c084fc';
      ctx.font = '8px monospace';
      ctx.fillText('DRONE', pd.cx - 14, pd.cy - 9);
    }

    // HUD Corner Info
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('SLAM TOOLBOX: ONLINE_ASYNC [0.05m/cell]', 10, 18);
    ctx.fillText(`LASER SCANS: ${scanPoints?.length || 0} pts`, 10, 32);
    ctx.fillText('NAV2 GLOBAL COSTMAP: ACTIVE', 10, 46);

  }, [roverTelemetry, droneTelemetry, survivorData, scanPoints, pathHistory, safePath, isExpanded]);

  return (
    <div id="slam-map-container" className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-inner">
      <canvas
        ref={canvasRef}
        width={isExpanded ? 720 : 380}
        height={isExpanded ? 520 : 280}
        className="w-full h-full block"
      />
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur-sm">
        2D OCCUPANCY GRID
      </div>
    </div>
  );
};

export const SlamMapCanvas = React.memo(SlamMapCanvasComponent);

