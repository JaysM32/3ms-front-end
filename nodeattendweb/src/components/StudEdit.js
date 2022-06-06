import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert, Navbar, Form } from "react-bootstrap";
import { useAuth } from "../backends/AuthCont";
import { Link, useHistory, useParams} from "react-router-dom";
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

  //database functions
  const {id} = useParams();
  const [inputs, setInputs] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);
  
  function getStudents(){
    axios.get(`https://webdev-deployed.herokuapp.com/user/${id}`).then(function(response){
      console.log(response.data);
      setInputs(response.data);
    });
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://webdev-deployed.herokuapp.com/${id}/edit`, inputs).then(function(response){
        console.log(response.data);
        history.push('/StudClass');
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
      <Container className="databasestyling">
        <Card className="databasebody">
          <Card.Body>
          <h1>Edit user</h1>
          <Form onSubmit={handleSubmit}>
              <Form.Label for='studentName'>Edit Student Name</Form.Label><br/>
              <input value={inputs.studentName} type="text" id="studentName" name="studentName" onChange={handleChange}></input><br/><br/>
              <Form.Label for='studentName'>Edit Student Class ID</Form.Label><br/>
              <input value={inputs.studentClass}type="text" id="studentClass" name="studentClass" onChange={handleChange}></input><br/><br/>
              <Button className="w-100" type="submit"> Submit </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </div>
   </div>
  )
}
