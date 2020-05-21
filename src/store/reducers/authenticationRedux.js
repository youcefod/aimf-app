import { batchActions } from "redux-batched-actions";
import {
  GET_SECURITY_QUESTIONS_URI,
  POST_LOGIN_URI,
  POST_LOGOUT_URI,
} from "../../Utils/ApiUrl";
import getAxiosInstance from "../../Utils/axios";
import { dispatchError } from "./errorMessageRedux";
import { storeAccount } from "./accountRedux";
import getRandomQuestionIndex from "../../Components/ProfileForm/Functions";

const POST_REQUEST = "POST_REQUEST";
const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
const POST_BATCH_LOGIN_ERROR = "POST_BATCH_LOGIN_ERROR";
const POST_BATCH_LOGIN_SUCCESS = "POST_BATCH_LOGIN_SUCCESS";

const GET_QUESTIONS_ERROR = "GET_QUESTIONS_ERROR";
const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";

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

const getQuestionsError = () => {
  return {
    type: GET_QUESTIONS_ERROR,
    payload: { loading: false },
  };
};

const getQuestionsSuccess = (data) => {
  const questions = data.data;
  const questions1 = questions.splice(0, 5);
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload: {
      loading: false,
      questions1,
      questions2: questions,
      question1: questions1[getRandomQuestionIndex()],
      question2: questions[getRandomQuestionIndex()],
    },
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

export const getQuestions = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .get(GET_SECURITY_QUESTIONS_URI)
      .then(function (response) {
        dispatch(getQuestionsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getQuestionsError()],
            POST_BATCH_LOGIN_ERROR
          )
        );
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(postRequest());
    getAxiosInstance()
      .post(POST_LOGOUT_URI, {})
      .then(function () {
        dispatch(postLogoutSuccess());
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), postLoginError()],
            POST_BATCH_LOGIN_ERROR
          )
        );
      });
  };
};

const initialState = { loading: false };

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
    case POST_LOGIN_SUCCESS:
    case POST_LOGOUT_SUCCESS:
    case POST_LOGIN_ERROR:
    case GET_QUESTIONS_SUCCESS:
    case GET_QUESTIONS_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
