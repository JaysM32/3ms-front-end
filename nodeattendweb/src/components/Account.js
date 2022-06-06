import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../backends/AuthCont"
import { Link, useHistory } from "react-router-dom"
import './styling.css'
import { Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
      
    <section>
    <div>
    <div>
      <Navbar bg='basecolor' variant="dark" sticky='top' expand='sm' collapseOnSelect >
        <Navbar.Brand href="/">
        <img src={require('../images/3msFaceRecog.png')} alt="logo"/>
          3msFaceRecog
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="right-align">
        <Nav>
          <Nav.Link href="/">Registry</Nav.Link>
          <Nav.Link href="StudClass">Classes</Nav.Link>
          <Nav.Link href="Account">Account</Nav.Link>
          <Button className="logoutbutton" variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
      <Container className="profile">
        <Card className="profilecard">
            <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}<br/>
            <strong>Classes:</strong>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
            </Link>
            </Card.Body>
        </Card>
      </Container>
      </div>
      </section>
  )
}