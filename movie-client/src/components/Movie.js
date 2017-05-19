import React, { Component } from 'react';
import './Movie.css';

class Movie extends Component {
  render() {
    return (
      <div className="Movie-comp" onClick={(e) => this.props.handleClick(this.props.data)}>
        <div>
          <p>Title: {this.props.data.title}</p>
          <p>Rating: {this.props.data.rating}</p>
          {this.props.type === 'voted' ? <p>Votes: {this.props.data.votes}</p> : null}
          <img src={this.props.data.poster_120x171} alt="logo" />
        </div>
      </div>
    );
  }
}

export default Movie;
