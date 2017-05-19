import React, { Component } from 'react';

class Metadata extends Component {
	render() {
		return (
	  		<h2>Votes to Win: 5, Total Votes: {this.props.count}</h2>
		);
	}
}

export default Metadata;
