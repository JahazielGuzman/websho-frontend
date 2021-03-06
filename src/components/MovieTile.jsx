import React, { Component } from 'react';
import MovieDetail from './MovieDetail'
import '../App.css';

class MovieTile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
      {
        (this.props.placeDeets && this.props.movieDeets) ?
        <MovieDetail movie={this.props.movieDeets} playMovie={this.props.playMovie} /> : ""
      }
      <div className="movie-list-row">
        <h1 className="movie-list-name">{this.props.cat}</h1>
        <div className="movie-list">
          {
            this.props.movies.map(
              mov =>
              <span 
                className="movie-tile" 
                key={mov.id} 
                onClick={
                  (e) => {

                    this.props.showMovie(mov, this.props.cat);
                  } 
                }
                style={{backgroundImage: `url(${mov.poster})`}}>
              </span>
            )
          }
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default MovieTile;
