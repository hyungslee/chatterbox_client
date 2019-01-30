import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "고 홈 좌니!!"
    };
  }
  async componentDidMount() {
    await axios
      .post("/users/login", {
        userid: "Super",
        password: "Sexy"
      })
      .then(
        this.setState({
          login: "이것이 로그인이다"
        })
      );
  }

  render() {
    return (
      <div>
        <h1>{this.state.login}</h1>
      </div>
    );
  }
}

export default App;
