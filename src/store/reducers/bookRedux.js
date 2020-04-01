import firebase from "react-native-firebase";

const GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';

const getBookRequest = (refreshing, handleMore) => {
    return {
        type: GET_BOOKS_REQUEST,
        data: {
            loading: true,
            refreshing,
            handleMore,
        }
    };
};

const getBookSuccess = data => {
    return {
        type: GET_BOOKS_SUCCESS,
        data,
    };
};

const getBookError = messageError => {
    return {
        type: GET_BOOKS_ERROR,
        messageError,
    };
};

const initialState = [];

let lastBook = null;

export const getBooks = (currentBooks, page, searchValue = '', refreshing = false, handleMore = false) => {
    return (dispatch) => {
        dispatch(getBookRequest(refreshing, handleMore));

        let query = firebase
            .firestore()
            .collection("books")
            .orderBy('title')
        ;

        if (searchValue) {
            query = query
                .where('title', '>=', searchValue)
                .where('title', '<=', searchValue + "\uf8ff")
            ;
        }

        if (page !== 1 && lastBook) {
            query = query.startAfter(lastBook);
        }
        query
            .limit(5)
            .get()
            .then(books => {
                if (books.docs.length > 0) {
                    lastBook = books.docs[books.docs.length - 1];
                }
                setTimeout(() => {
                    const data = [];
                    books.forEach(function (doc) {
                        data.push({...doc.data(), id: doc.id});
                    });
                    dispatch(
                        getBookSuccess({
                            books: page === 1 ? data : [...currentBooks, ...data],
                            page,
                        }));


                }, 500);

            })
            .catch(error => {
                dispatch(getBookError('Une erreur est suvenu lors de la récupération des utilisateurs'));
            });
    }
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS_REQUEST:
            return {...state, ...action.data};
        case GET_BOOKS_SUCCESS: {
            return {...state, ...action.data, loading: false, refreshing: false, handleMore: false};
        }
        case GET_BOOKS_ERROR: {
            return {...state, ...action.messageError, loading: false, refreshing: false, handleMore: false};
        }
        default: {
            return state;
        }
    }
};