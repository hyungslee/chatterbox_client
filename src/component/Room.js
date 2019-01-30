import React, { Component } from "react";
import axios from "axios";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "고 홈 좌니!!",
      currentroom: "집에가!!"
    };
  }

  handleChange = e => {
    this.setState({
      roomname: e.target.value
    });
  };

  makeNewroom = async () => {
    await axios
      .post("rooms/room", {
        roomname: this.state.roomname
      })
      .then(
        res =>
          this.setState({
            currentroom: res.data
          }),
        console.log("[+] 룸생성완료")
      )
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.currentroom}</h2>
        </div>
        <div>
          <input
            className="room-input"
            type="text"
            placeholder="roomname"
            onChange={this.handleChange}
          />
          <button className="room-button" onClick={this.makeNewroom}>
            클릭!
          </button>
        </div>
      </div>
    );
  }
}
