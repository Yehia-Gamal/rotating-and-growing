// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set up the maximum size for the cube
const maxSize = 2;

// Set up the mouseIsScrolling variable
let mouseIsScrolling = false;

// Add an event listener to detect when the mouse is being scrolled
document.addEventListener("mousewheel", () => {
  mouseIsScrolling = true;
});

// Set up the easing functions
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const easeOutQuad = (t) => t * (2 - t);

// Set up the initial rotation and growth values
let rotation = 0;
let growth = 1;

// Set up the target rotation and growth values
let targetRotation = 0.01;
let targetGrowth = 1.01;

// Position the camera
camera.position.z = 5;

// Start the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Check if the mouse is being scrolled
  if (mouseIsScrolling) {
    // Update the rotation and growth values using the easing functions
    rotation = easeInOutQuad(rotation / targetRotation) * targetRotation;
    growth = easeOutQuad(growth / targetGrowth) * targetGrowth;

    // Apply the rotation and growth values to the cube
    cube.rotation.x += rotation;
    cube.rotation.y += rotation;
    cube.scale.x = growth;
    cube.scale.y = growth;
    cube.scale.z = growth;
  }
}

// Position the camera
camera.position.z = 5;

// Start the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Check if the mouse is being scrolled
  if (mouseIsScrolling) {
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Grow the cube
    cube.scale.x += 0.01;
    cube.scale.y += 0.01;
    cube.scale.z += 0.01;

    // Stop growing the cube if it reaches the maximum size
    if (cube.scale.x > maxSize) {
      cube.scale.x = maxSize;
      cube.scale.y = maxSize;
      cube.scale.z = maxSize;
    }
  } else {
    // Reset the mouseIsScrolling variable if the mouse is not being scrolled
    mouseIsScrolling = true;
  }

  // Render the scene
  renderer.render(scene, camera);
}
animate();
