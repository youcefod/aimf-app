import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

// import the different screens
import SignUpScreen from "../screens/Authentification/SignUp";
import LoginScreen from "../screens/Authentification/Login";
import MainTabNavigator from "./MainTabNavigator";

const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen
});

// create our app's navigation stack
const App = createSwitchNavigator(
  {
    Auth: AuthStackNavigator,
    Main: MainTabNavigator
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(App);
