import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import getPosts from "../api/getPosts";
import PostHead from "../components/PostHead";
// import NewPost from "../components/NewPost";
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
    <div className={styles.homeScreen}>
      <div className={styles.column}>
        <h1>Posts</h1>
        <ul className={styles.postList}>
          {posts &&
            posts.map((post) => <PostHead key={post._id} post={post} />)}
        </ul>
      </div>
      <div className={styles.column}>
        {/* <NewPost /> */}
        <Link to={"/new-post"}>
          <button>Make new post</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
