import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './pages/app/store';
import { App } from './pages';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Root = () => (
  <BrowserRouter>
  <Provider store={store}>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin} >
    <App />
  </Auth0Provider>
  </Provider>
  </BrowserRouter>
);

ReactDom.render(
  <Root />,
  document.body.querySelector('#root'),
);
