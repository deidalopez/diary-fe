import React from "react";
import { useState, useEffect } from "react";
import PostHead from "../components/PostHead";
import styles from "../styles/styles.module.scss";
import NewPost from "../components/NewPost";

import getPosts from "../api/getPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.log("error fetching posts");
      }
    };

    fetchPost();
  }, []);

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
      <NewPost />
    </div>
  );
};

export default Home;
