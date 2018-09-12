init = () => {
  window.addEventListener('resize', resizeWindow);
  /* START */
  var scene = new THREE.Scene();
  
  // Camera Setting
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.x = 0;
  camera.position.y = -2000;
  camera.position.z = 200;
  camera.lookAt(scene.position);
  
  // Controls Setting
  var controls = new THREE.OrbitControls(camera);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.zoomSpeed = 0.5;
  controls.rotateSpeed = 0.04;
  controls.update();
  
  // Renderer Setting
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  
  // Define Light
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 60, 30);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 5120;
  spotLight.shadow.mapSize.height = 5120;
  scene.add(spotLight);

  var sphereGeometry = new THREE.SphereGeometry(10, 40, 32);
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
  sphereMaterial.opacity = 0.1;
  
  // Add Multiple Objects
  for(i=1; i<=1000; i++) {
    let sprite = new THREE.TextSprite({
      textSize: 10,
      redrawInterval: 250,
      texture: {
        text: 'TEST TEST',
        fontFamily: 'Arial, Helvetica, sans-serif',
        strokeStyle: 'white'
      },
      material: {
        color: 'white',
        fog: true,
      },
    });
    sprite.opacity = 0.1;
    sprite.position.x = Math.random() * 2000-1000;
    sprite.position.y = Math.random() * 2000-1000;
    sprite.position.z = Math.random() * 2000-1000;
    scene.add(sprite);
  }

  // Add to DOM and Rendering
  document.getElementById("threejs").appendChild(renderer.domElement);
  renderScene();

  /* END */
  
  // Render Scene
  function renderScene() {
    requestAnimationFrame(renderScene);
    controls.update();
    renderer.render(scene, camera);
  }
  // Resize Window
  function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

window.onload = init();