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
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);
  
  function getStudents(){
    axios.get(`https://webdev-deployed.herokuapp.com/Class/${id}`).then(function(response){
      console.log(response.data);
      console.log(Array.isArray(response.data))
      setStudents(response.data);
    });
  }
  const deleteStudent = (id) =>{
    axios.delete(`https://webdev-deployed.herokuapp.com/${id}/delete`).then(function(response){
      console.log(response.data);
      getStudents();
    });
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleRef = (event) => {
    event.preventDefault();
    history.push(`/studAttend/${id}`);
  }
  const handleAttends = (event) => {
    event.preventDefault();

  axios.put(`https://webdev-deployed.herokuapp.com/${id}/attend/0`, inputs).then(function(response){
      console.log(response.data);
  });
  }

  const [studID, setStudID] = useState([]);
  const handleEdit = (e) =>{
    e.preventDefault();
    history.push(`/studEdit/${studID}`);
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
          <h1 className="registrytitle">Students</h1><br/>
          <table className="studentdatabase">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Student Class</th>
                        <th>Student Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((user, key) =>
                        <tr key={key}>
                            <td>{user.studentID}</td>
                            <td>{user.studentName}</td>
                            <td>{user.studentClass}</td>
                            <td>{user.studentPicture}</td>
                            <td>
                              <button onClick={() => deleteStudent(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            <br/><br/>
            <div className="registrytitle">
              <h1>Input Student ID to Edit</h1><br/>
              <Form onSubmit={handleEdit}>
                <input type="text" id="classSelect" name="classSelect" onChange={(e)=>setStudID(e.target.value)}></input><br/><br/>
                <Button className="w-100" type="submit"> Edit </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
      </div>
   </div>
  )
}
