import axios from 'axios';

export default class TestService {
	
	// https://cors-anywhere.herokuapp.com/
	_apiBase = 'https://starnavi-frontend-test-task.herokuapp.com';

	getResource = async (url) => {
    const res = await axios({
   		url: 'http://localhost:8080',
      method: 'post',
      data: {   
        url: `${this._apiBase}${url}`,
        method: 'get'
      }
    })
  		return res.data;
	};
	getWinners = async () => {
		const res = await this.getResource(`/winners`);
		return res.slice(-6);
	};
	getEasyMode = async () => {
		const res = await this.getResource(`/game-settings`);
		return res.easyMode		
	};
	getNormalMode = async () => {
		const res = await this.getResource(`/game-settings`);
		return res.normalMode		
	};
	getHardMode = async () => {
		const res = await this.getResource(`/game-settings`);
		return res.hardMode		
	};
};

