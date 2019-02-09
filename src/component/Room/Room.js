import React, { Component } from "react";
import axios from "axios";
import Roomdetail from "./detail/Roomdetail";
import "./Room.css";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newroomname: "",
      rooms: []
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
        const rooms = res.data;
        this.setState({
          ...this.state,
          rooms: rooms
        });
      })
      .catch(err => console.log(err, "[-] 응답없음"));
  };

  makeNewroom = () => {
    axios
      .post("rooms/room", {
        roomname: this.state.newroomname
      })
      .then(res => {
        if (res.data) {
          this.roomDataCome();
          console.log("Room : [+] 룸 생성 완료");
        } else {
          console.log("Room : [-] 룸 생성 실패");
        }
      })
      .catch(err => console.log(err, "Room :[-] 응답없음"));
  };

  roomDataCome = () => {
    axios
      .get("rooms/room")
      .then(res => {
        console.log("Room : [+] 새로운 룸 정보 송신 완료");
        const rooms = res.data;
        this.setState({
          ...this.state,
          rooms: rooms
        });
        this.props.findPost(res.data.length, this.state.newroomname);
        console.log(res.data.length);
      })
      .catch(err => console.log(err, "Room : [-] 응답없음"));
  };

  render() {
    return (
      <div id="room">
        <div className="room-container">
          <div className="room-name">{this.props.nowroom}</div>
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
          <div
            className="roomdetail-container"
            onClick={this.props.allPostRender}
          >
            <div className="room-one">전체보기</div>
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
