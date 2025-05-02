// filepath: c:\CODES\FE\my-react-app\src\context\AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct ES Module import


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded.name); 
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserName("");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setIsLoggedIn(true);
    setUserName(decoded.name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}