import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import "./styles/EventForm.css";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
//Request can be added by any user
//A request should belong to a category and a disaster event


// The initial state of the page
const initialState = {
	requestId: -1,
	category: -1,
	requestStartDate: "",
	requestEndDate: "",
	requestDescription: "",
	submitMessage: "No submission",
	disastereventId:-1,
	amountNeeded: -1, 
	submitted: false,
	events: [],
};

export class AddRequest extends Component {
	static displayName = Request.name;

	constructor(props) {
		super(props);
		this.state = initialState;

		// Bind methods so they have access to state
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addRequest = this.addRequest.bind(this);
		this.reset = this.reset.bind(this);
		this.createDTO = this.createDTO.bind(this);
		this.populateEventData = this.populateEventData.bind(this);
	}
	componentDidMount() {
		this.populateEventData();
	}

	// Handles input change on the form and updates the state appropriately
	handleInputChange(request) {
		const target = request.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	}

	// Sends a request to the controller to add the new request
	async addRequest() {
		this.setState({ submitted: true });
		const token = await authService.getAccessToken();
		var state = this.createDTO();

		const response = await fetch("request", {
			method: "POST",
			headers: {
				'Accept': "application/json",
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
			requestDescription: this.state.requestDescription,
			requestStartDate: this.state.requestStartDate,
			requestEndDate: this.state.requestEndDate,
			disasterEventFK: Number(this.state.disastereventId),
			amountNeeded: Number(this.state.amountNeeded),
			status:true
		});
	}

	// Reset the state of the page and render
	reset() {
		this.setState(initialState);
		this.render();
		this.populateEventData();
	}
	async populateEventData() {
		const token = await authService.getAccessToken();
		const response = await fetch("disasterevent", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		this.setState({ events: data});
	}

	// Renders the page
	render() {
		//If the form was submitted, notify the user and give them the option to create another event
		if (this.state.submitted) {
			return (
				<div>
					<h1>{this.state.submitMessage}</h1>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.reset();
						}}
					>
						Add another Request
					</button>
				</div>
			);
			// Else display the form
		} else {
			return (
				<div className="form-style-5">
					<h1>Enter Request Details</h1>
					<form>
						<label>
							Request Description
							<input
								name="requestDescription"
								type="text"
								value={this.state.value}
								placeholder="Enter Description Here"
								onChange={this.handleInputChange}
							/>
						</label>
						<label>
							Request Start Date
							<input
								name="requestStartDate"
								type="date"
								value={this.state.value}
								onChange={this.handleInputChange}
							/>
						</label>
						<label>
							Request End Date
							<input
								name="requestEndDate"
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
							Amount Needed
							<input
								name="amountNeeded"
								type="number"
								value={this.state.value}
								onChange={this.handleInputChange}
							/>
						</label>
						<FormGroup>
							<Label for="eventSelect">Disaster Event</Label>
							<select
								type="select"
								name="disastereventId"
								id="eventSelect"
								onChange={(e) => this.setState({ disastereventId: e.target.value})}
							>
							<option value="" selected disabled hidden>Choose here</option>
								{this.state.events.map(event => 
									<option name="disastereventId" value={event.eventId}>
										{event.eventDescription}
									</option>
								)}
							</select>
						</FormGroup>
					</form>
					<button
						className="btn btn-primary"
						onClick={() => {
							this.addRequest();
						}}
					>
						Submit
					</button>
				</div>
			);
		}
	}
}
