import React, { Component } from 'react';
import '../App.css';

const URL = process.env.REACT_APP_BACKEND;

class SearchBar extends Component {

  state = {
    searchInput: ""
  }

  constructor(props) {
    super(props)
  }

  render() {

    return (

      <div className="search-box">
      <form
      onSubmit={(e) => {
          e.preventDefault();
          this.props.onSearchSubmit(this.state.searchInput)
        }
      }>
      <input
      className="search-bar"
      type="text"
      placeholder="search"
      onChange={(e) => {
        this.setState({searchInput: e.target.value})
      }}
      />
    <button className="search-button">&#128269;</button>
      </form>
    </div>
    )
  }
}

export default SearchBar;
