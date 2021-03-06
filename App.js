import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import the different screens
import Loading from "./src/Loading";
import SignUp from "./src/SignUp";
import Login from "./src/Login";
import MainTabNavigator from "./src/MainTabNavigator";

// create our app's navigation stack
const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    MainTabNavigator
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(App);
