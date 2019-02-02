import React, { Component } from "react";

export default class Postdetail extends Component {
  render() {
    return (
      <div id="postdetail">
        <div className="post_container">
          <div className="post_inform">{this.props.username}</div>
          <div className="post_inform">{this.props.text}</div>
        </div>

        <style jsx>{`
          #postdetail {
          }
          .post_container {
            display: flex;
            text-align: center;
            max-width: 100%;
            justify-content: center;
          }
          .post_inform {
            flex: 1;
            width: 100%;
            height: 50px;
            font-size: 15px;
          }

          @media screen and (max-width: 600px) {
            #postdetail {
              width: 100%;
            }
            .post_container {
              height: 600px;
            }
          }
        `}</style>
      </div>
    );
  }
}
