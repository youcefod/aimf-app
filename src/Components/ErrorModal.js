import React, { Component } from "react";
import { Text, Modal, TouchableHighlight, View } from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";

class ErrorModal extends Component {
  render() {
    return (
      <Modal animationType="slide" transparent visible={this.props.visible}>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "#FFF",
            alignItems: "center",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            minHeight: 130,
            borderWidth: 1,
            borderColor: "#d7d7d7",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <TouchableHighlight
            onPress={() => {
              this.props.dispatchErrorMessage(null);
            }}
          >
            <Icon
              name="close-circle"
              style={{ color: "#f26060", marginTop: -16, fontSize: 35 }}
            />
          </TouchableHighlight>

          <Text
            style={{
              color: "#f26060",
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            Erreur
          </Text>
          <Text style={{ color: "#5d5d5d", fontSize: 15 }}>
            {this.props.message}
          </Text>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

ErrorModal.propTypes = {
  visible: PropTypes.bool,
  dispatchErrorMessage: PropTypes.func,
  message: PropTypes.string,
};
export default connect(null, mapDispatchToProps)(ErrorModal);
