import { SERVER_ERROR_MESSAGE } from "../../Utils/Constants";

const DISPATCH_ERROR_MESSAGE = "DISPATCH_ERROR_MESSAGE";

export const dispatchErrorMessage = (errorMessage) => {
  return {
    type: DISPATCH_ERROR_MESSAGE,
    errorMessage,
  };
};

export const dispatchError = (error) => {
  let errorMessage = SERVER_ERROR_MESSAGE;
  if (error.response) {
    if (error.response.status < 500 && error.response.status >= 400) {
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }
  }
  return {
    type: DISPATCH_ERROR_MESSAGE,
    errorMessage,
  };
};

const initialState = [];

export const errorMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH_ERROR_MESSAGE: {
      return { errorMessage: action.errorMessage };
    }
    default: {
      return state;
    }
  }
};
