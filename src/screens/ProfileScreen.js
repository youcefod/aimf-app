import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import firebase from "react-native-firebase";

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  _onLogout = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.setState({ email: currentUser._user.email });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome {"\n"} {this.state.email}
        </Text>
        <Button
          rounded
          danger
          onPress={this._onLogout}
          style={{ alignSelf: "center" }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff7675",
    justifyContent: "center"
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 30,
    color: "white",
    fontWeight: "bold"
  }
});
export default ProfileScreen;
