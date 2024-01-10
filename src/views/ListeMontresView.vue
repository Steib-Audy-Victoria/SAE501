<template>
  <div>
    <h1>Liste des Montres Configurées</h1>
    <ul>
      <li v-for="montre in montres" :key="montre.MontreID">
        {{ montre }}
      </li>
    </ul>
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
