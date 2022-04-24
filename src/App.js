import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

import GithubState from "./context/GithubState";

function App() {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
