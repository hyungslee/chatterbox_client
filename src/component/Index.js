import React, { Component } from "react";
import Room from "./Room/Room";
import Post from "./Post/Post";
import { Link } from "react-router-dom";
import "./Index.css";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogind: false,
      Log: "로그인",
      link: "/login",
      texts: [],
      roomid: null
    };
  }

  componentDidMount = () => {
    if (this.state.isLogind) {
      this.setState({
        Loginout: "로그아웃",
        link: "/"
      });
    } else {
      this.setState({
        Loginout: "로그인",
        link: "/login"
      });
    }
    axios
      .get("posts/post")
      .then(res => {
        console.log("[+] 정보 송신 완료");
        const texts = res.data;
        this.setState({ texts: texts });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  clickLogButton = () => {
    if (this.state.isLogind) {
      this.setState({
        isLogind: false,
        Loginout: "로그인",
        link: "/login"
      });
      this.props.history.push("/");
    }
  };

  findPost = () => {
    axios.post("posts/room", { roomid: this.state.roomid }).then(res => {
      console.log(res.data);
      this.setState({
        texts: res.data
      });
    });
  };

  render() {
    console.log("index :", this.state.texts);
    return (
      <div id="main">
        <div id="index">
          <div className="index-container">
            <div className="index-inform-1">Super Sexy ChatterBox!</div>

            <div className="index-inform-2">{this.state.username}</div>

            <Link to={this.state.link}>
              <button className="index-btn" onClick={this.clickLogButton}>
                {this.state.Log}
              </button>
            </Link>
          </div>
        </div>
        <div className="component-div">
          <Room
            className="room"
            roomid={this.state.roomid}
            findPost={this.findPost}
          />
          <Post className="post" texts={this.state.texts} />
        </div>
      </div>
    );
  }
}
