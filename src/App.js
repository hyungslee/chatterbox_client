import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./component/Index";
import Login from "./component/User/Login";
import Signup from "./component/User/Signup";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Fragment>
      </Router>
    );
  }
}
