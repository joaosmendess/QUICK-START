import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    const handleTokenValidation = async (token: string) => {
      try {
        const response = await fetch('http://localhost:8989/api/auth/validate-jwt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.token) {
            localStorage.setItem('token', data.token); // Guarda o token retornado no localStorage
            navigate('/dashboard', { replace: true }); // Redireciona para o dashboard com o novo token na URL
          } else {
            console.error('Token não retornado na resposta:', data);
            navigate('/login', { replace: true }); // Redireciona para a página de login
          }
        } else {
          console.error('Erro HTTP ao validar token:', response.status);
          navigate('/login', { replace: true }); // Redireciona para a página de login
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        navigate('/login', { replace: true }); // Redireciona para a página de login
      }
    };

    if (token) {
      handleTokenValidation(token);
    } else {
      console.error('Token não encontrado na URL');
      navigate('/login', { replace: true }); // Redireciona para a página de login
    }
  }, [location.search, navigate]);

  return null; // Este componente não precisa renderizar nada
};

export default Callback;
