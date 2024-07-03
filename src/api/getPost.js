const getPost = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`);
    const json = await response.json();

    if (response.ok) {
      return { response, json };
    }
  } catch (error) {
    console.log(error);
  }
};

export default getPost;
