import { batchActions } from "redux-batched-actions";
import getAxiosInstance from "../../Utils/axios";
import { GET_ARTICLES_URI, GET_DRAFT_ARTICLE_URI } from "../../Utils/ApiUrl";
import { dispatchError } from "./errorMessageRedux";
import {
  DRAFT_ARTICLE_STATUS,
  PUBLISHED_ARTICLE_STATUS,
} from "../../Utils/Constants";

const GET_ARTICLES_REQUEST = "GET_ARTICLES_REQUEST";
const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS";
const GET_ARTICLES_ERROR = "GET_ARTICLES_ERROR";

const GET_DRAFT_ARTICLE_REQUEST = "GET_DRAFT_ARTICLE_REQUEST";
const GET_DRAFT_ARTICLE_SUCCESS = "GET_DRAFT_ARTICLE_SUCCESS";
const GET_DRAFT_ARTICLE_ERROR = "GET_DRAFT_ARTICLE_ERROR";

const POST_ARTICLES_REQUEST = "POST_ARTICLES_REQUEST";
const POST_ARTICLES_SUCCESS = "POST_ARTICLES_SUCCESS";
const POST_ARTICLES_ERROR = "POST_ARTICLES_ERROR";

const BATCH_ARTICLES_ERROR = "BATCH_ARTICLES_ERROR";

const getArticlesRequest = (refreshing, handleMore) => {
  return {
    type: GET_ARTICLES_REQUEST,
    data: {
      loading: true,
      refreshing,
      handleMore,
    },
  };
};

const getArticlesSuccess = (data) => {
  return {
    type: GET_ARTICLES_SUCCESS,
    data,
  };
};

const getArticlesError = () => {
  return {
    type: GET_ARTICLES_ERROR,
  };
};

const getDraftArticleRequest = () => {
  return {
    type: GET_DRAFT_ARTICLE_REQUEST,
    data: {
      loading: true,
    },
  };
};

const getDraftArticleSuccess = (data) => {
  return {
    type: GET_DRAFT_ARTICLE_SUCCESS,
    data,
  };
};

const getDraftArticleError = () => {
  return {
    type: GET_DRAFT_ARTICLE_ERROR,
  };
};

const saveArticleRequest = () => {
  return {
    type: POST_ARTICLES_REQUEST,
    data: {
      loading: true,
    },
  };
};

const postArticleSuccess = (data) => {
  return {
    type: POST_ARTICLES_SUCCESS,
    payload: data,
  };
};

const postArticleError = () => {
  return {
    type: POST_ARTICLES_ERROR,
  };
};

export const getArticles = (
  currentArticles,
  page,
  refreshing = false,
  handleMore = false
) => {
  return (dispatch) => {
    dispatch(getArticlesRequest(refreshing, handleMore));
    getAxiosInstance()
      .get(GET_ARTICLES_URI, {
        params: {
          page,
        },
      })
      .then(function (response) {
        dispatch(
          getArticlesSuccess({
            articles:
              page === 1
                ? response.data.data
                : [...currentArticles, ...response.data.data],
            page,
            lastPage:
              response.data.meta.last_page === response.data.meta.current_page,
          })
        );
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getArticlesError()],
            BATCH_ARTICLES_ERROR
          )
        );
      });
  };
};

export const savePost = (data) => {
  return (dispatch) => {
    dispatch(saveArticleRequest());
    getAxiosInstance()
      .post(GET_ARTICLES_URI, data)
      .then(function (response) {
        if (response.data.data.status === PUBLISHED_ARTICLE_STATUS) {
          dispatch(getArticles([], 1, true));
        }
        dispatch(postArticleSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), postArticleError()],
            BATCH_ARTICLES_ERROR
          )
        );
      });
  };
};

export const getDraftArticle = () => {
  return (dispatch) => {
    dispatch(getDraftArticleRequest());
    getAxiosInstance()
      .get(GET_DRAFT_ARTICLE_URI)
      .then(function (response) {
        dispatch(getDraftArticleSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), getDraftArticleError()],
            BATCH_ARTICLES_ERROR
          )
        );
      });
  };
};

const initialState = [];

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
    case GET_DRAFT_ARTICLE_REQUEST:
    case POST_ARTICLES_REQUEST:
      return { ...state, ...action.data };
    case GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        ...action.data,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_DRAFT_ARTICLE_SUCCESS: {
      return {
        ...state,
        draftArticle: { ...action.data },
        loading: false,
      };
    }
    case GET_ARTICLES_ERROR: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_DRAFT_ARTICLE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case POST_ARTICLES_SUCCESS: {
      let draftArticle = null;
      if (action.payload.status === DRAFT_ARTICLE_STATUS) {
        draftArticle = action.payload;
      }

      return {
        ...state,
        loading: false,
        draftArticle,
      };
    }
    case POST_ARTICLES_ERROR: {
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
