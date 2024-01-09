<template>
  <h1>Liste des Montres</h1>

  <li v-for="montre in montres" :key="montre.ID">
    {{ montre.MontreID }} - {{ montre.UserID }} - {{ montre.BoitierID }} - {{ montre.PierreID }} -
    {{ montre.BraceletID }} - {{ montre.PrixTotal }} €
  </li>
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
    axios
      .get('http://localhost:4000/montres')
      .then((response) => {
        this.montres = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des montres', error)
      })
  }
}
</script>
