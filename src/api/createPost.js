const createPost = async ({ data, user }) => {
  const post = {
    date: data.date,
    title: data.title,
    content: data.content,
  };

  try {
    const response = await fetch("https://diary-api-82gt.onrender.com/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
