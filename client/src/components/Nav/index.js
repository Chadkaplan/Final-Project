import React, { Component } from "react";
import "./style.css";
import Auth from "../../utils/Auth";
import {
  Link,
  withRouter
} from 'react-router-dom';
import './style.css';
// import Login from "../LoginForm";

// Login
// Search
// Home
// Create
// Play
// My quizzes

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      width: window.innerWidth
    };
  }


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
        <div>
          <ul className="navbar-nav">
            <li>
            <Link
                to="/"
                className={
                  window.location.pathname === "/" ? "nav-link active" : "nav-link"}
              >
                Home
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={
                  window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
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
            <li className="nav-item">
              <Link
                to="/register"
                className={window.location.pathname === "/register" ? "nav-link active" : "nav-link"}
              >
                Register
            </Link>
            </li>
            <AuthButton />
          </ul>
        </div>
      </nav>
    );
  }
}

//Authbutton component / withRouter is imported from react-router
const AuthButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <div >
      <p className="inline align-right">Success! You are Logged In!</p>
      <div className="btn btn-danger"
        onClick={() => {
          Auth.signout(() => history.push('/'))
        }}>
        Sign out
			</div>
    </div>
  ) : (
      <p className="align-right">You are not logged in.</p>
    )
))

export default Nav;
