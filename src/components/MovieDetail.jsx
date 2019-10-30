import React, { Component } from 'react';
import '../App.css';

class MovieDetail extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    window.scrollTo({
      top: this.refs.backdrop.offsetTop
    })
  }

  render () {

    return (
      <div 
        className="movie-backdrop" 
        style={{backgroundImage: `url(${this.props.movie.backdrop})`}}
        ref="backdrop">
        <div className="movie-deets">
          <h1>{this.props.movie.title}</h1>
          <h4>{this.props.movie.release ? this.props.movie.release.split('-')[0] : null}</h4>
          <p>{(this.props.movie.overview.length > 256) ? this.props.movie.overview.substr(0, 256) + "..." : this.props.movie.overview}</p>
          <button className="play-button" onClick={() => this.props.playMovie(this.props.movie)}>play movie</button>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
