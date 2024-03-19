import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        // Handle token decoding errors
        console.error("Error decoding token:", error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      setUser(decoded);
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
