import PushNotification from "react-native-push-notification";

export default class Notifications {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
  }

  configure = (onRegister, onNotification) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister, // (required) Called when a remote or local notification is opened or received,

      // (required) Called when a remote or local notification is opened or received
      onNotification, // this._onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "621874050263",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  };
}
