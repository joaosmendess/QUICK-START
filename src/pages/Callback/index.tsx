import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tokenThresholdLength = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg5ODkvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjAxMTUzODgsImV4cCI6MTcyMDExODk4OCwibmJmIjoxNzIwMTE1Mzg4LCJqdGkiOiJFVndzUVVYM01QM3pRdUNRIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiSm9hbyBNZW5kZXMiLCJ1c2VyTmFtZSI6ImpvYW8ubWVuZGVzIiwiZW1wcmVzYSI6IlRlY2ggSW5ub3ZhdG9ycyBTQSIsInBlcm1pc3Npb25zIjpbXX0.7I4QoBvKJy5Aq2UJnzIS2obOzFVTG6G_-Kek-YHzyXw".length;

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    console.log('Captured token:', token); // Log para depuração

    const handleTokenValidation = async (token:string) => {
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
            localStorage.setItem('token', data.token);
            console.log('Token validado e armazenado:', data.token);
            window.location.href = `http://localhost:5173/dashboard`;
          } else {
            console.error('Token não retornado na resposta:', data);
            navigate('/login', { replace: true });
          }
        } else {
          console.error('Erro HTTP ao validar token:', response.status);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        navigate('/login', { replace: true });
      }
    };

    if (token) {
      if (token.length > tokenThresholdLength) {
        handleTokenValidation(token);
      } else {
        console.log('Token já validado, redirecionando para o dashboard');
        localStorage.setItem('token', token);
        navigate('/dashboard', { replace: true });
      }
    } else {
      console.error('Token não encontrado na URL');
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate]);

  return null; // Este componente não precisa renderizar nada
};

export default Callback;
