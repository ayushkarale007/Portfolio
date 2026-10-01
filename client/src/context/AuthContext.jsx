import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('portfolio-token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('portfolio-token', token);
      authService.getCurrentUser(token)
        .then((response) => setUser(response.data.user))
        .catch(() => {
          setToken('');
          setUser(null);
          localStorage.removeItem('portfolio-token');
        });
    } else {
      localStorage.removeItem('portfolio-token');
      setUser(null);
    }
  }, [token]);

  const value = useMemo(() => ({
    user,
    token,
    login: async (credentials) => {
      const response = await authService.login(credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      return response;
    },
    logout: () => {
      setToken('');
      setUser(null);
      localStorage.removeItem('portfolio-token');
    }
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
