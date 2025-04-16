---
title: Hybrid Model Predictive and Iterative Learning Control for Enhanced Leader-Follower Robotic Tracking
date: 2023-12-03

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Tracking with LMPC-ILC'

authors:
  - admin

tags:
  - turtlebot
  - MPC
  - LPV
  - trajectory

links:
  - icon_pack: fab
    icon: github
    name: 👉 Project-Link
    url: 'https://github.com/sainavaneet/MPC-ILC'

---
# Hybrid Model Predictive and Iterative Learning Control for Enhanced Leader-Follower Robotic Tracking

EERC paper

## Abstract
This paper introduces a novel hybrid control strategy combining Model Predictive Control (MPC) and Iterative Learning Control (ILC) to improve leader-follower tracking accuracy and robustness in mobile robots. MPC optimizes control inputs over a predictive horizon by minimizing a cost function, while ILC refines these inputs by learning from past errors.

## Mathematical Formulation

### System Dynamics
The state of the follower robot is:
{{< math >}}$$
x_f = [x_f, y_f, \theta_f]^T
$${{< /math >}}

Control inputs:
{{< math >}}$$
u = [v, \omega]^T$${{< /math >}}

Discrete-time kinematic model:
{{< math >}}$$
x_f(k + 1) = x_f(k) + \begin{bmatrix}
v(k) \cos(\theta_f(k)) T \\
v(k) \sin(\theta_f(k)) T \\
\omega(k) T
\end{bmatrix}
$${{< /math >}}

where {{< math >}}$T${{< /math >}} is the sampling time.

### MPC Cost Function
The MPC minimizes the following cost function over a finite horizon {{< math >}}$N${{< /math >}}:

{{< math >}}$$
J = \sum_{k=0}^{N-1}\left[\omega_p\|P_f(k)-P_d(k)\|^2 + \omega_\theta(\theta_f(k)-\theta_d(k))^2 + \omega_u\|u(k)\|^2\right]
$${{< /math >}}

where
- {{< math >}}$P_f(k) = [x_f(k), y_f(k)]^T${{< /math >}}: position of follower.
- {{< math >}}$P_d(k), \theta_d(k)${{< /math >}}: desired position and orientation.
- {{< math >}}$\omega_p, \omega_\theta, \omega_u${{< /math >}}: weights for position, orientation errors, and control effort.

### Desired Position Calculation
The desired position {{< math >}}$P_d${{< /math >}} is calculated from the leader's state {{< math >}}$x_l = [x_l, y_l, \theta_l]^T${{< /math >}} and specified distance {{< math >}}$d${{< /math >}}:

{{< math >}}$$
P_d = \begin{bmatrix}
x_l - d\cos(\theta_l) \\
y_l - d\sin(\theta_l)
\end{bmatrix}
$${{< /math >}}

### Iterative Learning Control (ILC) Update
Error vector:
{{< math >}}$$
e(k) = \begin{bmatrix}
x_f(k)-x_d(k) \\
y_f(k)-y_d(k) \\
\theta_f(k)-\theta_d(k)
\end{bmatrix}
$${{< /math >}}

ILC control update:
{{< math >}}$$
u_{ILC}(k)=\nu_{MPC}(k)+L[e(k)-e(k-1)]$${{< /math >}}

where
- {{< math >}}$\nu_{MPC}(k)${{< /math >}}: optimal MPC control input.
- {{< math >}}$L${{< /math >}}: learning matrix.
- {{< math >}}$e(k-1)${{< /math >}}: error from previous iteration.

### Hybrid Integration
The hybrid method combines MPC and ILC:
1. Solve MPC optimization: {{< math >}}$\nu_{MPC}=\arg\min J${{< /math >}}
2. ILC update: {{< math >}}$\nu=\nu_{ILC}${{< /math >}}
3. Apply {{< math >}}$\nu${{< /math >}} to follower robot.
4. Update follower and leader states.

## Algorithm
```
Algorithm 1: Hybrid MPC-ILC
Require: Initial states x_f, x_l; past error e_past=0, past input u_past=0
Require: T, N, \omega_p, \omega_\theta, \omega_u, d, L
While true:
  1. Obtain current leader state x_l(k)
  2. Compute desired P_d(k), \theta_d(k)
  3. Solve MPC to get u_MPC
  4. Calculate tracking error e(k)
  5. Update control: u_ILC = u_past + L(e(k)-e_past)
  6. Apply u_ILC to follower
  7. Update u_past = u_MPC, e_past = e(k)
  8. Update robot states
End While
```

## Experimental Results
Experiments with TurtleBot 3 robots validated the hybrid MPC-ILC method, demonstrating significant improvements in position tracking accuracy, orientation accuracy, and balanced control efforts compared to standalone MPC and ILC.

- Leader velocity: {{< math >}}$v=0.3\,m/s, \omega=0.3\,rad/s${{< /math >}}
- MPC parameters: {{< math >}}$N=20, T=0.2\,s, \omega_p=7, \omega_\theta=1, \omega_u=1${{< /math >}}
- ILC learning matrix: {{< math >}}$L=diag([0.1, 0.1])${{< /math >}}

![Comparision of Cost](cost_comparision.png)

![Results](graph.png)

## Conclusion
The hybrid MPC-ILC approach offers improved accuracy, robustness, and efficiency for leader-follower robotic tracking. Future work includes integrating with advanced control methods and testing in more complex scenarios.

---

- [Source Code](https://github.com/sainavaneet/MPC-ILC)

{{<youtube CdYn9fnHEcE>}}

---
## comparison between MPC and LMPC and Obstacle Avoidance


 We included a safe set process to keep the follower robot at a fixed distance from the leader robot, and then we added obstacle avoidance to the follower robot using LMPC.


{{<youtube v308ep-aqd0>}}


### Testing With MPC
- ![Testing with MPC](mpc.png)
### Testing with LMPC

- ![](lmpc.png)
- ![](lmpc1.png)
- ![](lmpc2.png)

## Tested for "S" Trajectory

{{<youtube 6Dyg_3ztMKw>}}

### Results

![comparision combined](comparision/comparision_combined_image.png)

