import React, { Component } from "react";
import axios from "axios";

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

        <style jsx>{`
          #signup {
            background-color: rgba(0, 0, 0, 0.03);
          }
          .signup_container {
            max-width: 1140px;
            height: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .signup_box {
            border: 1px solid #ddd;
            width: 370px;
            background-color: white;
          }
          .signup-text {
            font-size: 35px;
            text-align: left;
            margin: 35px 20px;
          }
          .signup-inputbox {
            text-align: center;
            margin: 0px 20px;
          }
          .signup-input {
            margin-bottom: 10px;
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
          .signup-btn {
            font-size: 18px;
            width: 100%;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            margin-bottom: 20px;
            border: none;
            background-color: #ff8906;
          }
          .signup-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 600px) {
            #signup {
              width: 100%;
            }
            .signup_container {
              height: 600px;
            }
          }
        `}</style>
      </div>
    );
  }
}
