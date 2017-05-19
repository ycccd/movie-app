import React, { Component } from 'react';
import Movie from './Movie';
import './MovieRow.css';

class MovieRow extends Component {
  constructor() {
    super();
    this.movies = [];
  }

  render() {
    return (
          <section className="MovieRow-sect">
            {
              this.movies.length ? 
                <div>
                  <h3>{this.props.title}</h3>
                  <div className="MovieRow-row">
                    {this.movies.map((movie) => <Movie key={movie.id} data={movie} type={this.props.type} handleClick={this.props.onChange}></Movie>)}
                  </div>
                </div>
              : null
            }
          </section>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === 'choices') {
      this.movies = nextProps.movies.filter((movie) => movie.votes === 0);
    } else if (nextProps.type === 'voted') {
      this.movies = nextProps.movies.filter((movie) => movie.votes !== 0).sort((a, b) => a.votes < b.votes);
    }
  }
}

export default MovieRow;
