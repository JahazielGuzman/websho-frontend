import React, { Component } from 'react';
import Youtube from 'react-youtube';
import logo from './logo.svg';
import MovieDetail from './components/MovieDetail'
import ShowSignup from './components/ShowSignup'
import Banner from './components/Banner'
import MovieRecommendation from './components/MovieRecommendation'
import SearchResults from './components/SearchResults'
import './App.css';

const URL = process.env.REACT_APP_BACKEND

class App extends Component {

  state = {

    nowPlaying: null,
    movieDeets: null,
    didWatch: false,
    iframe: null,
    user: null,
    showLogin: false,
    bannerCat: null,
    moviePoster: null,
    search_query: "",
    showSearch: false,
    resultList: {}
  }

  // Once app is mounted, we will log user in if they have a JWT token and
  // we will store the user info in state and let the user watch movies
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
  }

  // Input: JSON object with username and password information, submit a POST request to login route
  // and then return a JWT token to store on the client side
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

  // accept search text as a string, submit to the /search_movies route and
  // and return a JSON object with a category member and an array of movies matching
  // the search string
  onSearchSubmit = (search_query) => {
    this.setState({search_query: search_query, showSearch: true})
    fetch(`${URL}/search_movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"search_query": search_query})
    })
    .then(res => res.json())
    .then( suggestions => this.setState({resultList: suggestions}) )
  }

  exitSearch = (e) => {
    e.preventDefault();
    this.setState({search_query: "", showSearch: false});
  }

  // Show the main page with all movie results by
  // setting showLogin and showSearch booleans to false
  showHome = () => {
    this.setState({showLogin: false, showSearch: false})
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
        alert("sorry we could not sign you up");
     });
  }

  onClickSignOut = () => {
    this.setState({user: null});
    localStorage.setItem('token', null)
  }

  onClickSignIn = () => {
    this.setState({showLogin: true});
  }

  // Input: A JSON object with movie data. set this as the state of movieDeets
  // then call playMovie function with the movie as an argument to play the movie
  showMovie = (movie, cat=null) => {
    // only show if we are not in the search screen
    if (!this.state.showSearch) {
      let scrollY = window.scrollY;
      this.setState({movieDeets: movie, bannerCat: cat})
    }
    else
      this.playMovie(movie);
  }

  playMovie = (movie) => {
    // check if user is authenticated
    if (this.state.user) {
      // if is authenticated then play movie
      fetch(`https://api.themoviedb.org/3/movie/${movie.original_id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`, {
        headers: {
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(
        trailer => {
          if (trailer.results[0]) {

            this.setState({nowPlaying: trailer.results[0].key});
          }
          else
            alert('sorry! No trailer is available');
        } 
      )
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
    this.setState({nowPlaying: null, didWatch: true}, () => this.setState({didWatch: false}))
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
  showYoutube() {

    let opts = {
      height: 300,
      width: 300
    }

    if (this.state.nowPlaying == null) {
      if (this.state.movieDeets != null && this.state.showSearch != true){}
    }
    else
      return (
        <Youtube
          id="player"
          videoId={this.state.nowPlaying ? this.state.nowPlaying : ''}
          opts={opts}
          onReady={this._onReady}
          onStateChange={this._onStateChange}
        />
      )
  }


  render () {

    return (
      <React.Fragment>
        <Banner user={this.state.user} showLogin={this.state.showLogin} showHome={this.showHome} onClickSignOut={this.onClickSignOut} onSearchSubmit={this.onSearchSubmit} onClickSignIn={this.onClickSignIn}/>
        {this.showYoutube()}
        {
          this.state.showLogin || this.state.showSearch ?
          this.state.showSearch ?
          <SearchResults showMovie={this.showMovie} searchQuery={this.state.search_query} exitSearch={this.exitSearch} resultList={this.state.resultList}/>
          :
          <ShowSignup onLogin={this.login} onSignup={this.signup} />
        :
        <React.Fragment>
          <MovieRecommendation
            key={this.state.user ? 1 : 2}
            bannerCat={this.state.bannerCat}
            movieDeets={this.state.movieDeets} 
            playMovie={this.playMovie}
            user={this.state.user} 
            showMovie={this.showMovie} 
            updateWatched={this.updateWatched} 
            didWatch={this.state.didWatch}
          />
        </React.Fragment>

        }
      </React.Fragment>
    );
  }
}

export default App;
