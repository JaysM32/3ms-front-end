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
      setInputs(response.data);
      setStudents(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://webdev-deployed.herokuapp.com/${students.studentID}/edit`, inputs).then(function(response){
      console.log(response.data);
      history.push('/');
  });
  }
  
  return (

    <div className="page">
      <Navbar bg='basecolor' variant="dark" sticky='top' expand='sm' collapseOnSelect >
        <Navbar.Brand>
        <img src={require('../images/3msFaceRecog.png')} alt="logo"/>
          3msFaceRecog
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
          <h1 className="registrytitle">Class 1 - WAOSUND</h1><br/>
          <form onSubmit={handleSubmit}>
          <table className="studentdatabase">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Student Class</th>
                        <th>Student Photo</th>
                        <th>Session 1</th>
                        <th>Session 2</th>
                        <th>Session 3</th>
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
                              <input value={inputs.session1} type="text" name="mobile" onChange={handleChange} />
                            </td>
                            <td>
                              <input value={inputs.session2} type="text" name="mobile" onChange={handleChange} />
                            </td>
                            <td>
                              <input value={inputs.session3} type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                    )}
                    <td colSpan="8" align ="right">
                                <button>Save</button>
                    </td>
                </tbody>
            </table>
            </form>
          </Card.Body>
        </Card>
      </Container>
      </div>
   </div>
  )
}
