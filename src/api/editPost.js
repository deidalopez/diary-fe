import apiUrl from "../utils/getUrl";

const editPost = async ({ data, user }) => {
  try {
    const response = await fetch(`${apiUrl}/api/posts/${data.id}`, {
      method: "PATCH",
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
    console.log(error);
  }
};

export default editPost;
