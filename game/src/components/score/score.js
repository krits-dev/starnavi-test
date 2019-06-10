import React from 'react';
//css
import './score.css';
//redux
import { connect }  from 'react-redux';
//components
import ShowWinner from '../show-winner';

const Score = ({ computerPoints, playerPoints, winner }) => {

	const renderWinner = winner ? <ShowWinner /> : null

	return (
		<div className="score">
			<div className="row">	
				<div className="col-md-4">
					<div>Computer: <span>{computerPoints}</span></div>
				</div>
				<div className="col-md-4">
					{renderWinner}
				</div>
				<div className="col-md-4">
					<div>You: <span>{playerPoints}</span></div>	
				</div>
			</div>	
		</div>
	)	
};

const mapStateToProps = ({ computerPoints, playerPoints, winner }) => {
	return { computerPoints, playerPoints, winner }
};

export default connect(mapStateToProps)(Score);

