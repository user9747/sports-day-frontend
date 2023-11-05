import { createContext, useContext, useState } from "react";
import axios from "../../axios";
import { LOCALSTORAGE_KEYS } from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    token: localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN),
    userName: localStorage.getItem(LOCALSTORAGE_KEYS.USERNAME),
    role: localStorage.getItem(LOCALSTORAGE_KEYS.ROLE),
    isAuthenticated: !!localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN),
  });
  
  //set token
  axios.defaults.headers.common["token"] = appState.token;

  const logout = () => {
    setAppState({
      token: "",
      userName: "",
      role: "",
      isAuthenticated: false,
    });
    localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCALSTORAGE_KEYS.ROLE);
    localStorage.removeItem(LOCALSTORAGE_KEYS.USERNAME);
  };
  return (
    <AuthContext.Provider
      value={{
        appState,
        setAppState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth can only be used inside an AuthProvider");
  return auth;
};
