import axios from "axios";

const isAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === "admin");
  }
  return false;
};

const isMember = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === "member");
  }
  return false;
};

const navigate = (account, navigation, defaultNavigation = "Login") => {
  if (account.user && account.access_token) {
    axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;

    if (isAdmin(account.user)) {
      navigation.navigate("bottomAdminUserTabNavigator");
    } else if (isMember(account.user)) {
      navigation.navigate("bottomActiveUserTabNavigator");
    } else {
      navigation.navigate("bottomUnActiveUserTabNavigator");
    }
    return;
  }
  navigation.navigate(defaultNavigation);
};

export default navigate;
