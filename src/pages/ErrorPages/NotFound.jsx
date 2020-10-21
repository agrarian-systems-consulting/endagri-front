import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>Erreur 404 - Not Found!</h1>
    <Link to='/analyses'>Retourner à la page des analyses</Link>
  </div>
);

export default NotFound;
