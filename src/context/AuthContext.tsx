import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Permission {
  application: {
    name: string;
    description: string;
    developUrl: string;
    homologUrl: string;
    productionUrl: string;
  };
  modules: {
    name: string;
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  }[];
}

interface CustomerData {
  name: string;
  userName: string;
  empresa: string;
  permissions: Permission[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, isSso: boolean) => void;
  logout: () => void;
  user: CustomerData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CustomerData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const parsedUserData: CustomerData = JSON.parse(userData);
        if (parsedUserData) {
          setUser(parsedUserData);
          verifyToken(token, false).then((isValid) => { // false para não SSO
            if (!isValid) {
              logout();
            } else {
              setIsAuthenticated(true);
            }
          });
        } else {
          logout();
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        logout();
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:5175') return; // Certifique-se de usar o domínio correto do projeto 2

      const { token, customerData } = event.data;
      if (token && customerData) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(customerData));
        setUser(customerData);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const login = async (token: string, isSso: boolean) => {
    if (token) {
      try {
        const response = await axios.post(
          isSso ? 'http://localhost:8989/api/auth/validate-jwt' : 'http://localhost:8989/api/auth/login',
          { token }
        );

        const userData = response.data.customerData || response.data;

        console.log('Saving token and user data:', token, userData);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching user data:', error.response || error.message);
        logout();
      }
    } else {
      console.error('Token is undefined');
    }
  };

  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const verifyToken = async (token: string, isSso: boolean): Promise<boolean> => {
  try {
    console.log('Verifying token:', token);
    const response = await axios.post(
      isSso ? 'http://localhost:8989/api/auth/validate-jwt' : 'http://localhost:8989/api/auth/login',
      { token },
      {
        headers: {
          "Content-Type": 'application/json'
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error verifying token:', error.response || error.message);
    return false;
  }
};
