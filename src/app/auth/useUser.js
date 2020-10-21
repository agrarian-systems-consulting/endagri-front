import Axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';

const useUser = () => {
  const [utilisateur, setUtilisateur] = useContext(UserContext);
  const history = useHistory();

  const loginUtilisateur = (matricule, password) => {
    return new Promise((resolve, reject) => {
      Axios.post(`${process.env.REACT_APP_API_URI}/login`, {
        matricule,
        password,
      })
        .then((response) => {
          if (response.data.accessToken) {
            // TODO ? Ajouter Bearer
            localStorage.setItem('user', JSON.stringify(response.data));
            setUtilisateur(response.data);
          }
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  };

  const logoutUtilisateur = () => {
    localStorage.removeItem('user');
    setUtilisateur({ matricule: null, role: null, accessToken: null });
    history.push('/');
  };

  const isLoggedIn = () => {
    return utilisateur.matricule;
  };

  return {
    loginUtilisateur,
    logoutUtilisateur,
    isLoggedIn,
    utilisateur,
  };
};

export default useUser;
