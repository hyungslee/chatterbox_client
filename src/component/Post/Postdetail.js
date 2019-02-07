import React, { Component } from "react";
import "./Postdetail.css";

export default class Postdetail extends Component {
  render() {
    return (
      <div id="postdetail">
        <div>
          <div>
            {this.props.username} : {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}
