// ایجاد صحنه، دوربین و رندر
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// دکمه AR
document.body.appendChild(THREE.ARButton.createButton(renderer));

// افزودن نور به صحنه
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// بارگذاری مدل
const loader = new THREE.GLTFLoader();
loader.load(
  './model.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // تنظیم اندازه مدل
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('خطا در بارگذاری مدل:', error);
  }
);

// حلقه رندر
function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
animate();
