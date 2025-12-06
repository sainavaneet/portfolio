---
title: Combining Imitation Learning with Diffusion Processes on Robot Manipulator
summary: Implemented imitation learning
date: 2024-09-24

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Immitation Learning'

authors:
  - admin

tags:
  - Immitation Learning
links:
  - icon_pack: fab
    icon: github
    name: 👉 Project-Link
    url: 'https://github.com/sainavaneet/imitation-learning-Franka/'
---

# Combining Imitation Learning with Diffusion Processes on Robot Manipulator

```{raw} html
<section class="section">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/CYL4t0xv4y4?autoplay=1&mute=1&controls=0&loop=1&playlist=CYL4t0xv4y4&modestbranding=1&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
```


## Diffusion Processes

Diffusion processes can be modeled by Stochastic Differential Equations (SDEs) as follows:

```{math}
dX_t = \mu(X_t, t)dt + \sigma(X_t, t)dW_t
```

where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(X_t\)</span> is the state of the process at time <span class="math notranslate nohighlight">\(t\)</span>.</li>
<li><span class="math notranslate nohighlight">\(\mu(X_t, t)\)</span> represents the drift term.</li>
<li><span class="math notranslate nohighlight">\(\sigma(X_t, t)\)</span> represents the diffusion term.</li>
<li><span class="math notranslate nohighlight">\(W_t\)</span> represents a Wiener process (or Brownian motion).</li>
</ul>
```

## Imitation Learning

The objective function in imitation learning can be expressed as:

```{math}
\min_{\pi} \mathbb{E}_{(s,a^*)\sim D}[-\log \pi(a^* | s)]
```

where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(D\)</span> is a dataset of state-action pairs <span class="math notranslate nohighlight">\((s, a^*)\)</span>.</li>
<li><span class="math notranslate nohighlight">\(a^*\)</span> is the action taken by the expert in state <span class="math notranslate nohighlight">\(s\)</span>.</li>
<li>The expertise dataset was created using an Inverse Kinematics Solver (IK-Solver).</li>
</ul>
```

## Combining Diffusion Processes with Imitation Learning

```{math}
\min_{\pi} \mathbb{E}_{(s,a^*)\sim D, X_t\sim SDE}[-\log \pi(a^* | s) + \lambda \cdot L(X_t, \pi(s))]
```

where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(L(X_t, \pi(s))\)</span> represents a loss term under the dynamics <span class="math notranslate nohighlight">\(X_t\)</span>.</li>
<li><span class="math notranslate nohighlight">\(\lambda\)</span> is a regularization parameter.</li>
</ul>
```

## Neural Network Model

Given a desired end-effector position $x \in \mathbb{R}^3$, the network computes the joint angles $y \in \mathbb{R}^7$ through a series of transformations:

1. Layer 1: $h_1 = \text{ReLU}(W_1x + b_1)$  
2. Layer 2: $h_2 = \text{ReLU}(W_2h_1 + b_2)$  
3. Layer 3: $h_3 = \text{ReLU}(W_3h_2 + b_3)$  
4. Output Layer: $y = W_4h_3 + b_4$

Where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(W_i\)</span> and <span class="math notranslate nohighlight">\(b_i\)</span> are the weights and biases of the <span class="math notranslate nohighlight">\(i\)</span>-th layer.</li>
<li><span class="math notranslate nohighlight">\(\text{ReLU}(z) = \max(0, z)\)</span> is the Rectified Linear Unit activation function.</li>
</ul>
```

## Loss Function

Minimizing the difference between the predicted joint angles and the true joint angles. The loss function used is the Mean Squared Error (MSE), given by:

```{math}
L(\theta) = \frac{1}{N} \sum_{i=1}^{N} \| f(x^{(i)}; \theta) - y^{(i)} \|^2
```

where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(N\)</span> is the number of samples in the dataset.</li>
<li><span class="math notranslate nohighlight">\(x^{(i)}\)</span> is the <span class="math notranslate nohighlight">\(i\)</span>-th desired end-effector position.</li>
<li><span class="math notranslate nohighlight">\(y^{(i)}\)</span> is the true joint angles for the <span class="math notranslate nohighlight">\(i\)</span>-th sample.</li>
<li><span class="math notranslate nohighlight">\(\| \cdot \|\)</span> denotes the Euclidean norm.</li>
</ul>
```

## Optimization

The training process seeks to find the optimal parameters $\theta^*$ that minimize the loss function $L(\theta)$. This is typically done using gradient-based optimization methods, such as Adam. The update rule for Adam at each iteration $t$ is:

1. Compute gradients: $g_t = \nabla_{\theta} L(\theta)$  
2. First moment: $m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t$  
3. Second moment: $v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$  
4. Bias-corrected first moment: $\hat{m}_t = m_t / (1 - \beta_1^t)$  
5. Bias-corrected second moment: $\hat{v}_t = v_t / (1 - \beta_2^t)$  
6. Update rule:

```{math}
\theta = \theta - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
```

where:

```{raw} html
<ul>
<li><span class="math notranslate nohighlight">\(\beta_1\)</span> and <span class="math notranslate nohighlight">\(\beta_2\)</span> control the decay rates. Default: <span class="math notranslate nohighlight">\(\beta_1 = 0.9\)</span>, <span class="math notranslate nohighlight">\(\beta_2 = 0.999\)</span></li>
<li><span class="math notranslate nohighlight">\(\eta\)</span> is the learning rate. We used <span class="math notranslate nohighlight">\(\eta = 0.001\)</span></li>
<li><span class="math notranslate nohighlight">\(\epsilon = 10^{-8}\)</span> adds numerical stability</li>
</ul>
```

## Training Process

- **Epochs:** 10,000  
- **Learning Rate ($\eta$):** 0.001  
- **Total Time Taken:** 11.92 seconds

## Demonstration

We used the `matplotlib` Python library to draw some trajectories to imitate.


