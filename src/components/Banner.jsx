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
        <div className="logo">Websho&apos;</div>
        {this.props.user ? <SearchBar onSearchSubmit={this.props.onSearchSubmit} /> : null}
        <div className="user-panel">
          <span>
            {this.props.user ? this.props.user.username : ''}
          </span>
          <span>
            {
              (this.props.user) ?
              <button onClick={this.props.logout}>
                logout
              </button>:
              <button onClick={this.props.onClickSignIn}>
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
