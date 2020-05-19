import React, { Component } from "react";
import { Modal, Animated, Easing, ActivityIndicator, View } from "react-native";
import * as PropTypes from "prop-types";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  loading = () => {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 800,
        delay: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  render() {
    this.loading();
    return (
      <Modal transparent visible={this.props.visible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool,
};
export default Loader;
