import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import ScrollToTop from './app/nav/ScrollToTop';
import { UserContextProvider } from './app/auth/UserContext';

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <UserContextProvider>
      <BrowserRouter>
        <ToastProvider placement='bottom-right' autoDismissTimeout={2700}>
          <ScrollToTop />
          <App />
        </ToastProvider>
      </BrowserRouter>
    </UserContextProvider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
