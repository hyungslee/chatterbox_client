import React, { Component } from "react";
import "./Roomdetail.css";
import axios from "axios";

export default class Roomdetail extends Component {
  constructor(props) {
    super(props);
    this.props.roomid = this.props.id;
  }
  // findPost = () => {
  //   axios.post("posts/room", { roomid: this.state.roomid }).then(res => {
  //     console.log(res.data);
  //     this.props.texts = res.data.text;
  //   });
  // };

  render() {
    return (
      <div id="roomdetail">
        <div className="roomdetail-container">
          <div className="room-one" onClick={this.props.findPost}>
            {this.props.room} {this.props.id}
          </div>
        </div>
      </div>
    );
  }
}
