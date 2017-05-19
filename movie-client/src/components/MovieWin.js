import React, { Component } from 'react';
import Movie from './Movie';
import './MovieWin.css';

class MovieWin extends Component {
  render() {
    return (
      <section className="MovieWinner-sect">
        {
          this.props.winner ?
          <div>
            <p>this.props.winner.title</p>
          </div>
          : null
        }
      </section>
    );
  }
}

export default MovieWin;
