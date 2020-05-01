import { batchActions } from "redux-batched-actions";
import getAxiosInstance from "../../Utils/axios";
import { ANNOUNCEMENTS_URI } from "../../Utils/ApiUrl";
import { dispatchError } from "./errorMessageRedux";

const GET_ANNOUNCEMENTS_REQUEST = "GET_ANNOUNCEMENTS_REQUEST";
const GET_ANNOUNCEMENTS_SUCCESS = "GET_ANNOUNCEMENTS_SUCCESS";
const GET_ANNOUNCEMENTS_ERROR = "GET_ANNOUNCEMENTS_ERROR";

const SAVE_ANNOUNCEMENTS_REQUEST = "SAVE_ANNOUNCEMENTS_REQUEST";
const POST_ANNOUNCEMENTS_SUCCESS = "POST_ANNOUNCEMENTS_SUCCESS";
const POST_ANNOUNCEMENTS_ERROR = "POST_ANNOUNCEMENTS_ERROR";

const PUT_ANNOUNCEMENTS_SUCCESS = "PUT_ANNOUNCEMENTS_SUCCESS";
const PUT_ANNOUNCEMENTS_ERROR = "PUT_ANNOUNCEMENTS_ERROR";

const BATCH_ANNOUNCEMENTS_ERROR = "BATCH_ANNOUNCEMENTS_ERROR";

const getAnnouncementRequest = (refreshing, handleMore) => {
  return {
    type: GET_ANNOUNCEMENTS_REQUEST,
    data: {
      loading: true,
      refreshing,
      handleMore,
    },
  };
};

const getAnnouncementSuccess = (data) => {
  return {
    type: GET_ANNOUNCEMENTS_SUCCESS,
    data,
  };
};

const getAnnouncementError = () => {
  return {
    type: GET_ANNOUNCEMENTS_ERROR,
  };
};

const saveAnnouncementRequest = () => {
  return {
    type: SAVE_ANNOUNCEMENTS_REQUEST,
    data: {
      loading: true,
    },
  };
};

const postAnnouncementSuccess = (data) => {
  return {
    type: POST_ANNOUNCEMENTS_SUCCESS,
    payload: data,
  };
};

const postAnnouncementError = () => {
  return {
    type: POST_ANNOUNCEMENTS_ERROR,
  };
};

const putAnnouncementSuccess = (data) => {
  return {
    type: PUT_ANNOUNCEMENTS_SUCCESS,
    payload: data,
  };
};

const putAnnouncementError = () => {
  return {
    type: PUT_ANNOUNCEMENTS_ERROR,
  };
};

export const createPost = (data) => {
  return (dispatch) => {
    dispatch(saveAnnouncementRequest());
    getAxiosInstance()
      .post(ANNOUNCEMENTS_URI, data)
      .then(function (response) {
        dispatch(postAnnouncementSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), postAnnouncementError()],
            BATCH_ANNOUNCEMENTS_ERROR
          )
        );
      });
  };
};

export const updatePost = (id, data) => {
  return (dispatch) => {
    dispatch(saveAnnouncementRequest());

    getAxiosInstance()
      .put(`${ANNOUNCEMENTS_URI}/${id}`, data)
      .then(function (response) {
        dispatch(putAnnouncementSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), putAnnouncementError()],
            BATCH_ANNOUNCEMENTS_ERROR
          )
        );
      });
  };
};

export const getAnnouncements = (
  currentAnnouncements,
  page,
  refreshing = false,
  handleMore = false
) => {
  return (dispatch) => {
    dispatch(getAnnouncementRequest(refreshing, handleMore));
    getAxiosInstance()
      .get(ANNOUNCEMENTS_URI, {
        params: {
          page,
        },
      })
      .then(function (response) {
        dispatch(
          getAnnouncementSuccess({
            announcements:
              page === 1
                ? response.data.data
                : [...currentAnnouncements, ...response.data.data],
            page,
            lastPage:
              response.data.meta.last_page === response.data.meta.current_page,
          })
        );
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getAnnouncementError()],
            BATCH_ANNOUNCEMENTS_ERROR
          )
        );
      });
  };
};

const initialState = [];

export const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS_REQUEST:
    case SAVE_ANNOUNCEMENTS_REQUEST:
      return { ...state, ...action.data };
    case GET_ANNOUNCEMENTS_SUCCESS: {
      return {
        ...state,
        ...action.data,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_ANNOUNCEMENTS_ERROR: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }

    case POST_ANNOUNCEMENTS_SUCCESS:
    case PUT_ANNOUNCEMENTS_SUCCESS: {
      let currentAnnouncement = null;
      if (!action.payload.announcement.enable) {
        currentAnnouncement = action.payload.announcement;
      }

      return {
        ...state,
        loading: false,
        currentAnnouncement,
      };
    }
    case POST_ANNOUNCEMENTS_ERROR:
    case PUT_ANNOUNCEMENTS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
