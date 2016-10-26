import { combineReducers } from 'redux';

import todos from './todos';

const app = combineReducers({
  todos,
});

export default app;
