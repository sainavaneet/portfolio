# 🐾 Go2 Robot in Isaac Sim (Omniverse)

You can bring the **Go2 robot** into **Isaac Sim** using the [`go2_omniverse`](https://github.com/abizovnuralem/go2_omniverse) repository.

<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/2OdbSHuDdmA?autoplay=1"
  title="Go2 Robot in Isaac Sim"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allow="autoplay; encrypted-media; fullscreen"
  allowfullscreen
></iframe>

---

## 🧩 Prerequisites

### Isaac Sim Installation

```{admonition} Isaac Sim Installation
To install `isaacsim 2023.1.1` on Ubuntu, refer to the [previous setup page](../isaacsim_installation.md).
```

---

## ⚙️ Isaac Sim Setup

### 1. Set Permissions

```bash
sudo chown -R $USER:$USER ~/isaac-sim-2023.1.1
```

### 2. Move Isaac Sim to Local OV Path

```bash
mkdir -p ~/.local/share/ov/pkg/
mv ~/isaac-sim-2023.1.1 ~/.local/share/ov/pkg/
```

---

## 🧪 Isaac Lab Setup

### 3. Clone Isaac Lab v0.3.1

```bash
cd ~
git clone https://github.com/isaac-sim/IsaacLab.git IsaacLab-0.3.1
cd IsaacLab-0.3.1
git checkout tags/v0.3.1 -b v0.3.1
```

### 4. ROS 2 Humble

```{admonition} ROS Installation
:class: important

Install ROS 2 Humble from the [official ROS site](https://docs.ros.org/en/humble/Installation.html). If already installed, skip this step.
```

```{admonition} ROS Setup for Isaac
Refer to Isaac Sim documentation for installing required ROS packages.
```

---

## 🔧 Environment Configuration

### 5. Update `.bashrc`

```bash
echo 'export ISAACSIM_PATH="${HOME}/.local/share/ov/pkg/isaac-sim-2023.1.1"' >> ~/.bashrc
echo 'export ISAACSIM_PYTHON_EXE="${ISAACSIM_PATH}/python.sh"' >> ~/.bashrc
source ~/.bashrc
```

### 6. Create Symlink for Isaac Sim

```bash
cd ~/IsaacLab-0.3.1/
ln -s ${ISAACSIM_PATH} _isaac_sim
```

---

## 📦 Install Orbit Dependencies

### 7. Launch Conda Setup

```bash
./orbit.sh --conda
conda activate orbit
```

### 8. Install System Dependencies

```bash
sudo apt install cmake build-essential
```

### 9. Install Python Dependencies

```bash
./orbit.sh --install
python -m pip install "rsl-rl-lib@git+https://github.com/leggedrobotics/rsl_rl.git"
conda deactivate
```

---

## ✅ Verify Isaac Sim Installation

```{note}
It may take **10–15 minutes** to load Isaac Sim. Run the command **outside of the Conda environment**.

Ensure you see `Isaac Sim Python 2023.1.1 - New Stage*` in the title bar.
```

```bash
python source/standalone/tutorials/00_sim/create_empty.py
```

### If you face errors, try installing these specific versions:

```bash
pip install \
  numpy==1.24.4 \
  numba==0.57.0 \
  stable-baselines3==2.0.0 \
  usd-core>=21.11,<24.00 \
  nvidia-srl-usd==0.13.0 \
  nvidia-srl-usd-to-urdf==0.5.0 \
  moviepy==1.0.3
```

---

## 🤖 Bring in Go2 with `go2_omniverse`

### 10. Clone the Repo

```bash
git clone https://github.com/abizovnuralem/go2_omniverse/ --recurse-submodules -j8 --depth=1
```

---

## 📁 File Setup

### 11. Add LiDAR Sensor Config

```bash
mkdir -p IsaacLab-0.3.1/source/data/sensors/lidar
cp go2_omniverse/Isaac_sim/Unitree/Unitree_L1.json IsaacLab-0.3.1/source/data/sensors/lidar/
```

### 12. Copy Material Files

```bash
mkdir -p IsaacLab-0.3.1/source/data/material_files
cp -r ~/.local/share/ov/pkg/isaac-sim-2023.1.1/data/material_files/* IsaacLab-0.3.1/source/data/material_files/
```

---

## ▶️ Run the Simulation

```bash
cd go2_omniverse
./run_sim.sh
```

