import { useAuthContext } from "./useAuthContext";
import { usePostsContext } from "./usePostContext";

const useLogout = () => {
  const { dispatch: dispatchUser } = useAuthContext();
  const { dispatch: dispatchPost } = usePostsContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatchUser({ type: "LOGOUT" });
    dispatchPost({ type: "SET_POSTS", payload: null });
  };

  return { logout };
};

export default useLogout;
