import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Switch,
	withRouter
} from 'react-router-dom';
import Auth from "./utils/Auth";
import Nav from "./components/Nav";
import Login from "../src/pages/Login";
import Search from "./pages/PublicRoute/Search";
import Create from "./pages/ProtectedRoute/Create";
import Main from "./pages/PublicRoute/Main";
import QuizTake from "./pages/ProtectedRoute/QuizTake";
// import Create from "./components/Create";
// import Play from "./components/Play";
// import MyQuizzes from "./components/MyQuizzes";
import Register from "./pages/PublicRoute/Register";
import { Container } from "./components/Grid";
import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./pages/PublicRoute";
import './App.css';

//I want to add some basic inline styling here, even though we are bringing in styles
const listStyle = {
	color: 'cornflowerblue',
	listStyle: 'none'
};
const navStyle = {
	color: 'cornflowerblue',
	listStyle: 'none'
};
//Now we have all the stuff we need .. let's render some components with the Router
const AuthExample = () => (
	<Router>
		<div>
			<Nav style={navStyle} className="App-header"  />
			<Container>
				{/* <ul style={listStyle}>
					<li><Link to="/public">Public Page</Link></li>
					<li><Link to="/protected">Protected Page</Link></li>
					<li><Link to="/register">Register a New User</Link></li>
				</ul> */}
				<Switch>
					<Route exact path="/search" component={Search} />
					<PrivateRoute exact path="/create" component={Create} />
					<Route exact path="/" component={Main} />
					{/* <Route path="/play" component={Play} />
					<Route path="/myquizzes" component={MyQuizzes} /> */}
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<PrivateRoute path="/protected" component={ProtectedRoute} />
					<PrivateRoute path="/take/:id" component={QuizTake} />
					{/* <Route component={NoMatch} /> */}
				</Switch>
			</Container>
		</div>
	</Router>
)




// This is the private route component this checks for an authorized user here
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		Auth.isAuthenticated ? (
			<Component {...props} />
		) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
			)
	)} />
)








export default AuthExample

