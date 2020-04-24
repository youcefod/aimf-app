import { batchActions } from "redux-batched-actions";
import getAxiosInstance from "../../Utils/axios";
import { GET_USERS_URI, PATCH_UPDATE_USER_URI } from "../../Utils/ApiUrl";
import { dispatchError } from "./errorMessageRedux";
import { SHOW_ACTION } from "../../Utils/Constants";

const GET_USERS_REQUEST = "GET_USERS_REQUEST";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_ERROR = "GET_USERS_ERROR";
const BATCH_GET_USERS_ERROR = "BATCH_GET_USERS_ERROR";
export const CHANGE_ACTION = "CHANGE_ACTION";
export const SHOW_USER = "SHOW_USER";

export const PATCH_UPDATE_USER_ROLE_REQUEST = "PATCH_UPDATE_USER_ROLE_REQUEST";
export const PATCH_UPDATE_USER_ROLE_SUCCESS = "PATCH_UPDATE_USER_ROLE_SUCCESS";
export const PATCH_UPDATE_USER_ROLE_ERROR = "PATCH_UPDATE_USER_ROLE_ERROR";
export const PATCH_BATCH_UPDATE_USER_ROLE_ERROR =
  "PATCH_BATCH_UPDATE_USER_ROLE_ERROR";

const getUserRequest = (refreshing, handleMore) => {
  return {
    type: GET_USERS_REQUEST,
    data: {
      loading: true,
      refreshing,
      handleMore,
    },
  };
};

const getUserSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
};

const getUserError = () => {
  return {
    type: GET_USERS_ERROR,
  };
};

const patchUpdateRoleUserRequest = () => {
  return {
    type: PATCH_UPDATE_USER_ROLE_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const patchUpdateRoleUserError = () => {
  return {
    type: PATCH_UPDATE_USER_ROLE_ERROR,
    payload: { loading: false },
  };
};

const patchUpdateRoleUserSuccess = (id, roles) => {
  return {
    type: PATCH_UPDATE_USER_ROLE_SUCCESS,
    payload: { loading: false, id, roles },
  };
};

export const getUsers = (
  currentUsers,
  page,
  refreshing = false,
  handleMore = false
) => {
  return (dispatch) => {
    dispatch(getUserRequest(refreshing, handleMore));
    getAxiosInstance()
      .get(GET_USERS_URI, {
        params: {
          page,
          with_roles: 1,
          with_children: 1,
        },
      })
      .then(function (response) {
        setTimeout(() => {
          dispatch(
            getUserSuccess({
              users:
                page === 1
                  ? response.data.data
                  : [...currentUsers, ...response.data.data],
              page,
            })
          );
        }, 500);
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getUserError()],
            BATCH_GET_USERS_ERROR
          )
        );
      });
  };
};

export const updateUserRole = (id, roles) => {
  return (dispatch) => {
    dispatch(patchUpdateRoleUserRequest());
    getAxiosInstance()
      .patch(PATCH_UPDATE_USER_URI + id, roles)
      .then(function (response) {
        setTimeout(() => {
          dispatch(patchUpdateRoleUserSuccess(id, roles));
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          dispatch(
            batchActions(
              [dispatchError(error), patchUpdateRoleUserError()],
              PATCH_BATCH_UPDATE_USER_ROLE_ERROR
            )
          );
        }, 500);
      });
  };
};

const initialState = [];

export const updateAction = (action) => {
  return {
    type: CHANGE_ACTION,
    payload: action,
  };
};

export const showUser = (data) => {
  return {
    type: SHOW_USER,
    payload: {
      userToShow: data,
      action: SHOW_ACTION,
    },
  };
};

export const userReducer = (state = initialState, action) => {
  const { users } = state;
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, ...action.data };
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        ...action.data,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case CHANGE_ACTION: {
      return { ...state, action: action.payload };
    }
    case SHOW_USER: {
      return { ...state, ...action.payload };
    }
    case PATCH_UPDATE_USER_ROLE_REQUEST:
    case PATCH_UPDATE_USER_ROLE_ERROR:
      return { ...state, users, loading: action.payload.loading };
    case PATCH_UPDATE_USER_ROLE_SUCCESS:
      users[action.payload.id].roles = action.payload.roles;
      return { ...state, ...action.payload };
    default: {
      return state;
    }
  }
};
