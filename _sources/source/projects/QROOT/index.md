# QROOT: An Integrated Diffusion Transformer and Reinforcement Learning Approach for Quadrupedal Locomotion

<div align="center">

![QROOT](architecture.png)
</div>

## 📝 Abstract

Quadrupedal robots offer superior mobility in unstructured environments, yet lack the generalist autonomy seen in recent humanoid systems. In this work, we present QROOT, a novel adaptation of the GR00T N1 foundation model to quadrupedal platforms. QROOT enables a quadrupedal robot to interpret natural language instructions, perceive its environment, and generate locomotion-centric behaviors through a unified Vision-Language-Action (VLA) framework.

To bridge the embodiment gap, we introduce a control stack that combines diffusion transformer with a reinforcement learning-based stabilizer(PPO), enabling smooth and robust execution on real-world hardware. Our approach generalizes effectively to navigation, search, and object-localization tasks with minimal fine-tuning, demonstrating the feasibility of transferring generalist robot models to mobile, legged platforms.

## 🎯 Key Features

- **Natural Language Understanding**: Interpret and execute natural language commands
- **Environment Perception**: Advanced vision-based environment understanding
- **Robust Locomotion**: Combined diffusion transformer and PPO-based control
- **Task Generalization**: Effective performance across multiple task types
- **Real-world Deployment**: Hardware-ready implementation

## 🔬 Methodology

### Algorithm Architecture

![QROOT Architecture](architecture.png)

### Simulation Environments

We conducted simulation using IsaacSim, designing three distinct environments for different task types:

![env](env.png)

#### Task Categories
- 🎯 **Object-localization tasks**
- 🔍 **Search Tasks**
- 🗺️ **Navigation Tasks**

## 📊 Dataset Creation

We developed a user-friendly interface for robot teleoperation and dataset management, enabling:
- Direct movement control
- Real-time simulation
- Systematic data collection

### Control Interface
- **W**: Forward movement
- **S**: Backward movement
- **D**: Right movement
- **A**: Left movement

<div align="center">

<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/4gJtVZhGDg0?autoplay=1&loop=1&mute=1&controls=0&playlist=4gJtVZhGDg0"
  title="Go2 robot in isaac sim keyboard control"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

*Demonstration of keyboard-based robot control in IsaacSim*

</div>

## 🎓 Training Configuration

| Parameter | Value |
|-----------|--------|
| Hardware | NVIDIA A6000 GPU |
| Batch Size | 16 |
| Training Steps | 1,000 |
| Optimizer | AdamW |
| Learning Rate | 1×10⁻⁴ |
| β₁ | 0.95 |
| β₂ | 0.999 |
| Epsilon | 1×10⁻⁸ |
| Weight Decay | 1×10⁻⁵ |
| Learning Rate Schedule | Cosine Annealing |
| Warm-up Ratio | 0.05 |

## 🎮 Policy Execution 

### Object Localization Tasks

#### 🟦 Go to Blue Cube
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/Mqrypsndwqc?autoplay=1&loop=1&mute=1&controls=0&playlist=Mqrypsndwqc"
  title="Go to Blue Cube Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

#### 🟥 Go to Red Cube
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/zprrjA4cvr4?autoplay=1&loop=1&mute=1&controls=0&playlist=zprrjA4cvr4"
  title="Go to Red Cube Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

### Search Tasks

#### 🪑 Find Chair
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/ay7G71RH5Dg?autoplay=1&loop=1&mute=1&controls=0&playlist=ay7G71RH5Dg"
  title="Find Chair Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

#### 🛋️ Find Sofa
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/8A80kSSw-3k?autoplay=1&loop=1&mute=1&controls=0&playlist=8A80kSSw-3k"
  title="Find Sofa Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

### Navigation Tasks

#### 🚇 Go Through the Tunnel
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/xr9UiIEj3XI?autoplay=1&loop=1&mute=1&controls=0&playlist=xr9UiIEj3XI"
  title="Go Through Tunnel Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

#### 🚶 Go from Left Side of the Tunnel
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/zdupeCBsalg?autoplay=1&loop=1&mute=1&controls=0&playlist=zdupeCBsalg"
  title="Go from Left Side of Tunnel Task"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

## 📝 Conclusion

In this study, we adapt the GR00T N1 architecture to quadrupedal robots through a hybrid framework that combines a Vision-Language-Action (VLA) model with Proximal Policy Optimization (PPO). This integration enables robust, adaptable locomotion by uniting high-level semantic understanding with stable, reinforcement learning-based control.

Our results highlight the potential of combining model-based and learning-based approaches for generalist robotics. Future work will explore:
- More complex task scenarios
- Enhanced sensory input integration
- Cross-platform policy transfer
- Improved real-world versatility
