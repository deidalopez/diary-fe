import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import deletePost from "../api/deletePost";
import { usePostsContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../styles/styles.module.scss";

const PostHead = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClickDelete = async () => {
    const { response, json } = await deletePost({ id: post._id, user });

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <li className={styles.postContainer}>
      <span className={styles.postHeadHeader}>
        <h2>
          <Link to={`/api/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <div>
          <span
            className="material-symbols-outlined"
            onClick={handleClickDelete}
          >
            delete
          </span>
          <Link to={`/api/posts/${post._id}`}>
            <span
              className="material-symbols-outlined"
              // onClick={handleClickEdit}
            >
              edit
            </span>
          </Link>
        </div>
      </span>
      <div>{format(new Date(post.date), "MMMM d, y")}</div>
      <p>{post.content.substring(0, 400) + " ..."}</p>
    </li>
  );
};

export default PostHead;
