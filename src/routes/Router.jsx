import { useRoutes } from "react-router-dom";
import Home from "../views/Home";


const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return routes;
};

export default Router;
