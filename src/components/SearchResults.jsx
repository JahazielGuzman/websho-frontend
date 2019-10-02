import React, { Component } from 'react';
import '../App.css';
const URL = "http://localhost:3000";

class SearchResults extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <div>
        <span onClick={this.props.exitSearch}>X</span>
      </div>
      <div>
      <h1>{this.props.searchQuery}</h1>
      </div>
      </div>
    )
  }
}

export default SearchResults;
