# Go2 robot in isaac-sim 

i used ```go2_omniverse``` repo to bring the robot

## Installation of isaacsim 

```{admonition} Isaac sim installation

See previous page to install the ```isaacsim2023.1.1``` in your ubuntu

```



## Isaacsim setup

Give permission to isaacsim

```bash
sudo chown -R $USER:$USER ~/isaac-sim-2023.1.1

```

Move the isaacsim to this path `.local/share/ov/pkg/` 

```bash 

mkdir -p ~/.local/share/ov/pkg/ && mv ~/isaac-sim-2023.1.1 ~/.local/share/ov/pkg/

```

## clone Isaaclab-0.3.1

```bash
cd ~
git clone https://github.com/isaac-sim/IsaacLab.git IsaacLab-0.3.1
cd IsaacLab-0.3.1
git checkout tags/v0.3.1 -b v0.3.1
```

```{admonition} Ros Installation

:class: important

Intall Ros2 humble from ROS website. if its already install skip this step.

```

```{admonition} Isaac sim installation

Install all required form ROS setup from Isaac Doc 

```


Execute this

```bash 

# Add to ~/.bashrc
echo 'export ISAACSIM_PATH="${HOME}/.local/share/ov/pkg/isaac-sim-2023.1.1"' >> ~/.bashrc
echo 'export ISAACSIM_PYTHON_EXE="${ISAACSIM_PATH}/python.sh"' >> ~/.bashrc
source ~/.bashrc

```

```bash 

cd ~/IsaacLab-0.3.1/ && ln -s ${ISAACSIM_PATH} _isaac_sim

```

```bash 

./orbit.sh --conda

conda activate orbit

sudo apt install cmake build-essential

```

```bash

./orbit.sh --install

```

```bash

python -m pip install "rsl-rl-lib@git+https://github.com/leggedrobotics/rsl_rl.git"

```

```bash

conda deactivate

```

After executing all these we need to verify our isaacsim 

```{note}
It takes more than 10-15mins to load!. Run below command without Conda env

You need to check that you have "Isaac Sim Python 2023.1.1 - New Stage*" on the top of the window.

```

```bash
python source/standalone/tutorials/00_sim/create_empty.py
```


```{note}

if you face any errors install these it worked for me 

numpy==1.24.4
numba==0.57.0
stable-baselines3==2.0.0
usd-core>=21.11,<24.00
nvidia-srl-usd==0.13.0
nvidia-srl-usd-to-urdf==0.5.0
moviepy==1.0.3
```

```bash 
git clone https://github.com/abizovnuralem/go2_omniverse/ --recurse-submodules -j8 --depth=1

```

After that we need to do this setup 

```bash 
cd ~
mkdir -p IsaacLab-0.3.1/source/data/sensors/lidar && cp go2_omniverse/Isaac_sim/Unitree/Unitree_L1.json IsaacLab-0.3.1/source/data/sensors/lidar/Unitree_L1.json

```
copy materials

```bash 

mkdir -p IsaacLab-0.3.1/source/data/material_files && cp -r ~/.local/share/ov/pkg/isaac-sim-2023.1.1/data/material_files/* IsaacLab-0.3.1/source/data/material_files/


```
Now run the './run_sim.sh' in repo

```bash 

cd /go2_omniverse

./run_sim.sh

```
