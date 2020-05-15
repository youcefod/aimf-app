import React, { Component } from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import the different screens
import Loading from "./src/Loading";
import SignUp from "./src/SignUp";
import Login from "./src/Login";
import {
  activeUserWithYoutubeLiveTabNavigator,
  unActiveUserTabNavigator,
  adminUserTabNavigator,
  adminUserWithYoutubeLiveTabNavigator,
  activeUserTabNavigator,
} from "./src/MainTabNavigator";
import { store, persistor } from "./src/store/configureStore";
// create our app's navigation stack
const switchNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    activeUserWithYoutubeLiveTabNavigator,
    unActiveUserTabNavigator,
    adminUserTabNavigator,
    adminUserWithYoutubeLiveTabNavigator,
    activeUserTabNavigator,
  },
  {
    initialRouteName: "Loading",
  }
);

const AppContainer = createAppContainer(switchNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <AppContainer />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
