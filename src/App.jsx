import "./App.css";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import NewPostScreen from "./pages/NewPostScreen";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  const elements = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: user ? <Home /> : <Navigate to="/api/login" /> },
        {
          path: "/api/posts/:id",
          element: user ? <PostPage /> : <Navigate to="/api/login" />,
        },
        {
          path: "/new-post",
          element: user ? <NewPostScreen /> : <Navigate to="/api/login" />,
        },
        { path: "/api/login", element: user ? <Navigate to="/" /> : <Login /> },
        {
          path: "/api/signup",
          element: user ? <Navigate to="/" /> : <Signup />,
        },
      ],
    },
  ]);

  return elements;
}

export default App;
