import React, { Component } from "react";
import { View } from "react-native";

class KoranScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "#f1c40f" }} />;
  }
}
export default KoranScreen;
