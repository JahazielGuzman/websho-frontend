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
    <React.Fragment>
    <div className="login-background"></div>
    <div className="user-box">
        <form
          className="login-box login-signup-box"
        onSubmit={
          (event) =>  {
            event.preventDefault();
            this.props.onLogin({"username": this.state.loginUsername, "password": this.state.loginPassword})
          }
        }
        >
          <h1 class="login-signup-header">Login</h1>
          <div className="field">
            <label htmlFor="login-username" className="label">username:</label>
            <div className="control">
              <input
                id="login-username"
                type="text"
                className="input"
                onChange={(event) => {
                  this.setState({loginUsername: event.target.value})
                }}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="login-password" className="label">password:</label>
            <div class="control">
              <input 
                id="login-password" 
                type="password" 
                className="input"
                onChange={(event) => this.setState({loginPassword: event.target.value})} 
              />
            </div>
          </div>
          <button className="login-signup-btn">Login</button>
        </form>
          <form
            className="signup-box login-signup-box"
            onSubmit={
              (event) =>  {
                event.preventDefault();
                this.props.onSignup({"username": this.state.signupUsername, "name": this.state.signupName, "password": this.state.signupPassword})
              }
            }
            >
            <h1 class="login-signup-header">Signup</h1>
            <div className="field">
              <label htmlFor="signup-username" className="label">username:</label>
              <div class="control">
                <input className="input" id="signup-username" type="text" maxlength="10" onChange={(event) => this.setState({signupUsername: event.target.value})} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="signup-name" className="label">name:</label>
              <div class="control">
                <input className="input" id="signup-name" type="text" onChange={(event) => this.setState({signupName: event.target.value})} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="signup-password" className="label">password:</label>
              <div class="control">
                <input className="input" id="signup-password" type="password" onChange={(event) => this.setState({signupPassword: event.target.value})} />
              </div>
            </div>
            <button className="login-signup-btn">Signup</button>
          </form>
      </div>
      </React.Fragment>
    );
  }
}

export default ShowSignup;
