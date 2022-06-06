import React from "react"
import Register from "./FirebaseRegister"
import { AuthProvider } from "../backends/AuthCont"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Account from './Account'
import StudClass from './StudClass'
import StudDatabase from './StudDatabase'
import StudAttend from './StudAttend'
import StudEdit from'./StudEdit'

function App() {
  return (
      <div>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <PrivRoute index exact path="/" component={Dashboard} />
              <PrivRoute path="/update-profile" component={UpdateProfile} />
              <PrivRoute path="/Account" component={Account} />
              <PrivRoute path="/StudClass" component={StudClass} />
              <PrivRoute path="/studDatabase/:id" component={StudDatabase} />
              <PrivRoute path="/studAttend/:id" component={StudAttend} />
              <PrivRoute path="/studEdit/:id" component={StudEdit} />
              <Route path="/signup" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
  )
}

export default App
