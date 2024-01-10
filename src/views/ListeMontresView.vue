<template>
  <h1>Liste des Montres</h1>

  <li v-for="montre in montres" :key="montre.MontreID">
    <p><strong>ID Montre:</strong> {{ montre.MontreID }}</p>
    <p><strong>Nom de l'utilisateur qui la créer :</strong> {{ montre.NomUser }}</p>
    <p><strong>Nom Montre:</strong> {{ montre.NomMontre }}</p>
    <p><strong>Nom Boitier:</strong> {{ montre.NomBoitier }}</p>
    <p><strong>Nom Texture du Boitier:</strong> {{ montre.TextureBoitier }}</p>
    <p><strong>Nom Pierre:</strong> {{ montre.NomPierre }}</p>
    <p><strong>Nom Bracelet:</strong> {{ montre.NomBracelet }}</p>
    <p><strong>Nom Texture du Bracelet:</strong> {{ montre.TextureBracelet }}</p>
    <p><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</p>
    <br />

    <!-- Ajout du bouton "Ajouter au Panier" -->
    <button @click="ajouterAuPanier(montre.MontreID)">Ajouter au Panier</button>

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
  methods: {
    ajouterAuPanier(montreID) {
      const token = localStorage.getItem('token')

      // Vérifier si l'utilisateur est connecté
      if (!token) {
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/connexion')
        return
      }

      // Configurer le header avec le token
      const headers = { Authorization: token }

      // Envoyer la requête pour ajouter la montre au panier
      axios
        .post(
          'http://localhost:4000/panier/ajout',
          {
            UserID: token,
            MontreID: montreID,
            Quantite: 1
          },
          { headers: headers }
        )
        .then((response) => {
          console.log(response.data.message)
          alert('Montre ajoutée au panier avec succès!')
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la montre au panier", error.response.data.error)
          alert("Erreur lors de l'ajout de la montre au panier. Veuillez réessayer.")
        })
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
