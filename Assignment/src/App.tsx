import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Weather from "./Pages/Weather";
import ErrorPage from "./Pages/ErrorPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/weather/:cityName" Component={Weather} />
          <Route path="/error" Component={ErrorPage}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
