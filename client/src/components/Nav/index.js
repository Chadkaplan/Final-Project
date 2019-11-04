import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import Login from "../LoginForm";

// Login
// Search
// Home
// Create
// Play
// My quizzes

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnMount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
      </Link>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={
                  window.location.pathname === "/" || window.location.pathname === "/search"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Search
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/create"
                className={window.location.pathname === "/create" ? "nav-link active" : "nav-link"}
              >
                Create
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/play"
                className={window.location.pathname === "/play" ? "nav-link active" : "nav-link"}
              >
                Play
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myquizzes"
                className={window.location.pathname === "/myquizzes" ? "nav-link active" : "nav-link"}
              >
                My Quizzes
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
              >
                Login
            </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
