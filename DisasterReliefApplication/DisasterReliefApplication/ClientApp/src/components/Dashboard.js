import React, { Component } from "react";
import { Button, Card, Image, Segment, Grid } from "semantic-ui-react";
import authService from "./api-authorization/AuthorizeService";
import { Row, FormGroup, Label, Input, Container, Col } from "reactstrap";
//This page could show all available requests
//Donor: can respond to a request
//Admin: Including the above donor function, can expire a request and assign previous pledges to a request
//When the amount of needs of a request is fullfilled, the status of a request is set to false,
//which means the request cannot be responded or assigned with pledges
const initialState = {
	requestList: [],
	pledgeList: [],
	categoryList: [
		"Human Resource",
		"Money",
		"Food",
		"Clothing",
		"Medicine",
		"Common Goods",
		"Medical Attention",
	],
	donateAmount: -1,
	respondDate: "",
	pledgeId: -1,
	isAdmin: false,
};
export class Dashboard extends Component {
	static displayName = Dashboard.name;

	constructor(props) {
		super(props);
		this.state = initialState;

		// Bind methods so they have access to state
		this.selectEvent = this.selectRequest.bind(this);
		this.expireRequest = this.expireRequest.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createRespondDTO = this.createRespondDTO.bind(this);
		this.usePledge = this.usePledge.bind(this);
		this.reset = this.reset.bind(this);
		this.populateRequestData = this.populateRequestData.bind(this);
		this.populatePledgeData = this.populatePledgeData.bind(this);
		this.getUser = this.getUser.bind(this);
	}
	componentDidMount() {
		this.populateRequestData();
		this.populatePledgeData();
		this.getUser();
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
	async selectRequest(requestId) {
		const target = "request/" + requestId;
		const value = Number(this.state.donateAmount);
		const response_request = await fetch(target, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status: true, amountNeeded: value }),
		});
		const data_request = await response_request.json();
		const respond = this.createRespondDTO(requestId, value);
		const response_respond = await fetch("respond", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: respond,
		});
		const data_respond = await response_respond.json();
		alert("the request gets responded");
		window.location.reload();
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		const key = event.target.key;
		this.setState({
			[name]: value,
		});
	}
	async usePledge(requestId) {
		this.setState({ submitted: true });
		const token = await authService.getAccessToken();
		const target = "pledge/" + this.state.pledgeId;
		const response = await fetch(target, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ requestId: requestId }),
		});
		const data = await response.json();
		alert("Pledge assigned");
		window.location.reload();
	}
	createRespondDTO(requestId, value) {
		return JSON.stringify({
			requestFK: requestId,
			amountDonated: value,
			respondDate: new Date().toISOString().slice(0, 10),
		});
	}
	async expireRequest(requestId) {
		const target = "request/" + requestId;

		const response = await fetch(target, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status: false, amountNeeded: 0 }),
		});
		const data = await response.json();
		window.location.reload();
	}
	reset() {
		window.location.reload();
	}
	async populateRequestData() {
		const token = await authService.getAccessToken();
		const response = await fetch("request", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		this.setState({ requestList: data });
	}
	async populatePledgeData() {
		const token = await authService.getAccessToken();
		const response = await fetch("pledge", {
			headers: !token ? {} : { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		this.setState({ pledgeList: data });
	}
	render() {

			if(!this.state.isAdmin) {
				return(
					<div>
						<Input
							type="search"
							name="search"
							id="search"
							placeholder="Type the request description here"
							onChange={(e) =>
								this.setState({
									requestList: this.state.requestList.filter(function (
										request
									) {
										return request.requestDescription.includes(e.target.value);
									}),
								})
							}
						/>
						<Button onClick={this.reset}>Try Another Search</Button>
						<Card.Group>
							{this.state.requestList.map((request) => (
								<Card fluid key={request.eventId}>
									<Card.Content>
										<Card.Header>{request.requestDescription}</Card.Header>
										<Card.Meta>
											Start Date: {request.requestStartDate.slice(0, 10)}
										</Card.Meta>
										<Card.Meta>
											End Date: {request.requestEndDate.slice(0, 10)}
										</Card.Meta>
										<Card.Description>
											<div>
												{request.status ? (
													<strong>
														Urgently Needed: {request.amountNeeded}
													</strong>
												) : (
													<strong>Completed</strong>
												)}
											</div>
										</Card.Description>
										<Card.Description>
											<div>
												<strong>
													Category:{" "}
													{this.state.categoryList[request.category - 1]}
												</strong>
											</div>
										</Card.Description>
										<Card.Description>
											{request.status ? (
												<div>
													<label>
														<strong>Donate</strong>
														<input
															name="donateAmount"
															type="text"
															placeholder="Please Enter your donatation"
															value={this.state.value}
															onChange={this.handleInputChange}
														/>
													</label>
												</div>
											) : (
												<strong>Donation Unavaliable</strong>
											)}
										</Card.Description>
										<Card.Description>
											
												<strong>Pledge Unavaliable For Non-Admin User</strong>
											
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<div className="ui two buttons">
											<Grid.Column>
												<Button
													onClick={() => this.selectRequest(request.requestId)}
													content="Be a Donor"
													icon="heartbeat"
													color={request.status ? "red" : "black"}
												/>
												<Button
													onClick={() => {
														this.usePledge(request.requestId);
													}}
													content="Pledge"
													icon="heart"
													color="black"
												/>
												<Button
													name={request.requestId}
													onClick={() => this.expireRequest(request.requestId)}
													floated="right"
													icon="flag"
													content="Expire"
													color={request.status ? "grey" : "black"}
												/>
											</Grid.Column>
										</div>
									</Card.Content>
								</Card>
							))}
						</Card.Group>
				
				</div>);}
				else{
					return(
				<div>
						<Input
							type="search"
							name="search"
							id="search"
							placeholder="Type the request description here"
							onChange={(e) =>
								this.setState({
									requestList: this.state.requestList.filter(function (
										request
									) {
										return request.requestDescription.includes(e.target.value);
									}),
								})
							}
						/>
						<Button onClick={this.reset}>Try Another Search</Button>
						<Card.Group>
							{this.state.requestList.map((request) => (
								<Card fluid key={request.eventId}>
									<Card.Content>
										<Card.Header>{request.requestDescription}</Card.Header>
										<Card.Meta>
											Start Date: {request.requestStartDate.slice(0, 10)}
										</Card.Meta>
										<Card.Meta>
											End Date: {request.requestEndDate.slice(0, 10)}
										</Card.Meta>
										<Card.Description>
											<div>
												{request.status ? (
													<strong>
														Urgently Needed: {request.amountNeeded}
													</strong>
												) : (
													<strong>Completed</strong>
												)}
											</div>
										</Card.Description>
										<Card.Description>
											<div>
												<strong>
													Category:{" "}
													{this.state.categoryList[request.category - 1]}
												</strong>
											</div>
										</Card.Description>
										<Card.Description>
											{request.status ? (
												<div>
													<label>
														<strong>Donate</strong>
														<input
															name="donateAmount"
															type="text"
															placeholder="Please Enter your donatation"
															value={this.state.value}
															onChange={this.handleInputChange}
														/>
													</label>
												</div>
											) : (
												<strong>Donation Unavaliable</strong>
											)}
										</Card.Description>
										<Card.Description>
											{request.status ? (
												<FormGroup>
													<Label for="pledgeSelect">
														<strong>Pledge</strong>
													</Label>
													<select
														type="select"
														name="pledgeId"
														id="pledgeSelect"
														onChange={(e) =>
															this.setState({ pledgeId: e.target.value })
														}
													>
														<option value="" selected disabled hidden>
															Choose here
														</option>
														{this.state.pledgeList.map((pledge) =>
															pledge.status &&
															pledge.category == request.category ? (
																<option name="pledgeId" value={pledge.pledgeId}>
																	{pledge.pledgeDescription +
																		": " +
																		pledge.amountPledged +
																		" at " +
																		pledge.pledgeDate}
																</option>
															) : (
																<option
																	value=""
																	selected
																	disabled
																	hidden
																></option>
															)
														)}
													</select>
												</FormGroup>
											) : (
												<strong>Pledge Unavaliable</strong>
											)}
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<div className="ui two buttons">
											<Grid.Column>
												<Button
													onClick={() => this.selectRequest(request.requestId)}
													content="Be a Donor"
													icon="heartbeat"
													color={request.status ? "red" : "black"}
												/>
												<Button
													onClick={() => {
														this.usePledge(request.requestId);
													}}
													content="Pledge"
													icon="heart"
													color={request.status ? "purple" : "black"}
												/>
												<Button
													name={request.requestId}
													onClick={() => this.expireRequest(request.requestId)}
													floated="right"
													icon="flag"
													content="Expire"
													color={request.status ? "grey" : "black"}
												/>
											</Grid.Column>
										</div>
									</Card.Content>
								</Card>
							))}
						</Card.Group>
				</div>
										);							}
	}
}
