import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import styles from "../styles/styles.module.scss";
import createPost from "../api/createPost";
import { usePostsContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import editPost from "../api/editPost";

const NewPost = ({ currentPost, isEdit, callback }) => {

  const { register, handleSubmit, setError, reset, formState } = useForm({
    defaultValues:
      isEdit && currentPost
        ? {
            ...currentPost,
            date: format(new Date(currentPost.date), "yyyy-MM-dd"),
          }
        : {},
  });

  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const onEdit = async (data) => {
    const post = {
      date: data.date,
      title: data.title,
      content: data.content,
    };

    try {
      console.log(post);
      const { response, json } = await editPost({
        id: currentPost._id,
        data: post,
        user,
      });
      if (!response.ok) {
        setError("error in new post");
      }

      if (response.ok) {
        reset();
        const body = await json.text();
        const newPost = JSON.parse(body);
        dispatch({
          type: "EDIT_POST",
          payload: newPost,
        });
      }
      callback();
    } catch (error) {
      console.error("error in new post ", error);
    }
  };

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
    <form
      className={styles.postForm}
      onSubmit={isEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
    >
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
