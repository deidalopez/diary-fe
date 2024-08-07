import apiUrl from "../utils/getUrl";

const getPosts = async ({ user }) => {
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  try {
    const response = await fetch(`${apiUrl}/api/posts`, {
      headers,
    });

    const json = await response.json();

    if (response.ok) {
      return { response, json };
    }
  } catch (error) {
    console.log("error in getPosts", error);
  }
};

export default getPosts;
