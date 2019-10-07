import React, { Component } from 'react';
import MovieTile from './movieTile'
import '../App.css';
const URL = "http://localhost:3000";

class MovieRecommendation extends Component {

    state = {
      movies: []
    }

    constructor(props) {
      super(props);
    }

    // ******************************
    // start component did mount
    // ******************************

    componentDidMount() {
      fetch('http://localhost:3000/movies_always_show')
      .then(res => res.json())
      .then(newestMovies => {

        if (this.props.user) {
          // if the user exists then return the fetch for recently_viewed newestMovies
          return fetch(`${URL}/user_custom_movies`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": localStorage.getItem('token')
            }
          })
          .then(
            res => res.json()
            .then(
              (viewedMovies) => {
                viewedMovies = viewedMovies.movies === [] ? [] : viewedMovies;
                return new Promise((resolve, reject) => resolve([...viewedMovies, ...newestMovies]))
              }
            )
          )
        }
        else {
          // return the original movies that were passed in
          return new Promise((resolve, reject) => resolve([...newestMovies]))
        }

      })
      .then(movies => {
        this.setState({ movies: [...this.state.movies, ...movies] });
        movies[0].movies[6] ?
        this.props.showMovie(movies[0].movies[6]):
        this.props.showMovie(movies[0].movies[0])

      })
      .catch(m => console.log(m));
    }
    // ******************************
    // end component did mount
    // ******************************

    render() {

      return (
        <div>
        {
          (this.state.movies) ?
          this.state.movies.map(
            mov =>
            <MovieTile key={mov.cat} cat={mov.cat} showMovie={this.props.showMovie} movies={mov.movies}/>
          ):
          null
        }
        </div>
      );
    }
}

export default MovieRecommendation;
