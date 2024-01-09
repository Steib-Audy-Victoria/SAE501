<template>
  <div>
    <h1>Gestion des Configurations</h1>
    <form @submit.prevent="creerConfiguration">
      <!-- Ajoutez des champs pour chaque composant de la montre -->
      <label>Montre:</label>
      <select v-model="montreID">
        <!-- Liste des montres depuis l'API -->
        <option v-for="montre in montres" :key="montre.ID" :value="montre.ID">
          {{ montre.NomMontre }}
        </option>
      </select>

      <!-- ... Ajoutez des champs pour les autres composants ... -->

      <button type="submit">Créer Configuration</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      montreID: null,
      // ... Ajoutez des variables pour les autres composants ...
      montres: [] // Liste des montres pour le select
    }
  },
  methods: {
    creerConfiguration() {
      // Appeler l'API pour créer une nouvelle configuration
      axios
        .post('http://localhost:4000/configurations', {
          MontreID: this.montreID
          // ... Ajoutez les autres composants ici ...
        })
        .then((response) => {
          console.log('Configuration créée, ID:', response.data.configurationID)
        })
        .catch((error) => {
          console.error('Erreur lors de la création de la configuration', error)
        })
    },
    // Charger la liste des montres lors de la création du composant
    chargerMontres() {
      axios
        .get('http://localhost:4000/montres')
        .then((response) => {
          this.montres = response.data
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des montres', error)
        })
    }
  },
  mounted() {
    this.chargerMontres()
  }
}
</script>

<style></style>
