export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    console.error(
      'Problème de contruction du Header Authorization dans le fichier auth-header.js'
    );
    return {};
  }
}
