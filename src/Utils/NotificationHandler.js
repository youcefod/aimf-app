import {
  ACTIVE_USER,
  NEW_ARTICLE,
  NEW_KHETMA,
  NEW_USER,
} from "./Constants/Notifications";

const NotificationHandler = (navigationHandler, action) => {
  switch (action) {
    case ACTIVE_USER:
      navigationHandler.navigate("Login");
      return;
    case NEW_USER:
      navigationHandler.navigate("UserStack");
      return;
    case NEW_KHETMA:
      navigationHandler.navigate("KoranStack");
      return;
    case NEW_ARTICLE:
      navigationHandler.navigate("HomeStack");
      break;
    default:
  }
};

export default NotificationHandler;
