

# Setting Up the Go2 Robot in Isaac Sim

This guide will walk you through the process of setting up the Go2 robot in Isaac Sim using the `go2_omniverse` repository.

## Prerequisites

1. **Ubuntu System**: Ensure you are using an Ubuntu system.
2. **ROS 2 Humble**: Install ROS 2 Humble from the [ROS website](https://docs.ros.org/en/humble/Installation.html). If it's already installed, you can skip this step.

## Isaac Sim Installation

1. **Install Isaac Sim 2023.1.1**: Follow the instructions on the previous page to install Isaac Sim 2023.1.1 on your Ubuntu system.

## Isaac Sim Setup

1. **Grant Permissions**:
    ```bash
    sudo chown -R $USER:$USER ~/isaac-sim-2023.1.1
    ```

2. **Move Isaac Sim**:
    ```bash
    mkdir -p ~/.local/share/ov/pkg/ && mv ~/isaac-sim-2023.1.1 ~/.local/share/ov/pkg/
    ```

## Clone IsaacLab-0.3.1

1. **Clone the Repository**:
    ```bash
    cd ~
    git clone https://github.com/isaac-sim/IsaacLab.git IsaacLab-0.3.1
    cd IsaacLab-0.3.1
    git checkout tags/v0.3.1 -b v0.3.1
    ```

## ROS and Isaac Sim Configuration

1. **Add to `~/.bashrc`**:
    ```bash
    echo 'export ISAACSIM_PATH="${HOME}/.local/share/ov/pkg/isaac-sim-2023.1.1"' >> ~/.bashrc
    echo 'export ISAACSIM_PYTHON_EXE="${ISAACSIM_PATH}/python.sh"' >> ~/.bashrc
    source ~/.bashrc
    ```

2. **Create a Symbolic Link**:
    ```bash
    cd ~/IsaacLab-0.3.1/ && ln -s ${ISAACSIM_PATH} _isaac_sim
    ```

3. **Install Dependencies**:
    ```bash
    ./orbit.sh --conda
    conda activate orbit
    sudo apt install cmake build-essential
    ./orbit.sh --install
    python -m pip install "rsl-rl-lib@git+https://github.com/leggedrobotics/rsl_rl.git"
    conda deactivate
    ```

## Verify Isaac Sim Installation

1. **Run a Test Script**:
    ```bash
    python source/standalone/tutorials/00_sim/create_empty.py
    ```

    **Note**: It may take 10-15 minutes to load. Ensure you see "Isaac Sim Python 2023.1.1 - New Stage*" at the top of the window.

2. **Troubleshooting**: If you encounter errors, try installing the following packages:
    ```bash
    pip install numpy==1.24.4 numba==0.57.0 stable-baselines3==2.0.0 usd-core>=21.11,<24.00 nvidia-srl-usd==0.13.0 nvidia-srl-usd-to-urdf==0.5.0 moviepy==1.0.3
    ```

## Clone `go2_omniverse` Repository

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/abizovnuralem/go2_omniverse/ --recurse-submodules -j8 --depth=1
    ```

## Setup Go2 Robot

1. **Copy Sensor Configuration**:
    ```bash
    cd ~
    mkdir -p IsaacLab-0.3.1/source/data/sensors/lidar
    cp go2_omniverse/Isaac_sim/Unitree/Unitree_L1.json IsaacLab-0.3.1/source/data/sensors/lidar/Unitree_L1.json
    ```

2. **Copy Material Files**:
    ```bash
    mkdir -p IsaacLab-0.3.1/source/data/material_files
    cp -r ~/.local/share/ov/pkg/isaac-sim-2023.1.1/data/material_files/* IsaacLab-0.3.1/source/data/material_files/
    ```

## Run the Simulation

1. **Navigate to the Repository**:
    ```bash
    cd ~/go2_omniverse
    ```

2. **Run the Simulation Script**:
    ```bash
    ./run_sim.sh
    ```

