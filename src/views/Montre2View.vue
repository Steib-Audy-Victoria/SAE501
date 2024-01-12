<template>
  <div class="preview">
    <h3 class="preview__titre">Détails de la Montre</h3>

    <div class="preview__oui" v-if="montre">
      <ThreeJS class="preview__oui-three" v-bind="montrePreview" />

      <!-- <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
      <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
      <p><strong>Boitier:</strong> {{ montre.NomBoitier }}</p>
      <p><strong>Texture Boitier:</strong> {{ montre.TextureBoitier }}</p>
      <p><strong>Pierre:</strong> {{ montre.NomPierre }}</p>
      <p><strong>Bracelet:</strong> {{ montre.NomBracelet }}</p>
      <p><strong>Texture Bracelet:</strong> {{ montre.TextureBracelet }}</p>
      <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p> -->

      <!-- Formulaire de modification -->

      <form class="preview__oui-form" @submit.prevent="updateWatch">
        <!-- Champ pour le nom de la montre-->
        <label class="preview__oui-form-label" for="NomMontre">Nouveau Nom de la Montre :</label>
        <input
          class="preview__oui-form-input"
          v-model="montrePreview.NomMontre"
          type="text"
          name="NomMontre"
          id="NomMontre"
          required
        />

        <!-- Champ pour le boitier-->
        <label class="preview__oui-form-label" for="FormeBoitier">Nouveau Boitier :</label>
        <select
          class="preview__oui-form-select"
          v-model="montrePreview.FormeBoitier"
          name="FormeBoitier"
          id="FormeBoitier"
          required
        >
          <option v-for="b in FormeBoitier" :key="b.BoitierID" :value="b.FormeBoitier">
            {{ b.NomBoitier }}
          </option>
        </select>

        <!-- Champ pour la texture du boitier-->
        <label class="preview__oui-form-label" for="TextureBoitier"
          >Nouvelle Texture du Boîtier :</label
        >
        <select
          class="preview__oui-form-select"
          v-model="montrePreview.TextureBoitier"
          name="TextureBoitier"
          id="TextureBoitier"
          required
        >
          <option v-for="tB in TextureBoitier" :key="tB.TextureBoitierID" :value="tB.NomTexture">
            {{ tB.NomTexture }}
          </option>
        </select>

        <!-- Champ pour les pierre -->
        <label class="preview__oui-form-label" for="NomPierre">Pierre :</label>
        <select
          class="preview__oui-form-select"
          v-model="montrePreview.NomPierre"
          name="NomPierre"
          id="NomPierre"
          required
        >
          <option v-for="p in NomPierre" :key="p.PierreID" :value="p.NomPierre">
            {{ p.NomPierre }}
          </option>
        </select>

        <!-- Champ pour la texture du bracelet -->
        <label class="preview__oui-form-label" for="TextureBracelet">Texture du Bracelet :</label>
        <select
          class="preview__oui-form-select"
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

        <!-- <button class="preview__oui-form-button"  type="submit">Enregistrer les modifications</button> -->

        <!-- <button class="preview__oui-form-button" type="button" @click="deleteWatch">Supprimer la montre</button> -->
      </form>
    </div>

    <div class="preview__non" v-else>
      <p class="preview__non-p">Aucune montre trouvée avec cet ID.</p>
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
const montrePreview = ref([])

const NomMontre = ref('')
const FormeBoitier = ref([])
const TextureBoitier = ref([])
const NomPierre = ref([])
const TextureBracelet = ref([])

const getMontreDetails = () => {
  axios
    .get(`http://localhost:4000/montre/${route.params.id}`)
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

const updateWatch = () => {
  axios
    .put(`http://localhost:4000/montre/${route.params.id}/modif2`, {
      NomMontre: NomMontre.value,
      FormeBoitier: montrePreview.BoitierID,
      TextureBoitier: montrePreview.TextureBoitierID,
      NomPierre: montrePreview.PierreID,
      TextureBracelet: montrePreview.TextureBraceletID
    })
    .then((response) => {
      console.log(response.data.message)
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour de la montre', error)
      console.log(montrePreview)
    })
}

const deleteWatch = () => {
  axios
    .delete(`http://localhost:4000/montre/${route.params.id}/suppr`)
    .then((response) => {
      console.log(response.data.message)
      // Rediriger l'utilisateur vers la liste des montres après la suppression
      router.push('/montres')
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de la montre', error)
    })
}

onMounted(() => {
  MontreId.value = route.params.id

  getMontreDetails()
  getBoitiers()
  getTexturesBoitier()
  getPierres()
  getTexturesBracelet()
})
</script>

<style lang="scss">
.preview {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__titre {
    color: $noir;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem;
  }

  &__oui {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-three {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-liste {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      &-p {
        color: $noir;

        strong {
          font-weight: 500;
        }
      }
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      &-label {
        color: $noir;
        font-weight: 500;
      }

      &-input,
      &-select {
        padding: 0.5rem;
        border: 1px solid $grisFonce;
        border-radius: 0.25rem;
        font-weight: 500;
        cursor: pointer;
        width: 40%;
      }

      &-button {
        margin: 1rem 0;
        padding: 0.5rem;
        border: 1px solid $grisFonce;
        border-radius: 0.25rem;
        background-color: $grisFonce;
        color: $blanc;
        font-weight: 500;
        cursor: pointer;
        width: 40%;
      }
    }

    &-btnDel {
      margin: 1rem 0;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
      background-color: $grisFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
      width: 40%;
    }
  }

  &__non {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    &-text {
      color: $noir;
      font-weight: 500;
    }
  }
}
</style>
