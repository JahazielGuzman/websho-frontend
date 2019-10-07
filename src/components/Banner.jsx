import React, { Component } from 'react';
import SearchBar from './SearchBar'
import '../App.css';

class Banner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="banner">
        <div className="logo" onClick={this.props.showHome} >Websho&apos;</div>
        {this.props.user ? <SearchBar onSearchSubmit={this.props.onSearchSubmit} /> : null}
        <div className="user-panel">
          <span>
            {this.props.user ? this.props.user.username : ''}
          </span>
          <span>
            {
              (this.props.user) ?
              <button className="session-change" onClick={this.props.logout}>
                logout
              </button>:
              <button className="session-change" onClick={this.props.onClickSignIn}>
                login
              </button>
            }
          </span>
        </div>
      </header>
    );
  }
}

export default Banner;
