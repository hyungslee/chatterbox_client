import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
          localStorage.setItem("user", this.state.username);
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

        <style jsx>{`
          #login {
            background-color: rgba(0, 0, 0, 0.03);
          }
          .login_container {
            max-width: 1140px;
            height: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .login_box {
            border: 1px solid #ddd;
            width: 370px;
            background-color: white;
          }
          .login-text {
            font-size: 35px;
            text-align: left;
            margin: 35px 20px;
          }
          .login-inputbox {
            text-align: center;
            margin: 0px 20px;
          }
          .login-input {
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .input-box {
            width: 100%;
            height: 40px;
            font-size: 15px;
            padding: 5px 0px 5px 5px;
            border: 1px solid #ddd;
          }
          .wanning-div {
            color: red;
            font-size: 11px;
            height: 20px;
          }
          .login-btn {
            font-size: 18px;
            font-weight: 500;
            width: 100%;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            border: none;
            background-color: #ff8906;
            outline-style: none;
          }
          .login-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          .login-a-div {
            margin-top: 10px;
          }
          .login-b-div {
            margin-bottom: 20px;
            font-size: 15px;
            font-weight: 500;
            color: #246db7;
          }
          .login-b-div:hover {
            cursor: pointer;
            color: #ff8906;
          }
          @media screen and (max-width: 600px) {
            #login {
              width: 100%;
            }
            .login_container {
              height: 600px;
            }
          }
        `}</style>
      </div>
    );
  }
}
