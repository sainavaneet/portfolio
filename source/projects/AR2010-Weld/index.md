# Weld Automation using Yaskawa Robots

```{raw} html
<section class="proj-detail-hero">
<div class="proj-detail-lede">
<p class="proj-attribution">
<span class="proj-attribution__tag">INDUSTRY · AIROBOTICS</span>
<span class="proj-attribution__to">Yaskawa AR2010 arc welding · Hwashin body-in-white line</span>
</p>
<p class="exp-hero-sub" style="margin-bottom: 1.4rem;">
Automatic <strong>arc-welding motion generation</strong> for car-body sub-assemblies. Two
<strong>Yaskawa Motoman AR2010</strong> welding robots lay weld beads along the seams of a
stamped part clamped in a fixture jig — the torch trajectory, orientation, and approach
are <strong>generated from the part geometry</strong>, not hand-taught, targeting
<strong>≤ 0.1 mm</strong> seam accuracy and deployment on a real Yaskawa
<strong>YRC1000</strong> controller.
</p>
<div class="proj-detail-meta">
<span class="pub-status pub-status--published" style="background: rgba(34,197,94,0.12); color:#4ade80; border-color: rgba(34,197,94,0.4);">MOTOMAN AR2010</span>
<span class="pub-status pub-status--published" style="background: rgba(245,158,11,0.10); color:#fbbf24; border-color: rgba(245,158,11,0.35);">≤ 0.1 mm</span>
<span class="pub-status pub-status--published" style="background: rgba(124,58,237,0.10); color:#c084fc; border-color: rgba(124,58,237,0.35);">SIM → REAL</span>
<span class="pub-status pub-status--published" style="background: rgba(6,182,212,0.10); color:#67e8f9; border-color: rgba(6,182,212,0.35);">YRC1000</span>
</div>
<div class="proj-detail-tags">
<span class="tech-marquee__chip">Arc Welding</span>
<span class="tech-marquee__chip">Weld Seam Extraction</span>
<span class="tech-marquee__chip">Trajectory Generation</span>
<span class="tech-marquee__chip">Torch Orientation</span>
<span class="tech-marquee__chip">IK (ikpy)</span>
<span class="tech-marquee__chip">MuJoCo</span>
<span class="tech-marquee__chip">Isaac Sim</span>
<span class="tech-marquee__chip">Yaskawa YRC1000</span>
<span class="tech-marquee__chip">Sim-to-Real</span>
</div>
</div>
<div class="proj-detail-sidekick">
<img src="../../../_static/images/AR2010-Weld/featured.jpg" alt="Two Yaskawa AR2010 robots welding a car-body sub-assembly held in a fixture jig" />
</div>
</section>
```

```{raw} html
<figure style="margin:1.6rem 0;">
  <video controls autoplay loop muted playsinline preload="metadata" width="100%" style="border-radius:8px;background:#000;">
    <source src="../../../_static/videos/AR2010-Weld/pipeline.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Full cell — two AR2010 welding robots (left + right) welding a sub-assembly held in the fixture jig, running generated trajectories.</figcaption>
</figure>
```

## The main objective

On a car body-in-white line, a stamped metal sub-assembly is clamped into a **fixture
jig** and two robots weld along the **seams** — the thin lines where the pressed parts
meet. Today those weld paths are programmed by hand: an operator jogs each robot with a
teach pendant, point by point, for every part variant. That is slow, hard to reproduce,
and doesn't scale to many body types.

**The objective of this project is to make that welding automatic.** Given the part's
geometry, the system should:

1. **Find the welds** — extract the weld seam lines directly from the part's CAD / 3D
   scan (no manual point-teaching).
2. **Generate the motion** — compute, for each robot, a collision-free trajectory whose
   torch tip traces the seam with the correct **torch orientation** and safe
   **approach / retract** paths, to within **0.1 mm** of the seam.
3. **Execute it** — validate the trajectory in simulation, then stream it to the real
   **Yaskawa YRC1000** controller driving the physical AR2010 robots.

Two robots share the part, one working each side, so their motions are planned together
and must never collide. The videos below are the **simulation validation** stage: the two
AR2010 robots executing generated weld trajectories along the seams of a real Hwashin
sub-assembly held in its jig.

## Seam welding — left & right robots

Each robot follows its side's seams (authored as "spotlines"). Below are the on-torch
camera views for two representative seams, left and right robot.

### Seam 1

```{raw} html
<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin:1.4rem 0;">
  <figure style="margin:0;">
    <video controls autoplay loop muted playsinline preload="metadata" width="100%" style="border-radius:8px;background:#000;">
      <source src="../../../_static/videos/AR2010-Weld/l_1_cam.mp4" type="video/mp4">
    </video>
    <figcaption>Left robot — seam 1, torch tracking the seam.</figcaption>
  </figure>
  <figure style="margin:0;">
    <video controls autoplay loop muted playsinline preload="metadata" width="100%" style="border-radius:8px;background:#000;">
      <source src="../../../_static/videos/AR2010-Weld/r_1_cam.mp4" type="video/mp4">
    </video>
    <figcaption>Right robot — seam 1, torch tracking the seam.</figcaption>
  </figure>
</div>
```

### Seam 5

```{raw} html
<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin:1.4rem 0;">
  <figure style="margin:0;">
    <video controls autoplay loop muted playsinline preload="metadata" width="100%" style="border-radius:8px;background:#000;">
      <source src="../../../_static/videos/AR2010-Weld/l_5_cam.mp4" type="video/mp4">
    </video>
    <figcaption>Left robot — seam 5, torch tracking the seam.</figcaption>
  </figure>
  <figure style="margin:0;">
    <video controls autoplay loop muted playsinline preload="metadata" width="100%" style="border-radius:8px;background:#000;">
      <source src="../../../_static/videos/AR2010-Weld/r_5_cam.mp4" type="video/mp4">
    </video>
    <figcaption>Right robot — seam 5, torch tracking the seam.</figcaption>
  </figure>
</div>
```

## How the motion is generated

The planning problem is stated precisely: over a weld executed on the interval
`t ∈ [0, T]`, define the **point-to-seam error** `e(t)` as the distance from the torch
tip to the closest point on the seam curve `S(u)`. The planner chooses the joint
trajectory `q(t)` that **minimises the peak error** subject to the physical constraints
(joint limits, reachability, collision avoidance, steady weld speed). Acceptance:
`max e(t) ≤ 0.1 mm` on every seam and every robot.

The generation pipeline I built:

- **Waypoint generation** — convert the extracted seam curve into an ordered sequence of
  robot waypoints (Cartesian, then joint).
- **Torch orientation** — compute the torch angle / work-and-travel orientation at each
  waypoint from the local seam geometry.
- **Approach / retract** — plan safe lead-in and lead-out paths to and from each weld
  start/end, avoiding the part and jig clamps.
- **IK** — a clean solver wrapper (`ikpy` on the AR2010 URDF, chain ending at the
  welding-wire **TCP**) turns each tool pose into a 6-joint solution, seeded by the
  previous waypoint for smooth, branch-stable motion.

## Robot model — sim matched to the real cell one-to-one

Before trusting a generated trajectory, the simulated AR2010 has to behave exactly like
the real one:

- **Weld torch integrated** — the arc-welding torch geometry was added as the AR2010
  end-effector (visual + collision meshes, URDF / MJCF), and a **TCP** site injected at
  the wire tip so trajectories target the torch tip, not the flange.
- **Sim ↔ real calibrated** — home pose (`qpos = 0`) reproduces the YRC1000 `RPOSC`
  reading, and per-axis pendant jogs produce the same posture in sim once pulses are
  converted with the calibrated pulses-per-radian table. Verified joint-by-joint against
  the real controller.
- **Dual runtime** — the robot runs in both **MuJoCo** (fast trajectory testing) and
  **NVIDIA Isaac Sim** (photoreal validation, the renders above).
- **Real hardware** — host control of the physical AR2010 over the **YRC1000** (read
  `RSTATS` / `RPOSJ` / `RPOSC`, stream trajectories), with verified reusable weld poses
  saved for replay.

## Real-world experiment — driving the physical robot

The generated trajectories don't just run in simulation — they drive the **real Yaskawa
AR2010** on a **YRC1000** controller. These two videos walk through the real-world
experiment: how a Yaskawa **JOB** works, how commands are sent from the PC to the robot,
and how the same trajectory is kept in lock-step between **MuJoCo** and the physical cell.

```{raw} html
<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin:1.4rem 0;">
  <div>
    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      <iframe style="position:absolute; top:0; left:0; width:100%; height:100%;" src="https://www.youtube.com/embed/WMfwH_9PyxI?autoplay=1&mute=1&controls=0&loop=1&playlist=WMfwH_9PyxI&modestbranding=1&playsinline=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <p style="text-align:center; margin-top:0.8rem; font-style:italic;">Real-world experiment (1) — the Yaskawa JOB and how commands reach the robot.</p>
  </div>
  <div>
    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      <iframe style="position:absolute; top:0; left:0; width:100%; height:100%;" src="https://www.youtube.com/embed/JueVSYPXunQ?autoplay=1&mute=1&controls=0&loop=1&playlist=JueVSYPXunQ&modestbranding=1&playsinline=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <p style="text-align:center; margin-top:0.8rem; font-style:italic;">Real-world experiment (2) — the robot mirroring MuJoCo, command + encoder-feedback loop.</p>
  </div>
</div>
```

### How a Yaskawa JOB works, and how we send commands

A Yaskawa robot normally runs a **JOB** — an INFORM program stored on the YRC1000 and
started from the teach pendant. Each JOB line is a motion instruction (`MOVJ` for
joint moves, `MOVL` for linear moves) with a taught position, speed, and positioning
level. Traditionally every one of those positions is jogged and taught by hand.

Instead of hand-teaching a JOB per part, we drive the robot from the PC over
**Ethernet host control**. With the pendant switched to **REMOTE** mode, the controller
services host-control requests on **TCP port 80**:

- **Read (safe, no motion):** `RSTATS` (status), `RPOSJ` (joint pulses), `RPOSC`
  (Cartesian pose) — used to capture the home/weld pose and to log the executed path.
- **Motion:** the generated trajectory is streamed as fixed-format host-control command
  packets — `PMOVJ` (joint-pulse targets) or `MOVL` (Cartesian linear) — one waypoint
  at a time.

Each axis has a calibrated **pulses-per-radian** table, so a joint angle in simulation
converts exactly to the encoder pulse count the controller expects (verified round-trip
error < 0.1° per axis). In parallel, the controller streams **encoder feedback** back on
a separate **UDP channel (the "BLUE" feed, port 19450)** — command vs. feedback pulses
per axis — which is what lets the digital twin mirror the real robot's live state.

```{raw} html
<div class="oss-callout">
<div class="oss-callout__head"><span class="hero-graph-tag">// SAFETY</span></div>
<p>
Motion commands (<code>MOVJ</code>, <code>MOVL</code>, <code>PMOVJ</code>) are only ever
sent with the pendant in REMOTE, servos deliberately enabled, and after a slow single-repeat
dry run — never auto-executed. Read commands (<code>RSTATS</code>, <code>RPOSJ</code>,
<code>RPOSC</code>) are motion-free.
</p>
</div>
```

### Communication flow — CAD → MuJoCo → real robot

```{raw} html
<style>
.wf{--acc:#22c55e;--acc2:#4ade80;--acc3:#86efac;background:#071510;border:1px solid rgba(34,197,94,.3);border-radius:14px;padding:24px 20px;margin:1.6rem auto;max-width:720px;display:flex;flex-direction:column;align-items:center;gap:0;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;color:#e2e8f0;overflow:hidden}
.wf__node{position:relative;width:82%;max-width:520px;text-align:center;background:linear-gradient(180deg,rgba(22,45,33,.75),rgba(7,21,16,.75));border:1px solid rgba(34,197,94,.3);border-radius:10px;padding:12px 16px;animation:wf-glow 3.2s ease-in-out infinite}
.wf__node b{display:block;font-size:.98rem;font-weight:600;margin:.15rem 0;color:#f0fdf4}
.wf__k{display:block;font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--acc);font-weight:700}
.wf__d{display:block;font-size:.78rem;color:#a7c4b5;line-height:1.35}
.wf__node--src{border-color:rgba(74,222,128,.5)}.wf__node--src .wf__k{color:var(--acc2)}
.wf__node--pc{border-color:rgba(34,197,94,.55)}
.wf__node--robot{border-color:rgba(134,239,172,.55)}.wf__node--robot .wf__k{color:var(--acc3)}
.wf__node--out{border-color:rgba(34,197,94,.55)}
.wf__link{position:relative;width:2px;height:34px;background:linear-gradient(180deg,rgba(34,197,94,.15),rgba(34,197,94,.65));overflow:visible}
.wf__link::after{content:"";position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid rgba(34,197,94,.75)}
.wf__link i{position:absolute;left:-3px;width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 10px 2px rgba(34,197,94,.85);animation:wf-fall 1.9s linear infinite}
.wf__loop{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;width:100%}
.wf__loop .wf__node{width:auto}
.wf__bus{display:flex;flex-direction:column;gap:16px;min-width:160px}
.wf__wire{position:relative;height:24px;display:flex;align-items:center;justify-content:center}
.wf__wire::before{content:"";position:absolute;left:0;right:0;top:50%;height:2px;background:linear-gradient(90deg,transparent,rgba(34,197,94,.6),transparent)}
.wf__wire--fb::before{background:linear-gradient(90deg,transparent,rgba(134,239,172,.55),transparent)}
.wf__wlabel{position:relative;z-index:1;background:#071510;padding:0 6px;font-size:.62rem;letter-spacing:.03em;color:var(--acc)}
.wf__wire--fb .wf__wlabel{color:var(--acc3)}
.wf__pkt{position:absolute;top:50%;margin-top:-4px;width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 10px 2px rgba(34,197,94,.85)}
.wf__pkt--r{animation:wf-r 1.6s linear infinite}
.wf__wire--fb .wf__pkt{background:var(--acc3);box-shadow:0 0 10px 2px rgba(134,239,172,.85);animation:wf-l 1.6s linear infinite}
@keyframes wf-fall{0%{top:-4px;opacity:0}12%{opacity:1}88%{opacity:1}100%{top:32px;opacity:0}}
@keyframes wf-r{0%{left:4%;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:96%;opacity:0}}
@keyframes wf-l{0%{left:96%;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:4%;opacity:0}}
@keyframes wf-glow{0%,100%{box-shadow:0 0 0 rgba(34,197,94,0)}50%{box-shadow:0 0 16px rgba(34,197,94,.18)}}
.wf__node:nth-child(3){animation-delay:.4s}.wf__node:nth-child(5){animation-delay:.8s}
@media (max-width:640px){.wf__loop{grid-template-columns:1fr;gap:8px}.wf__wire::before{display:none}.wf__bus{flex-direction:row;justify-content:center;gap:10px}}
@media (prefers-reduced-motion:reduce){.wf *{animation:none!important}}
</style>
<div class="wf">
  <div class="wf__node wf__node--src"><span class="wf__k">01 · Input</span><b>Weld path — CAD / 3D scan</b><span class="wf__d">seam curve S(u)</span></div>
  <div class="wf__link"><i></i></div>
  <div class="wf__node"><span class="wf__k">02 · Plan</span><b>Trajectory generator (Python)</b><span class="wf__d">waypoints · torch orientation · IK (ikpy) → trajectory JSON</span></div>
  <div class="wf__link"><i></i></div>
  <div class="wf__node"><span class="wf__k">03 · Validate</span><b>MuJoCo — sim validation</b><span class="wf__d">dry-run · collision &amp; reach · sim ⇄ real matched 1:1</span></div>
  <div class="wf__link"><i></i></div>
  <div class="wf__loop">
    <div class="wf__node wf__node--pc"><span class="wf__k">04 · Host control</span><b>Python host control (PC)</b><span class="wf__d">streams validated trajectory</span></div>
    <div class="wf__bus">
      <div class="wf__wire wf__wire--cmd"><span class="wf__wlabel">command · PMOVJ / MOVL · TCP :80 ▸</span><i class="wf__pkt wf__pkt--r"></i></div>
      <div class="wf__wire wf__wire--fb"><span class="wf__wlabel">◂ BLUE encoder · UDP :19450</span><i class="wf__pkt"></i></div>
    </div>
    <div class="wf__node wf__node--robot"><span class="wf__k">YRC1000 · pendant=REMOTE</span><b>AR2010 — weld</b><span class="wf__d">executes each waypoint</span></div>
  </div>
  <div class="wf__link"><i></i></div>
  <div class="wf__node wf__node--out"><span class="wf__k">05 · Mirror</span><b>Digital twin mirrors the real robot</b><span class="wf__d">20 Hz pose log · RPOSC + RPOSJ</span></div>
</div>
```

## Roadmap

Open-loop cycle first — extract seams → generate trajectory → validate in sim → execute
on the real YRC1000 at the Hwashin testbed — with live 3D-camera seam detection and
closed-loop adjustment as a later phase.

## Tech stack

- **Robots:** dual Yaskawa Motoman AR2010 arc-welding arms on a Yaskawa YRC1000 controller
- **Motion:** weld-seam extraction, waypoint + torch-orientation generation, approach/retract planning, `ikpy` inverse kinematics (welding-wire TCP)
- **Simulation:** MuJoCo (fast) + NVIDIA Isaac Sim (photoreal), USD assets
- **Sim-to-real:** pulses-per-radian calibration, host control over the YRC1000, CSV pose logging
- **Language:** Python
```