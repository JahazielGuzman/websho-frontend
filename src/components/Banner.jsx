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
        <span>logo</span>
        {this.props.user ? <SearchBar onSearchSubmit={this.props.onSearchSubmit} exitSearch={this.props.exitSearch} /> : null}
        <span>
          {this.props.user ? this.props.user.username : ''}
        </span>
        <span>
          {
          (this.props.user) ?
            <button onClick={this.props.logout}>
              logout
            </button>:
            <span></span>
          }
        </span>
      </header>
    );
  }
}

export default Banner;
