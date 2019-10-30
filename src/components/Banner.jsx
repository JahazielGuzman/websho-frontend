import React, { Component } from 'react';
import SearchBar from './SearchBar'
import '../App.css';

class Banner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="banner">
        <div className="logo" onClick={this.props.showHome} >WebSho</div>
        <SearchBar key={this.props.showLogin} onSearchSubmit={this.props.onSearchSubmit} />
        <div className="user-panel">
          <span className="user-name">
            {this.props.user ? this.props.user.username : ''}
          </span>
          <span className="session-button">
            {
              (this.props.showLogin) ? "" :
                (this.props.user) ?
                <button className="session-change" onClick={this.props.onClickSignOut}>
                  Sign Out
                </button>:
                <button className="session-change" onClick={this.props.onClickSignIn}>
                  Sign In
                </button>
            }
          </span>
        </div>
      </div>
    );
  }
}

export default Banner;
