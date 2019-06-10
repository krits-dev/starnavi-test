import { format } from 'date-fns'
import axios from 'axios';
import TestService from '../services/test-service'

const service = new TestService();

const winnersRequest = () => {
  return {
    type: 'LOAD_WINNERS_REQUEST'
  }
};
const onToggleBlue = (updateBlueItems) => {
	return {
		type: 'ON_TOGGLE_BLUE',
		payload: updateBlueItems
	}
};
const onToggleRed = (updateRedItems) => {
	return {
		type: 'ON_TOGGLE_RED',
		payload: updateRedItems
	}
};
const changeName = (value) => {
	return {
		type: 'NAME_WILL_CHANGE',
    payload: value
	}	
};
const stopGame= () => {
	return {
		type: 'GAME_WILL_STOPPED',
	}
};
const getComputerPoint = () => {
	return {
		type: 'GET_COMPUTER_POINT'
	}	
};
const winnersLoaded = (data) => {
  return {
    type: 'LOAD_WINNERS_SUCCESS',
    payload: data
  }
};
const winnersError = (err) => {
	return {
		type: 'LOAD_WINNERS_FAILURE',
		payload: err
	}
};
const onToggleGreen = (updateGreenItems) => {
	return {
		type: 'ON_TOGGLE_GREEN',
		payload: updateGreenItems
	}	
};
const getPlayerPoint = () => {
	return {
		type: 'GET_PLAYER_POINT'
	}	
};
const loadGameSettings = (data) => {
	return {
		type: 'LOAD_GAME_SETTINGS',
		payload: data
	}	
};
const buttonName = () => {
	return {
		type: 'CHANGE_BUTTON_NAME'
	}	
};
const newGame = (settings) => {
	return {
		type: 'START_NEW_GAME',
		payload: settings
	}	
};
const itemsLoading = () => {
	return {
		type: 'ITEMS_WILL_UPDATE'
	}	
};
const loadWinner = (winner) => {
	if (winner === '') {
		winner = 'Player'
	}
	return {
		type: 'LOAD_WINNER',
		payload: winner
	}	
};

const loadWinners = () => {
	return (dispatch) => {
	  dispatch(winnersRequest());
	  service.getWinners()
	    .then((data) => dispatch(winnersLoaded(data)))
	    .catch((err) => dispatch(winnersError(err)));
  }  
};

const getSettings = (mode) => {
	return (dispatch, getState) => {
		const settings = getState().modeSettings;
		const { delay } = settings;
		dispatch(itemsLoading());
		dispatch(stopGame())
		if (mode === 'easy') {
			service.getEasyMode().then((data) => {
				dispatch(loadGameSettings(data))
				setTimeout(() => dispatch(newGame(data)), delay + 25);	
			});				
		}
		if (mode === 'normal') {
			service.getNormalMode().then((data) => {
				dispatch(loadGameSettings(data))
				setTimeout(() => dispatch(newGame(data)), delay + 25);	
			});				
		}
		if (mode === 'hard') {
			service.getHardMode().then((data) => {
				dispatch(loadGameSettings(data))
				setTimeout(() => dispatch(newGame(data)), delay + 25);				
			});				
		}
	};
};					

const onPlayClick = () => {
	return (dispatch, getState) => {
		const settings = getState().modeSettings;
		const { delay } = settings;
		const btnName = getState().playButton;
		if (btnName === false) {
			dispatch(stopGame())
			dispatch(itemsLoading())
			setTimeout(() => dispatch(newGame(settings)), delay + 25)
		}
		if (btnName === true) {
			dispatch(buttonName())
		}			
	}
};

const sendWinner = (winner, date) => {
	return () => {
	  axios({
	    url: 'http://localhost:8080',
	    method: 'post',
	    data: {
	      url: 'http://starnavi-frontend-test-task.herokuapp.com/winners',
	      method: 'post',       
	      data: {winner, date}    
			}
	  })
  }
};

const gameOn = (service) => {
	return (dispatch, getState) => {
		const itemsLength = getState().buttons.length;
		const countRedItems = getState().buttons
			.filter(item => item.red === true).length * 100 / itemsLength
		if ((itemsLength === 25) && (countRedItems >= 45)) {
			dispatch(stopGame())
			dispatch(loadWinner('Computer'))
			const winner = getState().winner;
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}
		if ((itemsLength === 100) && (countRedItems >= 49)) {
			dispatch(stopGame())
			dispatch(loadWinner('Computer'))
			const winner = getState().winner;
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}
		if ((itemsLength === 225) && (countRedItems >= 49)) {
			dispatch(stopGame())
			dispatch(loadWinner('Computer'))
			const winner = getState().winner;
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}	

	 	const blue = getState().buttons.filter((item) => item.blue === false)
			.map((item) => item.id);
		const rnd = Math.floor(Math.random() * blue.length);
		const id = blue[rnd];
		const updateBlueItems = getState().buttons.map(item => {
			if (item.id === id) {
				return {...item, blue: true}
			}
			return item
		})
		dispatch(onToggleBlue(updateBlueItems))
		const { delay } = getState().modeSettings;
		setTimeout(() => {
			const updateRedItems = getState().buttons.map(item => {
		    if ((item.id === id) && (item.green === false)) {
		      return { ...item, red: true }
		    }
		    return item
	  	})
	  	const item = getState().buttons.find(item => item.id === id);
			if (item.green === false) {
				dispatch(getComputerPoint());
			}	
	  	dispatch(onToggleRed(updateRedItems))}
  	, delay) 
	}
};

const onItemClick = (id) => {
	return (dispatch, getState) => {
		const itemsLength = getState().buttons.length;
		const countGreenItems = getState().buttons
			.filter(item => item.green === true).length * 100 / itemsLength
		const player = getState().playerName
		if ((itemsLength === 25) && (countGreenItems >= 45)) {
			dispatch(stopGame())
			dispatch(loadWinner(player)) 
			const winner = getState().winner;
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}
		if ((itemsLength === 100) && (countGreenItems >= 49)) {
			dispatch(stopGame())
			dispatch(loadWinner(player))
			const winner = getState().winner;
			console.log(winner)
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}
		if ((itemsLength === 225) && (countGreenItems >= 49)) {
			dispatch(stopGame())
			dispatch(loadWinner(player))
			const winner = getState().winner;
    	const date = format(new Date(), 'HH:mm; DD MMMM YYYY');
			dispatch(sendWinner(winner, date));
			dispatch(loadWinners())
		}

		const updateGreenItems = getState().buttons.map(item => {
			if ((item.id === id) && (item.blue === true) && (item.red === false)) {
				return { ...item, green: true }
			}
				return item
		})
		const item = getState().buttons.find(item => item.id === id);
		if ((item.blue === true) && (item.green === false) && (item.red === false)) {
			dispatch(getPlayerPoint());
		}			
		dispatch(onToggleGreen(updateGreenItems));					
	}
};

export {
  loadWinners,
  gameOn,
  onItemClick,
  getSettings,
  onPlayClick,
  changeName 
};
