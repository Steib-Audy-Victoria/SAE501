<!-- code modification montre avec base de donnée qui fonctionne -->

<template>
  <div class="details">
    <h3 class="details__titre">Détails de la Montre</h3>

    <div class="details__oui" v-if="montre">
      <div class="details__oui-liste">
        <p class="details__oui-liste-p"><strong>ID Montre :</strong> {{ montre.MontreID }}</p>
        <p class="details__oui-liste-p"><strong>Nom Montre :</strong> {{ montre.NomMontre }}</p>
        <p class="details__oui-liste-p"><strong>Boitier :</strong> {{ montre.NomBoitier }}</p>
        <p class="details__oui-liste-p">
          <strong>Texture Boitier :</strong> {{ montre.TextureBoitier }}
        </p>
        <p class="details__oui-liste-p"><strong>Pierre :</strong> {{ montre.NomPierre }}</p>
        <p class="details__oui-liste-p">
          <strong>Texture Bracelet :</strong> {{ montre.TextureBracelet }}
        </p>
        <p class="details__oui-liste-p"><strong>Prix Total :</strong> {{ montre.PrixTotal }} €</p>
      </div>

      <!-- Formulaire de modification -->

      <form class="details__oui-form" @submit.prevent="updateWatch">
        <!-- Champ pour le nom de la montre-->
        <label class="details__oui-form-label" for="NomMontre">Nouveau Nom de la Montre :</label>
        <input class="details__oui-form-input" v-model="newNomMontre" type="text" required />

        <!-- Champ pour le boitier-->
        <label class="details__oui-form-label" for="BoitierID">Nouveau Boitier :</label>
        <select class="details__oui-form-select" v-model="newBoitierID" required>
          <option v-for="boitier in boitiers" :key="boitier.BoitierID" :value="boitier.BoitierID">
            {{ boitier.NomBoitier }}
          </option>
        </select>

        <!-- Champ pour la texture du boitier-->
        <label class="details__oui-form-label" for="TextureBoitierID"
          >Nouvelle Texture du Boîtier :</label
        >
        <select class="details__oui-form-select" v-model="newTextureBoitierID" required>
          <option
            v-for="textureBoitier in texturesBoitier"
            :key="textureBoitier.TextureBoitierID"
            :value="textureBoitier.TextureBoitierID"
          >
            {{ textureBoitier.NomTexture }}
          </option>
        </select>

        <!-- Champ pour les pierre -->
        <label class="details__oui-form-label" for="PierreID">Pierre :</label>
        <select class="details__oui-form-select" v-model="newPierreID" required>
          <option v-for="pierre in pierres" :key="pierre.PierreID" :value="pierre.PierreID">
            {{ pierre.NomPierre }}
          </option>
        </select>

        <!-- Champ pour la texture du bracelet -->
        <label class="details__oui-form-label" for="TextureBraceletID">Texture du Bracelet :</label>
        <select class="details__oui-form-select" v-model="newTextureBraceletID" required>
          <option
            v-for="textureBracelet in texturesBracelet"
            :key="textureBracelet.TextureBraceletID"
            :value="textureBracelet.TextureBraceletID"
          >
            {{ textureBracelet.NomTexture }}
          </option>
        </select>

        <!-- Bouton pour soumettre le formulaire -->
        <button class="details__oui-form-button" type="submit">
          Enregistrer les modifications
        </button>

        <!-- Bouton pour supprimer la montre -->
        <button class="details__oui-btnDel" type="button" @click="deleteWatch">
          Supprimer la montre
        </button>
      </form>
    </div>

    <div class="details__non" v-else>
      <p class="details__non-text">Aucune montre trouvée avec cet ID.</p>
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
      newTextureBraceletID: null,
      boitiers: [],
      texturesBoitier: [],
      pierres: [],
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
          TextureBraceletID: this.newTextureBraceletID
        })
        .then((response) => {
          console.log(response.data.message)
          alert('Montre modifié avec succès!')
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
          alert('Montre supprimé avec succès!')
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

<style lang="scss">
.details {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__titre {
    color: $noir;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem;
  }

  &__oui {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &-liste {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      &-p {
        color: $noir;

        strong {
          font-weight: 500;
        }
      }
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      &-label {
        color: $noir;
        font-weight: 500;
      }

      &-input,
      &-select {
        padding: 0.5rem;
        border: 1px solid $grisFonce;
        border-radius: 0.25rem;
        font-weight: 500;
        cursor: pointer;
        width: 40%;
      }

      &-button {
        margin: 1rem 0;
        padding: 0.5rem;
        border: 1px solid $grisFonce;
        border-radius: 0.25rem;
        background-color: $grisFonce;
        color: $blanc;
        font-weight: 500;
        cursor: pointer;
        width: 40%;
      }
    }

    &-btnDel {
      margin: 1rem 0;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
      background-color: $grisFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
      width: 40%;
    }
  }

  &__non {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    &-text {
      color: $noir;
      font-weight: 500;
    }
  }
}
</style>
