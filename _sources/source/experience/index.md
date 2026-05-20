# Experience

```{raw} html
<section class="exp-hero">
  <span class="hero-graph-tag">// EXPERIENCE · timeline</span>
  <h2 class="exp-hero-title">Career &amp; <span class="resume-name__last">Education Graph</span></h2>
  <p class="exp-hero-sub">A chronological view of roles, research, and degrees from 2019 to today.</p>
</section>

<section class="exp-gantt-wrap">
  <svg class="exp-gantt" viewBox="0 0 1100 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Career and education timeline 2019 to 2026">
    <defs>
      <pattern id="exp-grid" x="240" y="20" width="105" height="40" patternUnits="userSpaceOnUse">
        <path d="M 105 0 L 0 0 0 40" fill="none" stroke="rgba(34,197,94,0.06)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- background grid (chart area only) -->
    <rect x="240" y="20" width="840" height="420" fill="url(#exp-grid)"/>

    <!-- vertical divider between label column and chart -->
    <line x1="232" y1="20" x2="232" y2="450" stroke="rgba(34,197,94,0.18)" stroke-width="1"/>

    <!-- year axis -->
    <g class="exp-axis">
      <line x1="240" y1="450" x2="1080" y2="450" stroke="rgba(34,197,94,0.18)" stroke-width="1"/>
      <g font-family="JetBrains Mono, monospace" font-size="11" fill="rgba(220,255,220,0.45)" text-anchor="middle">
        <text x="240"  y="470">2019</text>
        <text x="345"  y="470">2020</text>
        <text x="450"  y="470">2021</text>
        <text x="555"  y="470">2022</text>
        <text x="660"  y="470">2023</text>
        <text x="765"  y="470">2024</text>
        <text x="870"  y="470">2025</text>
        <text x="975"  y="470">2026</text>
        <text x="1080" y="470">2027</text>
      </g>
      <g stroke="rgba(34,197,94,0.18)" stroke-width="1">
        <line x1="240"  y1="448" x2="240"  y2="454"/>
        <line x1="345"  y1="448" x2="345"  y2="454"/>
        <line x1="450"  y1="448" x2="450"  y2="454"/>
        <line x1="555"  y1="448" x2="555"  y2="454"/>
        <line x1="660"  y1="448" x2="660"  y2="454"/>
        <line x1="765"  y1="448" x2="765"  y2="454"/>
        <line x1="870"  y1="448" x2="870"  y2="454"/>
        <line x1="975"  y1="448" x2="975"  y2="454"/>
        <line x1="1080" y1="448" x2="1080" y2="454"/>
      </g>
    </g>

    <!-- TODAY marker (May 2026 ≈ x 1019) -->
    <g class="exp-today">
      <line x1="1019" y1="20" x2="1019" y2="450" stroke="#fbbf24" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.6"/>
      <text x="1019" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#fbbf24" letter-spacing="2">TODAY</text>
    </g>

    <!-- ROW LANES: label column x=10..220 right-aligned, bars in chart x>=240 -->
    <!-- y rows centered at 41, 81, 121, 161, 201, 241, 281, 321, 361 (40px apart) -->

    <!-- 0. Senior Robotic Engineer — Airobotics (Apr 2025 → today) -->
    <g class="exp-bar exp-bar--industry">
      <text x="220" y="38" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">Senior Robotic Engineer</text>
      <text x="220" y="50" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#fbbf24">Airobotics</text>
      <rect x="896" y="30" width="123" height="22" rx="4" fill="#f59e0b" fill-opacity="0.20" stroke="#f59e0b" stroke-width="1"/>
      <text x="1023" y="44" font-family="JetBrains Mono, monospace" font-size="9" fill="#fbbf24">Apr ’25 – present</text>
    </g>

    <!-- 1. Foundation Model Engineer — Tensiq (2026 → present) -->
    <g class="exp-bar exp-bar--industry">
      <text x="220" y="78" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.95)">Foundation Model Engineer</text>
      <text x="220" y="90" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#fbbf24">Tensiq</text>
      <rect x="975" y="70" width="44" height="22" rx="4" fill="#f59e0b" fill-opacity="0.28" stroke="#f59e0b" stroke-width="1.4"/>
      <text x="1023" y="84" font-family="JetBrains Mono, monospace" font-size="9" fill="#fbbf24">2026</text>
    </g>

    <!-- 2. Researcher — Physical Intelligence Lab (Feb 2024 → today) -->
    <g class="exp-bar exp-bar--research">
      <text x="220" y="118" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">Researcher</text>
      <text x="220" y="130" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#4ade80">Physical Intelligence Lab · KNU</text>
      <rect x="773" y="110" width="246" height="22" rx="4" fill="#22c55e" fill-opacity="0.18" stroke="#22c55e" stroke-width="1"/>
      <text x="1023" y="124" font-family="JetBrains Mono, monospace" font-size="9" fill="#4ade80">Feb ’24 – present</text>
    </g>

    <!-- 3. Robotics Engineer — Dexweaver (Jul – Dec 2024) -->
    <g class="exp-bar exp-bar--industry">
      <text x="220" y="158" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">Robotics Engineer</text>
      <text x="220" y="170" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#fbbf24">Dexweaver</text>
      <rect x="817" y="150" width="44" height="22" rx="4" fill="#f59e0b" fill-opacity="0.20" stroke="#f59e0b" stroke-width="1"/>
      <text x="865" y="164" font-family="JetBrains Mono, monospace" font-size="9" fill="#fbbf24">Jul – Dec ’24</text>
    </g>

    <!-- 4. Research Intern — Physical Intelligence Lab (Sep 2022 → Feb 2024) -->
    <g class="exp-bar exp-bar--research">
      <text x="220" y="198" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">Research Intern</text>
      <text x="220" y="210" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#4ade80">Physical Intelligence Lab · KNU</text>
      <rect x="625" y="190" width="148" height="22" rx="4" fill="#22c55e" fill-opacity="0.13" stroke="#22c55e" stroke-width="1"/>
      <text x="777" y="204" font-family="JetBrains Mono, monospace" font-size="9" fill="#4ade80">Sep ’22 – Feb ’24</text>
    </g>

    <!-- 5. Cyber Security Intern — Prinston (Apr – May 2022) -->
    <g class="exp-bar exp-bar--intern">
      <text x="220" y="238" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.78)">Cyber Security Intern</text>
      <text x="220" y="250" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#9ca3af">Prinston</text>
      <rect x="581" y="230" width="22" height="22" rx="4" fill="#6b7280" fill-opacity="0.22" stroke="#9ca3af" stroke-width="1"/>
      <text x="608" y="244" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca3af">Apr – May ’22</text>
    </g>

    <!-- 6. Web Development Intern — Prinston (Mar – Apr 2021) -->
    <g class="exp-bar exp-bar--intern">
      <text x="220" y="278" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.78)">Web Development Intern</text>
      <text x="220" y="290" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#9ca3af">Prinston</text>
      <rect x="467" y="270" width="22" height="22" rx="4" fill="#6b7280" fill-opacity="0.22" stroke="#9ca3af" stroke-width="1"/>
      <text x="494" y="284" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca3af">Mar – Apr ’21</text>
    </g>

    <!-- 7. M.Eng. KNU (Mar 2024 → Feb 2026) -->
    <g class="exp-bar exp-bar--education">
      <text x="220" y="318" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">M.Eng. Electronics</text>
      <text x="220" y="330" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#c4b5fd">Kyungpook National Univ.</text>
      <rect x="782" y="310" width="201" height="22" rx="4" fill="#7c3aed" fill-opacity="0.20" stroke="#a78bfa" stroke-width="1"/>
      <text x="987" y="324" font-family="JetBrains Mono, monospace" font-size="9" fill="#c4b5fd">Mar ’24 – Feb ’26</text>
    </g>

    <!-- 8. B.Eng. EE Double KNU (Jan 2022 → Dec 2024) -->
    <g class="exp-bar exp-bar--education">
      <text x="220" y="358" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">B.Eng. EE · Double Degree</text>
      <text x="220" y="370" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#c4b5fd">Kyungpook National Univ.</text>
      <rect x="555" y="350" width="306" height="22" rx="4" fill="#7c3aed" fill-opacity="0.16" stroke="#a78bfa" stroke-width="1"/>
      <text x="865" y="364" font-family="JetBrains Mono, monospace" font-size="9" fill="#c4b5fd">Jan ’22 – Dec ’24</text>
    </g>

    <!-- 9. B.Eng. ECE Christ University (Jun 2019 → Dec 2024) -->
    <g class="exp-bar exp-bar--education">
      <text x="220" y="398" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10.5" fill="rgba(220,255,220,0.9)">B.Eng. ECE</text>
      <text x="220" y="410" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#c4b5fd">Christ University · India</text>
      <rect x="284" y="390" width="577" height="22" rx="4" fill="#7c3aed" fill-opacity="0.14" stroke="#a78bfa" stroke-width="1"/>
      <text x="288" y="404" font-family="JetBrains Mono, monospace" font-size="9" fill="#c4b5fd">Jun ’19 – Dec ’24</text>
    </g>
  </svg>

  <div class="exp-legend">
    <span class="exp-legend__item"><span class="exp-swatch exp-swatch--industry"></span> INDUSTRY</span>
    <span class="exp-legend__item"><span class="exp-swatch exp-swatch--research"></span> RESEARCH</span>
    <span class="exp-legend__item"><span class="exp-swatch exp-swatch--intern"></span> INTERNSHIP</span>
    <span class="exp-legend__item"><span class="exp-swatch exp-swatch--education"></span> EDUCATION</span>
  </div>
</section>

<section class="exp-section">
<span class="hero-graph-tag">// HIGHLIGHTS</span>
<ol class="exp-highlights">

<li class="exp-row exp-row--industry">
<span class="exp-row__num">01</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Senior Robotic Engineer <span class="exp-row__org">· Airobotics</span></h3>
<p class="exp-row__desc">Yaskawa-driven weld bead detection on the vehicle assembly line. Inline QA &amp; robotic guidance models.</p>
</div>
<span class="exp-row__date">APR ’25 – PRESENT</span>
</li>

<li class="exp-row exp-row--industry">
<span class="exp-row__num">02</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Foundation Model Engineer <span class="exp-row__org">· Tensiq</span></h3>
<p class="exp-row__desc">Building the Tensiq tokenizer that turns raw tactile-sensor frames into discrete Tensiq Tensor (TT) sequences for multimodal foundation models. Own the TENSIQ CLI end-to-end and lead the integration of tactile data into foundation models.</p>
</div>
<span class="exp-row__date">2026</span>
</li>

<li class="exp-row exp-row--research">
<span class="exp-row__num">03</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Researcher <span class="exp-row__org">· Physical Intelligence Lab, KNU</span></h3>
<p class="exp-row__desc">State-space (Mamba) sequential modeling, transformer policies, precision motion planning for manipulators.</p>
</div>
<span class="exp-row__date">FEB ’24 – PRESENT</span>
</li>

<li class="exp-row exp-row--industry">
<span class="exp-row__num">04</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Robotics Engineer <span class="exp-row__org">· Dexweaver</span></h3>
<p class="exp-row__desc">ViperX + Action Chunking Transformer for vision-guided tissue manipulation. 85.7% autonomous success vs 92.4% human.</p>
</div>
<span class="exp-row__date">JUL – DEC ’24</span>
</li>

<li class="exp-row exp-row--research">
<span class="exp-row__num">05</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Research Intern <span class="exp-row__org">· Physical Intelligence Lab, KNU</span></h3>
<p class="exp-row__desc">Imitation learning for arms, ILC+MPC for high-accuracy tasks, RL navigation for differential drives, UAV tracking.</p>
</div>
<span class="exp-row__date">SEP ’22 – FEB ’24</span>
</li>

<li class="exp-row exp-row--intern">
<span class="exp-row__num">06</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Cyber Security Intern <span class="exp-row__org">· Prinston</span></h3>
<p class="exp-row__desc">Foundations training in security principles &amp; practice.</p>
</div>
<span class="exp-row__date">APR – MAY ’22</span>
</li>

<li class="exp-row exp-row--intern">
<span class="exp-row__num">07</span>
<div class="exp-row__body">
<h3 class="exp-row__title">Web Development Intern <span class="exp-row__org">· Prinston</span></h3>
<p class="exp-row__desc">HTML / CSS / JavaScript, responsive design, React &amp; jQuery basics.</p>
</div>
<span class="exp-row__date">MAR – APR ’21</span>
</li>

</ol>
</section>

<section class="exp-section">
<span class="hero-graph-tag">// SKILLS</span>
<dl class="exp-skills">

<div class="exp-skill-row">
<dt>Languages</dt>
<dd>
<span class="tech-marquee__chip">Python</span>
<span class="tech-marquee__chip">C++</span>
<span class="tech-marquee__chip">C</span>
<span class="tech-marquee__chip">MATLAB</span>
<span class="tech-marquee__chip">JavaScript</span>
<span class="tech-marquee__chip">HTML / CSS</span>
</dd>
</div>

<div class="exp-skill-row">
<dt>Robotics</dt>
<dd>
<span class="tech-marquee__chip">ROS / ROS 2</span>
<span class="tech-marquee__chip">MuJoCo</span>
<span class="tech-marquee__chip">Isaac Sim</span>
<span class="tech-marquee__chip">Gazebo</span>
<span class="tech-marquee__chip">Yaskawa</span>
<span class="tech-marquee__chip">ViperX</span>
<span class="tech-marquee__chip">Franka Panda</span>
<span class="tech-marquee__chip">Unitree Go2</span>
</dd>
</div>

<div class="exp-skill-row">
<dt>AI / ML</dt>
<dd>
<span class="tech-marquee__chip">VLA Models</span>
<span class="tech-marquee__chip">Mamba SSM</span>
<span class="tech-marquee__chip">Transformers</span>
<span class="tech-marquee__chip">Diffusion Models</span>
<span class="tech-marquee__chip">Imitation Learning</span>
<span class="tech-marquee__chip">Reinforcement Learning</span>
<span class="tech-marquee__chip">Multimodal Fusion</span>
</dd>
</div>

<div class="exp-skill-row">
<dt>Frameworks</dt>
<dd>
<span class="tech-marquee__chip">PyTorch</span>
<span class="tech-marquee__chip">TensorFlow</span>
<span class="tech-marquee__chip">HuggingFace</span>
<span class="tech-marquee__chip">CUDA</span>
</dd>
</div>

<div class="exp-skill-row">
<dt>Encoders / LLMs</dt>
<dd>
<span class="tech-marquee__chip">Eagle</span>
<span class="tech-marquee__chip">DINO</span>
<span class="tech-marquee__chip">CLIP</span>
<span class="tech-marquee__chip">SigLip</span>
<span class="tech-marquee__chip">Qwen</span>
<span class="tech-marquee__chip">LLaMA</span>
</dd>
</div>

</dl>
</section>

<section class="exp-section">
<span class="hero-graph-tag">// CERTIFICATIONS</span>
<ul class="exp-cert-list">

<li class="exp-cert">
<span class="exp-cert__title">Applied Control Systems for UAVs · 3D Dynamics and Control</span>
<span class="exp-cert__meta">Udemy <span class="exp-cert__sep">·</span> Nov 2023</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1o_V4zoxZC9yUA-fa_4QhLZkJM6nDFdjv/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Advanced Reinforcement Learning in Python · DQN to SAC</span>
<span class="exp-cert__meta">Udemy <span class="exp-cert__sep">·</span> Jul 2023</span>
<span class="exp-cert__link exp-cert__link--muted">—</span>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Embedded Systems</span>
<span class="exp-cert__meta">Internshala <span class="exp-cert__sep">·</span> Jul 2022</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1KdnYcp15fjHEAX5IFv_XyX1DUi6YjQuN/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Ethical Hacking with Python &amp; KALI Linux</span>
<span class="exp-cert__meta">Udemy <span class="exp-cert__sep">·</span> Jun 2022</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1870ZXRK4t6mBEbz9lwGJblp-ZIb2xrpK/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Internship &amp; Job Preparation · Top performer 95%</span>
<span class="exp-cert__meta">Internshala <span class="exp-cert__sep">·</span> Aug 2022</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1k_lZoIISPcDOwrW2u_gC-BnU4byO-na5/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Introduction to Python Programming</span>
<span class="exp-cert__meta">Udemy <span class="exp-cert__sep">·</span> Nov 2021</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1AP048J_YceKy9bzwjVzT7zrZs4g46V2T/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

<li class="exp-cert">
<span class="exp-cert__title">Advanced C Programming</span>
<span class="exp-cert__meta">Udemy <span class="exp-cert__sep">·</span> Nov 2021</span>
<a class="exp-cert__link" href="https://drive.google.com/file/d/1YCNheyEShzoIv_b459CsaHa43_A2iQGl/view?usp=sharing" target="_blank" rel="noopener">view ↗</a>
</li>

</ul>
</section>

<section class="exp-section">
<span class="hero-graph-tag">// LANGUAGES</span>
<div class="exp-lang-row">
<span class="exp-lang"><strong>English</strong><span class="exp-lang-lvl">Fluent</span></span>
<span class="exp-lang"><strong>Telugu</strong><span class="exp-lang-lvl">Native</span></span>
<span class="exp-lang"><strong>Korean</strong><span class="exp-lang-lvl">Intermediate</span></span>
<span class="exp-lang"><strong>Hindi</strong><span class="exp-lang-lvl">Intermediate</span></span>
</div>
</section>
```
