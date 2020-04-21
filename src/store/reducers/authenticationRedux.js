import { batchActions } from "redux-batched-actions";
import { POST_LOGIN_URI, POST_LOGOUT_URI } from "../../Utils/ApiUrl";
import getAxiosInstance from "../../Utils/axios";
import { dispatchError } from "./errorMessageRedux";
import { clearStoreAccount, storeAccount } from "./accountRedux";

const POST_REQUEST = "POST_REQUEST";
const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
const POST_BATCH_LOGIN_ERROR = "POST_BATCH_LOGIN_ERROR";
const POST_BATCH_LOGIN_SUCCESS = "POST_BATCH_LOGIN_SUCCESS";
const POST_BATCH_LOGOUT_SUCCESS = "POST_BATCH_LOGOUT_SUCCESS";

const postRequest = () => {
  return {
    type: POST_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const postLoginError = () => {
  return {
    type: POST_LOGIN_ERROR,
    payload: { loading: false },
  };
};

const postLoginSuccess = () => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: { loading: false },
  };
};

const postLogoutSuccess = () => {
  return {
    type: POST_LOGOUT_SUCCESS,
    payload: { loading: false },
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(postRequest());

    getAxiosInstance()
      .post(POST_LOGIN_URI, {
        email,
        password,
      })
      .then(function (response) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [storeAccount(response.data), postLoginSuccess()],
              POST_BATCH_LOGIN_SUCCESS
            )
          );
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [dispatchError(error), postLoginError()],
              POST_BATCH_LOGIN_ERROR
            )
          );
        }, 500);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .post(POST_LOGOUT_URI, {})
      .then(function () {
        setTimeout(() => {
          dispatch(
            batchActions(
              [clearStoreAccount(), postLogoutSuccess()],
              POST_BATCH_LOGOUT_SUCCESS
            )
          );
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [dispatchError(error), postLoginError()],
              POST_BATCH_LOGIN_ERROR
            )
          );
        }, 500);
      });
  };
};

const initialState = { loading: false };

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return { ...state, ...action.payload };
    case POST_LOGIN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case POST_LOGOUT_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case POST_LOGIN_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
