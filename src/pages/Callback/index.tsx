import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const CallbackPage: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
   
 

    if (token ) {
      login(token);
    } else {
   console.log('oi');
   
 
    } 
  }, [login]);

  return (
    <div>
      <h1>Processando autenticação...</h1>
    </div>
  );
};

export default CallbackPage;
