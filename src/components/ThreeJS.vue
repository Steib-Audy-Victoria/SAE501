<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

const canvas = ref(null)
let controls,
  scene,
  camera,
  renderer = null
let clock = new THREE.Clock()
let animationId = null
let aiguilleHeures,
  aiguilleMinutes,
  aiguilleSecondes,
  boitierRond,
  //   boitierCarre,
  Pierre,
  Bracelet,
  Fermoir,
  Bouton

let currentTexture = 'texture-cuir-blanc.jpg'
let currentTextureBoitierRond = 'background_black02.png'

const initScene = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value })
  renderer.setSize(1300, 700)
  renderer.setClearColor(0x222222, 1)
  controls = new OrbitControls(camera, renderer.domElement)

  var loader = new ColladaLoader()
  loader.load('/models/montre.dae', onLoaded, onProgress, onError)
}

// Aiguilles
const updateClock = () => {
  const now = new Date()
  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const hoursRotation = (hours + minutes / 60) * (Math.PI / 6)
  const minutesRotation = (minutes + seconds / 60) * (Math.PI / 30)
  const secondsRotation = seconds * (Math.PI / 30)

  if (aiguilleHeures) aiguilleHeures.rotation.z = -hoursRotation
  if (aiguilleMinutes) aiguilleMinutes.rotation.z = -minutesRotation
  if (aiguilleSecondes) aiguilleSecondes.rotation.z = -secondsRotation
}

const animate = () => {
  let dt = clock.getDelta()
  updateClock()
  animationId = requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

function onLoaded(collada) {
  let objects = collada.scene

  // Aiguilles
  aiguilleHeures = objects.getObjectByName('aiguille_heures')
  aiguilleHeures.material = new THREE.MeshBasicMaterial({
    color: 0x4f4f4f
  })
  aiguilleMinutes = objects.getObjectByName('aiguille_minutes')
  aiguilleMinutes.material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  })
  aiguilleSecondes = objects.getObjectByName('aiguille_secondes')
  aiguilleSecondes.material = new THREE.MeshBasicMaterial({
    color: 0xf50f00
  })

  // Boitier
  boitierRond = objects.getObjectByName('boitier_rond')
  const textureLoaderBoitierRond = new TextureLoader()
  const textureBoitierRond = textureLoaderBoitierRond.load(
    `public/images/${currentTextureBoitierRond}`
  )
  boitierRond.material = new THREE.MeshBasicMaterial({
    map: textureBoitierRond
  })

  //   boitierCarre = objects.getObjectByName('boitier_carre')
  //   boitierCarre.material = new THREE.MeshBasicMaterial({ color: 0x00ffff })

  Bouton = objects.getObjectByName('bouton')
  Bouton.material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  })

  Pierre = objects.getObjectByName('pierre')
  Pierre.material = new THREE.MeshBasicMaterial({
    color: 0xf50f00
  })

  let Pierre2 = Pierre.clone()
  Pierre2.position.y -= 38

  let Pierre3 = Pierre.clone()
  Pierre3.position.x -= 18.5
  Pierre3.position.y -= 18.75

  let Pierre4 = Pierre.clone()
  Pierre4.position.x += 18.5
  Pierre4.position.y -= 18.75

  Bracelet = objects.getObjectByName('bracelet')
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(`public/images/${currentTexture}`)
  Bracelet.material = new THREE.MeshBasicMaterial({ map: texture })

  Fermoir = objects.getObjectByName('fermoir')
  Fermoir.material = new THREE.MeshBasicMaterial({
    color: 0x000000
  })

  scene.add(
    aiguilleHeures,
    aiguilleMinutes,
    aiguilleSecondes,
    boitierRond,
    Bouton,
    Pierre,
    Pierre2,
    Pierre3,
    Pierre4,
    Bracelet,
    Fermoir
  )

  controls.target.set(0, 0, 0)
  camera.position.set(0, 0, 100)
  controls.update()
}

var onProgress = function (data) {
  if (data.lengthComputable) {
    var percentComplete = (data.loaded / data.total) * 100
    console.log(Math.round(percentComplete, 2) + '% downloaded')
  }
}

var onError = function (data) {
  console.error(data)
}

onMounted(() => {
  initScene()
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>
