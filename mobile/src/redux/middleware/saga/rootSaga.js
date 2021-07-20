import { all } from 'redux-saga/effects';

import {
  watchLoginSaga,
} from './accountSaga'


export default function* rootSaga() {
  yield all([

    watchLoginSaga()

  ]);
}