import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Item, Input } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import { w, h } from "./api/Dimensions";

import firebase from "react-native-firebase";

export default class Login extends React.Component {
  _isMounted = false;
  state = { email: "", password: "", errorMessage: null, buttonSpinner: false };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogin = () => {
    const { email, password } = this.state;
    this.setState({ buttonSpinner: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (this._isMounted) {
          setTimeout(() => {
            this.setState({ buttonSpinner: false });
            this.props.navigation.navigate("MainTabNavigator");
          }, 2000);
        }
      })
      .catch(error => {
        if (this._isMounted) {
          setTimeout(() => {
            this.setState({ buttonSpinner: false });
            this.setState({ errorMessage: error.message });
          }, 1500);
          setTimeout(() => {
            this.setState({ errorMessage: null });
          }, 5000);
        }
      });
  };

  isCorrectEmailAddress = () => {
    return true;
  };

  isCorrectPassword = () => {
    return true;
  };

  render() {
    const { email, password, errorMessage, buttonSpinner } = this.state;
    const logo = require("../assets/images/logo_transparent.png");
    return (
      <View style={styles.bodyWrapper}>
        <Image style={{ width: 120, height: 120 }} source={logo} />

        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            placeholder={"Email address"}
            value={email}
          />
        </Item>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            keyboardType="visible-password"
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            value={password}
          />
        </Item>
        <SpinnerButton
          buttonStyle={styles.loginButton}
          isLoading={buttonSpinner}
          onPress={this.handleLogin}
          indicatorCount={10}
          spinnerType="SkypeIndicator"
        >
          <Text style={styles.nextButtonText}>Connect</Text>
        </SpinnerButton>
        {errorMessage && (
          <Text
            style={{ color: "red", textAlign: "center", marginHorizontal: 30 }}
          >
            {errorMessage}
          </Text>
        )}
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.touchable}
            activeOpacity={0.6}
          >
            <Text style={styles.createAccount}>
              You don't have an account yet?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyWrapper: {
    height: 500,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  textContainer: {
    // cz will have 'forget password next to it'
    width: w(100),
    flexDirection: "row",
    marginTop: h(5)
  },
  touchable: {
    flex: 1
  },
  createAccount: {
    textAlign: "center"
  },
  inputItem: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 10,
    width: 300
  },
  input: {
    fontSize: 15
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 150,
    borderRadius: 50,
    backgroundColor: "#5CB85C"
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff"
  }
});
