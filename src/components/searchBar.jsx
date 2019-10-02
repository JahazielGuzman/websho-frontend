import React, { Component } from 'react';
import '../App.css';
const URL = "http://localhost:3000";

class SearchBar extends Component {

  state = {
    searchInput: ""
  }

  constructor(props) {
    super(props)
  }

  render() {

    return (

      <span>
      <form
      onSubmit={(e) => {
          e.preventDefault();
          this.props.onSearchSubmit(this.state.searchInput)
        }
      }>
      <input
      type="text"
      placeholder="search"
      onChange={(e) => {
        this.setState({searchInput: e.target.value})
      }}
      />
      <button>search</button>
      </form>
      </span>
    )
  }
}

export default SearchBar;
