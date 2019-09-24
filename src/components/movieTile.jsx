import React, { Component } from 'react';
import '../App.css';

class MovieTile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className="movie-tile" onClick={() => this.props.showMovie(this.props.movie)} style={{backgroundImage: `url(${this.props.movie.poster})`}}>
      </span>
    );
  }
}

export default MovieTile;
