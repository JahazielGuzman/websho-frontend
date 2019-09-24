import React, { Component } from 'react';
import '../App.css';

function MovieDetail(props) {

    return (
      <div className="movie-backdrop" style={{backgroundImage: `url(${props.movie.backdrop})`}}>
        <div className="movie-deets">
          <h1>{props.movie.title}</h1>
          <h4>{props.movie.release.split('-')[0]}</h4>
          <p>{props.movie.overview}</p>
          <button onClick={() => props.playMovie(props.movie)}>play movie</button>
        </div>
      </div>
    );
}

export default MovieDetail;
