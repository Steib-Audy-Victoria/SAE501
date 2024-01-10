<template>
  <div>
    <h1>Détails de la Montre</h1>

    <br />

    <div v-if="montre">
      <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
      <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
      <p><strong>Boitier:</strong> {{ montre.NomBoitier }}</p>
      <p><strong>Texture Boitier:</strong> {{ montre.TextureBoitier }}</p>
      <p><strong>Pierre:</strong> {{ montre.NomPierre }}</p>
      <p><strong>Bracelet:</strong> {{ montre.NomBracelet }}</p>
      <p><strong>Texture Bracelet:</strong> {{ montre.TextureBracelet }}</p>
      <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p>

      <br />

      <!-- Formulaire de modification -->

      <form @submit.prevent="updateWatch">
        <!-- Champ pour le nom de la montre-->
        <label for="NomMontre">Nouveau Nom de la Montre :</label>
        <input v-model="newNomMontre" type="text" required />

        <br />

        <!-- Champ pour le boitier-->
        <label for="BoitierID">Nouveau Boitier :</label>
        <select v-model="newBoitierID" required>
          <option v-for="boitier in boitiers" :key="boitier.BoitierID" :value="boitier.BoitierID">
            {{ boitier.NomBoitier }}
          </option>
        </select>

        <br />

        <!-- Champ pour la texture du boitier-->
        <label for="TextureBoitierID">Nouvelle Texture du Boîtier :</label>
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

        <!-- Champ pour les pierre -->
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

<script>
import axios from 'axios'

export default {
  data() {
    return {
      montre: null,
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
    const MontreId = this.$route.params.id
    console.log(MontreId)

    // Requête GET pour récupérer les détails de la montre
    axios
      .get(`http://localhost:4000/montre/${MontreId}`)
      .then((response) => {
        if (response.data.length > 0) {
          this.montre = response.data[0]
        } else {
          this.montre = null
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des détails de la montre', error)
      })

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
    // Fonction appelée lors de la soumission du formulaire de mise à jour
    updateWatch() {
      // Récupérer l'ID de la montre à partir des paramètres de l'URL
      const MontreId = this.$route.params.id

      // Utiliser une requête PUT pour mettre à jour les détails de la montre
      axios
        .put(`http://localhost:4000/montre/${MontreId}/modif`, {
          NomMontre: this.newNomMontre,
          BoitierID: this.newBoitierID,
          TextureBoitierID: this.newTextureBoitierID,
          PierreID: this.newPierreID,
          BraceletID: this.newBraceletID,
          TextureBraceletID: this.newTextureBraceletID
        })
        .then((response) => {
          console.log(response.data.message)
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de la montre', error)
        })
    },

    deleteWatch() {
      // Récupérer l'ID de la montre à partir des paramètres de l'URL
      const MontreId = this.$route.params.id

      // Utiliser une requête DELETE pour supprimer la montre
      axios
        .delete(`http://localhost:4000/montre/${MontreId}/suppr`)
        .then((response) => {
          console.log(response.data.message)
          // Rediriger l'utilisateur vers la liste des montres après la suppression
          this.$router.push('/montres')
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la montre', error)
        })
    }
  }
}
</script>
