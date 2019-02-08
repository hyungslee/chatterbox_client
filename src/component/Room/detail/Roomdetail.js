import React, { Component } from "react";
import "./Roomdetail.css";

export default class Roomdetail extends Component {
  findPostClick = () => {
    this.props.findPost(this.props.id, this.props.roomname);
  };

  render() {
    return (
      <div id="roomdetail">
        <div className="roomdetail-container">
          <div className="room-one" onClick={this.findPostClick}>
            {this.props.id}번방 : {this.props.roomname}
          </div>
        </div>
      </div>
    );
  }
}
