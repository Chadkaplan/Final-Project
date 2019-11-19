import React from 'react';
import RegisterForm from "../../../components/RegisterForm";
import Auth from "../../../utils/Auth"
//The component for doing the actual signup of the User
class Register extends React.Component {
	state = {
		redirectToReferrer: false
	}

	register = (data) => {
		fetch('api/users/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		.then((response) => {
			if (response.status === 200) {
				Auth.username=data.username
				console.log('Succesfully registered user!');
				//relocate to the login page
				window.location.assign("/protected");
			}
		})
		.catch((err) => {
			console.log('Error registering user.', err);
		});
	}

	render() {
		return (
			<div>
				<h4 style={{color: "steelblue", fontSize: "3rem"}}>Register For Maximum Quizzes</h4>
				<RegisterForm onRegister={this.register} />
			</div>
		)
	}
}

export default Register