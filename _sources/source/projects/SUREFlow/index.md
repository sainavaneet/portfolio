# SUREFlow

```{raw} html
<section class="proj-detail-hero">
<div class="proj-detail-lede">
<p class="proj-attribution">
<span class="proj-attribution__tag">PUBLISHED · IROS 2026</span>
<span class="proj-attribution__to">co-author with <a href="https://github.com/tanvirnwu" target="_blank" rel="noopener">Md Tanvir Islam</a> et al. · KNU</span>
</p>
<h2 class="resume-name"><span class="resume-name__first">SURE</span><span class="resume-name__last">Flow</span></h2>
<p class="exp-hero-sub" style="margin-bottom: 1.4rem;">
State-space <strong>Uncertainty-aware REsidual Flow Matching</strong> for robust robot manipulation.
A Mamba-backbone VLA policy that predicts both action velocities <em>and</em>
input-dependent uncertainty — selectively refining unreliable action dimensions
during inference without environment feedback.
</p>
<div class="proj-detail-meta">
<span class="pub-status pub-status--published">IROS ’26 · PUBLISHED</span>
<span class="pub-status pub-status--poster" style="background: rgba(124,58,237,0.10); color:#c084fc; border-color: rgba(124,58,237,0.35);">FLOW MATCHING</span>
<span class="pub-status pub-status--published" style="background: rgba(34,197,94,0.10); color:#4ade80; border-color: rgba(34,197,94,0.35);">MAMBA · VLA</span>
</div>
<div class="proj-detail-actions">
<a href="https://arxiv.org/abs/2607.10504" target="_blank" rel="noopener" class="live-badge resume-cta resume-cta--primary"><span>↗</span> READ ON arXiv</a>
<a href="mailto:sainavaneet76@gmail.com" class="live-badge resume-cta"><span>✉</span> GET IN TOUCH</a>
</div>
<div class="proj-detail-tags">
<span class="tech-marquee__chip">Flow Matching</span>
<span class="tech-marquee__chip">Mamba SSM</span>
<span class="tech-marquee__chip">VLA</span>
<span class="tech-marquee__chip">Uncertainty Estimation</span>
<span class="tech-marquee__chip">LIBERO</span>
<span class="tech-marquee__chip">LIBERO-PRO</span>
<span class="tech-marquee__chip">PyTorch</span>
<span class="tech-marquee__chip">Franka Panda</span>
</div>
</div>
<div class="proj-detail-sidekick">
<img src="../../../_static/images/SUREFlow/architecture.jpg" alt="SUREFlow architecture diagram" loading="lazy" />
</div>
</section>
```

## TL;DR

SUREFlow is a generative robot-manipulation policy that closes the gap between **diffusion/flow** action models and **reliable execution** during long rollouts.

- **92.6 %** average success rate on **LIBERO** — outperforms the Mamba-based MaIL baseline by **+34.3 %**.
- **~50 %** success rate on **LIBERO-PRO** with only **179 M parameters** — comparable to 3–7 B VLAs.
- Built on a **Mamba** backbone (state-space sequence modeling, linear-time inference).
- Adds **input-dependent uncertainty** + **residual refinement** without environment feedback.

## What Problem It Solves

Generative VLA policies (diffusion / flow matching) advanced robot manipulation, but they often **wobble under noise**, partial observability, and stochastic initial conditions. Tiny velocity errors **accumulate over long rollouts**, eroding success rates.

Existing diffusion- and flow-based policies typically assume **homoscedastic residuals** — they ignore that some action dimensions are inherently harder to predict than others. The result: brittle one-shot predictions, error accumulation, and unreliable extended-horizon control.

## How It Works

```{raw} html
<figure>
<img src="../../../_static/images/SUREFlow/overview.jpg" alt="SUREFlow overview · closed-loop residual refinement" loading="lazy"/>
<figcaption>Closed-loop refinement of uncertain action dimensions via internal residual updates during inference, without external feedback. Right: LIBERO results vs SOTA baselines.</figcaption>
</figure>
```

SUREFlow combines three ideas into one lightweight policy:

1. **Conditional flow matching** — learns a velocity field that transports Gaussian noise toward expert action distributions, conditioned on multi-view RGB observations, robot proprioception, and language task embeddings.

2. **Uncertainty-aware Residual Flow (URFlow)** — an auxiliary head predicts input-dependent variance over the velocity field. During inference, this signal **selectively re-refines** only the unreliable action dimensions through internal residual updates — no environment feedback or planner required.

3. **Memory-Guided Action Decoder (MGAD)** — re-attends learnable action queries to multimodal memory representations, improving temporal conditioning and structured action generation.

All three modules live on top of a single **Mamba** state-space backbone — linear-time, scalable, and far lighter than transformer-based 3–7 B VLAs.

## Results

```{raw} html
<div class="sf-results-grid">
<div class="sf-stat">
<span class="sf-stat__num">92.6%</span>
<span class="sf-stat__lbl">LIBERO · avg success rate</span>
</div>
<div class="sf-stat">
<span class="sf-stat__num">+34.3%</span>
<span class="sf-stat__lbl">vs Mamba MaIL baseline</span>
</div>
<div class="sf-stat">
<span class="sf-stat__num">179M</span>
<span class="sf-stat__lbl">parameters · lightweight</span>
</div>
<div class="sf-stat">
<span class="sf-stat__num">~50%</span>
<span class="sf-stat__lbl">LIBERO-PRO · matches 3-7B VLAs</span>
</div>
</div>
```

## Why It's Interesting

- **No environment feedback needed at inference.** Refinement happens entirely inside the policy using its own uncertainty signal — practical for real robots where feedback loops are expensive.
- **State-space backbone instead of giant transformers.** SUREFlow gets foundation-model-level performance at a tiny fraction of the parameter count.
- **Probabilistic regularization preserves the flow-matching objective.** Adds robustness without breaking the underlying generative formulation.

## My Contribution

Co-author with **Md Tanvir Islam**, Sangmoon Lee, and Sangtae Ahn at **Kyungpook National University**. I contributed to the flow-matching policy architecture, the Mamba-backbone integration, evaluation pipeline on LIBERO / LIBERO-PRO, and the ablations that quantify the impact of URFlow and MGAD.

```{raw} html
<aside class="oss-callout" style="border-left-color:#fbbf24; background:rgba(245,158,11,0.05); border-color:rgba(245,158,11,0.28);">
<div class="oss-callout__head"><span class="hero-graph-tag" style="color:#fbbf24;">// STATUS</span></div>
<p>
<strong>Published on arXiv</strong> (IROS 2026). Read the
<a href="https://arxiv.org/abs/2607.10504" target="_blank" rel="noopener">full paper on arXiv</a>
— reach out if you have questions or want to discuss applications.
</p>
</aside>
```
