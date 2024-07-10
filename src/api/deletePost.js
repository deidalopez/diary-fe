import apiUrl from "../utils/getUrl";

const deletePost = async ({ id, user }) => {
  try {
    const response = await fetch(`${apiUrl}/api/posts/${id}`, {
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
