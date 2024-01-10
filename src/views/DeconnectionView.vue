<template>
  <div>
    <h1>Déconnections</h1>
    <button @click="deconnecter">Se déconnecter</button>
    <p>{{ deconnexionMessage }}</p>
    <!-- Reste du contenu de la page -->
  </div>
</template>

<script>
import { deconnecter } from '../utils/connexion.js'

export default {
  data() {
    return {
      deconnexionMessage: ''
    }
  },
  methods: {
    deconnecter() {
      // Appel de la fonction deconnexion
      deconnecter()

      // Mise à jour de la propriété deconnexionMessage
      this.deconnexionMessage = 'Vous vous êtes déconnecté avec succès.'

      // Redirige l'utilisateur vers la page d'accueil
      this.$router.push('/')
    }
    // Reste des méthodes du composant
  }
}
</script>

<style></style>
