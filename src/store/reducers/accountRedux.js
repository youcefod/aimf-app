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

const initialState = {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ACCOUNT: {
      return { ...state, ...action.payload };
    }
    case CLEAR_STORE_ACCOUNT: {
      return {};
    }
    default: {
      return state;
    }
  }
};
