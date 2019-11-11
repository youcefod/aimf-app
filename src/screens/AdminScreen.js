import React, { Component } from "react";
import { View } from "react-native";

class AdminScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "#1434f1" }} />;
  }
}
export default AdminScreen;
