import React, { Component } from 'react';
import MovieTile from './MovieTile'
import '../App.css';
const URL = "http://localhost:3000";

class SearchResults extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search-section">
      <button className="exit-search" onClick={this.props.exitSearch}>
        &lt;&nbsp;&nbsp;&nbsp;&nbsp;Back to movies
      </button>
      <div>
      </div>
        <div>
        {
          (this.props.resultList.cat) ?
            <MovieTile key={this.props.resultList.cat} cat={this.props.resultList.cat} showMovie={this.props.showMovie} movies={this.props.resultList.movies}/>
            :
          null
        }
        </div>
      </div>

    )
  }
}

export default SearchResults;
