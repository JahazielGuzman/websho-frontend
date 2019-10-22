import React, { Component } from 'react';
import MovieTile from './MovieTile'
import '../App.css';

const URL = process.env.REACT_APP_BACKEND

class MovieRecommendation extends Component {

    state = {
      movies: [],
      customMovies: [],
      allMovies: []
    }

    constructor(props) {
      super(props);
    }

    setMovies(list1, list2=this.state.movies) {
      this.setState(
        {movies: [...list1, ...list2]},
        () => this.props.showMovie(this.state.movies[0].movies[0])
      );
    }

    getCustomMovies() {

      return fetch(`${URL}/user_custom_movies`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": localStorage.getItem('token')
        }
      })

    }

    updateCustomMovies() {

      this.getCustomMovies().then(res => res.json())
      .then(
        (customMovies) => 
        this.setState(
          {customMovies: customMovies},
          () => this.setMovies(customMovies)
        )
      )
    }

    // ******************************
    // start component did mount
    // ******************************

    componentDidMount() {
      fetch(`${URL}/movies_always_show`)
      .then(res => res.json())
      .then(allMovies => {

        if (this.props.user) {
          // if the user exists then return the fetch for recently_viewed allMovies
          this.getCustomMovies().then(res => res.json())
          .then((customMovies) =>
            this.setState(
              {customMovies: customMovies, allMovies: allMovies},
              () => {console.log(customMovies);this.setMovies(customMovies, allMovies)}
            )
          )
        }
        else {
          // return the original movies that were passed in
          this.setState(
            {allMovies: allMovies},
            () => this.setMovies(allMovies)
          );
        }

      })

    }

    // ******************************
    // end component did mount
    // ******************************

    render() {

      if (this.props.didWatch) {
        this.updateCustomMovies();
      }

      return (
        <div>
        {
          (this.state.movies) ?
          this.state.movies.map(
            (mov, index) =>
            <MovieTile 
              placeDeets={(this.props.bannerCat == null && index == 0) ? true : this.props.bannerCat == mov.cat} 
              key={mov.cat} 
              cat={mov.cat}
              movieDeets={this.props.movieDeets}
              showMovie={this.props.showMovie}
              playMovie={this.props.playMovie}
              movies={mov.movies}/>
          ):
          null
        }
        </div>
      );
    }
}

export default MovieRecommendation;
