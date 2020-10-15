import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserContextProvider = (props) => {
  const [utilisateur, setUtilisateur] = useState({
    matricule: null,
    role: null,
    accessToken: null,
  });

  return (
    <UserContext.Provider value={[utilisateur, setUtilisateur]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
