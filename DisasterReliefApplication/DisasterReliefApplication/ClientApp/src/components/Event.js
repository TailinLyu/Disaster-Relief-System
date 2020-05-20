import React, { Component } from "react";
import "./styles/EventForm.css";
import authService from "./api-authorization/AuthorizeService";

// The initial state of the page
const initialState = {
	eventId: -1,
	country: "",
	city: "",
	zipcode: "",
	contactCenterCity: "",
	contactCenterZipcode: "",
	contactCenterCountry: "",
	contactCenterState: "",
	eventDescription: "",
	submitted: false,
	eventStartDate: "",
	eventEndDate: "",
	submitMessage: "No submission",
	isAdmin: false,
};

export class Event extends Component {
	static displayName = Event.name;

	constructor(props) {
		super(props);
		this.state = initialState;

		// Bind methods so they have access to state
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.reset = this.reset.bind(this);
		this.createDTO = this.createDTO.bind(this);
		this.testUser = this.testUser.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	async getUser() {
		const token = await authService.getAccessToken();
		const response = await fetch("user", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();

		this.setState({ user: data.applicationUser });

		if (data.userRole === 1) {
			this.setState({ isAdmin: true });
		}
	}
	async testUser() {
		const token = await authService.getAccessToken();
		const response = await fetch("user", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		console.log(data);
	}
	componentDidMount() {
		this.getUser();
	}
	// Handles input change on the form and updates the state appropriately
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	// Sends a request to the controller to add the new event
	async addEvent() {
		this.testUser();
		this.setState({ submitted: true });
		var state = this.createDTO();

		const response = await fetch("disasterevent", {
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
			country: this.state.country,
			eventDescription: this.state.eventDescription,
			eventStartDate: this.state.eventStartDate,
			eventEndDate: this.state.eventEndDate,
			city: this.state.city,
			zipcode: this.state.zipcode,
			state: this.state.state,
			contactCenter: {
				city: this.state.contactCenterCity,
				country: this.state.contactCenterCountry,
				zipcode: this.state.contactCenterZipcode,
				state: this.state.contactCenterState,
			},
		});
	}

	// Reset the state of the page and render
	reset() {
		this.setState(initialState);
		this.render();
	}

	// Renders the page
	render() {
		if (!this.state.isAdmin) {
			return <h1>This page is unavailable for Non-Admin User</h1>;
		} else {
			// If the form was submitted, notify the user and give them the option to create another event
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
							Add another Event
						</button>
					</div>
				);
				// Else display the form
			} else {
				return (
					<div className="form-style-5">
						<h1>Enter Event Details</h1>
						<form>
							<label>
								Event Description
								<input
									name="eventDescription"
									type="text"
									value={this.state.value}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event Start Date
								<input
									name="eventStartDate"
									type="date"
									value={this.state.value}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event End Date
								<input
									name="eventEndDate"
									type="date"
									value={this.state.value}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event Country
								<input
									name="country"
									type="text"
									value={this.state.country}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event City
								<input
									name="city"
									type="text"
									value={this.state.city}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event ZipCode
								<input
									name="zipcode"
									type="text"
									value={this.state.zipcode}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Event State
								<input
									name="state"
									type="text"
									value={this.state.state}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Contact Center Country
								<input
									name="contactCenterCountry"
									type="text"
									value={this.state.contactCenterCountry}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Contact Center City
								<input
									name="contactCenterCity"
									type="text"
									value={this.state.contactCenterCity}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Contact Center ZipCode
								<input
									name="contactCenterZipcode"
									type="text"
									value={this.state.contactCenterZipcode}
									onChange={this.handleInputChange}
								/>
							</label>
							<label>
								Contact Center State
								<input
									name="contactCenterState"
									type="text"
									value={this.state.contactCenterState}
									onChange={this.handleInputChange}
								/>
							</label>
						</form>
						<button
							className="btn btn-primary"
							onClick={() => {
								this.addEvent();
							}}
						>
							Submit
						</button>
					</div>
				);
			}
		}
	}
}
