import apiUrl from "../utils/getUrl";

const editPost = async ({ id, data, user }) => {
  try {
    const response = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const body = await response.text();
    const json = JSON.parse(body);
    if (response.ok) {
      return { response, json };
    }
  } catch (error) {
    console.log(error);
  }
};

export default editPost;
