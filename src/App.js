import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./component/Index";
import Login from "./component/Login";
import Signup from "./component/Signup";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "fake"
    };
  }

  changeUsername = newID => {
    this.setState({
      username: newID
    });
  };

  render() {
    console.log(this.state.username);
    return (
      <Router>
        <Fragment>
          <Route
            exact
            path="/"
            component={() => <Index username={this.state.username} />}
          />
          <Route
            path="/login"
            component={Login}
            // component={history => (
            //   <Login
            //     username={this.state.username}
            //     changeUsername={this.changeUsername}
            //     history={history}
            //   />
            // )}
          />
          <Route path="/signup" component={Signup} />
        </Fragment>
      </Router>
    );
  }
}
