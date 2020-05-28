import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import axios from "axios";
import NavigationService from "./Utils/NavigationService";
import { navigate } from "./Utils/Account";
import { getLiveVideo } from "./store/reducers/liveVideoRedux";
import Notifications from "./services/Notifications";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

class Loading extends React.Component {
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
    new Notifications(this.onRegister.bind(this));
  }

  onRegister = (token) => {
    console.log('######################## token : ', token);
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
  return {
    account: state.accountStore,
    video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
  };
};
Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  video: PropTypes.object,
  getLiveVideo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
