import * as actions from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  name: null,
  email: null,
  token: null,
  isLoading: false,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_ACTION: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case actions.LOGIN_SUCCESS: {
      const { name, email, token } = action.payload;
      const newState = { ...state };

      newState.isLoggedIn = true;
      newState.name = name;
      newState.email = email;
      newState.token = token;
      newState.isLoading = false;

      return newState;
    }

    case actions.LOGIN_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}

export { loginReducer };
