import React from 'react';
//css
import './game-mode.css';
//redux
import { connect }  from 'react-redux';
//actions
import { getSettings } from '../../actions/actions'


const GameMode = ({ gameMode }) => {		
	return (
		<div className="col-md-4">
			<div className="mode-menu">
				Pick game mode<span>&#9660;</span>
				<ul className="mode-list">
					<li><a onClick={() => gameMode('easy')}>Easy</a></li>
					<li><a onClick={() => gameMode('normal')}>Normal</a></li>
					<li><a onClick={() => gameMode('hard')}>Hard</a>
				</li>	        
				</ul>
			</div>
		</div>
	)
};

const mapStateToProps = ({ modeSettings }) => {
  return { modeSettings }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	gameMode: (mode) => dispatch(getSettings( mode))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMode);