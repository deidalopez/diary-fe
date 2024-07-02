const createPost = async (data) => {
  const post = {
    date: data.date,
    title: data.title,
    content: data.content,
  };

  try {
    const response = await fetch("http://localhost:4000/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const body = await response.text();
    // const newPost = JSON.parse(body);

    return response;
    // if (!response.ok) {
    //   setError("error in new post");
    // }

    // if (response.ok) {
    //   reset();
    //   console.log("new post created", newPost);
    // }
  } catch (error) {
    console.error(error);
  }
};

export default createPost;
