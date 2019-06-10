import React from 'react';
//css
import './show-winner.css';
//redux
import { connect }  from 'react-redux';

const ShowWinner = ({ winner }) => {
	
	return (
		<div className="winner">
			<span>{winner}</span> WIN
		</div>
	)
};

const mapStateToProps = ({ winner }) => {
  return { winner }
};

export default connect(mapStateToProps)(ShowWinner);
