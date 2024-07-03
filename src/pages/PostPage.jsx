import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPost from "../api/getPost";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { json } = await getPost(id);
        setPost(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return null;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
    </div>
  );
};

export default PostPage;
