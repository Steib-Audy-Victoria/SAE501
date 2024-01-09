<template>
  <div>
    <h1>Gestion des Configurations</h1>
    <form @submit.prevent="creerConfiguration">
      <label>Boitier:</label>
      <select v-model="BoitierID">
        <option v-for="boitier in Boitiers" :key="boitier.BoitierID" :value="boitier.BoitierID">
          {{ boitier.NomBoitier }}
        </option>
      </select>

      <label>Texture du Boîtier:</label>
      <select v-model="TextureBoitierID">
        <option
          v-for="textureBoitier in TexturesBoitier"
          :key="textureBoitier.TextureBoitierID"
          :value="textureBoitier.TextureBoitierID"
        >
          {{ textureBoitier.NomTexture }}
        </option>
      </select>

      <label>Pierre:</label>
      <select v-model="PierreID">
        <option v-for="pierre in Pierres" :key="pierre.PierreID" :value="pierre.PierreID">
          {{ pierre.NomPierre }}
        </option>
      </select>

      <label>Bracelet:</label>
      <select v-model="BraceletID">
        <option
          v-for="bracelet in Bracelets"
          :key="bracelet.BraceletID"
          :value="bracelet.BraceletID"
        >
          {{ bracelet.NomBracelet }}
        </option>
      </select>

      <label>Texture du Bracelet:</label>
      <select v-model="TextureBraceletID">
        <option
          v-for="textureBracelet in TexturesBracelet"
          :key="textureBracelet.TextureBraceletID"
          :value="textureBracelet.TextureBraceletID"
        >
          {{ textureBracelet.NomTexture }}
        </option>
      </select>

      <label>Prix Total:</label>
      <input type="text" v-model="PrixTotal" />

      <button type="submit">Créer Configuration</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      BoitierID: null,
      PierreID: null,
      BraceletID: null,
      PrixTotal: null,
      TextureBoitierID: null,
      TextureBraceletID: null,
      Boitiers: [],
      Pierres: [],
      Bracelets: [],
      TexturesBoitier: [],
      TexturesBracelet: []
    }
  },
  methods: {
    creerConfiguration() {
      axios
        .post('http://localhost:4000/configurations', {
          BoitierID: this.BoitierID,
          PierreID: this.PierreID,
          BraceletID: this.BraceletID,
          PrixTotal: this.PrixTotal
        })
        .then((response) => {
          console.log('Configuration créée, ID:', response.data.configurationID)
        })
        .catch((error) => {
          console.error('Erreur lors de la création de la configuration', error)
        })
    },
    chargerComposants() {
      // Charger la liste des Boitiers
      axios
        .get('http://localhost:4000/boitiers')
        .then((response) => {
          this.Boitiers = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des Boitiers', error)
        })

      // Charger la liste des Pierres
      axios
        .get('http://localhost:4000/pierres')
        .then((response) => {
          this.Pierres = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des Pierres', error)
        })

      // Charger la liste des Bracelets
      axios
        .get('http://localhost:4000/bracelets')
        .then((response) => {
          this.Bracelets = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des Bracelets', error)
        })
    },
    chargerTextures() {
      // Charger la liste des Textures du Boîtier
      axios
        .get('http://localhost:4000/texturesBoitier')
        .then((response) => {
          this.TexturesBoitier = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des Textures du Boîtier', error)
        })

      // Charger la liste des Textures du Bracelet
      axios
        .get('http://localhost:4000/texturesBracelet')
        .then((response) => {
          this.TexturesBracelet = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des Textures du Bracelet', error)
        })
    }
  },
  mounted() {
    this.chargerComposants()
    this.chargerTextures()
  }
}
</script>

<style></style>
