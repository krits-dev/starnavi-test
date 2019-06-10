import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import TestService from './services/test-service';
import store from './redux-store';
import { ServiceProvider } from
  './components/service-context/service-context';

const service = new TestService();

ReactDOM.render(
	<Provider store={store}>
		<ServiceProvider value={service}>
			<App />
    </ServiceProvider>          		
  </Provider>,
	document.getElementById('root')
);







