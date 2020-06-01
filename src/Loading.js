import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import axios from "axios";
import NavigationService from "./Utils/NavigationService";
import { navigate } from "./Utils/Account";
import { getLiveVideo } from "./store/reducers/liveVideoRedux";
import Notifications from "./services/Notifications";
import { storeTokenDevice } from "./store/reducers/accountRedux";
import { logout } from "./store/reducers/authenticationRedux";
import { ACTIVE_USER } from "./Utils/Constants/Notifications";
import NotificationHandler from "./Utils/NotificationHandler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.account && this.props.account.access_token) {
      axios.defaults.headers.Authorization = `Bearer ${this.props.account.access_token}`;
      if (!this.props.video) {
        this.props.getLiveVideo();
      }
    }
    NavigationService.setInstance(this.props.navigation);
    navigate(
      this.props.account,
      this.props.navigation,
      "Login",
      this.props.video && this.props.video.youtube_id
    );

    this.notification = new Notifications(
      this.onRegister.bind(this),
      this.onNotification.bind(this)
    );
  }

  onRegister = (token) => {
    if (!this.props.tokenDevice) {
      this.props.storeTokenDevice(token);
    }
  };

  onNotification = (notification) => {
    const action = notification.action
      ? notification.action
      : notification.data.action;

    if (action === ACTIVE_USER) {
      this.props.logout();
    }

    NotificationHandler(this.props.navigation, action);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { video } = state.liveVideoStore;
  const { tokenDevice } = state.accountStore;
  return {
    account: state.accountStore,
    video,
    tokenDevice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
    storeTokenDevice: (tokenDevice) => dispatch(storeTokenDevice(tokenDevice)),
    logout: () => dispatch(logout()),
  };
};
Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  video: PropTypes.object,
  getLiveVideo: PropTypes.func,
  storeTokenDevice: PropTypes.func,
  tokenDevice: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
