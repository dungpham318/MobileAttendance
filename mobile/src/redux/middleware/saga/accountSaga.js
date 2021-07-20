import {

  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,

  CHECK_ACCOUNT,
  CHECK_ACCOUNT_ERROR,
  CHECK_ACCOUNT_SUCCESS,

  SAVE_ACCOUNT,
  SAVE_ACCOUNT_ERROR,
  SAVE_ACCOUNT_SUCCESS,

  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_PASSWORD_SUCCESS,

} from '../../actions/accountAction';

import { call, takeEvery, put } from 'redux-saga/effects';

import {
  loginApi,
  checkAccountApi,
  saveAccountApi,
  setPasswordApi
} from "../api/accountApi";

const error = 'Không kết nối được với máy chủ'

function* loginSaga(action) {
  try {
    const response = yield loginApi(action.input);
    if (response === undefined) {
      yield put({ type: LOGIN_ERROR, error });
    } else {
      yield put({ type: LOGIN_SUCCESS, response });
    }
  } catch (error) {
    const err = 'Không kết nối được với máy chủ'
    yield put({ type: LOGIN_ERROR, err });
  }
}
export function* watchLoginSaga() {
  yield takeEvery(LOGIN, loginSaga);
}

function* checkAccountSaga(action) {
  try {
    const response = yield checkAccountApi(action.input);
    if (response === undefined) {
      yield put({ type: CHECK_ACCOUNT_ERROR, error });
    } else {
      yield put({ type: CHECK_ACCOUNT_SUCCESS, response });
    }
  } catch (error) {
    const err = 'Không kết nối được với máy chủ'
    yield put({ type: CHECK_ACCOUNT_ERROR, err });
  }
}
export function* watchCheckAccountSaga() {
  yield takeEvery(CHECK_ACCOUNT, checkAccountSaga);
}

function* saveAccountSaga(action) {
  try {
    const response = yield saveAccountApi(action.input);
    if (response === undefined) {
      yield put({ type: SAVE_ACCOUNT_ERROR, error });
    } else {
      yield put({ type: SAVE_ACCOUNT_SUCCESS, response });
    }
  } catch (error) {
    const err = 'Không kết nối được với máy chủ'
    yield put({ type: SAVE_ACCOUNT_ERROR, err });
  }
}
export function* watchSaveAccountSaga() {
  yield takeEvery(SAVE_ACCOUNT, saveAccountSaga);
}

function* setPasswordSaga(action) {
  try {
    const response = yield setPasswordApi(action.input);
    if (response === undefined) {
      yield put({ type: SET_PASSWORD_ERROR, error });
    } else {
      yield put({ type: SET_PASSWORD_SUCCESS, response });
    }
  } catch (error) {
    const err = 'Không kết nối được với máy chủ'
    yield put({ type: SET_PASSWORD_ERROR, err });
  }
}
export function* watchSetPasswordSaga() {
  yield takeEvery(SET_PASSWORD, setPasswordSaga);
}