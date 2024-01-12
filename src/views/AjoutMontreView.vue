<template>
  <div class="ajout">
    <h3 class="ajout__titre">Ajouter une Montre</h3>

    <form class="ajout__form" @submit.prevent="addWatch">
      <!-- Champ pour le nom de la montre -->
      <label class="ajout__form-label" for="NomMontre">Nom de la Montre :</label>
      <input class="ajout__form-input" v-model="newNomMontre" type="text" required />

      <!-- Champ pour le boitier -->
      <label class="ajout__form-label" for="BoitierID">Boitier :</label>
      <select class="ajout__form-select" v-model="newBoitierID" required>
        <option v-for="boitier in boitiers" :key="boitier.BoitierID" :value="boitier.BoitierID">
          {{ boitier.NomBoitier }}
        </option>
      </select>

      <!-- Champ pour la texture du boitier -->
      <label class="ajout__form-label" for="TextureBoitierID">Texture du Boîtier :</label>
      <select class="ajout__form-select" v-model="newTextureBoitierID" required>
        <option
          v-for="textureBoitier in texturesBoitier"
          :key="textureBoitier.TextureBoitierID"
          :value="textureBoitier.TextureBoitierID"
        >
          {{ textureBoitier.NomTexture }}
        </option>
      </select>

      <!-- Champ pour la pierre -->
      <label class="ajout__form-label" for="PierreID">Pierre :</label>
      <select class="ajout__form-select" v-model="newPierreID" required>
        <option v-for="pierre in pierres" :key="pierre.PierreID" :value="pierre.PierreID">
          {{ pierre.NomPierre }}
        </option>
      </select>

      <!-- Champ pour la texture du bracelet -->
      <label class="ajout__form-label" for="TextureBraceletID">Texture du Bracelet :</label>
      <select class="ajout__form-select" v-model="newTextureBraceletID" required>
        <option
          v-for="textureBracelet in texturesBracelet"
          :key="textureBracelet.TextureBraceletID"
          :value="textureBracelet.TextureBraceletID"
        >
          {{ textureBracelet.NomTexture }}
        </option>
      </select>

      <button class="ajout__form-button" type="submit">Ajouter la Montre</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      newNomMontre: '',
      newBoitierID: null,
      newTextureBoitierID: null,
      newPierreID: null,
      newBraceletID: null,
      newTextureBraceletID: null,
      boitiers: [],
      texturesBoitier: [],
      pierres: [],
      bracelets: [],
      texturesBracelet: []
    }
  },
  mounted() {
    // Récupérer la liste des boîtiers
    axios
      .get('http://localhost:4000/boitiers')
      .then((response) => {
        this.boitiers = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des boîtiers', error)
      })
    // Récupérer la liste des textures de boîtiers
    axios
      .get('http://localhost:4000/texturesBoitier')
      .then((response) => {
        this.texturesBoitier = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des textures de boîtiers', error)
      })
    // Récupérer la liste des pierres
    axios
      .get('http://localhost:4000/pierres')
      .then((response) => {
        this.pierres = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des pierres', error)
      })
    // Récupérer la liste des bracelets
    axios
      .get('http://localhost:4000/bracelets')
      .then((response) => {
        this.bracelets = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des bracelets', error)
      })
    // Récupérer la liste des textures de bracelets
    axios
      .get('http://localhost:4000/texturesBracelet')
      .then((response) => {
        this.texturesBracelet = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des textures de bracelets', error)
      })
  },
  methods: {
    addWatch() {
      axios
        .post(
          'http://localhost:4000/montre/ajout',
          {
            NomMontre: this.newNomMontre,
            BoitierID: this.newBoitierID,
            TextureBoitierID: this.newTextureBoitierID,
            PierreID: this.newPierreID,
            BraceletID: this.newBraceletID,
            TextureBraceletID: this.newTextureBraceletID
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          console.log(response.data.message)
          // Rediriger l'utilisateur vers la page des montres qu'il a configuré après l'ajout réussi
          this.$router.push('/montres')
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la montre", error.response.data.error)
        })
    }
  }
}
</script>

<style lang="scss">
.ajout {
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

  &__form {
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
}
</style>
