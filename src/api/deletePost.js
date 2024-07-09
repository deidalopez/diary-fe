const deletePost = async ({ id, user }) => {
  try {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const body = await response.text();
    const json = JSON.parse(body);

    if (response.ok) {
      return { response, json };
    }
  } catch (error) {
    console.error(error);
  }
};

export default deletePost;
