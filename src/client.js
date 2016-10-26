import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as actions from 'actions';

import appStore from 'reducers';

import Index from './index';

let store;
if (window.__INITIAL_STATE__) {
  store = createStore(appStore, window.__INITIAL_STATE__, applyMiddleware(thunk));
  window.__DISPATCH__ = (action) => store.dispatch(action);
} else {
  store = createStore(appStore, applyMiddleware(thunk));
  store.dispatch(actions.get());
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
document.getElementById('container'));
