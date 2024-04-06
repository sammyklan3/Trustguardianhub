import { createContext, useState, useEffect, useCallback } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { Loader } from '../components/loader/Loader';
import PropTypes from 'prop-types'; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserData = useCallback(async (token) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, [getUserData]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    getUserData(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const deleteProfile = async () => {
    try {
      await axiosInstance.delete("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      logout();
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError(error.response.data.error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, loading, error, deleteProfile }}>
      {
        loading ? <Loader /> : error ? <p>{error}</p> : children
      }
    </AuthContext.Provider>
  );
};

// Add PropTypes for children prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};