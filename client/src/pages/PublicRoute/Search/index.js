import { Redirect } from 'react-router-dom';
import Auth from "../../utils/Auth";
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './style.css'

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			query: "",
			selectValue: "Popularity"
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch(`/api/searchBy${this.state.selectValue}`, {
			method: 'POST',
			body: data,
		});
	}
	handleChange(event) {
		this.setState({ query: event.target.value });
		console.log(event.target.value)
	}
	handleDropdownChange(event) {
		console.log(event)
		this.setState({ selectValue: event.target.value });
	}
	render() {
		const toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }
		var message = 'You selected ' + this.state.selectValue;
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
						<DropdownMenu id="dropdown" value={this.state.selectValue} onChange={this.handleDropdownChange}>
							<DropdownItem value="Popularity">Popularity</DropdownItem>
							<DropdownItem value="Newest">Newest</DropdownItem>
							<DropdownItem value="Oldest">Oldest</DropdownItem>
							<DropdownItem value="Author">Author</DropdownItem>
							<DropdownItem value="Name">Name</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button>Submit</Button>
				</Form>
				<div className="textCheck">
					{message}
				</div>
			</div>
		)
	}
}

export default Search