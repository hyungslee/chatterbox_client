import React, { Component } from "react";
// import axios from "axios";
import Room from "./component/Room";
import Post from "./component/Post";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appname: "GO HOME JOHNNY!!"
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.appname}</h1>
        <Room />
        <Post />
      </div>
    );
  }
}

export default App;
