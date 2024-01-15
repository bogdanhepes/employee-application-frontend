import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { login } from "../services/authentication";

// Constants

const START_LOGIN_USER = "user/START_LOGIN_USER";
const COMPLETE_LOGIN_USER = "user/COMPLETE_LOGIN_USER";
const FAIL_LOGIN_USER = "user/FAIL_LOGIN_USER";

const LOGOUT = "user/LOGOUT";

interface State {
  isLoading: boolean;
  isLoggedIn: boolean;
}

type Dispatch = ThunkDispatch<State, any, AnyAction>;

// Initial State
const initialState: State = {
  isLoading: false,
  isLoggedIn: false,
};

// Action Creators
const startLoginUser = () => ({
  type: START_LOGIN_USER,
});

const completeLoginUser = () => ({
  type: COMPLETE_LOGIN_USER,
});

const failLoginUser = () => ({
  type: FAIL_LOGIN_USER,
});
const doLogout = () => ({
  type: LOGOUT,
});

// Async Actions
export const loginUser =
  (username: string, password: string) => (dispatch: Dispatch) => {
    dispatch(startLoginUser());
    const loginUserPromise = login(username, password);
    loginUserPromise
      .then(() => {
        dispatch(completeLoginUser());
        sessionStorage.setItem("username", username);
      })
      .catch(() => dispatch(failLoginUser()));
    return loginUserPromise;
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("username");
  sessionStorage.removeItem("username");
  dispatch(doLogout());
};

// Reducer
export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };
    case FAIL_LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case COMPLETE_LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
