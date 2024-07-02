const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/posts");
    const json = await response.json();
    if (response.ok) {
      return json;
    }
  } catch (error) {
    console.log("error in getPosts", error);
  }
};

export default getPosts;
