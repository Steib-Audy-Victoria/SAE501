<script setup>
import MyButton from '@/components/elements/MyButton.vue'
</script>

<template>
  <div class="Montres">
    <h1 class="Montres__titre">Liste des Montres Configurées par l'utilisateur</h1>

    <div class="Montres__liste">
      <ul class="Montres__liste-ul" v-for="montre in montres" :key="montre.MontreID">
        <li><strong>ID Montre:</strong> {{ montre.MontreID }}</li>
        <li><strong>Nom Montre:</strong> {{ montre.NomMontre }}</li>
        <li><strong>Nom Boitier:</strong> {{ montre.NomBoitier }}</li>
        <li><strong>Nom Texture du Boitier:</strong> {{ montre.TextureBoitier }}</li>
        <li><strong>Nom Pierre:</strong> {{ montre.NomPierre }}</li>
        <!-- <li><strong>Nom Bracelet:</strong> {{ montre.NomBracelet }}</li> -->
        <li><strong>Nom Texture du Bracelet:</strong> {{ montre.TextureBracelet }}</li>
        <li><strong>Prix Total:</strong> {{ montre.PrixTotal }} €</li>

        <MyButton class="Montres__liste-button" size="small" variant="rounded">
          <RouterLink class="Montres__liste-button-link" :to="`/montre/${montre.MontreID}`">
            Voir la montre</RouterLink
          >
        </MyButton>
        <MyButton class="Montres__liste-button" size="small" variant="rounded">
          <RouterLink class="Montres__liste-button-link" :to="`/montre2/${montre.MontreID}`">
            Voir la prévisualisation de la montre
          </RouterLink>
        </MyButton>

        <!-- Ajout du bouton "Ajouter au Panier" -->
        <MyButton
          class="Montres__liste-button"
          size="small"
          variant="rounded"
          color="rouge"
          @click="ajouterAuPanier(montre.MontreID)"
        >
          Ajouter au Panier
        </MyButton>
      </ul>
    </div>
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
    },
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
  }
}
</script>

<style lang="scss">
.Montres {
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
    }

    &-button {
      max-width: 200px;
      &-link {
        text-decoration: none;
        color: $blanc;

        &:hover {
          color: $noir;
        }
      }
    }
  }
}
</style>
