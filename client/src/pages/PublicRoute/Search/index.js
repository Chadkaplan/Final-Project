import { Redirect } from 'react-router-dom';
import Auth from "../../../utils/Auth";
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './style.css'

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			quizNameQuery: "",
			// queryCategory: "",
			quizAuthorQuery: "",
			selectValue: "None",
		}
		this.handleQuizNameChange = this.handleQuizNameChange.bind(this);
		this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		let url = `/api/quiz/search`
		let sort = this.state.selectValue
		if (sort === 'None')
			sort = ''
		if (sort)
			url += `By${this.state.selectValue}`
		url += `?name=${this.state.quizNameQuery}
		&author=${this.state.quizAuthorQuery}`
		// &category=${this.state.queryCategory}
		fetch(url, {
			method: 'GET',
		});
	}
	handleQuizNameChange(event) {
		this.setState({ quizNameQuery: event.target.value });
		console.log(event.target.value)
	}
	handleAuthorNameChange(event) {
		this.setState({ quizAuthorQuery: event.target.value });
		console.log(event.target.value)
	}
	handleDropdownChange(event) {
		this.setState({ selectValue: event.target.value });
		console.log(this.state.selectValue)
	}
	render() {
		const toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }
		return (
			<div>
				<Form onSubmit={this.handleSubmit} inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="searchParameter" className="mr-sm-2">Quiz Name:</Label>
						<Input type="quizNameQuery" name="quizNameQuery" id="searchParameter" placeholder="Quiz Name" value={this.state.quizNameQuery} onChange={this.handleQuizNameChange} />
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="searchParameter" className="mr-sm-2">Author Name:</Label>
						<Input type="quizAuthorQuery" name="quizAuthorQuery" id="searchParameter" placeholder="Author Name" value={this.state.quizAuthorQuery} onChange={this.handleAuthorNameChange} />
					</FormGroup>
					<Dropdown isOpen={this.state.dropdownOpen} toggle={toggle}>
						<DropdownToggle caret>
							Search By: {this.state.selectValue}
					</DropdownToggle>
						<DropdownMenu id="dropdown" value={this.state.selectValue} onClick={this.handleDropdownChange}>
							<DropdownItem value="None">None</DropdownItem>
							<hr></hr>
							<DropdownItem value="Popular">Popular</DropdownItem>
							<DropdownItem value="Newest">Newest</DropdownItem>
							<DropdownItem value="Oldest">Oldest</DropdownItem>
						</DropdownMenu>
						<div >
					<Button>Submit</Button>
						</div>
					</Dropdown>
				</Form>
			</div>
		)
	}
}

export default Search