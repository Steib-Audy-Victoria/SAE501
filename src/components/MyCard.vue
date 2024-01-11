<script setup>
defineProps({
  NomMontre: String,
  NomUser: String,
  NomBoitier: String,
  NomTextureBoitier: String,
  NomPierre: String,
  NomBracelet: String,
  NomTextureBracelet: String,
  PrixTotal: Number,
  buttonLabel: String
})
</script>
<template>
  <div class="card">
    <ul class="card__liste" v-for="montre in montres" :key="montre.MontreID">
      <li><strong>Nom de la montre :</strong> {{ NomMontre }}</li>
      <li><strong>Nom de l'utilisateur qui la créer :</strong> {{ NomUser }}</li>
      <li><strong>Nom du boitier :</strong> {{ NomBoitier }}</li>
      <li><strong>Nom de la texture du boitier :</strong> {{ NomTextureBoitier }}</li>
      <li><strong>Nom de la pierre :</strong> {{ NomPierre }}</li>
      <li><strong>Nom du bracelet :</strong> {{ NomBracelet }}</li>
      <li><strong>Nom de la texture du bracelet :</strong> {{ NomTextureBracelet }}</li>
      <li><strong>Prix total de la montre :</strong> {{ PrixTotal }} €</li>
    </ul>
  </div>
</template>
<style lang="scss">
.card {
  &__title {
    color: $noir;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem;
  }

  &__liste {
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
}
</style>
