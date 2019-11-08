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
			query: "",
			queryCategory: "",
			queryAuthor: "",
			selectValue: "None",
		}
		this.handleChange = this.handleChange.bind(this);
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
		url += `?name=${this.state.query}
				&category=${this.state.queryCategory}
				&author=${this.state.queryAuthor}`
		fetch(url, {
			method: 'GET',
		});
	}
	handleChange(event) {
		this.setState({ query: event.target.value });
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
						<Input type="query" name="query" id="searchParameter" placeholder="Quiz Name" value={this.state.query} onChange={this.handleChange} />
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
							{/* <DropdownItem value="Author">Author</DropdownItem>
							<DropdownItem value="Name">Name</DropdownItem> */}
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