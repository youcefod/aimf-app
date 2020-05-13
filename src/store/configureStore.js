/* eslint-disable no-undef */
import { AsyncStorage } from "react-native";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userRedux";
import {
  DISPATCH_UNAUTHORIZED_ERROR,
  errorMessageReducer,
} from "./reducers/errorMessageRedux";
import {
  authenticationReducer,
  POST_LOGOUT_SUCCESS,
} from "./reducers/authenticationRedux";
import { accountReducer } from "./reducers/accountRedux";
import { profileReducer } from "./reducers/profileRedux";
import NavigationService from "../Utils/NavigationService";
import { announcementReducer } from "./reducers/announcementsRedux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userStore: userReducer,
  errorMessageStore: errorMessageReducer,
  authenticationStore: authenticationReducer,
  accountStore: accountReducer,
  profileStore: profileReducer,
  announcementStore: announcementReducer,
});

const appReducer = (state, action) => {
  let newState = state;
  if (
    action.type === DISPATCH_UNAUTHORIZED_ERROR ||
    action.type === POST_LOGOUT_SUCCESS
  ) {
    newState = undefined;
  }

  return rootReducer(newState, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// eslint-disable-next-line no-unused-vars
const logoutUser = (store) => (next) => (action) => {
  if (
    action.meta &&
    action.meta.batch &&
    action.payload[0].type === DISPATCH_UNAUTHORIZED_ERROR
  ) {
    NavigationService.navigate("Login");
  }
  return next(action);
};

export const store = createStore(
  enableBatching(persistedReducer),
  composeEnhancers(applyMiddleware(thunk, logoutUser))
);

export const persistor = persistStore(store);
