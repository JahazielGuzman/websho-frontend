import React, { Component } from 'react';
import Youtube from 'react-youtube';
import logo from './logo.svg';
import MovieDetail from './components/movieDetails'
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
    search_query: "",
    showSearch: false,
    resultList: {}
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

  showSuggestions = () => {
    // fetch(`${URL}/search_short`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     "Authorization": localStorage.setItem('token', data.token.split(' ')[1])
    //   },
    //   body: JSON.stringify(this.state.search_query)
    // })
    // .then(res => res.json())
    // .then(suggestions => )
  }

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
    console.log('exiting...')
    this.setState({search_query: "", showSearch: false});
  }

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

  logout = () => {
    this.setState({user: null});
    localStorage.setItem('token', null)
  }

  onClickSignIn = () => {
    this.setState({showLogin: true});
  }

  showMovie = (movie) => {
    this.setState({movieDeets: movie})
  }

  playMovie = (movie) => {
    // check if user is authenticated
    if (this.state.user) {
      // if is authenticated then play movie
      console.log(movie.original_id)
      fetch(`https://api.themoviedb.org/3/movie/${movie.original_id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`, {
        headers: {
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(
        trailer => {
          if (trailer.results[0]) {

            console.log(trailer)
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
      if (this.state.movieDeets != null)
        return (
            <MovieDetail movie={this.state.movieDeets} playMovie={this.playMovie} />
        )
    }
    else
    return <Youtube
      id="player"
      videoId={this.state.nowPlaying ? this.state.nowPlaying : ''}
      opts={opts}
      onReady={this._onReady}
      onStateChange={this._onStateChange}
    />
  }


  render () {


    return (
      <div className="App">
        <Banner user={this.state.user} showHome={this.showHome} logout={this.logout} onSearchSubmit={this.onSearchSubmit} onClickSignIn={this.onClickSignIn}/>
        {
          this.state.showLogin || this.state.showSearch ?
          this.state.showSearch ?
          <SearchResults showMovie={this.showMovie} searchQuery={this.state.search_query} exitSearch={this.exitSearch} resultList={this.state.resultList}/>
          :
          <ShowSignup onLogin={this.login} onSignup={this.signup} />
        :
        <React.Fragment>
          {this.showYoutube()}
          <MovieRecommendation user={this.state.user} showMovie={this.showMovie} updateWatched={this.updateWatched} didWatch={this.state.didWatch}/>
        </React.Fragment>

        }
      </div>
    );
  }
}

export default App;
