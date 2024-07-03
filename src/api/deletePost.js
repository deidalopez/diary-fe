const deletePost = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: "DELETE",
    });
    const body = await response.text();
    const json = JSON.parse(body);
    if (response.ok) {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export default deletePost;
