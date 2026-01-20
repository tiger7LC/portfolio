/* Cursor */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* Typing */
const roles = [
  "Aspiring Software Developer",
  "Frontend Enthusiast",
  "CSE Student"
];
let i = 0, j = 0;
const typing = document.querySelector(".typing");

function type() {
  if (j < roles[i].length) {
    typing.textContent += roles[i][j++];
    setTimeout(type, 90);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (j > 0) {
    typing.textContent = roles[i].substring(0, --j);
    setTimeout(erase, 40);
  } else {
    i = (i + 1) % roles.length;
    type();
  }
}
type();

/* Magnetic Buttons */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.2}px,
                                   ${(e.clientY - r.top - r.height/2) * 0.2}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

/* Scroll Reveal */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "cinematicIntro 1.3s ease forwards";
    }
  });
});
reveals.forEach(el => observer.observe(el));

/* THREE.JS BACKGROUND */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});
renderer.setSize(innerWidth, innerHeight);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 35;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  renderer.render(scene, camera);
}
animate();
