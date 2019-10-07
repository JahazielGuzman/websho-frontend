import React, { Component } from 'react';
import '../App.css';

class ShowSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupName: "",
      signupPassword: ""
    }
  }

  render() {
    return (
      <div className="user-box">
        <form
          className="login-box"
        onSubmit={
          (event) =>  {
            event.preventDefault();
            this.props.onLogin({"username": this.state.loginUsername, "password": this.state.loginPassword})
          }
        }
        >
          <h1>Login</h1>
          <label htmlFor="login-username">username:</label>
          <input
            id="login-username"
            type="text"
            onChange={(event) => {
              this.setState({loginUsername: event.target.value})
            }}
          />
          <br />
          <label htmlFor="login-password">password:</label>
          <input id="login-password" type="password" onChange={(event) => this.setState({loginPassword: event.target.value})} />
          <br />
          <button>Login</button>
        </form>
        <form
          className="signup-box"
          onSubmit={
            (event) =>  {
              event.preventDefault();
              this.props.onSignup({"username": this.state.signupUsername, "name": this.state.signupName, "password": this.state.signupPassword})
            }
          }
          >
          <h1>Signup</h1>
          <label htmlFor="signup-username">username:</label>
          <input id="signup-username" type="text" maxlength="10" onChange={(event) => this.setState({signupUsername: event.target.value})} />
          <br />
          <label htmlFor="signup-name">name:</label>
          <input id="signup-name" type="text" onChange={(event) => this.setState({signupName: event.target.value})} />
          <br />
          <label htmlFor="signup-password">password:</label>
          <input id="signup-password" type="password" onChange={(event) => this.setState({signupPassword: event.target.value})} />
          <br />
          <button>Signup</button>
        </form>
      </div>
    );
  }
}

export default ShowSignup;
