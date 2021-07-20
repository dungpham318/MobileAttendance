import {

  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

} from "../actions/accountAction"

const initialState = {
  loading: false,
  response: null,
  error: null
}

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        loading: true,
        response: null,
        error: null
      })

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        response: action.response
      })

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        response: null,
        error: action.error
      })
    default:
      return state
  }
}

export {
  loginReducers,
}