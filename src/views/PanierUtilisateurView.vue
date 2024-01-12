<script setup>
import MyButton from '@/components/elements/MyButton.vue'
</script>

<template>
  <div class="ListePanier">
    <h3 class="ListePanier__titre">Liste du Panier</h3>

    <div class="ListePanier__liste" v-if="panier.length > 0">
      <ul class="ListePanier__liste-ul" v-for="article in panier" :key="article.PanierID">
        <li><strong>Nom Montre:</strong> {{ article.NomMontre }}</li>
        <li><strong>Nom Boitier:</strong> {{ article.NomBoitier }}</li>
        <li><strong>Texture Boitier:</strong> {{ article.TextureBoitier }}</li>
        <li><strong>Quantité:</strong> {{ article.Quantite }}</li>
        <li><strong>Prix Total:</strong> {{ article.PrixTotal }} €</li>

        <!-- Ajout du bouton "Supprimer du Panier" -->
        <MyButton
          class="ListeMontres__liste-ul-button"
          size="small"
          variant="rounded"
          color="rouge"
          @click="supprimerDuPanier(article.PanierID)"
          >Supprimer du Panier</MyButton
        >
      </ul>
    </div>

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

<style lang="scss">
.ListePanier {
  display: flex;
  flex-direction: column;

  &__titre {
    color: $noir;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem;
  }

  &__liste {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    &-ul {
      list-style: none;
      padding: 1rem;
      margin: 1rem 2rem;
      border: 1px solid $gris;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;

      li {
        margin-bottom: 5px;

        strong {
          font-weight: 500;
        }
      }

      &-button {
        margin: 1rem O;
      }
    }
  }
}
</style>
