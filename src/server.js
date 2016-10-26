import 'source-map-support/register';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appStore from 'reducers';
import Index from './index';

export default function(initialState) {
  const store = createStore(appStore, initialState, applyMiddleware(thunk));
  return renderToString(
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
