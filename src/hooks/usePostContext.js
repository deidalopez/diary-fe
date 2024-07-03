import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw Error("usePostsContext must be used within a PostContextProvider");
  }
  return context;
};
