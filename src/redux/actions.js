import * as types from "./actionTypes";

function login(name, password) {
  return {
    type: types.LOGIN_ACTION,
    payload: {
      name,
      password,
    },
  };
}

function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export { login, loginSuccess, loginFailure };
