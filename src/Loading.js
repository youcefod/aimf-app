import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import NavigationService from "./Utils/NavigationService";
import { navigate } from "./Utils/Account";
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
    NavigationService.setInstance(this.props.navigation);
    navigate(this.props.account, this.props.navigation);
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
  return {
    account: state.accountStore,
  };
};

Loading.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, null)(Loading);
