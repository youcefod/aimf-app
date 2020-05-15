import React, { Component } from "react";
import { Text, Modal, TouchableHighlight, View } from "react-native";
import { Icon } from "native-base";

export default class InformationsModal extends Component {
  render() {
    return (
      <Modal animationType="slide" transparent visible={this.props.visible}>
        <View
          style={{
            position: "absolute",
            right: "5%",
            left: "5%",
            top: "8%",
            width: "90%",
            backgroundColor: "#FFF",
            alignItems: "center",
            height: "auto",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#cbcbcb",
            paddingBottom: 4,
          }}
        >
          <View
            style={{
              height: 35,
              backgroundColor: "#ebebeb",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              color: "#525252",
              marginBottom: 30,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              borderWidth: 1,
              borderColor: "#cbcbcb",
            }}
          >
            <Text style={{ marginLeft: 15, marginTop: 5, fontSize: 15 }}>
              {this.props.title}
            </Text>
            <TouchableHighlight
              onPress={() => {
                this.props.setVisible(false);
              }}
            >
              <Icon
                name="close"
                type="AntDesign"
                style={{ color: "#949494", fontSize: 20, margin: 5 }}
              />
            </TouchableHighlight>
          </View>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
