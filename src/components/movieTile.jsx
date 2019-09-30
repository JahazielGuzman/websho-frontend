import React, { Component } from 'react';
import '../App.css';

class MovieTile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.cat}</h1>
        <div className="movie-list">
          {
            this.props.movies.map(
              mov =>
              <span className="movie-tile" key={mov.id} onClick={() => this.props.showMovie(mov)} style={{backgroundImage: `url(${mov.poster})`}}>
              </span>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default MovieTile;
