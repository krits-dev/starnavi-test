import React, { Component } from 'react';
//css
import './game-page.css';
//redux
import { connect }  from 'react-redux';
//actions
import { gameOn, onItemClick }  from '../../actions/actions';
//components
import PlayButton from '../play-button';
import Score from '../score';
import GameMode from '../game-mode';
import GameField from '../game-field';
import PlayerName from '../player-name';

class GamePage extends Component {
	
	startGame = () => {
		const { delay } = this.props.modeSettings;
		const intervalDelay = delay + 25;
		this.props.gameAction();
		this.interval = setInterval(this.props.gameAction, intervalDelay);
	}
	componentDidUpdate() {
		if (this.props.gameStopped) {
			clearInterval(this.interval);
		}
	}
	render() {
		return (
			<div className="col-md-7">
				<div className="header">
					<div className="row">	
						<GameMode />
						<PlayerName />
						<PlayButton game={this.startGame} />
					</div>																
				</div>
				<Score />								
				<GameField />	
			</div>
		)
	};	
};

const mapStateToProps = ({ buttons, gameStopped, modeSettings }) => {
  return { buttons, gameStopped, modeSettings }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	gameAction: () => dispatch(gameOn())
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);