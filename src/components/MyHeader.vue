<script setup></script>

<template>
  <div>
    <div class="Header">
      <div class="Header__Titre">
        <h1><RouterLink class="link" to="/">Tik•TaK</RouterLink></h1>
      </div>

      <div class="Header__menu">
        <ul>
          <li><RouterLink class="link" to="/listeMontres">Nos Modèles</RouterLink></li>
          <li><RouterLink class="link" to="/ajout">Personnaliser</RouterLink></li>
          <li><RouterLink class="link" to="/connexion">Connexion</RouterLink></li>
        </ul>
      </div>
    </div>
    <hr class="Ligne" />
  </div>
</template>

<style lang="scss">
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 10vh;

  &__Titre {
    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: $noir;
      text-decoration: none;

      &:hover {
        color: $rouge;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  &__menu {
    ul {
      display: flex;
      list-style: none;

      li {
        margin-left: 2rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: $noir;
        text-decoration: none;

        &:hover {
          color: $bordeaux;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

.Ligne {
  border: 0;
  height: 2px;
  width: 95%;
  background: $noir;
  border-radius: 10px;
}
</style>
