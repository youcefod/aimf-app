export const STORE_ACCOUNT = "STORE_ACCOUNT";
export const STORE_TOKEN_DEVICE = "STORE_TOKEN_DEVICE";

export const storeAccount = (data) => {
  return {
    type: STORE_ACCOUNT,
    payload: data,
  };
};

export const storeTokenDevice = (tokenDevice) => {
  return {
    type: STORE_TOKEN_DEVICE,
    payload: { tokenDevice },
  };
};

const initialState = {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN_DEVICE:
    case STORE_ACCOUNT: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
