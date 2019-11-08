import React from 'react'
/*ToDo*/
/**
 * Let's get some styling in here
 */

/* This is a very simple component.. it probably doesn't need to be a smart component at this point but you never know what's goingto happen in the future */
class ProtectedRoute extends React.Component {
  constructor(props){
	super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	render() {
		return (
			<div>
				<p><h3>Question 1:</h3></p>
				<p><h4>Is Max Awesome?</h4></p>
				<select value={this.state.value} onChange={this.handleChange}>
            		<option value="true">Yes</option>
            		<option value="false">No</option>
          </select>
				<p>Submit!</p>
			</div>
			
		)
	}
}

export default ProtectedRoute