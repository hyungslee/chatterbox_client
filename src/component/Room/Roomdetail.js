import React, { Component } from "react";
import "./Roomdetail.css";

export default class Roomdetail extends Component {
  render() {
    return (
      <div id="roomdetail">
        <div className="roomdetail-container">
          <div className="room-one">{this.props.room}</div>
        </div>
      </div>
    );
  }
}
