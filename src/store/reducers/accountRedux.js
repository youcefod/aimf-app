import { batchActions } from "redux-batched-actions";
import getAxiosInstance from "../../Utils/axios";
import { PATCH_UPDATE_USER_URI } from "../../Utils/ApiUrl";
import { dispatchError } from "./errorMessageRedux";

export const STORE_ACCOUNT = "STORE_ACCOUNT";
export const CLEAR_STORE_ACCOUNT = "CLEAR_STORE_ACCOUNT";
export const PATCH_UPDATE_USER_REQUEST = "PATCH_UPDATE_USER_REQUEST";
export const PATCH_UPDATE_USER_SUCCESS = "PATCH_UPDATE_USER_SUCCESS";
export const PATCH_UPDATE_USER_ERROR = "PATCH_UPDATE_USER_ERROR";
export const POST_BATCH_UPDATE_USER_SUCCESS = "POST_BATCH_UPDAT_USER_SUCCESS";
export const POST_BATCH_UPDATE_USER_ERROR = "POST_BATCH_UPDAT_USER_ERROR";

export const storeAccount = (data) => {
  return {
    type: STORE_ACCOUNT,
    payload: data,
  };
};

export const clearStoreAccount = () => {
  return {
    type: CLEAR_STORE_ACCOUNT,
  };
};

const patchUpdateRequest = () => {
  return {
    type: PATCH_UPDATE_USER_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const patchUpdateError = () => {
  return {
    type: PATCH_UPDATE_USER_ERROR,
    payload: { loading: false },
  };
};

const patchUpdateSuccess = () => {
  return {
    type: PATCH_UPDATE_USER_SUCCESS,
    payload: { loading: false },
  };
};

export const updateUser = (id, data) => {
  return (dispatch) => {
    dispatch(patchUpdateRequest());

    getAxiosInstance()
      .patch(PATCH_UPDATE_USER_URI + id, data)
      .then(function (response) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [
                storeAccount({ user: response.data.data }),
                patchUpdateSuccess(),
              ],
              POST_BATCH_UPDATE_USER_SUCCESS
            )
          );
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [dispatchError(error), patchUpdateError()],
              POST_BATCH_UPDATE_USER_ERROR
            )
          );
        }, 500);
      });
  };
};

const initialState = {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ACCOUNT: {
      return { ...state, ...action.payload };
    }
    case CLEAR_STORE_ACCOUNT: {
      return {};
    }
    case PATCH_UPDATE_USER_REQUEST:
      return { ...state, ...action.payload };
    case PATCH_UPDATE_USER_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case PATCH_UPDATE_USER_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
