import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Notfound from "./components/Notfound";

import GithubState from "./context/GithubState";

import "./interceptors/auth.interceptor";
import ErrorAxios from "./interceptors/error.interceptor";

function App() {
  return (
    <GithubState>
      <Router>
        <ErrorAxios>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notfound" element={<Notfound />} />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </ErrorAxios>
      </Router>
    </GithubState>
  );
}

export default App;
