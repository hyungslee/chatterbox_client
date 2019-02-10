import React, { Component } from "react";
import axios from "axios";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null
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
        username: this.props.username,
        text: this.state.text,
        roomid: this.props.roomid,
        userid: this.props.userid
      })
      .then(res => {
        if (res.data) {
          this.props.changeByRoomId(this.props.roomid);
          console.log("Post : [+] 글 정보 전송 완료");
        } else {
          console.log("Post : [-] 글 정보 전송 실패");
        }
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
    return (
      <div id="post">
        <div className="post-container">
          <div className="post-name">Go Home Johnny !!!</div>
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
            {this.props.texts
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
