import { batchActions } from "redux-batched-actions";
import {
  POST_ADD_KHATMA_URI,
  PATCH_USER_TAKHAROUBT_URI,
  GET_LIST_KHATMA_URI,
  PATCH_KHATMA_URI,
  GET_USER_KHATMA_URI,
  GET_KHATMA_URI,
} from "../../Utils/ApiUrl";
import getAxiosInstance from "../../Utils/axios";
import { dispatchError } from "./errorMessageRedux";

import {
  formatKhatma,
  formatDateAsApiDate,
  replaceElement,
} from "../../Utils/Functions";

const MAX_DATE = "2035-12-31 00:00:00";
//
// Action types
//

const CLEAN_KHATMA_STORE = "CLEAN_KHATMA_STORE";
const LOADING_KHATMA_DATA = "LOADING_KHATMA_DATA";
const LOADING_KHATMA_ERROR = "LOADING_KHATMA_ERROR";
const LOADING_KHATMA_SUCCESS = "LOADING_KHATMA_SUCCESS";
const RECEIVE_KHATMA = "RECEIVE_KHATMA";
const LOADING_USER_KHATMA_DATA = "LOADING_USER_KHATMA_DATA";
const LOADING_USER_KHATMA_ERROR = "LOADING_USER_KHATMA_ERROR";
const RECEIVE_USER_KHATMA = "RECEIVE_USER_KHATMA";
const SAVE_KHATMA = "SAVE_KHATMA";
const UPDATE_KHATMA = "UPDATE_KHATMA";
const UPDATING_KHATMA_ERROR = "UPDATING_KHATMA_ERROR";
const SAVE_USER_PICKS_READS = "SAVE_USER_PICKS_READS";
const SAVING_USER_PICKS_READS_ERROR = "SAVING_USER_PICKS_READS_ERROR";
const POST_BATCH_SAVE_KHATAMA = "POST_BATCH_SAVE_KHATAMA";
const GET_BATCH_RECEIVE_USER_KHATMA_ERROR =
  "GET_BATCH_RECEIVE_USER_KHATMA_ERROR";
const GET_BATCH_RECEIVE_KHATMA_ERROR = "GET_BATCH_RECEIVE_KHATMA_ERROR";
const PATCH_BATCH_UPDATE_KHATMA_ERROR = "PATCH_BATCH_UPDATE_KHATMA_ERROR";
const PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR =
  "PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR";

//
// Action creators
//
const cleanKhatmaStore = () => {
  return {
    type: CLEAN_KHATMA_STORE,
  };
};

const loadingUserKhatmaData = () => {
  return {
    type: LOADING_USER_KHATMA_DATA,
    payload: {
      loading: true,
    },
  };
};

const loadingUserKhatmaError = () => {
  return {
    type: LOADING_USER_KHATMA_ERROR,
    payload: {
      loading: false,
    },
  };
};

const receiveUserKhatma = (userKhatma) => {
  return {
    type: RECEIVE_USER_KHATMA,
    payload: {
      userKhatma,
      loading: false,
    },
  };
};

export const asyncReceiveUserKhatma = () => {
  return (dispatch) => {
    dispatch(loadingUserKhatmaData());
    getAxiosInstance()
      .get(`${GET_USER_KHATMA_URI}?with_user_takharoubts=1`)
      .then((response) => {
        dispatch(receiveUserKhatma(response.data.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), loadingUserKhatmaError()],
            GET_BATCH_RECEIVE_USER_KHATMA_ERROR
          )
        );
      });
  };
};

const loadingKhatmaData = () => {
  return {
    type: LOADING_KHATMA_DATA,
    payload: {
      loading: true,
    },
  };
};

const loadingKhatmaError = () => {
  return {
    type: LOADING_KHATMA_ERROR,
    payload: {
      loading: false,
    },
  };
};

const receiveKhatma = (khatma) => {
  return {
    type: RECEIVE_KHATMA,
    payload: {
      khatma,
      loading: false,
    },
  };
};

export const ayncReceiveKhatma = () => {
  return (dispatch) => {
    dispatch(loadingKhatmaData());
    getAxiosInstance()
      .get(`${GET_LIST_KHATMA_URI}?with_takharoubts=1`)
      .then((response) => {
        dispatch(receiveKhatma(response.data.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), loadingKhatmaError()],
            GET_BATCH_RECEIVE_KHATMA_ERROR
          )
        );
      });
  };
};

const saveKhatma = (khatma) => {
  return {
    type: SAVE_KHATMA,
    payload: {
      khatma,
      loading: false,
    },
  };
};

export const ayncSaveKhatma = (date) => {
  return (dispatch) => {
    dispatch(loadingKhatmaData());
    getAxiosInstance()
      .post(POST_ADD_KHATMA_URI, {
        beginAt: formatDateAsApiDate(date),
        isOpen: true,
      })
      .then((response) => {
        dispatch(
          saveKhatma(
            formatKhatma(
              response.data.data.id,
              response.data.data.beginAt,
              response.data.data.isOpen
            )
          )
        );
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), loadingKhatmaError()],
            POST_BATCH_SAVE_KHATAMA
          )
        );
      });
  };
};

const savingUserPicksReadsError = () => {
  return {
    type: SAVING_USER_PICKS_READS_ERROR,
    payload: {
      loading: false,
    },
  };
};

// eslint-disable-next-line no-underscore-dangle
const _saveUserPicksReads = (userTakharoubts, khatma) => {
  return {
    type: SAVE_USER_PICKS_READS,
    payload: {
      userTakharoubts,
      khatma,
      loading: false,
    },
  };
};

export const saveUserPicksReads = (khatmaId, picks, reads) => {
  return (dispatch) => {
    dispatch(loadingKhatmaData());
    getAxiosInstance()
      .patch(
        `${PATCH_USER_TAKHAROUBT_URI + khatmaId}?with_user_takharoubts=1`,
        {
          actionType: "pick",
          takharoubts: picks,
        }
      )
      .then(() => {
        getAxiosInstance()
          .patch(
            `${PATCH_USER_TAKHAROUBT_URI + khatmaId}?with_user_takharoubts=1`,
            {
              actionType: "read",
              takharoubts: reads,
            }
          )
          .then((response) => {
            getAxiosInstance()
              .get(`${GET_KHATMA_URI + khatmaId}?with_takharoubts=1`)
              .then((res) => {
                dispatch(
                  _saveUserPicksReads(response.data.data, res.data.data)
                );
              })
              .catch((errorGetKhatma) => {
                dispatch(
                  batchActions(
                    [
                      dispatchError(errorGetKhatma),
                      savingUserPicksReadsError(),
                    ],
                    PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR
                  )
                );
              });
          })
          .catch((errorRead) => {
            dispatch(
              batchActions(
                [dispatchError(errorRead), savingUserPicksReadsError()],
                PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR
              )
            );
          });
      })
      .catch((errorPick) => {
        dispatch(
          batchActions(
            [dispatchError(errorPick), savingUserPicksReadsError()],
            PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR
          )
        );
      });
  };
};

export const saveUserReads = (khatmaId, reads) => {
  return (dispatch) => {
    dispatch(loadingKhatmaData());
    getAxiosInstance()
      .patch(
        `${PATCH_USER_TAKHAROUBT_URI + khatmaId}?with_user_takharoubts=1`,
        {
          actionType: "read",
          takharoubts: reads,
        }
      )
      .then((response) => {
        getAxiosInstance()
          .get(`${GET_KHATMA_URI + khatmaId}?with_takharoubts=1`)
          .then((res) => {
            dispatch(_saveUserPicksReads(response.data.data, res.data.data));
          })
          .catch((errorGetKhatma) => {
            dispatch(
              batchActions(
                [dispatchError(errorGetKhatma), savingUserPicksReadsError()],
                PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR
              )
            );
          });
      })
      .catch((errorRead) => {
        dispatch(
          batchActions(
            [dispatchError(errorRead), savingUserPicksReadsError()],
            PATCH_BATCH_SAVE_USER_PICKS_READS_ERROR
          )
        );
      });
  };
};

// eslint-disable-next-line no-underscore-dangle
const _upadateKhatma = (khatma, userTakharoubts) => {
  return {
    type: UPDATE_KHATMA,
    payload: {
      khatma,
      userTakharoubts,
      loading: false,
    },
  };
};

const updatingKhatmaError = () => {
  return {
    type: UPDATING_KHATMA_ERROR,
    payload: {
      loading: false,
    },
  };
};

export const updateKhatma = (khatmaId, status) => {
  return (dispatch) => {
    dispatch(loadingKhatmaData());
    getAxiosInstance()
      .patch(`${PATCH_KHATMA_URI + khatmaId}?with_takharoubts=1`, {
        isOpen: status,
        endAt: status ? MAX_DATE : formatDateAsApiDate(Date.now()),
      })
      .then((response) => {
        getAxiosInstance()
          .get(`${GET_USER_KHATMA_URI}/${khatmaId}?with_user_takharoubts=1`)
          .then((res) => {
            dispatch(_upadateKhatma(response.data.data, res.data.data));
          })
          .catch((err) => {
            dispatch(
              batchActions(
                [dispatchError(err), updatingKhatmaError()],
                PATCH_BATCH_UPDATE_KHATMA_ERROR
              )
            );
          });
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), updatingKhatmaError()],
            PATCH_BATCH_UPDATE_KHATMA_ERROR
          )
        );
      });
  };
};

//
// Reducer
//

const initState = {
  khatma: [],
  userKhatma: [],
  loading: false,
};

export const khatmaReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_KHATMA_DATA:
    case LOADING_KHATMA_ERROR:
    case SAVING_USER_PICKS_READS_ERROR:
    case UPDATING_KHATMA_ERROR:
    case LOADING_KHATMA_SUCCESS:
    case LOADING_USER_KHATMA_DATA:
    case LOADING_USER_KHATMA_ERROR:
      return { ...state, loading: action.payload.loading };
    case SAVE_KHATMA:
      return {
        ...state,
        loading: action.payload.loading,
        khatma: state.khatma.concat(action.payload.khatma),
      };
    case RECEIVE_KHATMA:
      return {
        ...state,
        loading: action.payload.loading,
        khatma: action.payload.khatma,
      };
    case RECEIVE_USER_KHATMA:
      return {
        ...state,
        loading: action.payload.loading,
        userKhatma: action.payload.userKhatma,
      };
    case CLEAN_KHATMA_STORE:
      return initState;

    case SAVE_USER_PICKS_READS:
    case UPDATE_KHATMA:
      return {
        ...state,
        loading: action.payload.loading,
        khatma: replaceElement(state.khatma, action.payload.khatma),
        userKhatma: replaceElement(
          state.userKhatma,
          action.payload.userTakharoubts
        ),
      };
    default:
      return state;
  }
};
