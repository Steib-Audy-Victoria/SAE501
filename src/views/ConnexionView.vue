<template>
  <div class="pageInsCon">
    <div class="inscription">
      <h1 class="inscription__titre">Inscription</h1>
      <form class="inscription__form" @submit.prevent="inscrire">
        <label class="inscription__form-label">Nom d'utilisateur:</label>
        <input class="inscription__form-input" v-model="inscriptionNom" required />

        <label class="inscription__form-label">Mot de passe:</label>
        <input
          class="inscription__form-input"
          type="password"
          v-model="inscriptionMotDePasse"
          required
        />

        <button class="inscription__form-button" type="submit">S'inscrire</button>

        <p class="inscription__form-message">{{ inscriptionMessage }}</p>
      </form>
    </div>

    <div class="connexion">
      <h1 class="connexion__titre">Connexion</h1>
      <form class="connexion__form" @submit.prevent="connecter">
        <label class="connexion__form-label">Nom d'utilisateur:</label>
        <input class="connexion__form-input" v-model="connexionNom" required />

        <label class="connexion__form-label">Mot de passe:</label>
        <input
          class="connexion__form-input"
          type="password"
          v-model="connexionMotDePasse"
          required
        />

        <button class="connexion__form-button" type="submit">Se connecter</button>

        <p class="connexion__form-message">{{ connexionMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      inscriptionNom: '',
      inscriptionMotDePasse: '',
      inscriptionMessage: '',
      connexionNom: '',
      connexionMotDePasse: '',
      connexionMessage: ''
    }
  },
  methods: {
    inscrire() {
      axios
        .post('http://localhost:4000/inscription', {
          NomUser: this.inscriptionNom,
          MotDePasse: this.inscriptionMotDePasse
        })
        .then((response) => {
          this.inscriptionMessage = 'Inscription réussie'
          console.log('Inscription réussie, ID utilisateur:', response.data.UserID)
        })
        .catch((error) => {
          this.inscriptionMessage = "Erreur lors de l'inscription"
          console.error("Erreur lors de l'inscription", error)
        })
    },
    connecter() {
      axios
        .post('http://localhost:4000/connexion', {
          NomUser: this.connexionNom,
          MotDePasse: this.connexionMotDePasse
        })
        .then((response) => {
          this.connexionMessage = 'Connexion réussie'
          console.log('Connexion réussie, ID utilisateur:', response.data.UserID)
          // Stocker le token dans le stockage local
          localStorage.setItem('token', response.data.token)
          console.log('Token:', response.data.token)
        })
        .catch((error) => {
          this.connexionMessage = 'Erreur lors de la connexion'
          console.error('Erreur lors de la connexion', error)
        })
    }
  }
}
</script>

<style lang="scss">
.pageInsCon {
  display: flex;
  justify-content: space-around;

  margin: 10rem 0;
}

.inscription {
  display: flex;
  flex-direction: column;
  &__titre {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  &__form {
    display: flex;
    flex-direction: column;
    max-width: 20rem;

    &-label {
      margin-bottom: 0.5rem;
    }

    &-input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
    }

    &-button {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
      background-color: $grisFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
    }
  }
}

.connexion {
  display: flex;
  flex-direction: column;

  &__titre {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  &__form {
    display: flex;
    flex-direction: column;
    max-width: 20rem;

    &-label {
      margin-bottom: 0.5rem;
    }

    &-input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
    }

    &-button {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid $grisFonce;
      border-radius: 0.25rem;
      background-color: $grisFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
