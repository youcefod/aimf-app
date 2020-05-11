import { AsyncStorage } from "react-native";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userRedux";
import { errorMessageReducer } from "./reducers/errorMessageRedux";
import { authenticationReducer } from "./reducers/authenticationRedux";
import { accountReducer, clearStoreAccount } from "./reducers/accountRedux";
import { profileReducer } from "./reducers/profileRedux";
import {bookReducer} from "./reducers/bookRedux";

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
    bookStore: bookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const logoutUser = (store) => (next) => (action) => {
  if (
    action.meta &&
    action.meta.batch &&
    action.payload[0].type === "DISPATCH_UNAUTHORIZED_ERROR"
  ) {
    store.dispatch(clearStoreAccount());
  }

  return next(action);
};

export const store = createStore(
  enableBatching(persistedReducer),
  composeEnhancers(applyMiddleware(thunk, logoutUser))
);

export const persistor = persistStore(store);
