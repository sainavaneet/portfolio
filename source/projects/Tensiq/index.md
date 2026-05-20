# Tensiq

```{raw} html
<section class="proj-detail-hero tensiq-hero">
<div class="proj-detail-lede">
<p class="proj-attribution">
<span class="proj-attribution__tag" style="color:#fbbf24;background:rgba(245,158,11,0.10);border-color:rgba(245,158,11,0.4);">COMPANY · CURRENT WORK</span>
<span class="proj-attribution__to">at <a href="https://tensiq.com" target="_blank" rel="noopener">Tensiq</a> · Foundation Model Engineer</span>
</p>
<h2 class="tensiq-title">Universal&nbsp;tactile&nbsp;intelligence<br/><span class="resume-name__last">for&nbsp;robotics.</span></h2>
<p class="exp-hero-sub tensiq-lede">
Tensiq turns any tactile sensor into a single, physics-grounded, model-ready data format —
the <strong>“MP4 for touch.”</strong> One pipeline. Any sensor. Standardized output.
Designed for the next generation of dexterous robots and tactile foundation models.
</p>
<div class="proj-detail-meta">
<span class="pub-status pub-status--published" style="background:rgba(34,197,94,0.12); color:#4ade80; border-color:rgba(34,197,94,0.4);">SHIPPING</span>
<span class="pub-status pub-status--review" style="background:rgba(251,191,36,0.10); color:#fbbf24; border-color:rgba(251,191,36,0.35);">PRODUCTION</span>
<span class="pub-status" style="background:rgba(6,182,212,0.10); color:#67e8f9; border-color:rgba(6,182,212,0.35); font-family:'JetBrains Mono',monospace; font-size:0.66rem; font-weight:600; letter-spacing:0.14em; padding:2px 7px; border-radius:3px; border:1px solid;">TACTILE AI</span>
</div>
<div class="proj-detail-actions">
<a href="https://tensiq.com" target="_blank" rel="noopener" class="live-badge resume-cta resume-cta--primary"><span>◆</span> VISIT TENSIQ</a>
<a href="mailto:sainavaneet76@gmail.com" class="live-badge resume-cta"><span>✉</span> GET IN TOUCH</a>
</div>
</div>
<div class="tensiq-hero-art" aria-hidden="true">
<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="tsq-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#4ade80" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#22c55e" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tsq-ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>
  <!-- soft glow -->
  <circle cx="140" cy="140" r="110" fill="url(#tsq-core)"/>
  <!-- thin rings -->
  <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(34,197,94,0.18)" stroke-width="1"/>
  <circle cx="140" cy="140" r="95"  fill="none" stroke="rgba(34,197,94,0.3)"  stroke-width="1" stroke-dasharray="3 5">
    <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="360 140 140" dur="40s" repeatCount="indefinite"/>
  </circle>
  <circle cx="140" cy="140" r="70"  fill="none" stroke="rgba(34,197,94,0.18)" stroke-width="1"/>
  <!-- center mark "TT" -->
  <circle cx="140" cy="140" r="44" fill="rgba(4,8,6,0.85)" stroke="url(#tsq-ring)" stroke-width="1.4"/>
  <text x="140" y="135" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="18" font-weight="700" fill="#fbbf24">TT</text>
  <text x="140" y="156" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="2" fill="rgba(220,255,220,0.6)">TENSIQ · TENSOR</text>
  <!-- orbiting dot -->
  <circle r="3" fill="#fbbf24">
    <animateMotion dur="12s" repeatCount="indefinite">
      <mpath xlink:href="#tsq-orbit-path"/>
    </animateMotion>
  </circle>
  <path id="tsq-orbit-path" d="M 260 140 A 120 120 0 1 1 259.99 140" fill="none" stroke="none"/>
  <!-- pulsing satellite dots -->
  <circle cx="140" cy="20"  r="3" fill="#4ade80"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite"/></circle>
  <circle cx="260" cy="140" r="3" fill="#fbbf24"><animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin="0.6s" repeatCount="indefinite"/></circle>
  <circle cx="140" cy="260" r="3" fill="#4ade80"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" begin="1.2s" repeatCount="indefinite"/></circle>
  <circle cx="20"  cy="140" r="3" fill="#fbbf24"><animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin="1.8s" repeatCount="indefinite"/></circle>
</svg>
</div>
</section>
```

## What Tensiq Does

Tactile sensors come in dozens of incompatible flavors — vision-based gels, piezoresistive arrays, multi-zone hands, custom research rigs. Every format has its own quirks, every algorithm needs its own integration, and almost none of the data ends up usable for modern foundation-model training.

**Tensiq solves that.** A single, sensor-agnostic pipeline turns raw tactile capture into a standardized tensor format with full physics grounding, quality auditing, and provenance — usable by real-time controllers, IL/RL pipelines, and tactile foundation models alike.

```{raw} html
<section class="tensiq-pillars">
<div class="tensiq-pillar">
<span class="tensiq-pillar__icon">◆</span>
<h4>Sensor-agnostic</h4>
<p>One pipeline, many sensors. Vision-gel, piezoresistive, multi-zone — all converge to the same standardized output.</p>
</div>
<div class="tensiq-pillar">
<span class="tensiq-pillar__icon">⟁</span>
<h4>Physics-grounded</h4>
<p>Constitutive models compute real physical quantities — force, torque, contact state, slip — not just raw signal.</p>
</div>
<div class="tensiq-pillar">
<span class="tensiq-pillar__icon">∎</span>
<h4>Model-ready</h4>
<p>Output is pre-tokenized for transformers and diffusion policies. Plug into PyTorch in one line.</p>
</div>
<div class="tensiq-pillar">
<span class="tensiq-pillar__icon">✓</span>
<h4>Auditable</h4>
<p>Every frame carries provenance — calibration, transforms, quality flags. Full reproducibility for research &amp; deployment.</p>
</div>
</section>
```

## How It Works

A four-stage pipeline takes any vendor-specific tactile capture and emits a standardized **Tensiq Tensor (TT)** — ready for control loops, ML training, or long-horizon foundation models.

```{raw} html
<section class="tensiq-flow">
<svg viewBox="0 0 1180 460" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Tensiq pipeline flow diagram">

  <defs>
    <linearGradient id="tf-edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#22c55e" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="tf-edge-down" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#fbbf24" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#67e8f9" stop-opacity="0.7"/>
    </linearGradient>
    <pattern id="tf-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(34,197,94,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="0" y="0" width="1180" height="460" fill="url(#tf-grid)"/>

  <!-- Stage labels strip top -->
  <g font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="2" fill="rgba(74,222,128,0.7)">
    <text x="120"  y="22">// INGEST</text>
    <text x="360"  y="22">// ADAPT</text>
    <text x="600"  y="22">// COMPUTE</text>
    <text x="840"  y="22">// EMIT</text>
    <text x="1060" y="22">// CONSUME</text>
  </g>

  <!-- SENSOR sources (left column) -->
  <g class="tf-src">
    <rect x="40"  y="60"  width="160" height="44" rx="6" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.35)" stroke-width="1"/>
    <text x="120" y="82"  text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="#ffffff">VISION-GEL</text>
    <text x="120" y="96"  text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">video · timestamps</text>

    <rect x="40"  y="130" width="160" height="44" rx="6" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.35)" stroke-width="1"/>
    <text x="120" y="152" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="#ffffff">PIEZORESISTIVE</text>
    <text x="120" y="166" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">taxel array</text>

    <rect x="40"  y="200" width="160" height="44" rx="6" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.35)" stroke-width="1"/>
    <text x="120" y="222" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="#ffffff">MULTI-ZONE HAND</text>
    <text x="120" y="236" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">N contact regions</text>

    <rect x="40"  y="270" width="160" height="44" rx="6" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.35)" stroke-width="1" stroke-dasharray="3 4"/>
    <text x="120" y="292" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="rgba(220,255,220,0.7)">CUSTOM RIG</text>
    <text x="120" y="306" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.45)">via plugin SDK</text>
  </g>

  <!-- Edges sensor → adapter (4 lines) -->
  <g stroke="url(#tf-edge)" stroke-width="1.4" fill="none">
    <path id="tf-e1" d="M200 82  C 260 82, 280 192, 320 192"/>
    <path id="tf-e2" d="M200 152 C 260 152, 280 192, 320 192"/>
    <path id="tf-e3" d="M200 222 C 260 222, 280 192, 320 192"/>
    <path id="tf-e4" d="M200 292 C 260 292, 280 192, 320 192" stroke-dasharray="3 4"/>
  </g>

  <!-- Stage 1: Adapter -->
  <g>
    <rect x="320" y="150" width="180" height="84" rx="8" fill="rgba(4,10,6,0.85)" stroke="#22c55e" stroke-width="1.4"/>
    <text x="410" y="174" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="#4ade80">1 · ADAPTER</text>
    <text x="410" y="196" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.7)">canonical feature space</text>
    <text x="410" y="212" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.45)">sensor → unified format</text>
    <text x="410" y="226" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.45)">timing align · normalize</text>
  </g>

  <!-- Edge adapter → physics -->
  <path stroke="url(#tf-edge)" stroke-width="1.4" fill="none" id="tf-e5" d="M500 192 L 600 192"/>

  <!-- Stage 2: Physics Kernel -->
  <g>
    <rect x="600" y="130" width="180" height="124" rx="8" fill="rgba(4,10,6,0.85)" stroke="#fbbf24" stroke-width="1.4"/>
    <text x="690" y="154" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="#fbbf24">2 · PHYSICS</text>
    <text x="690" y="174" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.7)">constitutive models</text>
    <text x="610" y="196" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.6)">• force / torque</text>
    <text x="610" y="210" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.6)">• contact / slip</text>
    <text x="610" y="224" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.6)">• sensor health</text>
    <text x="610" y="238" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.6)">• uncertainty</text>
  </g>

  <!-- Edge physics → emit -->
  <path stroke="url(#tf-edge)" stroke-width="1.4" fill="none" id="tf-e6" d="M780 192 L 880 192"/>

  <!-- Stage 3: Emit -->
  <g>
    <rect x="880" y="150" width="180" height="84" rx="8" fill="rgba(4,10,6,0.85)" stroke="#67e8f9" stroke-width="1.4"/>
    <text x="970" y="174" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="#67e8f9">3 · TT EMIT</text>
    <text x="970" y="196" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.7)">Tensiq Tensor + manifest</text>
    <text x="970" y="212" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.45)">provenance · quality log</text>
    <text x="970" y="226" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.45)">audit-grade output</text>
  </g>

  <!-- Edges emit → 2 consumers (split right) -->
  <g stroke="url(#tf-edge-down)" stroke-width="1.4" fill="none">
    <path id="tf-e7" d="M1060 174 C 1100 174, 1100 90, 1140 90"/>
    <path id="tf-e8" d="M1060 210 C 1100 210, 1100 320, 1140 320"/>
  </g>

  <!-- Consumer 1: Robot control -->
  <g>
    <rect x="990" y="56" width="170" height="64" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.4)" stroke-width="1"/>
    <text x="1075" y="80" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="#ffffff">ROBOT CONTROL</text>
    <text x="1075" y="96" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">real-time loop · grasping</text>
    <text x="1075" y="110" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">force / slip feedback</text>
  </g>

  <!-- Consumer 2: ML training -->
  <g>
    <rect x="990" y="288" width="170" height="64" rx="6" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.4)" stroke-width="1"/>
    <text x="1075" y="312" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="#ffffff">ML &amp; FOUNDATION</text>
    <text x="1075" y="328" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">IL · RL · diffusion</text>
    <text x="1075" y="342" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9"  fill="rgba(220,255,220,0.55)">tactile transformers</text>
  </g>

  <!-- Travelling dots along edges -->
  <g fill="#fbbf24">
    <circle r="3"><animateMotion dur="3.6s" repeatCount="indefinite" begin="0s"><mpath xlink:href="#tf-e1"/></animateMotion></circle>
    <circle r="3"><animateMotion dur="3.6s" repeatCount="indefinite" begin="0.6s"><mpath xlink:href="#tf-e2"/></animateMotion></circle>
    <circle r="3"><animateMotion dur="3.6s" repeatCount="indefinite" begin="1.2s"><mpath xlink:href="#tf-e3"/></animateMotion></circle>
    <circle r="3"><animateMotion dur="3.6s" repeatCount="indefinite" begin="1.8s"><mpath xlink:href="#tf-e4"/></animateMotion></circle>
    <circle r="3"><animateMotion dur="2.4s" repeatCount="indefinite" begin="0.4s"><mpath xlink:href="#tf-e5"/></animateMotion></circle>
    <circle r="3"><animateMotion dur="2.4s" repeatCount="indefinite" begin="1.4s"><mpath xlink:href="#tf-e6"/></animateMotion></circle>
    <circle r="3" fill="#67e8f9"><animateMotion dur="2.6s" repeatCount="indefinite" begin="0.6s"><mpath xlink:href="#tf-e7"/></animateMotion></circle>
    <circle r="3" fill="#67e8f9"><animateMotion dur="2.6s" repeatCount="indefinite" begin="1.8s"><mpath xlink:href="#tf-e8"/></animateMotion></circle>
  </g>

  <!-- Footer · "Tensiq Tensor" key callout -->
  <g font-family="JetBrains Mono, monospace" font-size="10" fill="rgba(220,255,220,0.5)">
    <line x1="40" y1="400" x2="1140" y2="400" stroke="rgba(34,197,94,0.18)" stroke-width="1"/>
    <text x="40"  y="425">→ TT  ·  tensor + manifest + quality.ndjson  ·  reproducible across sensors and sessions</text>
    <text x="40"  y="442" fill="rgba(220,255,220,0.32)">  drop-in for PyTorch dataloaders, ROS bridges, and policy training stacks</text>
  </g>
</svg>
</section>
```

## Capability Matrix

```{raw} html
<div class="tensiq-matrix">
<table>
<thead>
<tr><th></th><th>Vision-gel</th><th>Piezoresistive</th><th>Multi-zone hand</th><th>Custom rig</th></tr>
</thead>
<tbody>
<tr><th>Ingest</th><td>✓</td><td>✓</td><td>✓</td><td><span class="tensiq-cell-sub">via plugin SDK</span></td></tr>
<tr><th>Physics output</th><td>F / T / contact</td><td>F / contact / drift</td><td>per-region F / contact</td><td>configurable</td></tr>
<tr><th>Slip detection</th><td>✓</td><td>✓</td><td>per-region</td><td>configurable</td></tr>
<tr><th>Quality audit</th><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><th>ML tokenization</th><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
</tbody>
</table>
</div>
```

## Why It Matters

```{raw} html
<div class="tensiq-why">
<div class="tensiq-why__card">
<span class="tensiq-why__num">01</span>
<h4>One format, every sensor</h4>
<p>No more rewriting downstream code for each new sensor vendor. The same controller, the same model, the same loader works across the catalog.</p>
</div>
<div class="tensiq-why__card">
<span class="tensiq-why__num">02</span>
<h4>Physics, not pixels</h4>
<p>Raw signal is great for research but ambiguous for control. Tensiq emits real forces, real torques, real contact — what robots actually need to act on.</p>
</div>
<div class="tensiq-why__card">
<span class="tensiq-why__num">03</span>
<h4>Audit-grade by default</h4>
<p>Every frame carries provenance. Calibration, transforms, hashes, quality flags. Pass regulatory review, reproduce a paper, deploy with confidence.</p>
</div>
<div class="tensiq-why__card">
<span class="tensiq-why__num">04</span>
<h4>Built for foundation models</h4>
<p>The output is pre-tokenized for transformers and diffusion policies. The tactile equivalent of what ImageNet was for vision — a substrate for the next generation of dexterous AI.</p>
</div>
</div>
```

## My Role

I build the **Tensiq tokenizer** — the component that turns raw tactile-sensor frames into the discrete **Tensiq Tensor (TT)** sequences that feed multimodal foundation models. I also own the **TENSIQ CLI** end-to-end — pipeline execution, dataset tokenization, and cross-platform distribution — and lead the integration of tactile data into foundation models.
