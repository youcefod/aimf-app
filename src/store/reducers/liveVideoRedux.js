import { batchActions } from "redux-batched-actions";
import getAxiosInstance from "../../Utils/axios";
import { GET_LIVE_VIDEO_URI } from "../../Utils/ApiUrl";
import { dispatchError } from "./errorMessageRedux";

const GET_LIVE_VIDEO_REQUEST = "GET_LIVE_VIDEO_REQUEST";
const GET_LIVE_VIDEO_SUCCESS = "GET_LIVE_VIDEO_SUCCESS";
const GET_LIVE_VIDEO_ERROR = "GET_LIVE_VIDEO_ERROR";
const BATCH_GET_LIVE_VIDEO_ERROR = "BATCH_GET_LIVE_VIDEO_ERROR";

const getLiveVideoRequest = () => {
  return {
    type: GET_LIVE_VIDEO_REQUEST,
    data: {
      loading: true,
    },
  };
};

const getLiveVideoSuccess = (data) => {
  return {
    type: GET_LIVE_VIDEO_SUCCESS,
    data: { video: data, loading: false },
  };
};

const getLiveVideoError = () => {
  return {
    type: GET_LIVE_VIDEO_ERROR,
    loading: false,
  };
};

export const getLiveVideo = () => {
  return (dispatch) => {
    dispatch(getLiveVideoRequest());
    getAxiosInstance()
      .get(GET_LIVE_VIDEO_URI)
      .then(function (response) {
        dispatch(getLiveVideoSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getLiveVideoError()],
            BATCH_GET_LIVE_VIDEO_ERROR
          )
        );
      });
  };
};

const initialState = {};

export const liveVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVE_VIDEO_REQUEST:
    case GET_LIVE_VIDEO_SUCCESS:
    case GET_LIVE_VIDEO_ERROR:
      return { ...state, ...action.data };
    default: {
      return state;
    }
  }
};
