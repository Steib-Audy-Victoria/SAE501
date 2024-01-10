<template>
  <div>
    <h1>Liste des Montres Configurées</h1>
    <li v-for="montre in montres" :key="montre.MontreID">
      <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
      <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
      <p><strong>Nom Boitier:</strong> {{ montre.NomBoitier }}</p>
      <p><strong>Nom Texture du Boitier:</strong> {{ montre.TextureBoitier }}</p>
      <p><strong>Nom Pierre:</strong> {{ montre.NomPierre }}</p>
      <p><strong>Nom Bracelet:</strong> {{ montre.NomBracelet }}</p>
      <p><strong>Nom Texture du Bracelet:</strong> {{ montre.TextureBracelet }}</p>
      <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p>
      <RouterLink :to="`/montre/${montre.MontreID}`">Voir la montre</RouterLink>
      <hr />
    </li>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      montres: []
    }
  },
  mounted() {
    this.getMontresConfiguredByUser()
  },
  methods: {
    // Méthode pour récupérer la liste des montres configurées par l'utilisateur
    getMontresConfiguredByUser() {
      const token = localStorage.getItem('token')

      // Vérifier si l'utilisateur est connecté
      if (!token) {
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/connexion')
        return
      }

      // Configurer le header avec le token
      const headers = { Authorization: token }

      // Effectuer la requête pour récupérer la liste des montres configurées par l'utilisateur
      axios
        .get('http://localhost:4000/montresConfiguredByUser', { headers })
        .then((response) => {
          console.log(response.data)
          this.montres = response.data
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des montres configurées:', error)
        })
    }
  }
}
</script>

<style></style>
