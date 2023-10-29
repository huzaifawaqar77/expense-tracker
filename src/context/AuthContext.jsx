import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGOUT":
        return { ...state, user: null };
      case "LOGIN":
        return {
          ...state,
          user: action.payload,
        };
      case "AUTH_READY":
        return { ...state, isAuthReady: true, user: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_READY", payload: user });
    });
    return () => unsub();
  }, []);

  console.log("Auth Context State: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
