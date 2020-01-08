import React, { Component } from "react";
import { View, Text } from "react-native";

class UnaccessibleScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "#f1c40f" }} >
      <Text>
        Accès non autorisé
      </Text>
    </View>;
  }
}
export default UnaccessibleScreen;
