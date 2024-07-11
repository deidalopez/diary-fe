import React from "react";
import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import getPosts from "../api/getPosts";
import PostHead from "../components/PostHead";
import NewPost from "../components/NewPost";
import styles from "../styles/styles.module.scss";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { response, json } = await getPosts({ user });

        if (response.ok) dispatch({ type: "SET_POSTS", payload: json });
      } catch (error) {
        console.log("error fetching posts");
      }
    };

    if (user) fetchPost();
  }, [dispatch, user]);

  console.log(posts);

  if (!posts) {
    return (
      <div>
        <h2>No posts</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Posts</h1>
        <ul className={styles.postList}>
          {posts &&
            posts.map((post) => <PostHead key={post._id} post={post} />)}
        </ul>
      </div>
      <NewPost/>
    </div>
  );
};

export default Home;
