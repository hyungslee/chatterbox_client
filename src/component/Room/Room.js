import React, { Component } from "react";
import axios from "axios";
import Roomdetail from "./detail/Roomdetail";
import "./Room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newroomname: "",
      rooms: [],
      nowroom: ""
    };
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      newroomname: e.target.value
    });
  };

  componentDidMount = () => {
    axios
      .get("/rooms/room")
      .then(res => {
        console.log("Room : [+] 룸 정보 송신 완료");
        console.log(res.data);
        const rooms = res.data;
        const length = rooms.length - 1;
        this.setState({
          ...this.state,
          rooms: rooms,
          nowroom: rooms[length].roomname
        });
      })
      .catch(err => console.log(err));
  };

  makeNewroom = () => {
    axios
      .post("rooms/room", {
        roomname: this.state.newroomname
      })
      .then(res => {
        if (res.data) {
          this.dataCome();
          console.log("Room : [+] 룸 생성 완료");
        } else {
          console.log("Room : [-] 룸 생성 실패");
        }
      })
      .catch(err => console.log(err, "Room :[-] 응답없음"));
  };

  dataCome = () => {
    axios
      .get("rooms/room")
      .then(res => {
        console.log("Room : [+] 새로운 룸 정보 송신 완료");
        const rooms = res.data;
        const length = rooms.length - 1;
        this.setState({
          ...this.state,
          rooms: rooms,
          nowroom: rooms[length].roomname
        });
      })
      .catch(err => console.log(err, "Room : [-] 응답없음"));
  };

  render() {
    console.log("방 정보 렌더 되냐?");
    return (
      <div id="room">
        <div className="room-container">
          <div className="room-name">{this.state.nowroom}</div>
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
              return (
                <Roomdetail
                  roomname={room.roomname}
                  id={room.id}
                  findPost={this.props.findPost}
                />
              );
            })
            .reverse()}
        </div>
      </div>
    );
  }
}
