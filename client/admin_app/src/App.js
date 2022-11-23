import { useRoutes } from "react-router-dom";
import { Router } from "./router";

const App = () => {
  const routing = useRoutes(Router);

  return <div className="App">{routing}</div>;
};

export default App;
