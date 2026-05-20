# RL Prescribed Performance · Fault-Tolerant Control

```{raw} html
<section class="proj-detail-hero">
<div class="proj-detail-lede">
<p class="proj-attribution">
<span class="proj-attribution__tag">UNDER REVIEW · IEEE TCYBE</span>
<span class="proj-attribution__to">co-author with <strong>G. Narayanan</strong> et al. · KNU</span>
</p>
<h2 class="resume-name"><span class="resume-name__first">RL</span> <span class="resume-name__last">Prescribed Performance · FTC</span></h2>
<p class="exp-hero-sub" style="margin-bottom: 1.4rem;">
A reinforcement-learning-based <strong>neuro-optimal control</strong> scheme for robot
manipulators under <strong>composite actuator faults</strong>. Guarantees prescribed,
predefined-time tracking via a filtered performance function and an
actor–critic–identifier framework — robust to total/partial loss of effectiveness
and abrupt joint faults.
</p>
<div class="proj-detail-meta">
<span class="pub-status pub-status--review">IEEE TCYBE · UNDER REVIEW</span>
<span class="pub-status pub-status--poster" style="background: rgba(124,58,237,0.10); color:#c084fc; border-color: rgba(124,58,237,0.35);">RL + CONTROL</span>
<span class="pub-status pub-status--published" style="background: rgba(34,197,94,0.10); color:#4ade80; border-color: rgba(34,197,94,0.35);">FAULT TOLERANT</span>
</div>
<div class="proj-detail-actions">
<a href="../../../_static/papers/TCYBE_RL_PPC_FTC.pdf" target="_blank" rel="noopener" class="live-badge resume-cta resume-cta--primary"><span>↗</span> READ PAPER</a>
<a href="mailto:sainavaneet76@gmail.com" class="live-badge resume-cta"><span>✉</span> GET IN TOUCH</a>
</div>
<div class="proj-detail-tags">
<span class="tech-marquee__chip">Reinforcement Learning</span>
<span class="tech-marquee__chip">Neuro-Optimal Control</span>
<span class="tech-marquee__chip">Fault Tolerance</span>
<span class="tech-marquee__chip">Prescribed Performance Function</span>
<span class="tech-marquee__chip">Predefined-Time Tracking</span>
<span class="tech-marquee__chip">Hamilton–Jacobi–Bellman</span>
<span class="tech-marquee__chip">Actor–Critic–Identifier</span>
<span class="tech-marquee__chip">2-Link Manipulator</span>
</div>
</div>
</section>
```

## TL;DR

Robotic manipulators in long-term, high-precision operation are vulnerable to **actuator faults** — total loss of effectiveness (TLOE) and partial loss of effectiveness (PLOE). This paper develops an RL-based **prescribed-performance neuro-optimal fault-tolerant controller** that:

- **Guarantees predefined-time tracking** independent of initial conditions
- **Compensates** abrupt joint dynamics shifts via a robust mechanism
- **Minimizes** Hamilton–Jacobi–Bellman objectives using an actor–critic–identifier RL framework
- **Validated** on a 2-link manipulator under comprehensive comparative studies

## Problem

Robotic manipulators under unknown nonlinear dynamics, time-varying disturbances, and joint-level actuator/system faults face three combined challenges:

- **Reliability** — long-term operation degrades actuator behavior
- **Robustness** — PLOE and TLOE silently erode tracking
- **Precision** — high-precision tasks have no slack for fault-induced errors

Most existing fault-tolerant control (FTC) schemes either depend on initial-value-dependent settling times or lack explicit uncertainty handling for composite faults.

## Key Contributions

1. **Composite-fault model** — the control law explicitly considers actuator **TLOE + PLOE** and compensates for abrupt joint dynamics shifts.

2. **PPF with a filtered variable** — a prescribed performance function with an additional filtered variable enables **predefined-time tracking**. An error transformation converts the constrained tracking problem into an unconstrained one. Unlike prior work, **both the PPF initial condition and transformation parameter are independent of the initial tracking error**.

3. **Reliable control mechanism** — reduces actuator-fault impact while compensating for neural-network approximation errors. HJB-associated objective functions are minimized through an RL-based **identifier–critic–actor** framework.

4. **Empirical validation** — simulations on an actual two-link manipulator model demonstrate the superiority of the proposed strategy over existing baselines.

## Method

The control scheme combines four key pieces:

- **Neuro-optimal control law** — a neural-network parameterized policy that approximates the optimal value function via HJB optimization.
- **Prescribed Performance Function (PPF)** — bounds tracking error inside user-defined envelopes throughout the entire trajectory.
- **Filtered variable** — decouples the PPF design from the initial tracking error, enabling true predefined-time settling.
- **Actor–Critic–Identifier (ACI) RL** — three NNs trained jointly: an **actor** producing the control action, a **critic** estimating value-function residuals, and an **identifier** learning the unknown system dynamics + faults online.

## Results

Validated on a 2-link manipulator under multiple fault scenarios:

- **Normal operation** — matches/beats baselines while learning the dynamics online
- **PLOE faults** — maintains tracking within prescribed bounds
- **TLOE faults** — recovers gracefully, no catastrophic drift
- **Composite fault sequences** — robust to transitions between fault modes

## My Contribution

Co-author with **G. Narayanan**, Sangtae Ahn, and Sangmoon Lee at the School of Electronic & Electrical Engineering, **Kyungpook National University**. I contributed to the RL-FTC architecture design, simulation infrastructure on the 2-link manipulator model, comparative study setup, and result analysis across normal / PLOE / TLOE / composite-fault scenarios.

```{raw} html
<aside class="oss-callout" style="border-left-color:#fbbf24; background:rgba(245,158,11,0.05); border-color:rgba(245,158,11,0.28);">
<div class="oss-callout__head"><span class="hero-graph-tag" style="color:#fbbf24;">// STATUS</span></div>
<p>
<strong>Submitted to IEEE Transactions on Cybernetics</strong> · pending review.
The <a href="../../../_static/papers/TCYBE_RL_PPC_FTC.pdf" target="_blank" rel="noopener">full manuscript PDF</a>
is available above — get in touch if you have questions or want to discuss applications to
fault-tolerant robot control.
</p>
</aside>
```
