import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/styles.module.scss";
import createPost from "../api/createPost";
import { usePostsContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

const NewPost = () => {
  const { register, handleSubmit, setError, reset, formState } = useForm();
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const onSubmit = async (data) => {
    const post = {
      date: data.date,
      title: data.title,
      content: data.content,
    };

    try {
      const response = await createPost({ data: post, user });
      if (!response.ok) {
        setError("error in new post");
      }

      if (response.ok) {
        reset();
        const body = await response.text();
        const newPost = JSON.parse(body);
        dispatch({ type: "CREATE_POST", payload: newPost });
        console.log("new post created", newPost);
      }
    } catch (error) {
      console.error("error in new post ", error);
    }
  };

  const form = (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>Create a post</h3>
      </div>
      <input
        type="text"
        {...register("title", { required: "required field" })}
        placeholder="Title"
      />
      <p>{formState.errors?.title?.message}</p>
      <input
        type="date"
        {...register("date", { required: "required field" })}
      />
      <p>{formState.errors?.date?.message}</p>
      <textarea
        rows={25}
        className={styles.content}
        {...register("content", { required: "required field" })}
        placeholder="Content"
      />
      <p>{formState.errors?.content?.message}</p>

      <button type="submit" value="submit">
        Create post
      </button>
    </form>
  );

  return form;
};

export default NewPost;
