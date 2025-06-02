import React, { createContext, useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getAuthStatus } from "@/Services/Auth";

//Currently not using this authContext
//Keeping this here in case want to add conditional rendering in the future
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false,
  isLoading: true,

});

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    (async () => {
      try {
        const isAuth = await getAuthStatus();
        console.log("Auth status fetched:", isAuth);
        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};