import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(false);
    setError(null);

    try {
      const response = await fetch("https://diary-api-82gt.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error logging in", error);
      setError("Error logging in");
    }
  };

  return { signup, error, loading };
};

export default useSignup;
