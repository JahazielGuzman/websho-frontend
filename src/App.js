import React, { Component } from 'react';
import Youtube from 'react-youtube';
import logo from './logo.svg';
import MovieDetail from './components/movieDetails'
import ShowSignup from './components/ShowSignup'
import Banner from './components/Banner'
import MovieRecommendation from './components/MovieRecommendation'
import './App.css';
const URL = "http://localhost:3000";

class App extends Component {

  state = {

    nowPlaying: null,
    movieDeets: null,
    player: null,
    iframe: null,
    user: null,
    showLogin: false
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      fetch(`${URL}/establish_session`, {
        headers: {
          "Accept": "application/json",
          "Authorization": localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(data => {
          this.setState({user: data.user, showLogin: false});
       });
    }
    else
      alert("sorry we could not log you in");
  }

  login = (formInfo) => {

    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formInfo)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token.split(' ')[1]);
        this.setState({user: data.user, showLogin: false});
      }
      else
        alert("sorry we could not log you in");
     });
  }

  signup = (formInfo) => {
    // fetch to the /signup route
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(formInfo)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token.split(' ')[1]);
        this.setState({user: data.user, showLogin: false});
      }
      else
        alert("sorry we could sign you up");
     });
  }

  logout = () => {
    this.setState({user: null});
  }

  showMovie = (movie) => {
    this.setState({movieDeets: movie})
  }

  playMovie = (movie) => {
    // check if user is authenticated
    if (this.state.user) {
      // if is authenticated then play movie
      this.setState({nowPlaying: movie.trailer});
      // now we want to do a fetch request
      // to an endpoint that creates a viewing, send the token and the movie id.
      // get back a confirmation that we go it to work
      fetch(`${URL}/viewings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({movie_id: movie.id})
      })
    }
    else {
      // otherwise then we need to ask them to sign in
      this.setState({showLogin: true});
    }
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


// function setupListener (){
// $('button').addEventListener('click', playFullscreen);
// }


  render () {

    let opts = {
      height: 0,
      width: 0
    }

    return (
      (this.state.showLogin) ?
      <ShowSignup onLogin={this.login} onSignup={this.signup} /> :
      <div className="App">
        <Banner user={this.state.user} logout={this.logout}/>
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
        <MovieRecommendation user={this.state.user} showMovie={this.showMovie}/>
      </div>
    );
  }
}

export default App;
