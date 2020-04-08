import axiosInstance from "../../Utils/axios";
import {GET_BOOK_LIST} from "../../Utils/ApiUrl";
import {dispatchErrorMessage} from "./errorMessageRedux";

const GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';

const getBookRequest = (refreshing, handleMore) => {
    return {
        type: GET_BOOKS_REQUEST,
        payload: {
            loading: true,
            refreshing,
            handleMore,
        }
    };
};

const getBookSuccess = data => {
    return {
        type: GET_BOOKS_SUCCESS,
        payload: data,
    };
};

const getBookError = messageError => {
    return {
        type: GET_BOOKS_ERROR,
        messageError,
    };
};

const initialState = [];

export const getBooks = (currentBooks, page, searchValue = '', genre = null, refreshing = false, handleMore = false) => {

    return (dispatch) => {
        dispatch(getBookRequest(refreshing, handleMore));
        axiosInstance.get(GET_BOOK_LIST, {
            params: {
                page, searchValue, genre
            }
        })
            .then(function (response) {
                setTimeout(() => {
                    dispatch(
                        getBookSuccess({
                            books: page === 1 ? response.data.data : [...currentBooks, ...response.data.data],
                            page,
                        }));
                }, 500);

            })
            .catch(function (error) {
                dispatch(dispatchErrorMessage('Une erreur est survenu lors de la récupération des livres'));
                dispatch(getBookError('Une erreur est survenu lors de la récupération des livres'));
            });
    }
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS_REQUEST:
            return {...state, ...action.payload};
        case GET_BOOKS_SUCCESS: {
            return {...state, ...action.payload, loading: false, refreshing: false, handleMore: false};
        }
        case GET_BOOKS_ERROR: {
            return {...state, ...action.messageError, loading: false, refreshing: false, handleMore: false};
        }
        default: {
            return state;
        }
    }
};