# Isaac Sim Installation

## Installation of isaac sim 2023.1.1


## Step-by-Step: Install Docker with NVIDIA GPU Support on Ubuntu

**1. Install Docker Engine**

```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
docker --version
```

**2. Add Your User to the Docker Group (Optional, for non-root use)**

```bash
sudo usermod -aG docker $USER
newgrp docker
```

**3. Install NVIDIA GPU Driver**

- Make sure the proprietary NVIDIA driver is installed and working:
```bash
nvidia-smi
```
If this command shows GPU info, your driver is installed.

**4. Set Up the NVIDIA Container Toolkit Repository**

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```


**5. Install NVIDIA Container Toolkit**

```bash
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
```


**6. Restart Docker**

```bash
sudo systemctl restart docker
```



## Issac sim from docker 

```bash
docker pull nvcr.io/nvidia/isaac-sim:2023.1.1
```

after downlaoding the docker

### Run the docker

```bash
sudo docker run --name isaac-sim -it \
    --gpus all \
    -e "ACCEPT_EULA=Y" \
    -e "PRIVACY_CONSENT=Y" \
    --rm \
    --network=host \
    -v ~/docker/isaac-sim/cache/kit:/isaac-sim/kit/cache:rw \
    -v ~/docker/isaac-sim/cache/ov:/root/.cache/ov:rw \
    -v ~/docker/isaac-sim/cache/pip:/root/.cache/pip:rw \
    -v ~/docker/isaac-sim/cache/glcache:/root/.cache/nvidia/GLCache:rw \
    -v ~/docker/isaac-sim/cache/computecache:/root/.nv/ComputeCache:rw \
    -v ~/docker/isaac-sim/logs:/root/.nvidia-omniverse/logs:rw \
    -v ~/docker/isaac-sim/data:/root/.local/share/ov/data:rw \
    -v ~/docker/isaac-sim/documents:/root/Documents:rw \
    --entrypoint bash \
    nvcr.io/nvidia/isaac-sim:2023.1.1


```

```{admonition} Open New terminal
:class: important
Run below command
```

```bash

sudo docker ps

```

TO know the docker id of the isaacsim 2023.1.1

Now copy the isaacsim to your local ubuntu 

```bash 
docker cp <id_container>:isaac-sim/. isaac-sim-2023.1.1
```

now you have the `issacsim2023.1.1` you can run using the ```./isaacsim.sh```