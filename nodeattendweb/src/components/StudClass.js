import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert, Navbar, Form } from "react-bootstrap";
import { useAuth } from "../backends/AuthCont";
import { Link, useHistory, useParams } from "react-router-dom";
import './styling.css';
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  // To Do: connect to teacher table which is connected to the firebase, which will output different ammount of classes specific to the teacher. 
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

  //databse functions
  const [users, setStudents] = useState([]);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents(){
    axios.get('https://webdev-deployed.herokuapp.com/user').then(function(response){
      console.log(response.data);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/studDatabase/${inputs}`);
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
          <h1 className="registrytitle">Input Student Class</h1><br/>
          <Form onSubmit={handleSubmit}>
              <input type="text" id="classSelect" name="classSelect" onChange={(e)=>setInputs(e.target.value)}></input><br/><br/>
              <Button className="w-100" type="submit"> Submit </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </div>
   </div>
  )
}
