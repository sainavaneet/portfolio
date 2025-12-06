# MambaVLA: A Scalable and Efficient Vision-Language-Action Model with State Space Architecture

## 📚 Publication

**Published at**: Consumer Communications & Networking Conference (CCNC), 2026  
**Authors**: Sai Navaneet, Manisha Lingala, Sangmoon Lee, Ju H. Park  
**Date**: January 2026

## 📝 Abstract

Recent advances in multimodal learning have enabled powerful Vision–Language–Action 
(VLA) systems for robotic reasoning and control. However, most existing approaches 
rely on Transformer backbones, which face scalability and efficiency bottlenecks for long 
sequences. This work introduces MambaVLA, a scalable VLA framework built on the 
Mamba state space architecture for efficient sequence modeling. The framework 
integrates the Eagle visual encoder and Qwen-7B-Chat-Int4 language model to achieve 
fine-grained multimodal fusion with linear-time complexity. A diffusion flow matching 
module further aligns visual–language embeddings with continuous action trajectories, 
enabling smooth and precise control. Extensive evaluations on standard VLA benchmarks 
demonstrate that MambaVLA matches or surpasses Transformer based models while 
offering substantially lower computational cost and faster inference. These results 
highlight the potential of state space modeling and flow-based action generation for 
compact, scalable, and deployable embodied intelligence systems.

```{raw} html
<a href="https://sainavaneet.github.io/MambaVLA.gihub.io/" target="_blank" class="project-website-button">Project Website</a>
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

## 🎯 Key Features

- **State Space Architecture**: Efficient processing using Mamba-based state space models
- **Vision-Language Integration**: Seamless understanding of natural language commands with visual perception
- **Scalable Design**: Efficient architecture suitable for real-time robot control
- **Action Generation**: Unified framework for generating robot actions from multimodal inputs

## 💡 Primary Contributions

My primary contributions are fourfold:

**First**, I introduce MambaVLA, a novel Vision–Language–Action framework that leverages structured state space models, specifically the Mamba architecture, to overcome scalability and long-sequence modeling limitations inherent in Transformer-based approaches.

**Second**, I integrate the Eagle2 visual backbone and the Qwen-7B-Chat-Int4 language encoder with a unified multimodal fusion mechanism, enabling efficient alignment between spatial and linguistic features.

**Third**, I incorporate a diffusion flow-matching module that generates continuous, smooth, and physically consistent action trajectories, effectively bridging the gap between multimodal perception and low-level control.

**Fourth**, I conduct extensive evaluations across multiple established VLA benchmarks, demonstrating that MambaVLA achieves competitive or superior performance compared to state-of-the-art Transformer-based models while maintaining substantially lower computational overhead and faster inference.

Overall, these contributions highlight the potential of combining state space architectures with flow-based generative modeling to build compact, efficient, and scalable Vision–Language–Action systems for real-world embodied intelligence.

## 🔬 Methodology

### Architecture Overview

The MambaVLA architecture combines state space models with vision-language understanding to create an efficient and scalable VLA framework.

## 📊 Results

This work demonstrates the effectiveness of state space architectures in vision-language-action tasks, providing a scalable alternative to transformer-based approaches.

![Success Rate on Various Benchmarks](successrate.png)

In terms of data efficiency, MambaVLA requires substantially fewer demonstrations to achieve similar performance to existing baselines. Specifically, it matches SmolVLA with 40 demonstrations (vs. 50) and reaches OpenVLA performance with just 35 demonstrations.


```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <h2 class="title is-3">Evaluation</h2>
        <div class="content has-text-centered">
          <div style="margin-top: 20px; width: 100%; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <div style="position: relative; padding-bottom: 35%; height: 0; overflow: hidden; flex: 1; min-width: 300px; max-width: 48%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/lXLeGZZq4PY?autoplay=1&mute=1&controls=0&loop=1&playlist=lXLeGZZq4PY&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <div style="position: relative; padding-bottom: 35%; height: 0; overflow: hidden; flex: 1; min-width: 300px; max-width: 48%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/wzSXYac6NTo?autoplay=1&mute=1&controls=0&loop=1&playlist=wzSXYac6NTo&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; margin-top: 20px; align-items: flex-start;">
          <div style="flex: 1; min-width: 200px; max-width: 28%;">
            <h2 class="title is-3" style="margin-bottom: 15px;">Demonstration</h2>
            <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: #000;">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/Rl47ZfTu2JY?autoplay=1&mute=1&controls=0&loop=1&playlist=Rl47ZfTu2JY&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
          <div style="flex: 2.8; min-width: 450px; max-width: 75%; margin-top: 60px;">
            <h2 class="title is-3" style="margin-bottom: 15px;">Impedance controller</h2>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/EXWM9fAY3X4?autoplay=1&mute=1&controls=0&loop=1&playlist=EXWM9fAY3X4&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```



