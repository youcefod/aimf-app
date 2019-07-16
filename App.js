import React, { Component } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import firebase from "react-native-firebase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: false
    };
    YellowBox.ignoreWarnings([
      "Warning: Can't perform a React state update on an unmounted"
    ]);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isUserLogged: !!user });
  };

  render() {
    const { isUserLogged } = this.state;
    return (
      <View style={styles.container}>
        {!isUserLogged && <AppNavigator />}
        {isUserLogged && <MainTabNavigator />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
