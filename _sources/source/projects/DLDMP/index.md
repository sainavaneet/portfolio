
# Discrete Latent Diffusion Motion Planning



## Abstract

we introduce a framework that reduces computational costs while ensuring collision-free trajectory generation. 
The method integrates trajectory encoding, discrete diffusion, and transformer-based decoding to produce high-quality, goal-directed motion plans. Our approach demonstrates the potential of discrete generative models to enhance robotic planning performance in complex environments.



## Introduction

```{raw} html
<div style="display: flex; gap: 2rem; align-items: flex-start; margin: 1rem 0;">
  <div style="flex: 1;">
    <p>Trajectory planning is a core challenge in robotics, where the goal is to generate smooth, goal-directed paths that avoid collisions with obstacles. Traditional motion planners often rely on continuous optimization techniques, which can be computationally expensive and struggle with high-dimensional environments.</p>
    
    <p>Recent advances in generative models, especially diffusion models, have shown strong performance in structured output generation tasks. Inspired by their success, we explore how discrete latent diffusion can be leveraged to efficiently generate feasible trajectories in robotic settings.</p>
    
    <p><strong>Our goal:</strong> generate goal-directed, collision-free trajectories with lower computational cost.</p>
  </div>
  <div style="flex: 0 0 auto; max-width: 40%;">
    <img src="../../../_static/images/DLDMP/main.png" alt="DLDMP Main" style="width: 80%; height: auto; display: block;">
  </div>
</div>
```

## Methodology

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/DLDMP/architecture.png" alt="DLDMP Architecture" style="max-width: 70%; height: auto; display: block; margin: 0 auto;">
</div>
```

### Latent Diffusion Models (LDM)

```{raw} html
<div style="display: flex; gap: 2rem; align-items: flex-start; margin: 1rem 0;">
  <div style="flex: 1;">
    <p>LDMs show that moving diffusion to a compressed latent space (e.g., VQ-VAE codes) drastically reduces computational load while preserving fidelity.</p>
    <p>Achieves state-of-the-art in high-res image tasks (inpainting, super-resolution) via cross-attention for flexible conditioning.</p>
    <p><strong>Key takeaway:</strong> Encode robot trajectories (e.g., sequences of joint angles or end-effector positions) into a discrete latent embedding (via VQ-VAE). Perform diffusion in this smaller, quantized space rather than in raw continuous waypoints.</p>
  </div>
  <div style="flex: 0 0 auto; max-width: 40%;">
    <img src="../../../_static/images/DLDMP/ldm.png" alt="Latent Diffusion Models" style="width: 100%; height: auto; display: block;">
  </div>
</div>
```
### Collision Check

```{raw} html
<div style="display: flex; gap: 2rem; align-items: flex-start; margin: 1rem 0;">
  <div style="flex: 1;">
    <p>We used Gilbert-Johnson-Keerthi (GJK) algorithm to perform the collision check.</p>
    <ul>
      <li>Takes the new trajectory sample output from the decoder (sequence of robot poses).</li>
      <li>Compares each pose or link of the robot arm with known obstacle shapes in the environment.</li>
      <li>Checks for intersections (i.e., potential collisions) by computing the shortest distance between the robot and the obstacles using convex shape representations.</li>
      <li>If a collision is detected, the new trajectory sample is iteratively refined until a collision-free trajectory is generated.</li>
    </ul>
  </div>
  <div style="flex: 0 0 auto; max-width: 40%;">
    <img src="../../../_static/images/DLDMP/collision.png" alt="Collision Check" style="width: 80%; height: auto; display: block;">
  </div>
</div>
```



## Policy Evaluation

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 20px; align-items: flex-start;">
          <div style="flex: 0 0 auto; max-width: 300px; width: 100%;">
            <h3 style="text-align: center; margin-bottom: 1rem; font-size: 1.2rem; font-weight: 600;">Without Obstacle</h3>
            <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: #000;">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/VuQzvcPJjnE?autoplay=1&mute=1&controls=0&loop=1&playlist=VuQzvcPJjnE&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
          <div style="flex: 0 0 auto; max-width: 300px; width: 100%;">
            <h3 style="text-align: center; margin-bottom: 1rem; font-size: 1.2rem; font-weight: 600;">With Obstacle</h3>
            <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: #000;">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/MTVcWGUTb_w?autoplay=1&mute=1&controls=0&loop=1&playlist=MTVcWGUTb_w&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```






