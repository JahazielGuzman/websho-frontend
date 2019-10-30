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
        {this.props.user ? <SearchBar onSearchSubmit={this.props.onSearchSubmit} /> : null}
        <div className="user-panel">
          <span>
            {this.props.user ? this.props.user.username : ''}
          </span>
          <span>
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
