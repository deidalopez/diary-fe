const getPost = async ({ id, user }) => {
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  try {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
      headers,
    });

    const json = await response.json();

    if (response.ok) {
      return { response, json };
    }
  } catch (error) {
    console.log(error);
  }
};

export default getPost;
