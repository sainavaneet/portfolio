# QROOT: An Integrated Diffusion Transformer and Reinforcement Learning Approach for Quadrupedal Locomotion

<div align="center">

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

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/QROOT/architecture.png" alt="QROOT Architecture" style="max-width: 35%; height: auto; display: block; margin: 0 auto;">
</div>
```

### Simulation Environments

We conducted simulation using IsaacSim, designing three distinct environments for different task types:

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/QROOT/env.png" alt="env" style="max-width: 70%; height: auto; display: block; margin: 0 auto;">
</div>
```

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

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/4gJtVZhGDg0?autoplay=1&mute=1&controls=0&loop=1&playlist=4gJtVZhGDg0&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <p style="text-align: center; margin-top: 1rem; font-style: italic;">Demonstration of keyboard-based robot control in IsaacSim</p>
      </div>
    </div>
  </div>
</section>
```

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

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/Mqrypsndwqc?autoplay=1&mute=1&controls=0&loop=1&playlist=Mqrypsndwqc&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### 🟥 Go to Red Cube

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/zprrjA4cvr4?autoplay=1&mute=1&controls=0&loop=1&playlist=zprrjA4cvr4&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Search Tasks

#### 🪑 Find Chair

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/ay7G71RH5Dg?autoplay=1&mute=1&controls=0&loop=1&playlist=ay7G71RH5Dg&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### 🛋️ Find Sofa

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/8A80kSSw-3k?autoplay=1&mute=1&controls=0&loop=1&playlist=8A80kSSw-3k&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Navigation Tasks

#### 🚇 Go Through the Tunnel

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/xr9UiIEj3XI?autoplay=1&mute=1&controls=0&loop=1&playlist=xr9UiIEj3XI&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### 🚶 Go from Left Side of the Tunnel

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/zdupeCBsalg?autoplay=1&mute=1&controls=0&loop=1&playlist=zdupeCBsalg&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 📝 Conclusion

In this study, we adapt the GR00T N1 architecture to quadrupedal robots through a hybrid framework that combines a Vision-Language-Action (VLA) model with Proximal Policy Optimization (PPO). This integration enables robust, adaptable locomotion by uniting high-level semantic understanding with stable, reinforcement learning-based control.

Our results highlight the potential of combining model-based and learning-based approaches for generalist robotics. Future work will explore:
- More complex task scenarios
- Enhanced sensory input integration
- Cross-platform policy transfer
- Improved real-world versatility
