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
    <section className="section">
      <div className="container">
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
          <div className="field">
            <label htmlFor="login-username" className="label">username:</label>
            <div className="control">
              <input
                id="login-username"
                type="text"
                onChange={(event) => {
                  this.setState({loginUsername: event.target.value})
                }}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="login-password" className="label">password:</label>
            <div class="control">
              <input id="login-password" type="password" onChange={(event) => this.setState({loginPassword: event.target.value})} />
            </div>
          </div>
          <button>Login</button>
        </form>
        </div>
        <div class="container">
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
            <button>Signup</button>
          </form>
        </div>
      </section>
    );
  }
}

export default ShowSignup;
