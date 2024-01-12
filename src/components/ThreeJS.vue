<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, onUpdated, onBeforeUnmount } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

const props = defineProps({
  TextureBoitier: String,
  FormeBoitier: String,
  TextureBracelet: String,
  NomPierre: String
})

const proprietes = toRefs(props)

const CouleurPierre = ref([])

const canvas = ref(null)
let controls,
  scene,
  camera,
  renderer = null
let clock = new THREE.Clock()
let animationId = null
let aiguilleHeures, aiguilleMinutes, aiguilleSecondes, Boitier, Pierre, Bracelet, Fermoir, Bouton

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

  if (proprietes.FormeBoitier.value == 'Boitier_rond') {
    Boitier = objects.getObjectByName('boitier_rond')
  } else {
    Boitier = objects.getObjectByName('boitier_carre')
  }
  const textureLoaderBoitier = new TextureLoader()
  const TextureBoitier = textureLoaderBoitier.load(
    `/images/background_${proprietes.TextureBoitier.value}.png`
  )

  Boitier.material[1] = new THREE.MeshBasicMaterial({
    map: TextureBoitier
  })

  // Bouton
  Bouton = objects.getObjectByName('bouton')
  Bouton.material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  })

  // Pierre
  if (proprietes.NomPierre.value == 'Rubis') {
    CouleurPierre.value = '#f00'
  } else if (proprietes.NomPierre.value == 'Diamant') {
    CouleurPierre.value = '#00f'
  } else if (proprietes.NomPierre.value == 'Émeraude') {
    CouleurPierre.value = '#0f0'
  }

  Pierre = objects.getObjectByName('pierre')
  Pierre.material = new THREE.MeshBasicMaterial({
    color: CouleurPierre.value
  })

  let Pierre2 = Pierre.clone()
  Pierre2.position.y -= 38

  let Pierre3 = Pierre.clone()
  Pierre3.position.x -= 18.5
  Pierre3.position.y -= 18.75

  let Pierre4 = Pierre.clone()
  Pierre4.position.x += 18.5
  Pierre4.position.y -= 18.75

  // Bracelet

  Bracelet = objects.getObjectByName('bracelet')
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(`/images/texture-${proprietes.TextureBracelet.value}.jpg`)
  Bracelet.material = new THREE.MeshBasicMaterial({ map: texture })

  Fermoir = objects.getObjectByName('fermoir')
  Fermoir.material = new THREE.MeshBasicMaterial({
    color: 0x000000
  })

  scene.add(
    aiguilleHeures,
    aiguilleMinutes,
    aiguilleSecondes,
    Bouton,
    Boitier,
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

onUpdated(() => {
  initScene()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>
