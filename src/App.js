import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

import GithubState from "./context/GithubState";

import "./interceptors/auth.interceptor";
import ErrorAxios from "./interceptors/error.interceptor";

function App() {
  return (
    <GithubState>
      <ErrorAxios>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </ErrorAxios>
    </GithubState>
  );
}

export default App;
