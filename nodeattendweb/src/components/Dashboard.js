import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Alert, Navbar, Form } from "react-bootstrap";
import { useAuth } from "../backends/AuthCont";
import { Link, useHistory } from "react-router-dom";
import './styling.css';
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function Dashboard() {

  // Logout functions
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("")

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  // PHP Input handling
  const [inputs,setInputs] = useState({})

  const handleChange = (event) => {
    const studentName = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [studentName]:value}));
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    axios.post('https://webdev-deployed.herokuapp.com/user/save',inputs).then(function(response){
      console.log(response);
    });
  }
  return (

    <div className="page">
      <Navbar bg='basecolor' variant="dark" sticky='top' expand='sm' collapseOnSelect >
        <Navbar.Brand>
        <img src={require('../images/3msFaceRecog.png')} alt="logo"/>
          3msStudentReg
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="right-align">
        <Nav>
          <Nav.Link href="/">Registry</Nav.Link>
          <Nav.Link href="/StudClass">Classes</Nav.Link>
          <Nav.Link href="/Account">Account</Nav.Link>
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </Nav>
        </Navbar.Collapse>
      </Navbar>


      <div className="content">
      <Container className="insertregistry">
        <Card className="registrybody">
          <Card.Body>
          <h1 className="registrytitle">Welcome to <br/>
           3MS Student Registry</h1><br/>
          <div className="studentregistry">
            <h2>Student Registry</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Label for='studentName'>Write Student Name</Form.Label><br/>
              <input type="text" id="studentName" name="studentName" onChange={handleChange}></input><br/><br/>
              <Form.Label for='studentName'>Write Student Class ID</Form.Label><br/>
              <input type="text" id="studentClass" name="studentClass" onChange={handleChange}></input><br/><br/>
              <Form.Label for='studentPicture'>Upload Student Picture</Form.Label><br></br>
              <input type="file" id="studentPicture" name="studentPicture" accept="image/*" onChange={handleChange}></input><br/><br/>
              <Button className="w-100" type="submit"> Submit </Button>
            </Form>
          </div>
          </Card.Body>
        </Card>
      </Container>
      </div>
   </div>
  )
}
