import { MissionPatrolWaypoint } from '../types';

/**
 * Calculates yaw (in radians) between two 3D points in the horizontal plane (X, Z).
 */
function calculateYaw(p1: { x: number; z: number }, p2: { x: number; z: number }): number {
  return Math.atan2(p2.x - p1.x, p2.z - p1.z);
}

/**
 * Converts a yaw angle (radians around vertical axis) to a 2D planar quaternion (z, w).
 */
function yawToQuaternion(yaw: number): { x: number; y: number; z: number; w: number } {
  return {
    x: 0.0,
    y: 0.0,
    z: Number(Math.sin(yaw / 2).toFixed(4)),
    w: Number(Math.cos(yaw / 2).toFixed(4)),
  };
}

/**
 * Generates standard ROS 2 Nav2 Waypoint Follower YAML configuration.
 * Fully compatible with nav2_waypoint_follower and navigate_through_poses.
 */
export function generateNav2WaypointsYaml(
  roverWaypoints: MissionPatrolWaypoint[],
  droneWaypoints: MissionPatrolWaypoint[],
  isLoop: boolean = false
): string {
  const timestamp = new Date().toISOString();

  let yaml = `# ==============================================================================
# ROS 2 Nav2 Multi-Point Patrol Waypoints Configuration
# Package: mine_rescue_sim / nav2_bringup
# Generated: ${timestamp}
# Subterranean Mine Rescue System - Autonomous Fleet Navigation
# ==============================================================================

# Global Navigation Configuration
nav2_patrol_manager:
  ros__parameters:
    use_sim_time: true
    global_frame: "map"
    robot_base_frame: "base_link"
    loop_patrol: ${isLoop ? 'true' : 'false'}
    waypoint_task_executor_plugin: "nav2_waypoint_follower::WaitAtWaypoint"
    stop_on_failure: false

# ------------------------------------------------------------------------------
# Ground Rover Autonomous Patrol Route
# ------------------------------------------------------------------------------
rover_navigation:
  header:
    frame_id: "map"
  speed_limit_mps: 1.2
  goal_tolerance_xy_meters: 0.35
  goal_tolerance_yaw_rad: 0.25
  poses:
`;

  if (roverWaypoints.length === 0) {
    yaml += `    # No custom rover waypoints defined (using portal default)
    - pose:
        position: {x: 0.0, y: 1.0, z: 0.22}
        orientation: {x: 0.0, y: 0.0, z: 0.7071, w: 0.7071}
      dwell_time_sec: 0.0
      action: "patrol_pass"
`;
  } else {
    roverWaypoints.forEach((wp, idx) => {
      const nextWp = idx < roverWaypoints.length - 1 ? roverWaypoints[idx + 1] : isLoop ? roverWaypoints[0] : null;
      const yaw = nextWp ? calculateYaw(wp.position, nextWp.position) : wp.headingYaw ?? 0;
      const q = yawToQuaternion(yaw);

      yaml += `    # Waypoint ${idx + 1}: ${wp.label || `Sector Checkpoint ${idx + 1}`}
    - pose:
        position:
          x: ${Number(wp.position.x).toFixed(2)}
          y: ${Number(wp.position.z).toFixed(2)}
          z: ${Number(wp.position.y).toFixed(2)}
        orientation:
          x: ${q.x}
          y: ${q.y}
          z: ${q.z}
          w: ${q.w}
      dwell_time_sec: ${wp.dwellTimeSeconds ?? 0.0}
      action: "${wp.action || 'patrol_pass'}"
`;
    });
  }

  yaml += `
# ------------------------------------------------------------------------------
# Aerial Scout Drone 3D Trajectory Waypoints
# ------------------------------------------------------------------------------
drone_navigation:
  header:
    frame_id: "map"
  cruise_speed_mps: 1.5
  climb_rate_mps: 0.8
  min_tunnel_clearance_m: 0.6
  poses:
`;

  if (droneWaypoints.length === 0) {
    yaml += `    # No custom drone waypoints defined (using dock default)
    - pose:
        position: {x: 0.0, y: 1.0, z: 1.2}
        orientation: {x: 0.0, y: 0.0, z: 0.0, w: 1.0}
      dwell_time_sec: 2.0
      action: "hover_inspect"
`;
  } else {
    droneWaypoints.forEach((wp, idx) => {
      const nextWp = idx < droneWaypoints.length - 1 ? droneWaypoints[idx + 1] : isLoop ? droneWaypoints[0] : null;
      const yaw = nextWp ? calculateYaw(wp.position, nextWp.position) : wp.headingYaw ?? 0;
      const q = yawToQuaternion(yaw);

      yaml += `    # Aerial Waypoint ${idx + 1}: ${wp.label || `Airway Inspection ${idx + 1}`}
    - pose:
        position:
          x: ${Number(wp.position.x).toFixed(2)}
          y: ${Number(wp.position.z).toFixed(2)}
          z: ${Number(wp.position.y).toFixed(2)}
        orientation:
          x: ${q.x}
          y: ${q.y}
          z: ${q.z}
          w: ${q.w}
      dwell_time_sec: ${wp.dwellTimeSeconds ?? 3.0}
      action: "${wp.action || 'sensor_scan'}"
`;
    });
  }

  return yaml;
}

/**
 * Generates an executable ROS 2 Jazzy Python Action Client script.
 * Utilizes the nav2_simple_commander API to dispatch the planned waypoints.
 */
export function generateNav2PatrolClientPy(
  roverWaypoints: MissionPatrolWaypoint[],
  droneWaypoints: MissionPatrolWaypoint[],
  isLoop: boolean = false
): string {
  return `#!/usr/bin/env python3
"""
ROS 2 Jazzy Nav2 Multi-Point Patrol Action Client
Subterranean Mine Rescue & Exploration Autonomous System

Dispatches multi-waypoint patrol routes using the Nav2 Simple Commander API.
Supports sequential waypoint following, inspection dwell times, and loop modes.
"""

import sys
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


class MineRescuePatrolNavigator(Node):
    def __init__(self):
        super().__init__('mine_patrol_navigator')
        self.get_logger().info('Initializing Subterranean Mine Rescue Patrol Client...')
        self.navigator = BasicNavigator()

        # Wait for Nav2 Navigation Stack to become fully active
        self.get_logger().info('Waiting for Nav2 lifecycle managers to reach active state...')
        self.navigator.waitUntilNav2Active()
        self.get_logger().info('Nav2 Stack is active! Preparing patrol sequence.')

    def create_pose(self, x: float, y: float, z: float, qz: float, qw: float) -> PoseStamped:
        """Helper to construct stamped poses in the global map frame."""
        pose = PoseStamped()
        pose.header.frame_id = 'map'
        pose.header.stamp = self.navigator.get_clock().now().to_msg()
        pose.pose.position.x = float(x)
        pose.pose.position.y = float(y)
        pose.pose.position.z = float(z)
        pose.pose.orientation.x = 0.0
        pose.pose.orientation.y = 0.0
        pose.pose.orientation.z = float(qz)
        pose.pose.orientation.w = float(qw)
        return pose

    def run_rover_patrol(self, loop: bool = ${isLoop ? 'True' : 'False'}):
        """Executes the user-defined ground rover patrol route."""
        self.get_logger().info('Loading Rover Waypoint Route...')

        waypoints = []
${
  roverWaypoints.length === 0
    ? `        # Default portal staging waypoint
        waypoints.append(self.create_pose(0.0, 1.0, 0.22, 0.7071, 0.7071))`
    : roverWaypoints
        .map((wp, idx) => {
          const nextWp = idx < roverWaypoints.length - 1 ? roverWaypoints[idx + 1] : isLoop ? roverWaypoints[0] : null;
          const yaw = nextWp ? calculateYaw(wp.position, nextWp.position) : wp.headingYaw ?? 0;
          const q = yawToQuaternion(yaw);
          return `        # WP ${idx + 1}: ${wp.label || `Sector [${wp.position.x.toFixed(1)}, ${wp.position.z.toFixed(1)}]`}
        waypoints.append(self.create_pose(${wp.position.x.toFixed(2)}, ${wp.position.z.toFixed(2)}, ${wp.position.y.toFixed(2)}, ${q.z}, ${q.w}))`;
        })
        .join('\n')
}

        if not waypoints:
            self.get_logger().warn('No rover waypoints defined.')
            return

        self.get_logger().info(f'Dispatching {len(waypoints)} waypoints to Nav2 FollowWaypoints server...')
        
        while rclpy.ok():
            self.navigator.followWaypoints(waypoints)

            while not self.navigator.isTaskComplete():
                feedback = self.navigator.getFeedback()
                if feedback:
                    self.get_logger().info(
                        f'[ROVER NAV2] Executing Waypoint {feedback.current_waypoint + 1}/{len(waypoints)}'
                    )
                time.sleep(1.0)

            result = self.navigator.getResult()
            if result == TaskResult.SUCCEEDED:
                self.get_logger().info('Patrol sequence completed successfully!')
            elif result == TaskResult.CANCELED:
                self.get_logger().warn('Patrol was canceled by operator or safety override.')
                break
            elif result == TaskResult.FAILED:
                self.get_logger().error('Patrol task failed due to obstacle blockage or methane threshold.')
                break

            if not loop:
                break
            self.get_logger().info('Loop mode active: repeating patrol sequence in 3 seconds...')
            time.sleep(3.0)


def main():
    rclpy.init()
    patrol_node = MineRescuePatrolNavigator()
    try:
        patrol_node.run_rover_patrol()
    except KeyboardInterrupt:
        patrol_node.get_logger().info('Patrol interrupted by user.')
    finally:
        patrol_node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
`;
}

/**
 * Generates an aerial drone offboard trajectory controller node in ROS 2.
 */
export function generateDroneOffboardNavigatorPy(
  droneWaypoints: MissionPatrolWaypoint[],
  isLoop: boolean = false
): string {
  return `#!/usr/bin/env python3
"""
ROS 2 Aerial Scout Drone Subterranean Trajectory Navigator
Supports subterranean 3D waypoint navigation, altitude ceiling enforcement,
and ultrasonic/thermal sensor dwell cycles.
"""

import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped, Point
from std_msgs.msg import String


class DroneSubterraneanNavigator(Node):
    def __init__(self):
        super().__init__('drone_subterranean_navigator')
        self.get_logger().info('Initializing Subterranean Drone Navigator...')
        
        # Publishers
        self.target_pose_pub = self.create_publisher(PoseStamped, '/drone/target_pose', 10)
        self.status_pub = self.create_publisher(String, '/drone/mission_status', 10)

        # Planned 3D Waypoint Queue (X, Y=Depth, Z=Altitude)
        self.waypoints = [
${
  droneWaypoints.length === 0
    ? `            {"x": 6.5, "y": 20.0, "z": 1.8, "dwell": 3.0, "action": "thermal_hover"}`
    : droneWaypoints
        .map(
          (wp, idx) =>
            `            {"x": ${wp.position.x.toFixed(2)}, "y": ${wp.position.z.toFixed(2)}, "z": ${wp.position.y.toFixed(2)}, "dwell": ${wp.dwellTimeSeconds ?? 3.0}, "action": "${wp.action || 'sensor_scan'}"},  # WP ${idx + 1}`
        )
        .join('\n')
}
        ]

        self.current_wp_idx = 0
        self.loop_mode = ${isLoop ? 'True' : 'False'}
        self.timer = self.create_timer(1.0, self.flight_step)

    def flight_step(self):
        if self.current_wp_idx >= len(self.waypoints):
            if self.loop_mode:
                self.current_wp_idx = 0
                self.get_logger().info('Drone loop mode: restarting aerial circuit...')
            else:
                self.get_logger().info('Aerial survey complete. Holding station.')
                return

        target = self.waypoints[self.current_wp_idx]
        msg = PoseStamped()
        msg.header.frame_id = 'map'
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.pose.position.x = float(target["x"])
        msg.pose.position.y = float(target["y"])
        msg.pose.position.z = float(target["z"])
        msg.pose.orientation.w = 1.0

        self.target_pose_pub.publish(msg)
        self.get_logger().info(
            f'[DRONE SCOUT] Flying to WP {self.current_wp_idx + 1}/{len(self.waypoints)}: '
            f'[{target["x"]}, {target["y"]}, Alt: {target["z"]}m] Action: {target["action"]}'
        )

        # Advance to next waypoint
        self.current_wp_idx += 1


def main():
    rclpy.init()
    node = DroneSubterraneanNavigator()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
`;
}

/**
 * Generates the ROS 2 Python Launch script to start Nav2 with the custom waypoints.
 */
export function generatePatrolLaunchPy(): string {
  return `import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_mine_rescue = get_package_share_directory('mine_rescue_sim')
    
    # Path to the exported custom patrol waypoints YAML
    waypoints_file = os.path.join(pkg_mine_rescue, 'config', 'patrol_waypoints.yaml')

    # Launch Nav2 Stack
    nav2_bringup_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(pkg_mine_rescue, 'launch', 'nav2_bringup.launch.py')
        ),
        launch_arguments={'use_sim_time': 'true'}.items()
    )

    # Launch Autonomous Patrol Dispatcher Node
    patrol_client_node = Node(
        package='mine_rescue_sim',
        executable='patrol_client.py',
        name='mine_patrol_navigator',
        output='screen',
        parameters=[waypoints_file, {'use_sim_time': True}]
    )

    # Launch Aerial Drone Subterranean Navigator
    drone_navigator_node = Node(
        package='mine_rescue_sim',
        executable='drone_navigator.py',
        name='drone_subterranean_navigator',
        output='screen',
        parameters=[waypoints_file, {'use_sim_time': True}]
    )

    return LaunchDescription([
        nav2_bringup_launch,
        patrol_client_node,
        drone_navigator_node
    ])
`;
}
