import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // log the user In
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete the login request");
      }
      // dispatch the LOGIN action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, login };
};
