import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { generateButtons } from '../components/helpers'

const initialState = {
	winners: [],
	buttons: generateButtons(100),
	loading: true,
	error: null,
  playerName: '',
	gameStopped: false,
  playButton: true,
  itemsLoading: false,
  computerPoints: 0,
  winner: null,
  playerPoints: 0,
  modeSettings: { field: 10, delay: 1000 }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

  	case 'LOAD_WINNERS_REQUEST':
      return {
        ...state,
        winners: [],
        loading: true,
        error: null
      }

    case 'LOAD_WINNERS_SUCCESS':
      return {
        ...state,
        winners: action.payload,
        error: null,
        loading: false       
      }

    case 'LOAD_WINNERS_FAILURE':
      return {
        ...state,
        winners: [],
        loading: false,
        error: action.payload
      }

    case 'LOAD_GAME_SETTINGS': {
      const { field } = action.payload;
        return { ...state, modeSettings: action.payload }
      }
    case 'NAME_WILL_CHANGE': 
      return { ...state, playerName: action.payload}
    case 'CHANGE_BUTTON_NAME': 
      return { ...state, playButton: false }

    case 'ITEMS_WILL_UPDATE': 
      return { ...state, itemsLoading: true}

    case 'START_NEW_GAME': {
        const { field } = action.payload;
        return { ...state,
                  buttons: generateButtons(field * field),
                  computerPoints: 0,
                  winner: null,
                  playerPoints: 0,
                  gameStopped: false,
                  itemsLoading: false,
                  playButton: true }
      }  
    case 'ON_TOGGLE_BLUE':
    	return { ...state, buttons: action.payload }

    case 'ON_TOGGLE_RED':
    	return { ...state, buttons: action.payload }
    		
    case 'ON_TOGGLE_GREEN':
    	return { ...state, buttons: action.payload }

    case 'GET_PLAYER_POINT':
      return {...state, playerPoints: state.playerPoints + 1}

    case 'GET_COMPUTER_POINT':
      return {...state, computerPoints: state.computerPoints + 1}    
    
    case 'GAME_WILL_STOPPED':
      return { ...state, gameStopped: true }

    case 'LOAD_WINNER': 
      return { ...state, winner: action.payload}
   	
    default:
      return state;
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;