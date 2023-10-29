import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    // Firebase signup logic will go here

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // We return the response

      console.log(res.user);

      // If the response is not ok then
      if (!res) {
        throw new Error("Could not complete the signup");
      }

      // If the response is ok then we update the user profile
      await res.user.updateProfile({ displayName });

      // We dispatch the LOGIN action here
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  // return the values
  return { error, isPending, signup };
};
