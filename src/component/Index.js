import React, { Component } from "react";
import Room from "../component/Room";
import Post from "../component/Post";
import { Link } from "react-router-dom";
import "./Index.css";

// const username = localStorage.getItem("user");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appname: "GO HOME JOHNNY!!",
      username: this.props.username,
      isLogind: false,
      Loginout: "로그인해라!!",
      link: "/login"
    };
  }

  componentDidMount = () => {
    if (this.state.username === "Who R U ?") {
      this.setState({
        isLogind: false,
        Loginout: "로그인해라!!",
        link: "/login"
      });
    } else {
      this.setState({
        isLogind: true,
        Loginout: "로그아웃해라!!",
        link: "/"
      });
    }
  };

  clickLogoutButton = () => {
    if (this.state.isLogind) {
      this.setState({
        isLogind: false,
        Loginout: "로그인해라!!",
        link: "/login"
      });
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div id="main">
        <div id="index">
          <div className="index-container">
            <div className="index-inform-1">Super Sexy ChatterBox!</div>

            <div className="index-inform-2">{this.state.username}</div>

            <Link to={this.state.link}>
              <button className="index-btn" onClick={this.clickLogoutButton}>
                {this.state.Loginout}
              </button>
            </Link>
          </div>
        </div>
        <div className="component-div">
          <Room className="room" />
          <Post className="post" />
        </div>
      </div>
    );
  }
}
