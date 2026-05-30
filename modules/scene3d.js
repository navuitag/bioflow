/**
 * Mô hình 3D tương tác cho bài học Sinh học THCS (Three.js).
 */

const SCENE_GROUPS = {
  lab: ["khtn", "lab", "microscope"],
  cell: ["cell", "organelle", "microorganism"],
  plant: ["plant", "photosynthesis", "reproduction"],
  animal: ["animal", "digestion", "circulation", "nervous", "respiration"],
  genetics: ["genetics", "evolution", "biotechnology"],
  ecosystem: ["diversity", "ecosystem", "environment"]
};

const TYPE_TO_GROUP = {};
Object.entries(SCENE_GROUPS).forEach(([group, types]) => {
  types.forEach((type) => {
    TYPE_TO_GROUP[type] = group;
  });
});

export const SCENE3D_CAPTIONS = {
  khtn: "Ba lĩnh vực KHTN — Sinh học trong đời sống",
  lab: "Phòng thí nghiệm Sinh học an toàn",
  microscope: "Kính hiển vi — quan sát tế bào",
  cell: "Mô hình tế bào 3D",
  organelle: "Bào quan trong tế bào",
  microorganism: "Vi sinh vật — vi khuẩn, nấm, virus",
  plant: "Cấu trúc thực vật",
  animal: "Nhóm động vật",
  photosynthesis: "Quang hợp ở thực vật",
  respiration: "Hô hấp và trao đổi khí",
  digestion: "Hệ tiêu hóa",
  circulation: "Tuần hoàn máu",
  nervous: "Hệ thần kinh",
  reproduction: "Sinh sản sinh vật",
  genetics: "Di truyền và gen",
  evolution: "Tiến hóa sinh vật",
  biotechnology: "Công nghệ sinh học",
  diversity: "Đa dạng sinh học",
  ecosystem: "Hệ sinh thái — chuỗi thức ăn",
  environment: "Môi trường và bảo vệ thiên nhiên"
};

export function hasScene3D(type) {
  return Boolean(type && TYPE_TO_GROUP[type]);
}

export function renderScene3DPanel(type, caption) {
  if (!hasScene3D(type)) return "";
  const text = caption || SCENE3D_CAPTIONS[type] || "Mô hình 3D minh họa bài học";
  return `
    <div class="viz viz-3d" aria-label="Mô hình 3D">
      <div class="scene3d-wrap">
        <div class="scene3d-badge">Mô hình 3D</div>
        <div class="scene3d-canvas" data-scene3d="${type}" role="img" aria-label="${text}"></div>
        <div class="scene3d-toolbar">
          <button type="button" class="btn quiet scene3d-btn" data-scene-action="spin">Tự xoay</button>
          <button type="button" class="btn quiet scene3d-btn" data-scene-action="reset">Đặt lại</button>
        </div>
      </div>
      <p class="viz-caption scene3d-caption">${text}</p>
      <p class="scene3d-hint">Kéo để xoay · Cuộn để phóng to · Giúp ghi nhớ hình ảnh lâu hơn</p>
    </div>
  `;
}

const activeScenes = new Map();
let threePromise = null;

async function loadThree() {
  if (!threePromise) {
    threePromise = Promise.all([
      import("../vendor/three.module.min.js"),
      import("../vendor/OrbitControls.js")
    ]).then(([THREE, controls]) => ({ THREE, OrbitControls: controls.OrbitControls }));
  }
  return threePromise;
}

class SceneRunner {
  constructor(container, type) {
    this.container = container;
    this.type = type;
    this.group = TYPE_TO_GROUP[type] || "default";
    this.spin = false;
    this.clock = null;
    this.meshes = [];
    this.raf = 0;
    this.resizeObserver = null;
  }

  async mount() {
    const { THREE, OrbitControls } = await loadThree();
    this.THREE = THREE;
    this.clock = new THREE.Clock();

    const width = this.container.clientWidth || 360;
    const height = Math.max(220, Math.round(width * 0.62));

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xf4fbf8, 1);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(3.2, 2.4, 4.6);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 14;
    this.controls.target.set(0, 0.6, 0);

    addLights(this.scene, THREE);
    buildScene(this.group, this.type, this.scene, THREE, this.meshes);

    this.controls.update();
    this.animate = this.animate.bind(this);
    this.raf = requestAnimationFrame(this.animate);

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    const wrap = this.container.closest(".scene3d-wrap");
    wrap?.querySelectorAll("[data-scene-action]").forEach((button) => {
      button.addEventListener("click", () => this.handleAction(button.dataset.sceneAction));
    });
  }

  handleAction(action) {
    if (action === "spin") {
      this.spin = !this.spin;
      const btn = this.container.closest(".scene3d-wrap")?.querySelector('[data-scene-action="spin"]');
      if (btn) btn.textContent = this.spin ? "Dừng xoay" : "Tự xoay";
    }
    if (action === "reset") {
      this.controls.reset();
      this.camera.position.set(3.2, 2.4, 4.6);
      this.controls.target.set(0, 0.6, 0);
      this.spin = false;
      const btn = this.container.closest(".scene3d-wrap")?.querySelector('[data-scene-action="spin"]');
      if (btn) btn.textContent = "Tự xoay";
    }
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const width = this.container.clientWidth || 360;
    const height = Math.max(220, Math.round(width * 0.62));
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    const t = this.clock.getElapsedTime();
    animateMeshes(this.group, this.meshes, t, this.spin);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.animate);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.controls?.dispose();
    this.meshes.forEach((mesh) => {
      mesh.geometry?.dispose?.();
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose?.());
      else mesh.material?.dispose?.();
    });
    this.renderer?.dispose();
    this.container.innerHTML = "";
  }
}

function addLights(scene, THREE) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.72));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(5, 8, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa8d8ff, 0.35);
  fill.position.set(-4, 2, -3);
  scene.add(fill);
}

function addGround(scene, THREE, color = 0xe3f2ec) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.92 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

function mat(THREE, color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.08, ...opts });
}

function buildScene(group, type, scene, THREE, meshes) {
  const builders = {
    lab: buildLab,
    cell: buildCell,
    plant: buildPlant,
    animal: buildAnimal,
    genetics: buildGenetics,
    ecosystem: buildEcosystem
  };
  (builders[group] || buildDefault)(scene, type, THREE, meshes);
}

function buildAstronomy(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0x0a1628);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 32),
    mat(THREE, 0xf5b942, { emissive: 0xf5b942, emissiveIntensity: 0.55 })
  );
  sun.position.set(0, 0.55, 0);
  scene.add(sun);
  meshes.push({ kind: "sun", mesh: sun });

  const colors = [0x8ec5ff, 0x20a36b, 0xf07850, 0xd4a574];
  const radii = [1.1, 1.7, 2.3, 2.9];
  radii.forEach((radius, index) => {
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 8, 64),
      mat(THREE, 0x4a6080, { transparent: true, opacity: 0.35 })
    );
    orbit.rotation.x = Math.PI / 2;
    orbit.position.y = 0.02;
    scene.add(orbit);

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(0.14 + index * 0.03, 24, 24),
      mat(THREE, colors[index % colors.length])
    );
    planet.position.set(radius, 0.14, 0);
    scene.add(planet);
    meshes.push({ kind: "orbit", mesh: planet, radius, speed: 0.35 + index * 0.12, angle: index * 1.4 });
  });

  if (type === "galaxy") {
    sun.visible = false;
    const galaxy = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(makeSpiralPoints(900), 3)
      ),
      new THREE.PointsMaterial({ color: 0xc8d8ff, size: 0.035, transparent: true, opacity: 0.85 })
    );
    galaxy.rotation.x = 1.1;
    scene.add(galaxy);
    meshes.push({ kind: "galaxy", mesh: galaxy });
  }
}

function makeSpiralPoints(count) {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const angle = t * Math.PI * 10;
    const radius = 0.2 + t * 2.8;
    points.push(Math.cos(angle) * radius, (Math.random() - 0.5) * 0.25, Math.sin(angle) * radius);
  }
  return points;
}

function buildMoon(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0x0a1628);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 32, 32),
    mat(THREE, 0x2d7ff9)
  );
  earth.position.set(0, 0.65, 0);
  scene.add(earth);
  meshes.push({ kind: "earth", mesh: earth });

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 24, 24),
    mat(THREE, 0xd8dce6)
  );
  moon.position.set(1.4, 0.65, 0);
  scene.add(moon);
  meshes.push({ kind: "moon", mesh: moon, radius: 1.4, speed: 1.1, angle: 0 });
}

function buildGravity(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 32, 32),
    mat(THREE, 0x20a36b)
  );
  earth.position.set(0, 1.1, 0);
  scene.add(earth);

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 24, 24),
    mat(THREE, 0xf07850)
  );
  ball.position.set(0, 3.2, 0);
  scene.add(ball);
  meshes.push({ kind: "bounce", mesh: ball, baseY: 3.2, amp: 0.55, speed: 2.2 });

  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 2.6, 0.5),
    1.2,
    0xdf4f5f,
    0.22,
    0.14
  );
  scene.add(arrow);
}

function buildSpring(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const curve = new THREE.CatmullRomCurve3(
    Array.from({ length: 12 }, (_, i) => new THREE.Vector3(0, 0.15 + i * 0.18, Math.sin(i * 0.9) * 0.12))
  );
  const spring = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, 0.06, 10, false),
    mat(THREE, 0x888888, { metalness: 0.45 })
  );
  scene.add(spring);

  const mass = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    mat(THREE, 0x2d7ff9)
  );
  mass.position.set(0, 2.35, 0);
  scene.add(mass);
  meshes.push({ kind: "oscillate", mesh: mass, baseY: 2.35, amp: 0.35, speed: 2.5 });
}

function buildForces(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.12, 1.6),
    mat(THREE, 0xc8d8e8)
  );
  ramp.position.set(0, 0.35, 0);
  ramp.rotation.z = type === "friction" ? 0.28 : type === "drag" ? 0.08 : 0;
  scene.add(ramp);

  const block = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 0.7),
    mat(THREE, 0xf07850)
  );
  block.position.set(-0.3, 0.85, 0);
  scene.add(block);
  if (type === "drag") meshes.push({ kind: "slide", mesh: block, axis: "x", amp: 0.8, speed: 1.2 });

  scene.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-0.7, 1.1, 0.4), 0.9, 0x20a36b, 0.18, 0.1));
  scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(-0.3, 1.25, 0.4), 0.7, 0xdf4f5f, 0.16, 0.09));
  if (type === "friction") {
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-0.3, 0.75, -0.4), 0.7, 0xf5b942, 0.14, 0.08));
  }
}

function buildLever(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const fulcrum = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 0.5, 4),
    mat(THREE, 0x888888)
  );
  fulcrum.position.set(0, 0.25, 0);
  fulcrum.rotation.y = Math.PI / 4;
  scene.add(fulcrum);

  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.12, 0.35),
    mat(THREE, 0x24536f)
  );
  bar.position.set(0, 0.55, 0);
  scene.add(bar);
  meshes.push({ kind: "tilt", mesh: bar, amp: 0.12, speed: 1.4 });

  [[-1.5, 0x2d7ff9], [1.5, 0xf07850]].forEach(([x, color]) => {
    const weight = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), mat(THREE, color));
    weight.position.set(x, 0.95, 0);
    scene.add(weight);
  });
}

function buildFluid(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const tank = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.8, 1.4),
    mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.18 })
  );
  tank.position.set(0, 0.92, 0);
  scene.add(tank);

  const water = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 1.0, 1.2),
    mat(THREE, 0x2d7ff9, { transparent: true, opacity: 0.55 })
  );
  water.position.set(0, 0.52, 0);
  scene.add(water);

  const obj = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    mat(THREE, type === "archimedes" ? 0xf07850 : 0x20a36b)
  );
  obj.position.set(0, type === "density" ? 1.05 : 0.75, 0);
  scene.add(obj);
  meshes.push({ kind: "bob", mesh: obj, baseY: obj.position.y, amp: 0.08, speed: 1.6 });

  if (type === "liquidPressure") {
    for (let i = 0; i < 3; i += 1) {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(-0.7 + i * 0.7, 0.15, 0.55),
        0.35 + i * 0.2,
        0xdf4f5f,
        0.1,
        0.06
      );
      scene.add(arrow);
    }
  }
}

function buildPressure(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.6), mat(THREE, 0xc8d8e8));
  plate.position.set(0, 0.08, 0);
  scene.add(plate);

  const block = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), mat(THREE, 0x24536f));
  block.position.set(0, 0.65, 0);
  scene.add(block);

  scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1.35, 0.5), 0.9, 0xdf4f5f, 0.2, 0.12));
}

function buildMagnet(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.6, 0.5), mat(THREE, 0xdf4f5f));
  bar.position.set(0, 0.85, 0);
  scene.add(bar);
  const north = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.35, 0.52), mat(THREE, 0x2d7ff9));
  north.position.set(0, 1.55, 0);
  scene.add(north);

  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.55 + i * 0.22, 0.025, 8, 32),
      mat(THREE, 0xf5b942, { transparent: true, opacity: 0.65 - i * 0.1 })
    );
    ring.rotation.y = Math.PI / 2;
    ring.position.set(0.85, 0.85, 0);
    scene.add(ring);
    meshes.push({ kind: "pulse", mesh: ring, baseScale: 1, amp: 0.08, speed: 1.5 + i * 0.2 });
  }

  if (type === "electromagnet") {
    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.07, 10, 24),
      mat(THREE, 0xcc8844, { metalness: 0.5 })
    );
    coil.rotation.x = Math.PI / 2;
    coil.position.set(0, 0.85, 0);
    scene.add(coil);
  }
}

function buildCircuit(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0xedf4f8);
  const wireMat = mat(THREE, 0xf5b942, { metalness: 0.6 });
  const path = [
    [-1.4, 0.2, 0], [1.4, 0.2, 0], [1.4, 0.2, -0.8], [-1.4, 0.2, -0.8], [-1.4, 0.2, 0]
  ];
  for (let i = 0; i < path.length - 1; i += 1) {
    const start = new THREE.Vector3(...path[i]);
    const end = new THREE.Vector3(...path[i + 1]);
    const len = start.distanceTo(end);
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, len, 8), wireMat);
    wire.position.copy(start.clone().add(end).multiplyScalar(0.5));
    wire.lookAt(end);
    wire.rotateX(Math.PI / 2);
    scene.add(wire);
  }

  const battery = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.35), mat(THREE, 0x20a36b));
  battery.position.set(-1.4, 0.55, 0);
  scene.add(battery);

  const resistor = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.35), mat(THREE, 0xf07850));
  resistor.position.set(0, 0.38, 0);
  scene.add(resistor);

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 20),
    mat(THREE, 0xfff4cc, { emissive: 0xfff4cc, emissiveIntensity: 0.6 })
  );
  bulb.position.set(1.4, 0.42, 0);
  scene.add(bulb);
  meshes.push({ kind: "glow", mesh: bulb, base: 0.6, amp: 0.35, speed: 3 });

  if (type === "parallel" || type === "circuitMixed") {
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8), wireMat);
    branch.rotation.z = Math.PI / 2;
    branch.position.set(0, 0.2, -0.4);
    scene.add(branch);
  }
}

function buildCharge(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const plus = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 24, 24),
    mat(THREE, 0xdf4f5f, { emissive: 0xdf4f5f, emissiveIntensity: 0.25 })
  );
  plus.position.set(-0.8, 0.75, 0);
  scene.add(plus);
  meshes.push({ kind: "orbit", mesh: plus, radius: 0.15, speed: 0, angle: 0 });

  const minus = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 24, 24),
    mat(THREE, 0x2d7ff9, { emissive: 0x2d7ff9, emissiveIntensity: 0.25 })
  );
  minus.position.set(0.8, 0.75, 0);
  scene.add(minus);
  meshes.push({ kind: "pulse", mesh: minus, baseScale: 1, amp: 0.06, speed: 2 });
}

function buildOptics(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0xedf4f8);
  if (type === "prism") {
    const prism = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 0.65, 1.1, 3),
      mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.55 })
    );
    prism.position.set(0, 0.65, 0);
    scene.add(prism);
  } else {
    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI),
      mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.45 })
    );
    lens.scale.set(0.35, 1, 1);
    lens.position.set(0, 0.75, 0);
    scene.add(lens);
  }

  const colors = [0xff6666, 0xffcc66, 0x66ccff];
  colors.forEach((color, i) => {
    const ray = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 2.2, 6),
      mat(THREE, color, { emissive: color, emissiveIntensity: 0.35 })
    );
    ray.rotation.z = -0.35 + i * 0.15;
    ray.position.set(-0.9 + i * 0.15, 1.0 + i * 0.08, 0);
    scene.add(ray);
  });

  if (type === "mirror") {
    const mirror = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.4, 1.0),
      mat(THREE, 0xd8e8f8, { metalness: 0.85, roughness: 0.15 })
    );
    mirror.position.set(0.9, 0.75, 0);
    scene.add(mirror);
  }
}

function buildSound(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const speaker = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.5), mat(THREE, 0x24536f));
  speaker.position.set(-1.0, 0.55, 0);
  scene.add(speaker);

  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.5, 24), mat(THREE, 0x333333));
  cone.rotation.z = -Math.PI / 2;
  cone.position.set(-0.55, 0.55, 0);
  scene.add(cone);

  for (let i = 0; i < 4; i += 1) {
    const wave = new THREE.Mesh(
      new THREE.TorusGeometry(0.35 + i * 0.35, 0.025, 8, 32),
      mat(THREE, 0x20a36b, { transparent: true, opacity: 0.55 - i * 0.1 })
    );
    wave.rotation.y = Math.PI / 2;
    wave.position.set(0.2, 0.55, 0);
    scene.add(wave);
    meshes.push({ kind: "pulse", mesh: wave, baseScale: 1, amp: 0.12, speed: 2 + i * 0.3 });
  }
}

function buildThermal(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.4, 1.4),
    mat(THREE, 0xffffff, { transparent: true, opacity: 0.25 })
  );
  box.position.set(0, 0.72, 0);
  scene.add(box);

  for (let i = 0; i < 18; i += 1) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      mat(THREE, i % 2 ? 0xf07850 : 0x2d7ff9, { emissive: i % 2 ? 0xf07850 : 0x2d7ff9, emissiveIntensity: 0.2 })
    );
    particle.position.set((Math.random() - 0.5) * 1.5, 0.3 + Math.random() * 1.0, (Math.random() - 0.5) * 1.0);
    scene.add(particle);
    meshes.push({
      kind: "particle",
      mesh: particle,
      bounds: { x: 0.75, y: [0.25, 1.15], z: 0.55 },
      speed: 0.8 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function buildEnergy(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 24, 24),
    mat(THREE, 0xf5b942, { emissive: 0xf5b942, emissiveIntensity: 0.5 })
  );
  sun.position.set(-1.2, 1.6, 0);
  scene.add(sun);

  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.7), mat(THREE, 0x2d4a8a));
  panel.rotation.z = -0.25;
  panel.position.set(-0.5, 0.45, 0);
  scene.add(panel);

  const turbine = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8), mat(THREE, 0x888888));
  turbine.position.set(0.8, 0.55, 0);
  scene.add(turbine);
  meshes.push({ kind: "spinY", mesh: turbine, speed: 1.8 });

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 20, 20),
    mat(THREE, 0xfff4cc, { emissive: 0xfff4cc, emissiveIntensity: 0.55 })
  );
  bulb.position.set(1.4, 0.85, 0);
  scene.add(bulb);
  meshes.push({ kind: "glow", mesh: bulb, base: 0.55, amp: 0.3, speed: 2.5 });
}

function buildMotion(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const road = new THREE.Mesh(new THREE.BoxGeometry(5, 0.08, 1.4), mat(THREE, 0x555555));
  road.position.set(0, 0.04, 0);
  scene.add(road);

  const car = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 0.55), mat(THREE, 0xdf4f5f));
  car.position.set(-1.5, 0.35, 0);
  scene.add(car);
  meshes.push({ kind: "slide", mesh: car, axis: "x", amp: 1.4, speed: 1.1 });

  if (type === "stGraph") {
    const graph = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.04, 0.04), mat(THREE, 0x20a36b));
    graph.position.set(0, 0.5, -0.8);
    graph.rotation.z = 0.45;
    scene.add(graph);
  }
}

function buildLab(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const table = new THREE.Mesh(new THREE.BoxGeometry(3, 0.12, 1.4), mat(THREE, 0xc8a882));
  table.position.set(0, 0.45, 0);
  scene.add(table);

  if (type === "khtn") {
    [["Vật lí", 0x20a36b], ["Hóa", 0x2d7ff9], ["Sinh", 0xf07850]].forEach(([label, color], i) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 1.2, 16), mat(THREE, color));
      pillar.position.set(-0.9 + i * 0.9, 1.05, 0);
      scene.add(pillar);
    });
    return;
  }

  if (type === "measure") {
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.5), mat(THREE, 0x888888));
    base.position.set(0, 0.55, 0);
    scene.add(base);
    const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 24), mat(THREE, 0xc8d8e8));
    pan.position.set(-0.35, 0.72, 0);
    scene.add(pan);
    const pan2 = pan.clone();
    pan2.position.set(0.35, 0.72, 0);
    scene.add(pan2);
    meshes.push({ kind: "tilt", mesh: base, amp: 0.04, speed: 1.2 });
    return;
  }

  if (type === "length") {
    const ruler = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.35), mat(THREE, 0xf5b942));
    ruler.position.set(0, 0.58, 0);
    scene.add(ruler);
    return;
  }

  if (type === "time") {
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32), mat(THREE, 0xffffff));
    clock.rotation.x = Math.PI / 2;
    clock.position.set(0, 0.72, 0);
    scene.add(clock);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.04), mat(THREE, 0x17324d));
    hand.position.set(0, 0.95, 0);
    scene.add(hand);
    meshes.push({ kind: "spinY", mesh: hand, speed: 0.8 });
    return;
  }

  if (type === "temperature") {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.0, 16), mat(THREE, 0xdf4f5f));
    tube.position.set(0, 0.95, 0);
    scene.add(tube);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), mat(THREE, 0xdf4f5f));
    bulb.position.set(0, 0.45, 0);
    scene.add(bulb);
    return;
  }

  if (type === "microscope") {
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.15, 0.7), mat(THREE, 0x555555));
    base.position.set(0, 0.55, 0);
    scene.add(base);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.9, 12), mat(THREE, 0x333333));
    tube.position.set(0, 1.0, 0);
    scene.add(tube);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), mat(THREE, 0x88c8ff, { metalness: 0.4 }));
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 1.45, 0.2);
    scene.add(lens);
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.02, 0.2), mat(THREE, 0xd8e8ff));
    slide.position.set(0, 0.62, 0);
    scene.add(slide);
    meshes.push({ kind: "spinY", mesh: tube, speed: 0.15 });
    return;
  }

  // lab default — ống nghiệm sinh học
  const flask = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 20, 20),
    mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.6 })
  );
  flask.position.set(0, 0.72, 0);
  scene.add(flask);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 12), mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.6 }));
  neck.position.set(0, 1.05, 0);
  scene.add(neck);
}

function buildCurrent(scene, type, THREE, meshes) {
  buildCircuit(scene, "currentEffects", THREE, meshes);
  const coil = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.08, 12, 28),
    mat(THREE, 0xcc8844, { metalness: 0.55 })
  );
  coil.rotation.x = Math.PI / 2;
  coil.position.set(0, 0.85, -0.5);
  scene.add(coil);
  meshes.push({ kind: "spinY", mesh: coil, speed: type === "acCurrent" ? 3.5 : 1.5 });
}

function buildCell(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 32, 32),
    mat(THREE, 0x88d4aa, { transparent: true, opacity: 0.35 })
  );
  membrane.position.set(0, 1.0, 0);
  scene.add(membrane);

  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 24, 24),
    mat(THREE, 0x6b5ce7)
  );
  nucleus.position.set(0.15, 1.05, 0.1);
  scene.add(nucleus);

  if (type === "organelle" || type === "photosynthesis") {
    const chloroplast = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      mat(THREE, 0x20a36b)
    );
    chloroplast.position.set(-0.45, 0.95, 0.35);
    scene.add(chloroplast);
    const mitochondria = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.08, 0.22, 4, 8),
      mat(THREE, 0xf07850)
    );
    mitochondria.position.set(0.5, 0.88, -0.25);
    mitochondria.rotation.z = 0.6;
    scene.add(mitochondria);
  }

  if (type === "microorganism") {
    const rod = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 4, 8), mat(THREE, 0x2d7ff9));
    rod.position.set(-0.3, 1.0, 0.4);
    rod.rotation.z = 1.2;
    scene.add(rod);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mat(THREE, 0xf5b942));
    sphere.position.set(0.55, 1.15, -0.35);
    scene.add(sphere);
  }

  meshes.push({ kind: "spinY", mesh: membrane, speed: 0.35 });
}

function buildPlant(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0xd8ecd8);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.35, 0.35, 16), mat(THREE, 0xc8a882));
  pot.position.set(0, 0.2, 0);
  scene.add(pot);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.2, 10), mat(THREE, 0x20a36b));
  stem.position.set(0, 0.95, 0);
  scene.add(stem);
  [[-0.35, 1.1], [0.35, 1.25], [0, 1.45]].forEach(([x, y], i) => {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat(THREE, 0x178a59));
    leaf.scale.set(1.6, 0.5, 0.8);
    leaf.position.set(x, y, 0);
    leaf.rotation.z = i * 0.5;
    scene.add(leaf);
  });
  if (type === "reproduction") {
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), mat(THREE, 0xf07850));
    flower.position.set(0, 1.65, 0);
    scene.add(flower);
  }
  if (type === "photosynthesis") {
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), mat(THREE, 0xf5b942, { emissive: 0xf5b942, emissiveIntensity: 0.4 }));
    sun.position.set(1.5, 2.0, 0.5);
    scene.add(sun);
    meshes.push({ kind: "glow", mesh: sun, base: 0.4, amp: 0.25, speed: 2 });
  }
  meshes.push({ kind: "bob", mesh: stem, baseY: 0.95, amp: 0.04, speed: 1.2 });
}

function buildAnimal(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 24), mat(THREE, 0xf07850));
  body.position.set(0, 0.75, 0);
  body.scale.set(1.4, 1, 0.9);
  scene.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), mat(THREE, 0xf07850));
  head.position.set(0.75, 0.85, 0);
  scene.add(head);

  if (type === "digestion") {
    const tract = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.06, 8, 24), mat(THREE, 0xdf4f5f));
    tract.rotation.y = Math.PI / 2;
    tract.position.set(0, 0.75, 0.35);
    scene.add(tract);
  }
  if (type === "circulation") {
    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), mat(THREE, 0xdf4f5f));
    heart.position.set(0.1, 0.9, 0.25);
    scene.add(heart);
    meshes.push({ kind: "pulse", mesh: heart, baseScale: 1, amp: 0.12, speed: 3 });
  }
  if (type === "nervous") {
    const brain = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mat(THREE, 0xd8a8ff));
    brain.position.set(0.85, 1.05, 0);
    scene.add(brain);
  }
  if (type === "respiration") {
    const lungL = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), mat(THREE, 0x88c8ff, { transparent: true, opacity: 0.7 }));
    lungL.position.set(-0.15, 0.85, 0.35);
    lungL.scale.set(0.8, 1.2, 0.6);
    scene.add(lungL);
    const lungR = lungL.clone();
    lungR.position.set(0.25, 0.85, 0.35);
    scene.add(lungR);
    meshes.push({ kind: "pulse", mesh: lungL, baseScale: 1, amp: 0.08, speed: 0.8 });
  }
  meshes.push({ kind: "spinY", mesh: body, speed: 0.25 });
}

function buildGenetics(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0xe8e0f8);
  const group = new THREE.Group();
  group.position.set(0, 1.2, 0);
  scene.add(group);

  for (let i = 0; i < 14; i += 1) {
    const angle = (i / 14) * Math.PI * 4;
    const y = (i / 14) * 1.6 - 0.8;
    const radius = 0.35;
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      mat(THREE, i % 2 === 0 ? 0x2d7ff9 : 0xf07850)
    );
    ball.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    group.add(ball);
  }
  const backbone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.7, 8),
    mat(THREE, 0x888888)
  );
  group.add(backbone);

  if (type === "evolution") {
    const tree = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), mat(THREE, 0x20a36b));
    tree.position.set(-1.2, 0.6, 0);
    scene.add(tree);
  }
  if (type === "biotechnology") {
    const pipette = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8), mat(THREE, 0x555555));
    pipette.position.set(1.0, 1.0, 0.3);
    pipette.rotation.z = -0.4;
    scene.add(pipette);
  }
  meshes.push({ kind: "spinY", mesh: group, speed: 0.5 });
}

function buildEcosystem(scene, type, THREE, meshes) {
  addGround(scene, THREE, 0xc8e8c8);
  [[-1.5, 0.5], [0, 0.7], [1.3, 0.45]].forEach(([x, h], i) => {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, h, 8), mat(THREE, 0x8b6914));
    trunk.position.set(x, h / 2, 0);
    scene.add(trunk);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.45 + i * 0.05, 0.7, 8), mat(THREE, 0x178a59));
    crown.position.set(x, h + 0.25, 0);
    scene.add(crown);
  });

  if (type === "diversity") {
    const bug = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mat(THREE, 0xf5b942));
    bug.position.set(0.5, 0.2, 0.6);
    scene.add(bug);
    const fish = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), mat(THREE, 0x2d7ff9));
    fish.position.set(-0.8, 0.15, -0.5);
    fish.scale.set(1.8, 0.7, 0.7);
    scene.add(fish);
  }

  if (type === "ecosystem") {
    const rabbit = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), mat(THREE, 0xd8dce6));
    rabbit.position.set(-0.3, 0.18, 0.4);
    scene.add(rabbit);
    const fox = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), mat(THREE, 0xf07850));
    fox.position.set(0.8, 0.2, -0.3);
    scene.add(fox);
  }

  if (type === "environment") {
    const recycle = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.05, 8, 16), mat(THREE, 0x20a36b));
    recycle.rotation.x = Math.PI / 2;
    recycle.position.set(0, 0.3, 0.8);
    scene.add(recycle);
    meshes.push({ kind: "spinY", mesh: recycle, speed: 0.6 });
  }
}

function buildDefault(scene, type, THREE, meshes) {
  addGround(scene, THREE);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat(THREE, 0x20a36b));
  cube.position.set(0, 0.45, 0);
  scene.add(cube);
  meshes.push({ kind: "spinY", mesh: cube, speed: 0.9 });
}

function animateMeshes(group, meshes, t, spin) {
  meshes.forEach((item) => {
    const { mesh, kind } = item;
    if (spin && kind !== "particle") {
      mesh.rotation.y += 0.008;
    }
    if (kind === "orbit") {
      item.angle = (item.angle || 0) + item.speed * 0.016;
      mesh.position.x = Math.cos(item.angle) * item.radius;
      mesh.position.z = Math.sin(item.angle) * item.radius;
    }
    if (kind === "bounce" || kind === "oscillate" || kind === "bob") {
      mesh.position.y = item.baseY + Math.sin(t * item.speed) * item.amp;
    }
    if (kind === "tilt") {
      mesh.rotation.z = Math.sin(t * item.speed) * item.amp;
    }
    if (kind === "slide") {
      const offset = Math.sin(t * item.speed) * item.amp;
      if (item.axis === "x") mesh.position.x = -1.5 + offset + item.amp;
    }
    if (kind === "pulse") {
      const scale = item.baseScale + Math.sin(t * item.speed) * item.amp;
      mesh.scale.set(scale, scale, scale);
    }
    if (kind === "glow" && mesh.material) {
      mesh.material.emissiveIntensity = item.base + Math.sin(t * item.speed) * item.amp;
    }
    if (kind === "spinY") {
      mesh.rotation.y += item.speed * 0.016;
    }
    if (kind === "galaxy") {
      mesh.rotation.y += 0.002;
    }
    if (kind === "particle") {
      const { bounds, speed, phase } = item;
      mesh.position.x = Math.sin(t * speed + phase) * bounds.x;
      mesh.position.y = bounds.y[0] + (Math.sin(t * speed * 1.3 + phase) + 1) * 0.5 * (bounds.y[1] - bounds.y[0]);
      mesh.position.z = Math.cos(t * speed + phase) * bounds.z;
    }
  });
}

export function disposeScenes3D() {
  activeScenes.forEach((runner) => runner.dispose());
  activeScenes.clear();
}

export async function initScene3D(root = document) {
  const containers = root.querySelectorAll("[data-scene3d]:not([data-scene-bound])");
  await Promise.all([...containers].map(async (container) => {
    container.dataset.sceneBound = "1";
    const type = container.dataset.scene3d;
    const runner = new SceneRunner(container, type);
    activeScenes.set(container, runner);
    try {
      await runner.mount();
    } catch (error) {
      console.warn("Scene3D init failed:", type, error);
      container.innerHTML = `<p class="scene3d-fallback">Không tải được mô hình 3D. Thử tải lại trang.</p>`;
    }
  }));
}
