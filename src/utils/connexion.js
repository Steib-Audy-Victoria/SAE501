export const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token');
  console.log(token);

  if (!token) {
    // Redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
    next('/connexion');
  } else {
    // Poursuit la navigation si l'utilisateur est connecté
    next();
  }
};

export function deconnecter() {
  localStorage.removeItem('token');
}