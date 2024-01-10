<script setup></script>

<template>
  <div class="presentation">
    <h2 class="presentation__sstitre">Grâce à TiK•TaK personnaliser votre montre !</h2>
    <p class="presentation__text">
      Chez TiK•TaK, nous croyons que chaque montre devrait être aussi unique que la personne qui la
      porte. C'est pourquoi nous vous offrons la possibilité de créer votre montre personnalisée,
      conçue sur mesure pour refléter votre style et votre individualité. Explorez notre gamme de
      montres personnalisables et commencez à créer la montre parfaite qui accompagnera chaque
      moment de votre vie.
    </p>
  </div>
</template>

<style lang="scss">
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  padding: 2rem;

  &__sstitre {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  &__text {
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
  }
}
</style>
