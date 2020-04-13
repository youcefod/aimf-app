import axios from "axios";

const isAdminUser = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === "admin");
  }
  return false;
};

const navigate = (account, navigation) => {
  if (account.user) {
    axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;
    // const navigation = doc.data().isAuthorized ? 'bottomActiveUserTabNavigator' : 'bottomUnActiveUserTabNavigator';
    // this.props.navigation.navigate(doc.data().isAdmin ? 'bottomAdminUserTabNavigator' : navigation);
    navigation.navigate(
      isAdminUser(account.user)
        ? "bottomAdminUserTabNavigator"
        : "bottomActiveUserTabNavigator"
    );
  } else {
    navigation.navigate("Login");
  }
};

export default navigate;
