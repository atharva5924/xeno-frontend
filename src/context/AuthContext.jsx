import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        console.log("Google login code:", code);
        const response = await axios.post(
          "http://localhost:3000/api/auth/google",
          {
            code,
          },
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        console.log("Auth successful:", response.data);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
      } catch (error) {
        console.error("Full auth error details:", {
          message: error.message,
          response: {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
          },
          config: error.config,
        });
      }
    },
    flow: "auth-code",
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    googleLogout();
    queryClient.clear();
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
