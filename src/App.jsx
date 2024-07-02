import "./App.css";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/api/posts/:id", element: <PostPage /> },
      ],
    },
  ]);
  return elements;
  // <div>
  //   <header>
  //     <p>Diary app</p>
  //   </header>
  // </div>
}

export default App;
