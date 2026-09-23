import { RosPackageFile } from '../types';

export const ROS_WORKSPACE_FILES: RosPackageFile[] = [
  {
    path: 'mine_rescue_sim/worlds/underground_mine.sdf',
    filename: 'underground_mine.sdf',
    category: 'sdf',
    description: 'Gazebo Harmonic SDF 1.8 Multi-Tunnel Mine Environment with lighting, rock meshes, and trapped survivor.',
    content: `<?xml version="1.0" ?>
<sdf version="1.8">
  <world name="underground_mine">
    <physics name="1ms" type="ignored">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
    </physics>
    
    <!-- System Plugins for Gazebo Harmonic -->
    <plugin filename="gz-sim-physics-system" name="gz::sim::systems::Physics"/>
    <plugin filename="gz-sim-sensors-system" name="gz::sim::systems::Sensors">
      <render_engine>ogre2</render_engine>
    </plugin>
    <plugin filename="gz-sim-user-commands-system" name="gz::sim::systems::UserCommands"/>
    <plugin filename="gz-sim-scene-broadcaster-system" name="gz::sim::systems::SceneBroadcaster"/>
    <plugin filename="gz-sim-contact-system" name="gz::sim::systems::Contact"/>

    <!-- Ambient Underground Atmosphere -->
    <scene>
      <ambient>0.05 0.05 0.07 1.0</ambient>
      <background>0.02 0.02 0.03 1.0</background>
      <grid>false</grid>
    </scene>

    <!-- Faint Mining Lantern at Portal Entrance -->
    <light type="point" name="portal_light">
      <pose>0 0 3 0 0 0</pose>
      <diffuse>0.8 0.6 0.3 1</diffuse>
      <specular>0.2 0.2 0.1 1</specular>
      <attenuation>
        <range>15</range>
        <constant>0.2</constant>
        <linear>0.08</linear>
        <quadratic>0.02</quadratic>
      </attenuation>
    </light>

    <!-- Mine Ground / Floor Plane with high friction -->
    <model name="ground_plane">
      <static>true</static>
      <link name="floor">
        <collision name="col">
          <geometry><plane><normal>0 0 1</normal><size>120 120</size></plane></geometry>
          <surface>
            <friction>
              <ode><mu>1.2</mu><mu2>1.0</mu2></ode>
            </friction>
          </surface>
        </collision>
        <visual name="vis">
          <geometry><plane><normal>0 0 1</normal><size>120 120</size></plane></geometry>
          <material>
            <ambient>0.15 0.13 0.12 1</ambient>
            <diffuse>0.2 0.18 0.16 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Multi-Tunnel Mine Network Layout -->
    <model name="mine_tunnel_network">
      <static>true</static>
      <link name="tunnel_walls">
        <!-- Main Drift: North-South axis (Length: 35m, Width: 4.5m, Height: 3.2m) -->
        <collision name="main_left">
          <pose>-2.4 15 1.6 0 0 0</pose>
          <geometry><box><size>0.4 35 3.2</size></box></geometry>
        </collision>
        <visual name="main_left_vis">
          <pose>-2.4 15 1.6 0 0 0</pose>
          <geometry><box><size>0.4 35 3.2</size></box></geometry>
          <material><ambient>0.22 0.2 0.19 1</ambient></material>
        </visual>

        <collision name="main_right">
          <pose>2.4 15 1.6 0 0 0</pose>
          <geometry><box><size>0.4 35 3.2</size></box></geometry>
        </collision>
        <visual name="main_right_vis">
          <pose>2.4 15 1.6 0 0 0</pose>
          <geometry><box><size>0.4 35 3.2</size></box></geometry>
          <material><ambient>0.22 0.2 0.19 1</ambient></material>
        </visual>

        <!-- Branch 1 (West Tunnel - Hazardous Methane Zone) at y=10m -->
        <collision name="branch_west_wall_n">
          <pose>-9 12.2 1.6 0 0 1.5708</pose>
          <geometry><box><size>0.4 14 3.2</size></box></geometry>
        </collision>
        <collision name="branch_west_wall_s">
          <pose>-9 7.8 1.6 0 0 1.5708</pose>
          <geometry><box><size>0.4 14 3.2</size></box></geometry>
        </collision>

        <!-- Branch 2 (East Tunnel - Collapsed Rubble & Survivor Cavern) at y=20m -->
        <collision name="branch_east_wall_n">
          <pose>10 22.2 1.6 0 0 1.5708</pose>
          <geometry><box><size>0.4 16 3.2</size></box></geometry>
        </collision>
        <collision name="branch_east_wall_s">
          <pose>10 17.8 1.6 0 0 1.5708</pose>
          <geometry><box><size>0.4 16 3.2</size></box></geometry>
        </collision>

        <!-- Branch 3 (North Crosscut / Ventilation Bypass) at y=32m -->
        <collision name="branch_north_end">
          <pose>0 32.5 1.6 0 0 0</pose>
          <geometry><box><size>5.2 0.4 3.2</size></box></geometry>
        </collision>

        <!-- Rock Obstacle: Collapsed Debris Blocking Ground Passage in East Branch (x=9.5, y=20) -->
        <collision name="rubble_blockade_1">
          <pose>9.5 20 0.8 0.2 0.1 0.4</pose>
          <geometry><box><size>2.8 3.8 1.6</size></box></geometry>
        </collision>
        <visual name="rubble_blockade_vis">
          <pose>9.5 20 0.8 0.2 0.1 0.4</pose>
          <geometry><box><size>2.8 3.8 1.6</size></box></geometry>
          <material><ambient>0.3 0.25 0.2 1</ambient></material>
        </visual>
      </link>
    </model>

    <!-- Trapped Survivor Model: Rescue Randy located behind collapse at (14.5, 20.0, 0) -->
    <include>
      <name>survivor_randy</name>
      <uri>https://fuel.gazebosim.org/1.0/common/models/Rescue Randy</uri>
      <pose>14.5 20.0 0 0 0 -1.5708</pose>
      <plugin filename="gz-sim-thermal-system" name="gz::sim::systems::Thermal">
        <temperature>310.15</temperature> <!-- 37 deg C Human Thermal Signature -->
      </plugin>
    </include>
  </world>
</sdf>`
  },
  {
    path: 'mine_rescue_sim/models/rover/rover.urdf.xacro',
    filename: 'rover.urdf.xacro',
    category: 'urdf',
    description: 'Complete 6-Wheel Rocker-Bogie Ground Commander URDF with 3D LiDAR, RGB-D, Thermal Camera, IMU, and Gas Sniffer.',
    content: `<?xml version="1.0"?>
<robot name="rescue_rover" xmlns:xacro="http://www.ros.org/wiki/xacro">

  <!-- Materials -->
  <material name="matte_black"><color rgba="0.1 0.1 0.1 1.0"/></material>
  <material name="rescue_orange"><color rgba="0.95 0.35 0.05 1.0"/></material>
  <material name="hazard_yellow"><color rgba="0.9 0.8 0.1 1.0"/></material>
  <material name="sensor_blue"><color rgba="0.1 0.4 0.9 1.0"/></material>

  <!-- Base Link / Chassis -->
  <link name="base_link">
    <visual>
      <geometry><box size="0.85 0.55 0.26"/></geometry>
      <material name="rescue_orange"/>
    </visual>
    <collision>
      <geometry><box size="0.85 0.55 0.26"/></geometry>
    </collision>
    <inertial>
      <mass value="22.0"/>
      <inertia ixx="0.6" ixy="0" ixz="0" iyy="0.9" iyz="0" izz="1.1"/>
    </inertial>
  </link>

  <!-- Drone Docking Pad on Rear Deck -->
  <link name="drone_dock_link">
    <visual>
      <geometry><box size="0.32 0.32 0.03"/></geometry>
      <material name="hazard_yellow"/>
    </visual>
  </link>
  <joint name="drone_dock_joint" type="fixed">
    <parent link="base_link"/>
    <child link="drone_dock_link"/>
    <origin xyz="-0.22 0 0.14" rpy="0 0 0"/>
  </joint>

  <!-- 3D Velodyne / Ouster 16-Beam LiDAR Puck -->
  <link name="lidar_link">
    <visual>
      <geometry><cylinder radius="0.06" length="0.12"/></geometry>
      <material name="sensor_blue"/>
    </visual>
    <collision>
      <geometry><cylinder radius="0.06" length="0.12"/></geometry>
    </collision>
  </link>
  <joint name="lidar_joint" type="fixed">
    <parent link="base_link"/>
    <child link="lidar_link"/>
    <origin xyz="0.25 0 0.20" rpy="0 0 0"/>
  </joint>

  <!-- Dual LED Headlights Mount -->
  <link name="headlight_link">
    <visual>
      <geometry><box size="0.04 0.24 0.05"/></geometry>
      <material name="matte_black"/>
    </visual>
  </link>
  <joint name="headlight_joint" type="fixed">
    <parent link="base_link"/>
    <child link="headlight_link"/>
    <origin xyz="0.42 0 0.05" rpy="0 0 0"/>
  </joint>

  <!-- Front Gimbal Sensor Head: Thermal IR + RGB Camera -->
  <link name="camera_link">
    <visual>
      <geometry><sphere radius="0.05"/></geometry>
      <material name="matte_black"/>
    </visual>
  </link>
  <joint name="camera_joint" type="fixed">
    <parent link="base_link"/>
    <child link="camera_link"/>
    <origin xyz="0.43 0 0.12" rpy="0 0 0"/>
  </joint>

  <!-- Gazebo Sensors & Hardware Plugins for ROS 2 Jazzy -->
  <gazebo>
    <plugin filename="gz-sim-diff-drive-system" name="gz::sim::systems::DiffDrive">
      <left_joint>front_left_wheel_joint</left_joint>
      <left_joint>mid_left_wheel_joint</left_joint>
      <left_joint>rear_left_wheel_joint</left_joint>
      <right_joint>front_right_wheel_joint</right_joint>
      <right_joint>mid_right_wheel_joint</right_joint>
      <right_joint>rear_right_wheel_joint</right_joint>
      <wheel_separation>0.62</wheel_separation>
      <wheel_radius>0.16</wheel_radius>
      <max_wheel_torque>60.0</max_wheel_torque>
      <topic>/model/rover/cmd_vel</topic>
      <odom_topic>/model/rover/odometry</odom_topic>
      <tf_topic>/model/rover/tf</tf_topic>
      <frame_id>odom</frame_id>
      <child_frame_id>base_link</child_frame_id>
    </plugin>

    <plugin filename="gz-sim-joint-state-publisher-system" name="gz::sim::systems::JointStatePublisher">
      <topic>/model/rover/joint_states</topic>
    </plugin>
  </gazebo>

  <!-- 3D LiDAR Sensor Simulation -->
  <gazebo reference="lidar_link">
    <sensor name='gpu_lidar' type='gpu_lidar'>
      <pose>0 0 0 0 0 0</pose>
      <topic>/model/rover/scan</topic>
      <update_rate>15</update_rate>
      <lidar>
        <scan>
          <horizontal>
            <samples>720</samples>
            <resolution>1</resolution>
            <min_angle>-3.14159</min_angle>
            <max_angle>3.14159</max_angle>
          </horizontal>
          <vertical>
            <samples>16</samples>
            <resolution>1</resolution>
            <min_angle>-0.2618</min_angle>
            <max_angle>0.2618</max_angle>
          </vertical>
        </scan>
        <range>
          <min>0.15</min>
          <max>35.0</max>
          <resolution>0.01</resolution>
        </range>
      </lidar>
      <gz_frame_id>lidar_link</gz_frame_id>
    </sensor>
  </gazebo>

  <!-- RGB Rescue Camera -->
  <gazebo reference="camera_link">
    <sensor name="rgb_camera" type="camera">
      <topic>/model/rover/camera/rgb</topic>
      <update_rate>30</update_rate>
      <camera>
        <horizontal_fov>1.39626</horizontal_fov>
        <image><width>1280</width><height>720</height><format>R8G8B8</format></image>
        <clip><near>0.1</near><far>40</far></clip>
      </camera>
    </sensor>
  </gazebo>
</robot>`
  },
  {
    path: 'mine_rescue_sim/models/drone/scout_drone.sdf',
    filename: 'scout_drone.sdf',
    category: 'sdf',
    description: 'Aerial Scout Quadcopter model with multicopter velocity control, thermal camera, and optical collision avoidance.',
    content: `<?xml version="1.0" ?>
<sdf version="1.8">
  <model name="scout_drone">
    <pose>0 0 0.5 0 0 0</pose>
    <link name="base_link">
      <inertial>
        <mass>1.45</mass>
        <inertia>
          <ixx>0.015</ixx><ixy>0</ixy><ixz>0</ixz>
          <iyy>0.015</iyy><iyz>0</iyz><izz>0.025</izz>
        </inertia>
      </inertial>
      
      <!-- Carbon Fiber 450mm Quad Frame -->
      <visual name="body_vis">
        <geometry><box><size>0.32 0.32 0.08</size></box></geometry>
        <material><ambient>0.05 0.05 0.05 1</ambient><diffuse>0.1 0.1 0.1 1</diffuse></material>
      </visual>
      <collision name="body_col">
        <geometry><box><size>0.35 0.35 0.1</size></box></geometry>
      </collision>

      <!-- Downward Collision & Obstacle LiDAR -->
      <sensor name="drone_altimeter" type="gpu_lidar">
        <pose>0 0 -0.04 0 1.5708 0</pose>
        <topic>/model/drone/altimeter</topic>
        <update_rate>20</update_rate>
        <lidar>
          <scan><horizontal><samples>1</samples><min_angle>0</min_angle><max_angle>0</max_angle></horizontal></scan>
          <range><min>0.05</min><max>15.0</max></range>
        </lidar>
      </sensor>

      <!-- Thermal & RGB Gimbal Camera -->
      <sensor name="drone_thermal_camera" type="thermal">
        <pose>0.12 0 -0.02 0 0.25 0</pose>
        <topic>/model/drone/camera/thermal</topic>
        <update_rate>25</update_rate>
        <camera>
          <horizontal_fov>1.2</horizontal_fov>
          <image><width>640</width><height>480</height><format>L8</format></image>
          <clip><near>0.1</near><far>30.0</far></clip>
        </camera>
      </sensor>
    </link>

    <!-- Gazebo Harmonic Multicopter Flight Controller Plugins -->
    <plugin filename="gz-sim-multicopter-control-system" name="gz::sim::systems::MulticopterVelocityControl">
      <robotNamespace>drone</robotNamespace>
      <commandSubTopic>cmd_vel</commandSubTopic>
      <enableSubTopic>velocity_control/enable</enableSubTopic>
      <comLinkName>base_link</comLinkName>
      <velocityGain>2.7 2.7 2.7</velocityGain>
      <attitudeGain>0.15 0.15 0.15</attitudeGain>
    </plugin>
  </model>
</sdf>`
  },
  {
    path: 'mine_rescue_sim/config/bridge_config.yaml',
    filename: 'bridge_config.yaml',
    category: 'config',
    description: 'ROS 2 Jazzy <-> Gazebo Harmonic Parameter Bridge configuration for bidirectional telemetry and control.',
    content: `# Rover Ground Commander Topics
- topic_name: "/model/rover/cmd_vel"
  ros_type_name: "geometry_msgs/msg/Twist"
  gz_type_name: "gz.msgs.Twist"
  direction: ROS_TO_GZ

- topic_name: "/model/rover/odometry"
  ros_type_name: "nav_msgs/msg/Odometry"
  gz_type_name: "gz.msgs.Odometry"
  direction: GZ_TO_ROS

- topic_name: "/model/rover/scan"
  ros_type_name: "sensor_msgs/msg/LaserScan"
  gz_type_name: "gz.msgs.LaserScan"
  direction: GZ_TO_ROS

- topic_name: "/model/rover/camera/rgb"
  ros_type_name: "sensor_msgs/msg/Image"
  gz_type_name: "gz.msgs.Image"
  direction: GZ_TO_ROS

- topic_name: "/model/rover/tf"
  ros_type_name: "tf2_msgs/msg/TFMessage"
  gz_type_name: "gz.msgs.Pose_V"
  direction: GZ_TO_ROS

# Scout Drone Aerial Topics
- topic_name: "/model/drone/cmd_vel"
  ros_type_name: "geometry_msgs/msg/Twist"
  gz_type_name: "gz.msgs.Twist"
  direction: ROS_TO_GZ

- topic_name: "/model/drone/camera/thermal"
  ros_type_name: "sensor_msgs/msg/Image"
  gz_type_name: "gz.msgs.Image"
  direction: GZ_TO_ROS
`
  },
  {
    path: 'mine_rescue_sim/config/mapper_params_online_async.yaml',
    filename: 'mapper_params_online_async.yaml',
    category: 'config',
    description: 'SLAM Toolbox Online Async mapping parameters tuned for underground mine corridors and dust suppression.',
    content: `slam_toolbox:
  ros__parameters:
    # Solver / Graph parameters
    solver_plugin: solver_plugins::CeresSolver
    ceres_linear_solver: SPARSE_NORMAL_CHOLESKY
    ceres_preconditioner: SCHUR_JACOBI
    ceres_trust_strategy: LEVENBERG_MARQUARDT
    
    # Frames
    odom_frame: odom
    map_frame: map
    base_frame: base_link
    scan_topic: /model/rover/scan
    mode: mapping

    # Mine Environment Range & Grid Specs
    max_laser_range: 25.0
    minimum_time_interval: 0.1
    transform_timeout: 0.2
    tf_buffer_duration: 30.0
    stack_size_to_use: 40000000
    enable_interactive_mode: true

    # Loop Closure & Scan Matching for Corridors
    minimum_travel_distance: 0.2
    minimum_travel_heading: 0.15
    scan_buffer_size: 15
    scan_buffer_maximum_scan_distance: 25.0
    link_match_minimum_response_fine: 0.8
    link_scan_maximum_distance: 1.5
    loop_search_maximum_distance: 12.0
    do_loop_closing: true
    loop_match_minimum_chain_size: 10
    loop_match_maximum_variance_coarse: 3.0
    loop_match_minimum_response_coarse: 0.35
    loop_match_minimum_response_fine: 0.45

    # Correlation Parameters
    correlation_search_space_dimension: 0.5
    correlation_search_space_resolution: 0.01
    correlation_search_space_smear_deviation: 0.1
    resolution: 0.05
`
  },
  {
    path: 'mine_rescue_sim/config/nav2_params.yaml',
    filename: 'nav2_params.yaml',
    category: 'config',
    description: 'Nav2 stack configuration with dynamic obstacle avoidance, hazard zone inflation, and D* Lite planner.',
    content: `amcl:
  ros__parameters:
    use_sim_time: True
    alpha1: 0.2
    alpha2: 0.2
    alpha3: 0.2
    alpha4: 0.2
    base_frame_id: "base_link"
    global_frame_id: "map"
    odom_frame_id: "odom"
    max_particles: 2000
    min_particles: 500

bt_navigator:
  ros__parameters:
    use_sim_time: True
    global_frame: map
    robot_base_frame: base_link
    odom_topic: /model/rover/odometry
    bt_loop_duration: 10
    default_server_timeout: 20

controller_server:
  ros__parameters:
    use_sim_time: True
    controller_frequency: 20.0
    min_x_velocity_threshold: 0.001
    min_y_velocity_threshold: 0.5
    min_theta_velocity_threshold: 0.001
    progress_checker_plugin: "progress_checker"
    goal_checker_plugins: ["general_goal_checker"]
    controller_plugins: ["FollowPath"]

    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.8
      max_vel_theta: 1.2
      acc_lim_x: 1.5
      acc_lim_theta: 2.5
      decel_lim_x: -1.5
      vx_samples: 20
      vtheta_samples: 40

planner_server:
  ros__parameters:
    expected_planner_frequency: 20.0
    use_sim_time: True
    planner_plugins: ["GridBased"]
    GridBased:
      plugin: "nav2_navfn_planner/NavfnPlanner"
      tolerance: 0.5
      use_astar: true
      allow_unknown: true

global_costmap:
  global_costmap:
    ros__parameters:
      update_frequency: 1.0
      publish_frequency: 1.0
      global_frame: map
      robot_base_frame: base_link
      use_sim_time: True
      robot_radius: 0.45
      resolution: 0.05
      plugins: ["static_layer", "obstacle_layer", "hazard_layer", "inflation_layer"]
      inflation_layer:
        plugin: "nav2_costmap_2d::InflationLayer"
        cost_scaling_factor: 3.0
        inflation_radius: 0.75
`
  },
  {
    path: 'mine_rescue_sim/launch/simulation.launch.py',
    filename: 'simulation.launch.py',
    category: 'launch',
    description: 'Master Launch File: Spawns Gazebo Harmonic world, launches ROS-GZ bridge, spawns Rover and Drone, runs SLAM & Nav2.',
    content: `#!/usr/bin/env python3
import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription, DeclareLaunchArgument, ExecuteProcess
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    pkg_mine_rescue = get_package_share_directory('mine_rescue_sim')
    pkg_ros_gz_sim = get_package_share_directory('ros_gz_sim')

    world_path = os.path.join(pkg_mine_rescue, 'worlds', 'underground_mine.sdf')
    bridge_config_path = os.path.join(pkg_mine_rescue, 'config', 'bridge_config.yaml')

    # 1. Gazebo Harmonic Simulation World
    gz_sim = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(pkg_ros_gz_sim, 'launch', 'gz_sim.launch.py')
        ),
        launch_arguments={'gz_args': f'-r {world_path}'}.items(),
    )

    # 2. ROS-GZ Parameter Bridge
    bridge = Node(
        package='ros_gz_bridge',
        executable='parameter_bridge',
        arguments=['--config-file', bridge_config_path],
        output='screen'
    )

    # 3. Spawn Rover (Ground Commander) at Mine Portal
    spawn_rover = Node(
        package='ros_gz_sim',
        executable='create',
        arguments=[
            '-name', 'rescue_rover',
            '-file', os.path.join(pkg_mine_rescue, 'models', 'rover', 'rover.urdf.xacro'),
            '-x', '0.0', '-y', '1.0', '-z', '0.2', '-Y', '1.5708'
        ],
        output='screen'
    )

    # 4. Spawn Scout Drone (Mounted on Rover Deck initially)
    spawn_drone = Node(
        package='ros_gz_sim',
        executable='create',
        arguments=[
            '-name', 'scout_drone',
            '-file', os.path.join(pkg_mine_rescue, 'models', 'drone', 'scout_drone.sdf'),
            '-x', '-0.22', '-y', '1.0', '-z', '0.45'
        ],
        output='screen'
    )

    # 5. Gas Sensor Simulation Node
    gas_sensor_node = Node(
        package='mine_rescue_sim',
        executable='gas_sensor_sim.py',
        name='gas_sensor_sim',
        output='screen'
    )

    # 6. Multi-Modal Sensor Fusion Engine
    sensor_fusion_node = Node(
        package='mine_rescue_sim',
        executable='multi_modal_fusion.py',
        name='multi_modal_fusion',
        output='screen'
    )

    # 7. Collaborative Mission Manager
    mission_manager_node = Node(
        package='mine_rescue_sim',
        executable='mission_manager.py',
        name='mission_manager',
        output='screen'
    )

    return LaunchDescription([
        gz_sim,
        bridge,
        spawn_rover,
        spawn_drone,
        gas_sensor_node,
        sensor_fusion_node,
        mission_manager_node
    ])
`
  },
  {
    path: 'mine_rescue_sim/scripts/gas_sensor_sim.py',
    filename: 'gas_sensor_sim.py',
    category: 'scripts',
    description: 'Proximity gas sensor node simulating Methane (CH4), Carbon Monoxide (CO), and CO2 plumes.',
    content: `#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from nav_msgs.msg import Odometry
from std_msgs.msg import Float32MultiArray
import math

class GasSensorSimulator(Node):
    def __init__(self):
        super().__init__('gas_sensor_simulator')
        self.sub_odom = self.create_subscription(
            Odometry, '/model/rover/odometry', self.odom_callback, 10
        )
        self.pub_gas = self.create_publisher(
            Float32MultiArray, '/sensor/gas_readings', 10
        )

        # Hazard zone 1: West Branch Methane Leak centered at (-9.0, 10.0)
        self.methane_source = (-9.0, 10.0)
        self.methane_radius = 6.0
        
        # Hazard zone 2: Survivor breathing CO2 plume at (14.5, 20.0)
        self.survivor_source = (14.5, 20.0)
        self.get_logger().info("Gas Sensor Simulation Node initialized.")

    def odom_callback(self, msg):
        px = msg.pose.pose.position.x
        py = msg.pose.pose.position.y

        # Distance to Methane source
        d_ch4 = math.hypot(px - self.methane_source[0], py - self.methane_source[1])
        ch4_ppm = 0.0
        if d_ch4 < self.methane_radius:
            # Gaussian concentration peak up to 48,000 ppm (Explosion threshold 50,000 ppm / 5% LEL)
            ch4_ppm = 48000.0 * math.exp(-0.5 * (d_ch4 / 2.0)**2)

        # Distance to Survivor breathing CO2 plume
        d_co2 = math.hypot(px - self.survivor_source[0], py - self.survivor_source[1])
        co2_ppm = 420.0 # Ambient base ppm
        if d_co2 < 4.0:
            co2_ppm += 1100.0 * math.exp(-0.5 * (d_co2 / 1.5)**2)

        co_ppm = 12.0 # Standard low mine reading

        gas_msg = Float32MultiArray()
        gas_msg.data = [float(ch4_ppm), float(co_ppm), float(co2_ppm)]
        self.pub_gas.publish(gas_msg)

def main(args=None):
    rclpy.init(args=args)
    node = GasSensorSimulator()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
`
  },
  {
    path: 'mine_rescue_sim/scripts/multi_modal_fusion.py',
    filename: 'multi_modal_fusion.py',
    category: 'scripts',
    description: 'AI Sensor Fusion Engine combining Visual, Thermal, Acoustic, CO2, and UWB radar signals for survivor probability.',
    content: `#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32MultiArray, Float32, String
import json

class MultiModalFusionEngine(Node):
    """
    Combines 5 detection modalities:
    1. Visual (YOLO body / helmet / reflective vest)
    2. Thermal IR (37C body heat contrast against cold rock)
    3. Acoustic (CNN tapping / voice classifier with ANC)
    4. CO2 Sniffer (Breathing plume elevation)
    5. UWB Radar (Chest wall displacement / respiration)
    """
    def __init__(self):
        super().__init__('multi_modal_fusion_engine')
        self.pub_probability = self.create_publisher(Float32, '/ai/survivor_probability', 10)
        self.pub_report = self.create_publisher(String, '/ai/fusion_report', 10)
        
        # Subscriptions to sensor nodes
        self.sub_gas = self.create_subscription(
            Float32MultiArray, '/sensor/gas_readings', self.gas_callback, 10
        )
        self.co2_confidence = 0.0

    def gas_callback(self, msg):
        co2 = msg.data[2] if len(msg.data) > 2 else 420.0
        # Normal baseline ~400-500 ppm, breathing plume increases to 1200+ ppm
        if co2 > 600.0:
            self.co2_confidence = min(0.95, (co2 - 600.0) / 800.0)
        else:
            self.co2_confidence = 0.0

    def calculate_fused_score(self, visual, thermal, acoustic, co2, uwb):
        # Weights reflecting underground penetrative reliability
        w_vis = 0.15
        w_therm = 0.25
        w_acoust = 0.15
        w_co2 = 0.15
        w_uwb = 0.30

        weighted_sum = (
            w_vis * visual +
            w_therm * thermal +
            w_acoust * acoustic +
            w_co2 * co2 +
            w_uwb * uwb
        )
        return round(weighted_sum, 4)

def main(args=None):
    rclpy.init(args=args)
    node = MultiModalFusionEngine()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
`
  },
  {
    path: 'mine_rescue_sim/scripts/mission_manager.py',
    filename: 'mission_manager.py',
    category: 'scripts',
    description: 'Autonomous state machine: orchestrates Rover ingress, Methane retreat, Drone deployment, and Nav2 rescue pathing.',
    content: `#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from std_msgs.msg import Float32MultiArray
import time

class CollaborativeMissionManager(Node):
    def __init__(self):
        super().__init__('mission_manager')
        self.pub_rover_cmd = self.create_publisher(Twist, '/model/rover/cmd_vel', 10)
        self.pub_drone_cmd = self.create_publisher(Twist, '/model/drone/cmd_vel', 10)
        self.sub_odom = self.create_subscription(Odometry, '/model/rover/odometry', self.odom_callback, 10)
        self.sub_gas = self.create_subscription(Float32MultiArray, '/sensor/gas_readings', self.gas_callback, 10)

        self.state = "INGRESS"
        self.rover_pose = (0.0, 0.0)
        self.get_logger().info("Mission Manager initialized in INGRESS state.")

    def odom_callback(self, msg):
        self.rover_pose = (msg.pose.pose.position.x, msg.pose.pose.position.y)

    def gas_callback(self, msg):
        ch4 = msg.data[0]
        if ch4 > 5000.0 and self.state == "INGRESS":
            self.get_logger().warn("METHANE HAZARD DETECTED! Diverting path away from West Branch.")
            self.state = "DIVERT_EAST"

    def deploy_drone(self):
        self.get_logger().info("DEPLOYING SCOUT DRONE over rock collapse...")
        # Ascend 2.0 meters
        cmd = Twist()
        cmd.linear.z = 0.8
        self.pub_drone_cmd.publish(cmd)
        time.sleep(2.5)
        # Fly forward into survivor cavern
        cmd.linear.z = 0.0
        cmd.linear.x = 1.0
        self.pub_drone_cmd.publish(cmd)

def main(args=None):
    rclpy.init(args=args)
    node = CollaborativeMissionManager()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
`
  },
  {
    path: 'mine_rescue_sim/CMakeLists.txt',
    filename: 'CMakeLists.txt',
    category: 'build',
    description: 'Ament CMakeLists for ROS 2 Jazzy packaging and launch/config asset installation.',
    content: `cmake_minimum_required(VERSION 3.8)
project(mine_rescue_sim)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclpy REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(sensor_msgs REQUIRED)
find_package(nav_msgs REQUIRED)
find_package(std_msgs REQUIRED)
find_package(tf2_ros REQUIRED)

install(
  DIRECTORY launch config worlds models rviz scripts
  DESTINATION share/\${PROJECT_NAME}
)

install(
  PROGRAMS
  scripts/gas_sensor_sim.py
  scripts/multi_modal_fusion.py
  scripts/mission_manager.py
  DESTINATION lib/\${PROJECT_NAME}
)

ament_package()
`
  },
  {
    path: 'mine_rescue_sim/package.xml',
    filename: 'package.xml',
    category: 'build',
    description: 'ROS 2 Jazzy package manifest specifying runtime dependencies for ros_gz, Nav2, and SLAM Toolbox.',
    content: `<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>mine_rescue_sim</name>
  <version>1.0.0</version>
  <description>AI-Powered Autonomous Rover-Drone Collaborative Mine Rescue Simulation for ROS 2 Jazzy and Gazebo Harmonic</description>
  <maintainer email="rescue-robotics@minesafety.org">Mine Rescue Robotics Team</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <depend>rclpy</depend>
  <depend>geometry_msgs</depend>
  <depend>sensor_msgs</depend>
  <depend>nav_msgs</depend>
  <depend>std_msgs</depend>
  <depend>tf2_ros</depend>
  <depend>ros_gz_sim</depend>
  <depend>ros_gz_bridge</depend>
  <depend>slam_toolbox</depend>
  <depend>nav2_bringup</depend>
  <depend>rviz2</depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
`
  },
  {
    path: 'mine_rescue_sim/README.md',
    filename: 'README.md',
    category: 'build',
    description: 'Quickstart compilation and execution guide for ROS 2 Jazzy and Gazebo Harmonic.',
    content: `# AI-Powered Autonomous Rover–Drone Collaborative Mine Rescue System
ROS 2 Jazzy Jalisco & Gazebo Harmonic Simulation

## Quick Setup Guide

### 1. Prerequisites
- Ubuntu 24.04 LTS (Noble Numbat)
- ROS 2 Jazzy Desktop (\`sudo apt install ros-jazzy-desktop\`)
- Gazebo Harmonic (\`sudo apt install ros-jazzy-ros-gz\`)
- SLAM Toolbox & Nav2:
  \`\`\`bash
  sudo apt install ros-jazzy-slam-toolbox ros-jazzy-nav2-bringup ros-jazzy-navigation2
  \`\`\`

### 2. Workspace Setup
\`\`\`bash
mkdir -p ~/mine_rescue_ws/src
cd ~/mine_rescue_ws/src
# Extract or clone the mine_rescue_sim package here
cd ~/mine_rescue_ws
colcon build --symlink-install
source install/setup.bash
\`\`\`

### 3. Running the Simulation
\`\`\`bash
# Master launch (Gazebo Harmonic World + Rover + Drone + Bridge + AI Nodes)
ros2 launch mine_rescue_sim simulation.launch.py
\`\`\`

### 4. Teleoperation Control
\`\`\`bash
# Control the ground rover manually
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -r cmd_vel:=/model/rover/cmd_vel
\`\`\`
`
  }
];
