const getPost = async ({ id, user }) => {
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  try {
    const response = await fetch(`https://diary-api-82gt.onrender.com/api/posts/${id}`, {
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
