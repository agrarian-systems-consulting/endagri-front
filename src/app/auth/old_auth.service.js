import axios from 'axios';

const register = (matricule, password, role) => {
  return axios.post(`${process.env.REACT_APP_API_URI}/register`, {
    matricule,
    password,
    role,
  });
};

// const login = (matricule, password) => {
//   return axios
//     .post(`${process.env.REACT_APP_API_URI}/login`, {
//       matricule,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         // TODO Ajouter Bearer ?
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem('user');
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem('user'));
// };

export default {
  register,
  // login,
  // logout,
  // getCurrentUser,
};
