import React, { Component } from "react";
import Room from "../component/Room";
import Post from "../component/Post";
import { Link } from "react-router-dom";

// const username = localStorage.getItem("user");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appname: "GO HOME JOHNNY!!",
      username: localStorage.getItem("user") || "로그인이 필요합니다!",
      isLogind: false,
      Loginout: "로그인해라!!",
      link: "/login"
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("user")) {
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
      localStorage.removeItem("user");
      this.setState({
        username: "로그인 해줭!",
        isLogind: false,
        Loginout: "로그인해라!!",
        link: "/login"
      });
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div id="index">
        <div className="index_container">
          <div className="index_inform">
            <h1>{this.state.appname}</h1>
          </div>

          <div className="index_inform">
            <h2>{this.state.username}</h2>
          </div>

          <Link to={this.state.link}>
            <button className="index-btn" onClick={this.clickLogoutButton}>
              {this.state.Loginout}
            </button>
          </Link>
          <div />
          <Room />
          <div>{this.props.username}</div>
          <Post />
        </div>

        <style jsx>{`
          #index {
            background-color: rgba(0, 0, 0, 0.03);
          }
          .index_container {
            text-align: center;
            max-width: 100%;
            height: 100%;
            justify-content: center;
          }
          .index_inform {
            width: 100%;
            height: 50px;
            font-size: 15px;
          }
          .index-btn {
            width: 300px;
            font-size: 18px;
            font-weight: 500;
            height: 50px;
            color: whitesmoke;
            border: none;
            background-color: #ff8906;
            outline-style: none;
          }
          .index-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 600px) {
            #login {
              width: 100%;
            }
            .index_container {
              height: 600px;
            }
          }
        `}</style>
      </div>
    );
  }
}
