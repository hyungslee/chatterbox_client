import React, { Component } from "react";
import axios from "axios";
import Postdetail from "./Post/Postdetail";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("user") || "로그인 해줭!",
      text: null,
      roomid: 1,
      userid: 1,
      texts: []
    };
  }

  componentDidMount = () => {
    axios
      .get("posts/post")
      .then(res => {
        console.log("[+] 정보 송신 완료");
        const texts = res.data;
        this.setState({ texts: texts });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  writeNewtext = () => {
    axios
      .post("posts/post", {
        username: this.state.username,
        text: this.state.text,
        roomid: this.state.roomid,
        userid: this.state.userid
      })
      .then(res => {
        if (res.data) {
          this.dataCome();
          console.log("[+] 정보 전송 완료");
        } else {
          console.log("[-] 전송 실패");
        }
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  dataCome = () => {
    axios
      .get("posts/post")
      .then(res => {
        console.log("[+] 정보 송신 완료");
        const texts = res.data;
        this.setState({ texts: texts });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
    return (
      <div id="post">
        <div className="post-container">
          <div className="post-name">욕은 쓰면 안대영~</div>
          <div className="post-input">
            <input
              className="post-input-box"
              placeholder="text"
              name="text"
              onChange={this.handleChange}
            />
            <button className="post-btn" onClick={this.writeNewtext}>
              제출!
            </button>
          </div>

          <div>
            {this.state.texts
              .map(text => {
                return (
                  <div>
                    <Postdetail username={text.username} text={text.text} />
                  </div>
                );
              })
              .reverse()}
          </div>
        </div>
      </div>
    );
  }
}
