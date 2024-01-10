<template>
  <div>
    <h1>Liste du Panier</h1>

    <ul v-if="panier.length > 0">
      <li v-for="article in panier" :key="article.PanierID">
        <p><strong>Nom Montre:</strong> {{ article.NomMontre }}</p>
        <p><strong>Nom Boitier:</strong> {{ article.NomBoitier }}</p>
        <p><strong>Texture Boitier:</strong> {{ article.TextureBoitier }}</p>
        <p><strong>Quantité:</strong> {{ article.Quantite }}</p>
        <p><strong>Prix Total:</strong> {{ article.PrixTotal }} €</p>

        <br />
        <!-- Ajout du bouton "Supprimer du Panier" -->
        <button @click="supprimerDuPanier(article.PanierID)">Supprimer du Panier</button>
        <hr />
      </li>
    </ul>

    <p v-else>Aucun article dans le panier.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      panier: []
    }
  },
  methods: {
    // Méthode pour supprimer un article du panier
    supprimerDuPanier(PanierID) {
      const token = localStorage.getItem('token')

      if (!token) {
        alert('Vous devez être connecté pour supprimer une montre du panier.')
        this.$router.push('/connexion')
        return
      }

      const headers = { Authorization: token }

      // Envoyer la requête pour supprimer l'article du panier
      axios
        .delete(`http://localhost:4000/panier/${PanierID}/suppr`, { headers })
        .then((response) => {
          console.log(response.data.message)
          alert('Article supprimé du panier avec succès!')
          // Actualiser la liste du panier après la suppression
          this.actualiserPanier()
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de l'article du panier",
            error.response.data.error
          )
          alert("Erreur lors de la suppression de l'article du panier. Veuillez réessayer.")
        })
    },

    // Actualiser la liste du panier
    actualiserPanier() {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Vous devez être connecté pour actualiser le panier.')
        this.$router.push('/connexion')
        return
      }
      const headers = { Authorization: token }

      // Envoyer la requête pour récupérer la liste mise à jour du panier
      axios
        .get('http://localhost:4000/panier/liste', { headers })
        .then((response) => {
          this.panier = response.data
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du panier', error)
          alert('Erreur lors de la récupération du panier. Veuillez réessayer.')
        })
    }
  },
  mounted() {
    const token = localStorage.getItem('token')

    // Vérifier si l'utilisateur est connecté
    if (!token) {
      alert('Vous devez être connecté pour voir le panier.')
      // Rediriger l'utilisateur vers la page de connexion
      this.$router.push('/connexion')
      return
    }

    // Configurer le header avec le token
    const headers = { Authorization: token }

    // Envoyer la requête pour récupérer la liste du panier
    axios
      .get('http://localhost:4000/panier/liste', { headers })
      .then((response) => {
        this.panier = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du panier', error)
        alert('Erreur lors de la récupération du panier. Veuillez réessayer.')
      })
  }
}
</script>
