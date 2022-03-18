import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/App';

import { Provider } from 'react-redux';
import { store } from './app/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
