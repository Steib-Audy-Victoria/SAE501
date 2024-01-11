<script setup></script>

<template>
  <div class="Footer">
    <div class="Footer__menu">
      <ul>
        <li><RouterLink class="link" to="/listeMontres">Nos Modèles de montres</RouterLink></li>
        <li><RouterLink class="link" to="/connexion">S'inscrire ou se connecter</RouterLink></li>
        <li><RouterLink class="link" to="/deconnection">Se déconnecter</RouterLink></li>
        <li><RouterLink class="link" to="/ajout">Personnaliser une montre</RouterLink></li>
        <li>
          <RouterLink class="link" to="/montres"
            >Afficher la liste de mes montres personnaliser</RouterLink
          >
        </li>
        <li><RouterLink class="link" to="/panier">Mon panier</RouterLink></li>
      </ul>
    </div>
    <div class="Footer__content">
      <p>© 2024 - Tous droits réservés</p>
    </div>
  </div>
</template>

<style lang="scss">
.Footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $grisClair;
  color: $noir;
  padding: 2rem;
  margin-top: 2rem;

  &__menu {
    ul {
      list-style: none;

      li {
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

  &__content {
    p {
      text-decoration: none;
    }
  }
}
</style>
