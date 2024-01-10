<template>
  <div>
    <h1>Ajouter une Montre</h1>

    <form @submit.prevent="addWatch">
      <!-- Champ pour le nom de la montre -->
      <label for="NomMontre">Nom de la Montre :</label>
      <input v-model="newNomMontre" type="text" required />

      <br />

      <!-- Champ pour le boitier -->
      <label for="BoitierID">Boitier :</label>
      <select v-model="newBoitierID" required>
        <option v-for="boitier in boitiers" :key="boitier.BoitierID" :value="boitier.BoitierID">
          {{ boitier.NomBoitier }}
        </option>
      </select>

      <br />

      <!-- Champ pour la texture du boitier -->
      <label for="TextureBoitierID">Texture du Boîtier :</label>
      <select v-model="newTextureBoitierID" required>
        <option
          v-for="textureBoitier in texturesBoitier"
          :key="textureBoitier.TextureBoitierID"
          :value="textureBoitier.TextureBoitierID"
        >
          {{ textureBoitier.NomTexture }}
        </option>
      </select>

      <br />

      <!-- Champ pour la pierre -->
      <label for="PierreID">Pierre :</label>
      <select v-model="newPierreID" required>
        <option v-for="pierre in pierres" :key="pierre.PierreID" :value="pierre.PierreID">
          {{ pierre.NomPierre }}
        </option>
      </select>

      <br />

      <!-- Champ pour le bracelet -->
      <label for="BraceletID">Bracelet :</label>
      <select v-model="newBraceletID" required>
        <option
          v-for="bracelet in bracelets"
          :key="bracelet.BraceletID"
          :value="bracelet.BraceletID"
        >
          {{ bracelet.NomBracelet }}
        </option>
      </select>

      <br />

      <!-- Champ pour la texture du bracelet -->
      <label for="TextureBraceletID">Texture du Bracelet :</label>
      <select v-model="newTextureBraceletID" required>
        <option
          v-for="textureBracelet in texturesBracelet"
          :key="textureBracelet.TextureBraceletID"
          :value="textureBracelet.TextureBraceletID"
        >
          {{ textureBracelet.NomTexture }}
        </option>
      </select>

      <br />

      <button type="submit">Ajouter la Montre</button>
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
        .post('http://localhost:4000/montre/ajout', {
          NomMontre: this.newNomMontre,
          BoitierID: this.newBoitierID,
          TextureBoitierID: this.newTextureBoitierID,
          PierreID: this.newPierreID,
          BraceletID: this.newBraceletID,
          TextureBraceletID: this.newTextureBraceletID
        })
        .then((response) => {
          console.log(response.data.message)
          // Rediriger l'utilisateur vers une autre page après l'ajout réussi
          this.$router.push('/montres')
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la montre", error.response.data.error)
        })
    }
  }
}
</script>
