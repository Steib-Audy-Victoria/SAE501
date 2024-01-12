<template>
  <div>
    <h1>Détails de la Montre</h1>

    <br />

    <div v-if="montre">
      <ThreeJS v-bind="montrePreview" />

      <!-- <p>ciucou {{ montrePreview }}</p> -->

      <!-- <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
      <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
      <p><strong>Boitier:</strong> {{ montre.NomBoitier }}</p>
      <p><strong>Texture Boitier:</strong> {{ montre.TextureBoitier }}</p>
      <p><strong>Pierre:</strong> {{ montre.NomPierre }}</p>
      <p><strong>Bracelet:</strong> {{ montre.NomBracelet }}</p>
      <p><strong>Texture Bracelet:</strong> {{ montre.TextureBracelet }}</p>
      <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p> -->

      <br />

      <!-- Formulaire de modification -->

      <form @submit.prevent="updateWatch">
        <!-- Champ pour le nom de la montre-->
        <label for="NomMontre">Nouveau Nom de la Montre :</label>
        <input v-model="NomMontre" type="text" name="NomMontre" id="NomMontre" required />

        <br />

        <!-- Champ pour le boitier-->
        <label for="FormeBoitier">Nouveau Boitier :</label>
        <select v-model="montrePreview.FormeBoitier" name="FormeBoitier" id="FormeBoitier" required>
          <option v-for="b in FormeBoitier" :key="b.BoitierID" :value="b.FormeBoitier">
            {{ b.NomBoitier }}
          </option>
        </select>

        <br />

        <!-- Champ pour la texture du boitier-->
        <label for="TextureBoitier">Nouvelle Texture du Boîtier :</label>
        <select
          v-model="montrePreview.TextureBoitier"
          name="TextureBoitier"
          id="TextureBoitier"
          required
        >
          <option v-for="tB in TextureBoitier" :key="tB.TextureBoitierID" :value="tB.NomTexture">
            {{ tB.NomTexture }}
          </option>
        </select>

        <br />

        <!-- Champ pour les pierre -->
        <label for="NomPierre">Pierre :</label>
        <select v-model="montrePreview.NomPierre" name="NomPierre" id="NomPierre" required>
          <option v-for="p in NomPierre" :key="p.PierreID" :value="p.NomPierre">
            {{ p.NomPierre }}
          </option>
        </select>

        <br />

        <!-- Champ pour le bracelet
        <label for="BraceletID">Bracelet :</label>
        <select v-model="newBraceletID" >
          <option
            v-for="bracelet in bracelets"
            :key="bracelet.BraceletID"
            :value="bracelet.BraceletID"
          >
            {{ bracelet.NomBracelet }}
          </option>
        </select> -->

        <br />

        <!-- Champ pour la texture du bracelet -->
        <label for="TextureBracelet">Texture du Bracelet :</label>
        <select
          v-model="montrePreview.TextureBracelet"
          name="TextureBracelet"
          id="TextureBracelet"
          required
        >
          <option
            v-for="tBr in TextureBracelet"
            :key="tBr.TextureBraceletID"
            :value="tBr.NomTexture"
          >
            {{ tBr.NomTexture }}
          </option>
        </select>

        <br />

        <button type="submit">Enregistrer les modifications</button>
      </form>

      <br />

      <button type="button" @click="deleteWatch">Supprimer la montre</button>
    </div>

    <div v-else>
      <p>Aucune montre trouvée avec cet ID.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import ThreeJS from '@/components/ThreeJS.vue'

const router = useRouter()
const route = useRoute()

const MontreId = ref([])

const montre = ref(null)
const montrePreview = ref({})

const NomMontre = ref('')
const FormeBoitier = ref([])
const TextureBoitier = ref([])
const NomPierre = ref([])
const TextureBracelet = ref([])

const updateWatch = () => {
  axios
    .put(`http://localhost:4000/montre/${MontreId.value}/modif`, {
      NomMontre: NomMontre.value,
      BoitierID: montrePreview.FormeBoitier,
      TextureBoitierID: montrePreview.TextureBoitier,
      PierreID: montrePreview.NomPierre,
      TextureBraceletID: montrePreview.TextureBracelet
    })
    .then((response) => {
      console.log(response.data.message)
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour de la montre', error)
    })
}

const deleteWatch = () => {
  axios
    .delete(`http://localhost:4000/montre/${MontreId.value}/suppr`)
    .then((response) => {
      console.log(response.data.message)
      // Rediriger l'utilisateur vers la liste des montres après la suppression
      router.push('/montres')
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de la montre', error)
    })
}

const getMontreDetails = () => {
  axios
    .get(`http://localhost:4000/montre/${MontreId.value}`)
    .then((response) => {
      if (response.data.length > 0) {
        montre.value = response.data[0]
        montrePreview.value = response.data[0]
      } else {
        montre.value = null
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails de la montre', error)
    })
}

const getBoitiers = () => {
  axios
    .get('http://localhost:4000/boitiers')
    .then((response) => {
      FormeBoitier.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des boîtiers', error)
    })
}

const getTexturesBoitier = () => {
  axios
    .get('http://localhost:4000/texturesBoitier')
    .then((response) => {
      TextureBoitier.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des textures de boîtiers', error)
    })
}

const getPierres = () => {
  axios
    .get('http://localhost:4000/pierres')
    .then((response) => {
      NomPierre.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des pierres', error)
    })
}

// const getBracelets = () => {
//   axios
//     .get('http://localhost:4000/bracelets')
//     .then((response) => {
//       bracelets.value = response.data
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des bracelets', error)
//     })
// }

const getTexturesBracelet = () => {
  axios
    .get('http://localhost:4000/texturesBracelet')
    .then((response) => {
      TextureBracelet.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des textures de bracelets', error)
    })
}

onMounted(() => {
  MontreId.value = route.params.id

  getMontreDetails()
  getBoitiers()
  getTexturesBoitier()
  getPierres()
  // getBracelets()
  getTexturesBracelet()
})
</script>
