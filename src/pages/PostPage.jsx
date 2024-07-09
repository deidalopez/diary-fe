import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPost from "../api/getPost";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuthContext();

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

  if (!post) {
    return null;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{format(new Date(post.date), "MMMM d, y")}</div>
      <h3>{post.content}</h3>
    </div>
  );
};

export default PostPage;
