import React, { Component } from 'react';
import axios from 'axios';

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './reducer';

import logo from './logo.svg';
import './App.css';

import MoviesSect from './components/MoviesSect';
import MovieWin from './components/MovieWin';

// TODO: get redux set up...
const store = createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    movies: [],
    winner: null
  }
});

class App extends Component {
  constructor() {
    super();
    this.onVoteChange = this.onVoteChange.bind(this);
    this.setWinner = this.setWinner.bind(this);

    this.state = {
      movies: [],
      winner: null
    };

    const req = 'http://api-public.guidebox.com/v2/movies?api_key=e75b1a31bbed49eb6ba7260539fce60627bcf38b&limit=10&include_in_theaters=true';
    // &movie_id=12345

    axios.get(req)
      .then((response) => {
        const movies = response.data.results.map((movie) => {
          const title = movie.title;
          movie.votes = 0;
          if (title.endsWith(')')) movie.title = title.substring(0, title.indexOf('(') - 1);
          return movie;
        });

        console.log(movies);

        this.setState({
          movies: movies
        });
      });

    axios.get('https://api.cinepass.de/v4/movies?search_query=Batmany&search_field=title', {
      headers: { 'X-Api-Key': '0GtzbCcJJcSRqrwyLGXdHE27eyPScsqE' }
    })
      .then((response) => {
        console.log(response.data);
      });

    // only handling brooklyn for now
    // axios.get('https://api.cinepass.de/v4/showtimes?city_ids=2221&movie_id=150256', {
    //   headers: { 'X-Api-Key': '0GtzbCcJJcSRqrwyLGXdHE27eyPScsqE' }
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   });
  }

  onVoteChange(movie) {
    let movies = this.state.movies;
    movie.votes += 1;

    this.setState({
      movies: movies = Object.assign(movies)
    });
  }

  setWinner(movie) {
    this.setState({
      winner: Object.assign({}, movie)
    });
  }
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="App-intro">
            <MoviesSect movies={this.state.movies} onChange={this.onVoteChange} setWinner={this.setWinner}></MoviesSect>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
