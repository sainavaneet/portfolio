# DiffDAIL: Diffusion-Enhanced Vision-Guided Imitation Learning with Discrete Latent Representations

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/DiffDAIL/overview.png" alt="DiffDAIL Architecture" style="max-width: 40%; height: auto; display: block; margin: 0 auto;">
</div>
```


## 📝 Abstract

Robotic imitation learning often struggles with high-dimensional sensory inputs, noisy demonstrations, and computational inefficiency in policy learning. We present Discrete Action Imitation Learning enhanced with Diffusion (DiffDAIL), a vision-guided framework that combines discrete action encoding and diffusion-based representation learning to address these challenges. By discretizing latent embeddings, DiffDAIL reduces computational cost, while a diffusion-based denoising loop improves robustness and captures heterogeneous action distributions. A Transformer-based architecture further models long-range dependencies in sequential decision-making tasks. Experimental results across benchmark manipulation tasks demonstrate that DiffDAIL outperforms conventional VAE-based and diffusion methods, achieving higher task success rates and improved data efficiency. These results highlight DiffDAIL as a scalable, robust, and resource-efficient approach for vision-guided robotic imitation learning.

```{raw} html
<a href="https://sainavaneet.github.io/DAIL/" target="_blank" class="project-website-button">Project Website</a>
<style>
.project-website-button {
  display: block;
  width: 100%;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  border: 1px solid #000000;
  background: transparent;
  color: #000000;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.project-website-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 0.3s ease;
}

.project-website-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.project-website-button:hover::after {
  width: 100%;
}

[data-theme="dark"] .project-website-button,
.theme-dark .project-website-button,
.dark .project-website-button {
  border-color: #ffffff;
  color: #ffffff;
}

[data-theme="dark"] .project-website-button::after,
.theme-dark .project-website-button::after,
.dark .project-website-button::after {
  background: #ffffff;
}

[data-theme="dark"] .project-website-button:hover,
.theme-dark .project-website-button:hover,
.dark .project-website-button:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
```


## 🔬 Methodology

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/DiffDAIL/architecture.png" alt="DiffDAIL Architecture" style="max-width: 90%; height: auto; display: block; margin: 0 auto;">
</div>
```

## 📊 Results

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/DiffDAIL/successrate.png" alt="Success Rate on Various Benchmarks" style="max-width: 70%; height: auto; display: block; margin: 0 auto;">
</div>
```

```{raw} html
<div style="text-align: center; margin: 1rem 0;">
  <img src="../../../_static/images/DiffDAIL/successrate2.png" alt="Success Rate on Various Benchmarks" style="max-width: 70%; height: auto; display: block; margin: 0 auto;">
</div>
```



