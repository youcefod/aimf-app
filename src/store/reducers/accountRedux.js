export const STORE_ACCOUNT = "STORE_ACCOUNT";

export const storeAccount = (data) => {
  return {
    type: STORE_ACCOUNT,
    payload: data,
  };
};

const initialState = {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ACCOUNT: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
