import { batchActions } from "redux-batched-actions";
import { GET_LIST_TIKHEROUBINS_URI } from "../../Utils/ApiUrl";
import getAxiosInstance from "../../Utils/axios";
import { dispatchError } from "./errorMessageRedux";

//
// Action types
//
const RECEIVE_KORAN_DATA = "RECEIVE_KORAN_DATA";
const LOADING_KORAN_DATA = "LOADING_KORAN_DATA";
const LOADING_KORAN_DATA_ERROR = "LOADING_KORAN_DATA_ERROR";
const GET_BATCH_KORAN_DATA_ERROR = "GET_BATCH_KORAN_PART_ERROR";

//
// Actions creator
//

const loadingKoranData = () => {
  return {
    type: LOADING_KORAN_DATA,
    payload: {
      loading: true,
    },
  };
};

const getKoranPartError = () => {
  return {
    type: LOADING_KORAN_DATA_ERROR,
    payload: { loading: false },
  };
};

const getKoranData = (koranListe) => {
  return {
    type: RECEIVE_KORAN_DATA,
    payload: {
      loading: false,
      koranListe,
    },
  };
};

export const receiveKoran = () => {
  return (dispatch) => {
    dispatch(loadingKoranData());
    getAxiosInstance()
      .get(GET_LIST_TIKHEROUBINS_URI)
      .then((response) => {
        dispatch(getKoranData(response.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getKoranPartError()],
            GET_BATCH_KORAN_DATA_ERROR
          )
        );
      });
  };
};

//
// Reducer
//

const initState = {
  loading: false,
  koranListe: {},
};

export const koranReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_KORAN_DATA:
      return { ...state, loading: action.payload.loading };
    case LOADING_KORAN_DATA_ERROR:
      return { ...state, loading: action.payload.loading };
    case RECEIVE_KORAN_DATA: {
      return {
        ...state,
        loading: action.payload.loading,
        koranListe: action.payload.koranListe,
      };
    }
    default: {
      return state;
    }
  }
};
