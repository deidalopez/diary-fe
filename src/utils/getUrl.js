const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_STAGING_API_URL
    : process.env.REACT_APP_API_URL;

export default API_URL;
