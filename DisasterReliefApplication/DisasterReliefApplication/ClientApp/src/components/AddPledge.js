import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import "./styles/EventForm.css";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
// The initial state of the page
const initialState = {
	pledgeId: -1,
	pledgeDescription: "",
	amountPledged: -1,
	category: -1,
	status: false,
	submitted: false,
	pledgeDate: "",
	submitMessage: "No submission",
};

export class AddPledge extends Component {
	static displayName = AddPledge.name;

	constructor(props) {
		super(props);
		this.state = initialState;

		// Bind methods so they have access to state
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addPledge = this.addPledge.bind(this);
		this.reset = this.reset.bind(this);
		this.createDTO = this.createDTO.bind(this);
	}
	// Handles input change on the form and updates the state appropriately
	handleInputChange(pledge) {
		const target = pledge.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	}

	// Sends a pledge to the controller to add the new pledge
	async addPledge() {
		this.setState({ submitted: true });
		const token = await authService.getAccessToken();
		var state = this.createDTO();

		const response = await fetch("pledge", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: state,
		});
		const data = await response.json();
		this.setState({ submitMessage: data });
	}

	// Creates a DTO for the current state to send to the controller
	createDTO() {
		return JSON.stringify({
			category: Number(this.state.category),
			amountPledged: Number(this.state.amountPledged),
			pledgeDescription: this.state.pledgeDescription,
			pledgeDate: this.state.pledgeDate,
			status: true,
		});
	}

	// Reset the state of the page and render
	reset() {
		this.setState(initialState);
		this.render();
	}

	// Renders the page
	render() {
		//If the form was submitted, notify the user and give them the option to create another event
		if (this.state.submitted) {
			return(
				<div>
					<h1>{this.state.submitMessage}</h1>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.reset();
						}}
					>
						Add another Pledge
					</button>
				</div>
			// Else display the form
			);
		} else {
			return(
				<div className="form-style-5">
					<h1>Enter Pledge Details</h1>
					<form>
						<label>
							Pledge Description
							<input
								name="pledgeDescription"
								type="text"
								value={this.state.value}
								placeholder="Enter Description Here"
								onChange={this.handleInputChange}
							/>
						</label>
						<label>
							Pledge Date
							<input
								name="pledgeDate"
								type="date"
								value={this.state.value}
								onChange={this.handleInputChange}
							/>
						</label>
						<FormGroup>
							<Label for="categorySelect">Category</Label>
							<select
								type="select"
								name="category"
								id="categorySelect"
								onChange={(e) => this.setState({ category: e.target.value })}
							>
								<option value="" selected disabled hidden>Choose here</option>
								<option value="1">Human Resource</option>
								<option value="2">Money</option>
								<option value="3">Food</option>
								<option value="4">Clothing</option>
								<option value="5">Medicine</option>
								<option value="6">Common Goods</option>
								<option value="7">Medical Attention</option>
							</select>
						</FormGroup>
						<label>
							Amount To Pledge
							<input
								name="amountPledged"
								type="number"
								value={this.state.value}
								onChange={this.handleInputChange}
							/>
						</label>
					</form>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.addPledge();
						}}
					>
						Submit
					</button>
				</div>
			);
		}
	}
}
