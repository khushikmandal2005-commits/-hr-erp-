import { useState, useEffect } from 'react';
import { getAuthToken } from '../utils/helpers';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      // Dummy user state until backend integration
      setUser({ name: 'Admin User', role: 'ADMIN' });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, user, loading };
};
