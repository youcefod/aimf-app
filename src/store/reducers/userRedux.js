import firebase from "react-native-firebase";

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';

const getUserRequest = (refreshing, handleMore) => {
    return {
        type: GET_USERS_REQUEST,
        data: {
            loading: true,
            refreshing,
            handleMore,
        }
    };
};

const getUserSuccess = data => {
    return {
        type: GET_USERS_SUCCESS,
        data,
    };
};

const getUserError = messageError => {
    return {
        type: GET_USERS_ERROR,
        messageError,
    };
};

const initialState = [];

let lastUser = null;

export const getUsers = (currentUsers, page, refreshing = false, handleMore = false) => {
    return (dispatch) => {
        dispatch(getUserRequest(refreshing, handleMore));

        const currentUser = firebase.auth().currentUser;
        let query = firebase
            .firestore()
            .collection("users")
            .orderBy('lastname', 'asc')
        ;

        if (page !== 1 && lastUser) {
            query = query.startAfter(lastUser);
        }
        query
            .limit(5)
            .get()
            .then(users => {
                if (users.docs.length > 0) {
                    lastUser = users.docs[users.docs.length - 1];
                }
                setTimeout(() => {
                    const data = [];
                    users.forEach(function (doc) {
                        if (currentUser.uid !== doc.id) {
                            data.push({...doc.data(), id: doc.id});
                        }
                    });
                    dispatch(
                        getUserSuccess({
                            users: page === 1 ? data : [...currentUsers, ...data],
                            page,
                        }));


                }, 500);

            })
            .catch(error => {
                dispatch(getUserError('Une erreur est suvenu lors de la récupération des utilisateurs'));
            });
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {...state, ...action.data};
        case GET_USERS_SUCCESS: {
            return {...state, ...action.data, loading: false, refreshing: false, handleMore: false};
        }
        case GET_USERS_ERROR: {
            return {...state, ...action.messageError, loading: false, refreshing: false, handleMore: false};
        }
        default: {
            return state;
        }
    }
};