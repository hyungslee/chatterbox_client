import React, { Component } from "react";
import axios from "axios";
import Roomdetail from "./Room/Roomdetail";
import "./Room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "",
      currentroom: "Home",
      rooms: []
    };
  }

  handleChange = e => {
    this.setState({
      roomname: e.target.value
    });
  };

  componentDidMount = () => {
    axios
      .get("/rooms/room")
      .then(res => {
        console.log("[+] 룸 정보 송신 완료");
        console.log(res.data);
        const rooms = res.data;
        const length = rooms.length - 1;
        this.setState({
          currentroom: rooms[length].roomname,
          rooms: rooms
        });
      })
      .catch(err => console.log(err));
  };

  makeNewroom = () => {
    axios
      .post("rooms/room", {
        roomname: this.state.roomname
      })
      .then(res => {
        if (res.data) {
          this.dataCome();
          console.log("[+] 룸 생성 완료");
        } else {
          console.log("[-] 전송 실패");
        }
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  dataCome = () => {
    axios
      .get("rooms/room")
      .then(res => {
        console.log("[+] 정보 송신 완료");
        const rooms = res.data;
        const length = rooms.length - 1;
        this.setState({ currentroom: rooms[length].roomname, rooms: rooms });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  render() {
    return (
      <div id="room">
        <div className="room-container">
          <div className="room-name">{this.state.currentroom}</div>
          <div className="room-input">
            <input
              className="room-input-box"
              type="text"
              placeholder="roomname"
              onChange={this.handleChange}
            />
            <button className="room-btn" onClick={this.makeNewroom}>
              클릭!
            </button>
          </div>
          {this.state.rooms
            .map(room => {
              return <Roomdetail room={room.roomname} />;
            })
            .reverse()}
        </div>
      </div>
    );
  }
}
