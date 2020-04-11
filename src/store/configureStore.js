import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {userReducer} from "./reducers/userRedux";
import { koranReducer } from "./reducers/koranRedux";
import { khatmaReducer } from "./reducers/khatmaRedux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    userStore: userReducer,
    koranStore: koranReducer,
    khatmaStore: khatmaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


export const store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);