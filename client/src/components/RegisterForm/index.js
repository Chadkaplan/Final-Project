import React from 'react'
// import './style.css';


class RegisterForm extends React.Component {
	// refs
	form: null;
	usernameElem: null;
	passwordElem: null;

	render() {
		const { onRegister } = this.props;
		console.log(`Register form props are: ${JSON.stringify(this.props)}`);

		return (

			<form
				ref={(elem) => this.form = elem}
				onSubmit={(e) => {
					e.preventDefault();
					return onRegister({
						username: this.usernameElem.value,
						password: this.passwordElem.value
					});
				}}
			>
				<div className="wholeContainer" style={{
					backgroundImage: "linear-gradient(to bottom right, dodgerblue, steelblue, #787878, lightblue, dodgerblue)",
					opacity: ".95",
					width: "50% auto",
					height: "auto",
					display: "block",
					textAlign: "center",
					border: "15px inset royalblue",
					padding: "10px"
				}} className="form-group">

					<input style={{
						border: "2px solid steelblue",
						borderRadius: "4px",
						background: "darkblue",
						color: "skyblue"
					}} className="form-control" ref={(input) => this.usernameElem = input} type='text' name="username" placeholder='Enter Username' /><br />

					<input input style={{
						border: "2px solid steelblue",
						borderRadius: "4px",
						background: "darkblue",
						color: "skyblue"
					}} className="form-control" ref={(input) => this.passwordElem = input} type='password' name="password" placeholder='Password' /><br />

					<button className="btn btn btn-primary" type='submit'>Submit</button>
				</div>
			</form>

		)
	}
}

export default RegisterForm