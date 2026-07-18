// 3D background — HOME PAGE ONLY.
// Renders the robotic-arm .glb behind the hero content, plays its built-in
// animation, and reacts to mouse + scroll. three.js is loaded dynamically so
// it is NOT downloaded on any page other than the home page.

// Resolve local asset URLs relative to THIS module (works at any page depth,
// local dev + GitHub Pages). All vendored — no CDN.
// Compressed model (3.2 MB). Swap to '../models/arm.glb' for the full 9.7 MB original.
const MODEL_URL = new URL('../models/arm-min.glb', import.meta.url).href;
const THREE_URL = new URL('../vendor/three/build/three.module.js', import.meta.url).href;
const GLTF_URL  = new URL('../vendor/three/examples/jsm/loaders/GLTFLoader.js', import.meta.url).href;
const ROOM_URL  = new URL('../vendor/three/examples/jsm/environments/RoomEnvironment.js', import.meta.url).href;

// ---- Config -----------------------------------------------------------------
const FOV = 32;
const FILL = 2.15;                // higher = model appears smaller in frame
const MOUSE_YAW = 0.45;           // radians the model turns toward the cursor (x)
const MOUSE_PITCH = 0.22;         // radians it leans (y)
const SCROLL_SPIN = Math.PI;      // extra Y-rotation across a full page scroll
const IDLE_SPIN = 0.00008;        // gentle constant drift (radians/ms)
const LERP = 0.06;
const ANIM_SPEED = 0.4;           // built-in clip playback speed (1 = original, <1 = slower)
const VERTICAL_SHIFT = 0.12;      // fraction of model height to nudge DOWN (higher = lower on screen)

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// The home page is the only page with a .hero-section.
function isHomePage() {
    return !!document.querySelector('.hero-section');
}

async function init() {
    if (document.getElementById('bg3d')) return;
    if (!isHomePage()) return;                 // robot shows ONLY on the home page
    if (!window.WebGLRenderingContext) return;

    // Load three.js on demand — nothing above downloads on non-home pages.
    let THREE, GLTFLoader, RoomEnvironment;
    try {
        THREE = await import(THREE_URL);
        ({ GLTFLoader } = await import(GLTF_URL));
        ({ RoomEnvironment } = await import(ROOM_URL));
    } catch (e) {
        console.warn('[bg3d] failed to load three.js:', e);
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'bg3d';
    document.body.appendChild(canvas);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (e) {
        canvas.remove();
        return;
    }
    renderer.setClearColor(0x040806, 0);          // transparent — page bg shows through
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    // Neutral image-based lighting so the metallic arm reads correctly (not black).
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 1000);

    // A couple of accent lights in the site's palette for a little life on the metal.
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rimGreen = new THREE.DirectionalLight(0x22c55e, 0.8);
    rimGreen.position.set(-5, 2, -3);
    scene.add(rimGreen);
    const rimAmber = new THREE.DirectionalLight(0xf59e0b, 0.5);
    rimAmber.position.set(4, -2, 3);
    scene.add(rimAmber);

    // ---- Interaction state --------------------------------------------------
    const reduced = prefersReducedMotion();
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let scrollProgress = 0, currentScroll = 0;

    if (!reduced) {
        window.addEventListener('mousemove', (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            target.x = nx * MOUSE_YAW;
            target.y = ny * MOUSE_PITCH;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        }, { passive: true });
    }

    // ---- Load the model -----------------------------------------------------
    let model = null, mixer = null;
    const clock = new THREE.Clock();

    new GLTFLoader().load(
        MODEL_URL,
        (gltf) => {
            model = gltf.scene;

            // Center at origin and frame it at a moderate size.
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            // Nudge the model down so it sits centered in the viewport.
            model.position.y -= size.y * VERTICAL_SHIFT;
            scene.add(model);

            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const fitDist = (maxDim / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
            camera.position.set(0, 0, fitDist * FILL);
            camera.lookAt(0, 0, 0);

            // Play the built-in animation clip (slowed).
            if (!reduced && gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                mixer.timeScale = ANIM_SPEED;
                mixer.clipAction(gltf.animations[0]).play();
            }

            canvas.classList.add('bg3d--ready');
            resize();
        },
        undefined,
        (err) => {
            console.warn('[bg3d] model failed to load:', err);
            canvas.remove();
        }
    );

    // ---- Resize -------------------------------------------------------------
    function resize() {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ---- Render loop --------------------------------------------------------
    function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();
        if (mixer) mixer.update(dt);

        if (model) {
            current.x += (target.x - current.x) * LERP;
            current.y += (target.y - current.y) * LERP;
            currentScroll += (scrollProgress - currentScroll) * LERP;

            const idle = reduced ? 0 : (Date.now() * IDLE_SPIN);
            model.rotation.y = current.x + currentScroll * SCROLL_SPIN + idle;
            model.rotation.x = current.y;
        }
        renderer.render(scene, camera);
    }
    animate();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
