import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './pages/app/store';
import { App } from './pages';
import { BrowserRouter } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
);

ReactDom.render(
<Root />,
  document.body.querySelector('#root'),
);
