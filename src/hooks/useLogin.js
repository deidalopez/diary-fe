import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import apiUrl from "../utils/getUrl";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(null);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

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

  return { login, error, loading };
};

export default useLogin;
