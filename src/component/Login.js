import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      check: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clickLoginButton = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    this.requestLogin();
  };

  //   checkRegisteredEmail = () => {
  //     const data = {
  //       email: this.state.email
  //     };
  //     axios
  //       .get(`${BACKEND_ENDPOINT}/users/email`, {
  //         params: {
  //           email: data.email
  //         }
  //       })
  //       .then(res => {
  //         if (res.data) {
  //           this.setState({
  //             check: "가입되지 않은 이메일 입니다!"
  //           });
  //         }
  //         this.requestLogin();
  //       })
  //       .catch(err => console.log(err));
  //   };

  requestLogin = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("/users/login", data)
      .then(res => {
        if (res.data) {
          this.props.history.push("/");
        } else {
          this.setState({
            check: "비밀번호를 확인해 주세요!"
          });
        }
      })
      .catch(err => console.log(err));
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this.clickLoginButton();
    }
  };

  render() {
    return (
      <div id="login">
        <div className="login_container">
          <div className="login_box">
            <div className="login-text">로그인</div>
            <div className="login-inputbox">
              <div className="login-input">
                <input
                  className="input-box"
                  type="text"
                  placeholder="ID"
                  name="username"
                  onChange={this.handleChange}
                  onKeyPress={this._handleKeyPress}
                />
              </div>

              <div className="login-input">
                <input
                  className="input-box"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  onKeyPress={this._handleKeyPress}
                />
              </div>

              <div className="wanning-div">{this.state.check}</div>

              <button className="login-btn" onClick={this.clickLoginButton}>
                로그인
              </button>

              <div className="login-a-div">Johnny를 집으로 보내자!!</div>
              <Link to="/signup">
                <div className="login-b-div" onClick={this.moveSignupPage}>
                  내 동료가 되라!
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
