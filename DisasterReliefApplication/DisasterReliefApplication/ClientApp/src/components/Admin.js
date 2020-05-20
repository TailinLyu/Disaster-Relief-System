import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import './styles/EventForm.css';

// The initial state of the page
const initialState = {
    user: null,
    adminPassword: "",
    message: "",
    isAdmin: false
};

export class Admin extends Component {
    static displayName = Admin.name;
    
    constructor(props) {
        super(props);
        this.state = initialState;

        // Bind methods so they have access to state
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createDTO = this.createDTO.bind(this);
        this.getUser = this.getUser.bind(this);
        this.tryMakeAdminUser = this.tryMakeAdminUser.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        const token = await authService.getAccessToken();
        const response = await fetch('user', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        this.setState({ user: data.applicationUser });

        if (data.userRole === 1) {
            this.setState({ isAdmin: true });
        }
    }

    // Handles input change on the form and updates the state appropriately
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // Sends a request to the controller to add the new event
    async tryMakeAdminUser() {
        var state = this.createDTO();

        const response = await fetch('user', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: state
        });

        const data = await response.json();
        this.setState({ message: data });
        this.getUser();
    }

    // Creates a DTO for the current state to send to the controller
    createDTO() {
        return JSON.stringify({
            userName: this.state.user.email,
            password: this.state.adminPassword
        });
    }

    // Renders the page
    render() {
        // If they are an admin, just say hello
        if (this.state.isAdmin) {
            return (
                <div>
                    <h1>You are an administrator</h1>
                </div>
            );
        // Else display the form
        } else {
            return (
                <div className="form-style-5">
                <h1>Hello</h1>
                <h4>Enter the Administrator password to become an Administrator</h4>
                <form>
                    <label>
                        Administrator Password
                    <input
                            name="adminPassword"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleInputChange} />
                    </label>
                    </form>
                    <button className="btn btn-primary" onClick={() => { this.tryMakeAdminUser(); }}>Submit</button>
                    <h4 class="text-danger"> {this.state.message} </h4>
                    </div>
            );
        }
    }
}
