import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostContext";
import getPost from "../api/getPost";
import editPost from "../api/editPost";
import styles from "../styles/styles.module.scss";
import NewPost from "../components/NewPost";

const PostPage = () => {
  const { dispatch } = usePostsContext();
  const { id } = useParams();
  const { user } = useAuthContext();

  const [post, setPost] = useState(null);
  const [editView, setEditView] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { json } = await getPost({ id, user });
        setPost(json);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) fetchPost();
  }, [id, user]);

  const handleEditClick = () =>
    editView ? setEditView(false) : setEditView(true);

  const handleSave = async () => {
    const { response, json } = await editPost({ id: post._id, user });
    if (response.ok) {
      dispatch({ type: "EDIT_POST", payload: json });
    }
  };

  if (!post) {
    return null;
  }

  const EditMode = (
    <div>
      <NewPost post={post} />
    </div>
  );

  const ViewMode = <h3>{post.content}</h3>;

  console.log(editView);
  return (
    <div className={styles.diaryPost}>
      <h1>{post.title}</h1>
      <div>
        <div>{format(new Date(post.date), "MMMM d, y")}</div>
        <span className="material-symbols-outlined" onClick={handleEditClick}>
          {editView ? "close" : "edit"}
        </span>
      </div>

      {editView ? EditMode : ViewMode}
    </div>
  );
};

export default PostPage;
