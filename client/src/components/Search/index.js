import { Redirect } from 'react-router-dom';
import Auth from "../../utils/Auth";
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			query: "",
			dropdownChoice: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch(`/api/searchBy${this.state.query}`, {
			method: 'POST',
			body: data,
		});
	}
	handleChange(event) {
		this.setState({ query: event.target.value });
	}
	handleDropdownChange(event) {
		// this.setState({dropdownChoice: event.target.value});
		console.log(event)
	}
	render() {
		const toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }
		return (
			<div>
				<Form onSubmit={this.handleSubmit} inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="searchParameter" className="mr-sm-2">Quiz Name:</Label>
						<Input type="query" name="query" id="searchParameter" placeholder="Quiz Name" value={this.state.query} onChange={this.handleChange} />
					</FormGroup>
					<Dropdown isOpen={this.state.dropdownOpen} toggle={toggle}>
						<DropdownToggle caret>
							Search By:
					</DropdownToggle>
						<DropdownMenu>
							<DropdownItem >Newest</DropdownItem>
							<DropdownItem >Popularity</DropdownItem>
							<DropdownItem >Author</DropdownItem>
							<DropdownItem >Name</DropdownItem>
							<DropdownItem >ANY OTHER PARAMETERS?</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button>Submit</Button>
				</Form>
			</div>
		)
	}
}

export default Search