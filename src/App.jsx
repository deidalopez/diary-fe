import "./App.css";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  const elements = useRoutes([{ path: "/", element: <Layout /> }]);
  return elements;
  // <div>
  //   <header>
  //     <p>Diary app</p>
  //   </header>
  // </div>
}

export default App;
