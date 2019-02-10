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
      username: "default name",
      userid: 1,
      roomid: 1,
      roomname: "전체보기",
      texts: []
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
    this.allPostRender();
  };

  allPostRender = () => {
    axios
      .get("posts/post")
      .then(res => {
        console.log("index : [+] 글 정보 송신 완료");
        const texts = res.data;
        this.setState({
          texts: texts,
          roomname: "전체보기"
        });
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

  findPost = (roomid, roomname) => {
    this.setState({
      roomid: roomid,
      roomname: roomname
    });
    this.changeByRoomId(roomid);
  };

  changeByRoomId = roomid => {
    axios
      .post("/posts/room", { roomid: roomid })
      .then(res => {
        console.log("index : [+] 룸 or 글 변경 완료");
        this.setState({
          texts: res.data,
          roomid: roomid
        });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
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
            nowroom={this.state.roomname}
            roomid={this.state.roomid}
            findPost={this.findPost}
            roomname={this.state.roomname}
            allPostRender={this.allPostRender}
          />
          <Post
            className="post"
            username={this.state.username}
            roomid={this.state.roomid}
            userid={this.state.userid}
            texts={this.state.texts}
            changeByRoomId={this.changeByRoomId}
          />
        </div>
      </div>
    );
  }
}
