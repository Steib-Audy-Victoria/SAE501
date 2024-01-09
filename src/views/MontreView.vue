<template>
  <div>
    <h1>Détails de la Montre</h1>

    {{ montre }}

    <div v-if="montre">
      <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
      <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
      <p><strong>Boitier:</strong> {{ montre.NomBoitier }}</p>
      <p><strong>Texture Boitier:</strong> {{ montre.TextureBoitier }}</p>
      <p><strong>Pierre:</strong> {{ montre.NomPierre }}</p>
      <p><strong>Bracelet:</strong> {{ montre.NomBracelet }}</p>
      <p><strong>Texture Bracelet:</strong> {{ montre.TextureBracelet }}</p>
      <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p>
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
      montre: null
    }
  },
  mounted() {
    const MontreId = this.$route.params.id
    console.log(MontreId)

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
  }
}
</script>
