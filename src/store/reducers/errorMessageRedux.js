const DISPATCH_ERROR_MESSAGE = 'DISPATCH_ERROR_MESSAGE';


export const dispatchErrorMessage = errorMessage => {
    return {
        type: DISPATCH_ERROR_MESSAGE,
        errorMessage,
    };
};

const initialState = [];


export const errorMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_ERROR_MESSAGE: {
            return { errorMessage : action.errorMessage};
        }
        default: {
            return state;
        }
    }
};