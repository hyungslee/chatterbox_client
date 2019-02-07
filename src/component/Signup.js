import React, { Component } from "react";
import axios from "axios";
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      repassword: null,
      check: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  isCorrect_Password = (pw, repw) => {
    if (pw !== repw) {
      this.setState({
        check: "비밀번호를 확인해 주세요!"
      });
      return false;
    }
    return true;
  };

  clickSignupButton = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    if (!this.isCorrect_Password(this.state.password, this.state.repassword)) {
      return;
    }
    this.requestSignup();
  };

  requestSignup = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("/users/signup", data)
      .then(res => {
        if (res.data) {
          this.props.history.push("/login");
        }
      })
      .catch(err => console.log(err));
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this.clickSignupButton();
    }
  };

  render() {
    return (
      <div id="signup">
        <div className="signup_container">
          <div className="signup_box">
            <div className="signup-text">회원가입</div>
            <div className="signup-inputbox">
              <div className="signup-input">
                <input
                  className="input-box"
                  type="text"
                  placeholder="ID"
                  name="username"
                  onChange={this.handleChange}
                  onKeyPress={this._handleKeyPress}
                />
              </div>

              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="비밀번호를 입력해주세요.(8~16자)"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  onKeyPress={this._handleKeyPress}
                />
              </div>
              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="비밀번호를 다시 입력해주세요."
                  type="password"
                  name="repassword"
                  onChange={this.handleChange}
                  onKeyPress={this._handleKeyPress}
                />
              </div>

              <div className="wanning-div">{this.state.check}</div>
              <button className="signup-btn" onClick={this.clickSignupButton}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
