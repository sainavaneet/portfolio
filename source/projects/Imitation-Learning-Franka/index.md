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
<iframe
  width="746"
  height="420"
  src="https://www.youtube.com/embed/CYL4t0xv4y4"
  title="Robot Manipulator Demo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```


## Diffusion Processes

Diffusion processes can be modeled by Stochastic Differential Equations (SDEs) as follows:

$$
dX_t = \mu(X_t, t)dt + \sigma(X_t, t)dW_t
$$

where:

- $X_t$ is the state of the process at time $t$.
- $\mu(X_t, t)$ represents the drift term.
- $\sigma(X_t, t)$ represents the diffusion term.
- $W_t$ represents a Wiener process (or Brownian motion).

## Imitation Learning

The objective function in imitation learning can be expressed as:

$$
\min_{\pi} \mathbb{E}_{(s,a^*)\sim D}[-\log \pi(a^* | s)]
$$

where:

- $D$ is a dataset of state-action pairs $(s, a^*)$.
- $a^*$ is the action taken by the expert in state $s$.
- The expertise dataset was created using an Inverse Kinematics Solver (IK-Solver).

## Combining Diffusion Processes with Imitation Learning

$$
\min_{\pi} \mathbb{E}_{(s,a^*)\sim D, X_t\sim SDE}[-\log \pi(a^* | s) + \lambda \cdot L(X_t, \pi(s))]
$$

where:

- $L(X_t, \pi(s))$ represents a loss term under the dynamics $X_t$.
- $\lambda$ is a regularization parameter.

## Neural Network Model

Given a desired end-effector position $x \in \mathbb{R}^3$, the network computes the joint angles $y \in \mathbb{R}^7$ through a series of transformations:

1. Layer 1: $h_1 = \text{ReLU}(W_1x + b_1)$  
2. Layer 2: $h_2 = \text{ReLU}(W_2h_1 + b_2)$  
3. Layer 3: $h_3 = \text{ReLU}(W_3h_2 + b_3)$  
4. Output Layer: $y = W_4h_3 + b_4$

Where:

- $W_i$ and $b_i$ are the weights and biases of the $i$-th layer.
- $\text{ReLU}(z) = \max(0, z)$ is the Rectified Linear Unit activation function.

## Loss Function

Minimizing the difference between the predicted joint angles and the true joint angles. The loss function used is the Mean Squared Error (MSE), given by:

$$
L(\theta) = \frac{1}{N} \sum_{i=1}^{N} \| f(x^{(i)}; \theta) - y^{(i)} \|^2
$$

where:

- $N$ is the number of samples in the dataset.
- $x^{(i)}$ is the $i$-th desired end-effector position.
- $y^{(i)}$ is the true joint angles for the $i$-th sample.
- $\| \cdot \|$ denotes the Euclidean norm.

## Optimization

The training process seeks to find the optimal parameters $\theta^*$ that minimize the loss function $L(\theta)$. This is typically done using gradient-based optimization methods, such as Adam. The update rule for Adam at each iteration $t$ is:

1. Compute gradients: $g_t = \nabla_{\theta} L(\theta)$  
2. First moment: $m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t$  
3. Second moment: $v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$  
4. Bias-corrected first moment: $\hat{m}_t = m_t / (1 - \beta_1^t)$  
5. Bias-corrected second moment: $\hat{v}_t = v_t / (1 - \beta_2^t)$  
6. Update rule:

$$
\theta = \theta - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
$$

where:

- $\beta_1$ and $\beta_2$ control the decay rates. Default: $\beta_1 = 0.9$, $\beta_2 = 0.999$
- $\eta$ is the learning rate. We used $\eta = 0.001$
- $\epsilon = 10^{-8}$ adds numerical stability

## Training Process

- **Epochs:** 10,000  
- **Learning Rate ($\eta$):** 0.001  
- **Total Time Taken:** 11.92 seconds

## Demonstration

We used the `matplotlib` Python library to draw some trajectories to imitate.


