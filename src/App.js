import React, { Component } from 'react';
import Youtube from 'react-youtube';
import logo from './logo.svg';
import MovieTile from './components/movieTile'
import MovieDetail from './components/movieDetails'
import './App.css';

class App extends Component {

  state = {
    movies: [],
    nowPlaying: null,
    movieDeets: null,
    player: null,
    iframe: null,
    user: null
  }

  showMovie = (movie) => {
    this.setState({movieDeets: movie})
  }

  playMovie = (movie) => {
    this.setState({nowPlaying: movie.trailer});
  }

  stopPlaying = (player) => {
    this.setState({nowPlaying: null})
    player.destroy();
  }

  _onReady = (event) => {

    const player = event.target;
    const iframe = document.querySelector('#player');

    player.playVideo();//won't work on mobile

    let requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }

    document.addEventListener("fullscreenchange", function() {
      if (!document.fullscreenElement)
        this.stopPlaying(player);
      }.bind(this), false);

    document.addEventListener("msfullscreenchange", function() {
      if (!document.msFullscreenElement) {
        this.stopPlaying(player);
      }
    }.bind(this), false);

    document.addEventListener("mozfullscreenchange", function() {
      if (!document.mozFullScreen) {
        this.stopPlaying(player);
      }
    }.bind(this), false);

      document.addEventListener("webkitfullscreenchange", function() {
      if (!document.webkitIsFullScreen) {
        this.stopPlaying(player);
      }
    }.bind(this), false);

  }

  componentDidMount() {
    fetch('http://localhost:3000/newest_releases')
    .then(res => res.json())
    .then(movies => {
        this.setState({movies: movies, movieDeets: movies[0]});
    });
  }

// function setupListener (){
// $('button').addEventListener('click', playFullscreen);
// }


  render () {

    let opts = {
      height: 0,
      width: 0
    }

    return (
      (this.state.user == null) ?
      <div>login / signup </div> :
      <div className="App">
        {
          (this.state.nowPlaying == null && this.state.movieDeets != null) ?
          <MovieDetail movie={this.state.movieDeets} playMovie={this.playMovie} />
          :
          <Youtube
            id="player"
            videoId={this.state.nowPlaying ? this.state.nowPlaying : ''}
            opts={opts}
            onReady={this._onReady}
            onStateChange={this._onStateChange}
            />
        }
        <div>
          <h1>New Releases</h1>
          <div className="movie-list">
            { this.state.movies.map(mov => <MovieTile key={mov.id} showMovie={this.showMovie} movie={mov}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
