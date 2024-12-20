import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  // Pokud není uživatel přihlášen, přesměrujeme ho na přihlašovací stránku
  if (!loggedInUser) {
    return <Navigate to="/" />;
  }

  return children;  // V opačném případě zobrazí požadovanou stránku
};

export default PrivateRoute;
