<template>
  <h1>Liste des Montres</h1>

  <li v-for="montre in montres" :key="montre.MontreID">
    <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
    <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
    <p><strong>Nom Boitier:</strong> {{ montre.NomBoitier }}</p>
    <p><strong>Nom Texture du Boitier:</strong> {{ montre.TextureBoitier }}</p>
    <p><strong>Nom Pierre:</strong> {{ montre.NomPierre }}</p>
    <p><strong>Nom Bracelet:</strong> {{ montre.NomBracelet }}</p>
    <p><strong>Nom Texture du Bracelet:</strong> {{ montre.TextureBracelet }}</p>
    <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p>
    <RouterLink :to="`/montre/${montre.MontreID}`">Voir la montre {{ montre.MontreID }}</RouterLink>
    <hr />
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
