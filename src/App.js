// App.js

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/about";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  render() {
    return (
      <>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to={"/error"} className="nav-link">
                  Error
                </Link>
              </li>
              <li>
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
        </div>

        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/error" component={ErrorPage} />
            <Route path="/about" component={About} />
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
