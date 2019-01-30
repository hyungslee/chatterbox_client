import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      text: null,
      roomid: 1,
      texts: []
    };
  }

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
        roomid: this.state.roomid
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

  renderfunc = () => {
    console.log(this.state.texts);
  };

  render() {
    console.log(this.state.texts);
    return (
      <div>
        <input
          className="post-username-input"
          placeholder="name"
          name="username"
          onChange={this.handleChange}
        />
        <input
          className="post-text-input"
          placeholder="text"
          name="text"
          onChange={this.handleChange}
        />
        <button className="post-button" onClick={this.writeNewtext}>
          제출!
        </button>
        <div>
          {/* {this.state.texts.map(() => {
            return (
              <div>
                <div>{this.state.texts.username}</div>
                <div>{this.state.texts.text}</div>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}
