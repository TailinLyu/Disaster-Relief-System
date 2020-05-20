import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./styles/header.css";
export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Container>
          <div className="headerHome">
            <Row>
              <Col  className="text-center">
                <h1>Saving a life
                <b/>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <h3>Welcome to Our Disaster Relief Management System!</h3>
              </Col>
            </Row>
            <Row xs="12">
              <Col id= "login" className="text-center">
                <Link
                  to="Authentication/Login"
                  className="btn btn-primary btn-xl rounded-pill mt-5"
                >
                  <p className="loginText">Get Started</p>
                </Link>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={{ size: 6 }}>
              <img
                className="img-fluid rounded-circle"
                src="https://i.pinimg.com/originals/14/e5/fc/14e5fcb4f5e03f533c72c194bb8cf4c1.jpg"
                alt="First"
              />
            </Col>
            <Col>
              <h2 className="display-4">Request for help</h2>
              <p>Request</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 6 }}>
              <h2 className="display-4">Response to help</h2>
              <p>Response</p>
            </Col>
            <Col>
              <img
                className="img-fluid rounded-circle"
                src="https://i.pinimg.com/originals/14/e5/fc/14e5fcb4f5e03f533c72c194bb8cf4c1.jpg"
                alt="First"
              />
            </Col>
          </Row>{" "}
          <Row>
            <Col xs={{ size: 6 }}>
              <img
                className="img-fluid rounded-circle"
                src="https://i.pinimg.com/originals/14/e5/fc/14e5fcb4f5e03f533c72c194bb8cf4c1.jpg"
                alt="First"
              />
            </Col>
            <Col>
              <h2 className="display-4">Pledge</h2>
              <p>Donate for Unknown</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
