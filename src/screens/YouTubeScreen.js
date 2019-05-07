import React, { Component } from "react";
import { View } from "react-native";

class YouTubeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "#e84118" }} />;
  }
}
export default YouTubeScreen;
