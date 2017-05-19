import React, { Component } from 'react';
import MovieRow from './MovieRow';
import Metadata from './Metadata';
import './MoviesSect.css';

class MoviesSect extends Component {
	constructor() {
		super();
	    this.movieRowTypes = {
	      CHOICES: 'choices',
	      VOTED: 'voted'
    	};
    	this.count = 0;
    	this.maxCount = 5;
	}

  	voteCount() {
	    return this.props.movies.reduce((acc, movie) => acc + movie.votes, 0);
  	}

	render() {
	    return (
	    	<div className="MoviesSect">
    		{this.count < this.maxCount ?
    			<div>
					<Metadata movies={this.props.movies} count={this.count}></Metadata>
		            <MovieRow title="Vote From: " movies={this.props.movies} type={this.movieRowTypes.CHOICES} onChange={this.props.onChange}></MovieRow>
		            <MovieRow title="Movies People Voted: " movies={this.props.movies} type={this.movieRowTypes.VOTED} onChange={this.props.onChange}></MovieRow>
	            </div>
            : null}
	    	</div>
    	);
  	}

	componentWillReceiveProps(nextProps) {
		this.count = this.voteCount();
		if (this.count >= this.maxCount) {
			this.props.setWinner(this.props.movies.reduce((max, movie) => movie.votes > max.votes ? movie : max), {votes: 0});
		}
  	}
}

export default MoviesSect;
