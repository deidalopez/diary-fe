import React from "react";
import styles from "../styles/styles.module.scss";
import { Link } from "react-router-dom";
import deletePost from "../api/deletePost";
import { usePostsContext } from "../hooks/usePostContext";

const PostHead = ({ post }) => {
  const { dispatch } = usePostsContext();

  const handleClick = async () => {
    const { response, json } = await deletePost(post._id);

    // const response = await fetch(
    //   `http://localhost:4000/api/posts/${post._id}`,
    //   {
    //     method: "DELETE",
    //   }
    // );
    // const body = await response.text();
    // const json = JSON.parse(body);

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div>
      <li>
        <span className={styles.postHeadHeader}>
          <h2>
            <Link to={`/api/posts/${post._id}`}>{post.title}</Link>
          </h2>
          <span className="material-symbols-outlined" onClick={handleClick}>
            <h1>Delete</h1>
          </span>
        </span>
        <div>{post.date}</div>
        <p>{post.content.substring(0, 200) + " ..."}</p>
      </li>
    </div>
  );
};

export default PostHead;