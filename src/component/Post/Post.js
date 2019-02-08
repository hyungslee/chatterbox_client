import React, { Component } from "react";
import axios from "axios";
import Postdetail from "./detail/Postdetail";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "로그인 해주세요",
      text: null,
      roomid: 2,
      userid: 1,
      texts: []
    };
  }

  componentDidMount = () => {
    axios
      .get("posts/post")
      .then(res => {
        console.log("Post : [+] 글 정보 송신 완료");
        const texts = res.data;
        this.setState({
          texts: texts
        });
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
          console.log("Post : [+] 글 정보 전송 완료");
        } else {
          console.log("Post : [-] 글 정보 전송 실패");
        }
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  dataCome = () => {
    axios
      .get("posts/post")
      .then(res => {
        console.log("Post : [+] 글 정보 송신 완료");
        const texts = res.data;
        this.setState({
          texts: texts
        });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
    console.log("post :", this.state.texts);
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
                  <div className="post-one">
                    {text.username} : {text.text}
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
