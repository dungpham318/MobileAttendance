import { combineReducers } from 'redux';

import {
  loginReducers,
} from './accountReducer'

const allReducers = combineReducers({

  loginReducers,

});

export default allReducers;