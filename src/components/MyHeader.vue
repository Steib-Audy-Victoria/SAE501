<script setup></script>

<template>
  <div>
    <div class="Header">
      <div class="Header__Titre">
        <h1><RouterLink to="/">Tik•TaK</RouterLink></h1>
      </div>

      <div class="Header__menu">
        <ul>
          <li><RouterLink to="/listeMontres">Nos Modèles</RouterLink></li>
          <li><RouterLink to="/ajout">Personaliser</RouterLink></li>
          <li><RouterLink to="/connexion">Connexion</RouterLink></li>
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
      color: #000;
      text-decoration: none;

      &:hover {
        color: #000;
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
        color: #000;
        text-decoration: none;

        &:hover {
          color: #000;
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
  background: #000;
  border-radius: 10px;
}
</style>
