import React, { Component } from 'react';
import '../App.css';

function MovieDetail(props) {

    let customStyle = {backgroundImage: `url(${props.movie.backdrop})`};

    return (
      <div className="movie-backdrop" style={customStyle}>
        <div className="movie-deets">
          <h1>{props.movie.title}</h1>
          <h4>{props.movie.release ? props.movie.release.split('-')[0] : null}</h4>
          <p>{(props.movie.overview.length > 256) ? props.movie.overview.substr(0, 256) + "..." : props.movie.overview}</p>
          <button className="play-button" onClick={() => props.playMovie(props.movie)}>play movie</button>
        </div>
      </div>
    );
}

export default MovieDetail;
