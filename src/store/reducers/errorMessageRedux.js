import { SERVER_ERROR_MESSAGE } from "../../Utils/Constants";

const DISPATCH_ERROR_MESSAGE = "DISPATCH_ERROR_MESSAGE";

export const dispatchErrorMessage = (errorMessage) => {
  return {
    type: DISPATCH_ERROR_MESSAGE,
    errorMessage,
  };
};

const getErrorMessageFromResponse = (response) => {
  if (response.data.errors) {
    const errors = [];
    Object.entries(response.data.errors).forEach((error) =>
      errors.push(` - ${error[1].join("\n - ")}`)
    );

    return errors.join("\n");
  }
  return response.data.message ? response.data.message : SERVER_ERROR_MESSAGE;
};

export const dispatchError = (error) => {
  let errorMessage = SERVER_ERROR_MESSAGE;
  if (error.response) {
    if (error.response.status < 500 && error.response.status >= 400) {
      if (error.response.data) {
        errorMessage = getErrorMessageFromResponse(error.response);
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
