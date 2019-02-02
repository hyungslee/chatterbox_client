import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./component/Index";
import Login from "./component/Login";
import Signup from "./component/Signup";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "로그인해!!"
    };
  }
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
