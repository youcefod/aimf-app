import { AsyncStorage } from "react-native";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userRedux";
import { errorMessageReducer } from "./reducers/errorMessageRedux";
import { authenticationReducer } from "./reducers/authenticationRedux";
import { accountReducer } from "./reducers/accountRedux";
import { profileReducer } from "./reducers/profileRedux";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  enableBatching(persistedReducer),
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
