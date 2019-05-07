import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Item, Icon, Input, Button } from "native-base";

import firebase from "react-native-firebase";

export default class SignUp extends Component {
  _isMounted = false;
  state = {
    email: "",
    password: "",
    fullname: "",
    isNameCorrect: false,
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreatingAccount: false
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onSignUp = () => {
    const { email, password, fullname } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            email: email,
            fullname: fullname
          });
      })
      .catch(error => {
        if (this._isMounted) {
          console.log(error);
        }
      });
  };

  _isCorrectFullname = fullname => {
    return fullname.match(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/) ? true : false;
  };

  _isCorrectEmailAddress = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  _isCorrectPassword = password => {
    return password.length > 5 ? true : false;
  };

  render() {
    const { email, password, fullname } = this.state;
    const profile = require("../assets/images/profile.png");

    return (
      <View style={styles.bodyWrapper}>
        <Image style={{ width: 120, height: 120 }} source={profile} />
        <Item
          rounded
          success={this._isCorrectFullname(fullname)}
          error={!this._isCorrectFullname(fullname)}
          style={styles.inputItem}
        >
          <Input
            style={styles.input}
            autoCapitalize="words"
            keyboardType="default"
            onChangeText={fullname => this.setState({ fullname })}
            placeholder={"Fullname"}
            value={fullname}
          />
          {fullname.length != 0 && (
            <Icon
              name={
                this._isCorrectFullname(fullname)
                  ? "checkmark-circle"
                  : "close-circle"
              }
            />
          )}
        </Item>

        <Item
          rounded
          success={this._isCorrectEmailAddress(email)}
          error={!this._isCorrectEmailAddress(email)}
          style={styles.inputItem}
        >
          <Input
            style={styles.input}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            placeholder={"Email address"}
            value={email}
          />
          <Icon
            name={
              this._isCorrectEmailAddress(email)
                ? "checkmark-circle"
                : "close-circle"
            }
          />
        </Item>

        <Item
          rounded
          success={this._isCorrectPassword(password)}
          error={!this._isCorrectPassword(password)}
          style={styles.inputItem}
        >
          <Input
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            value={password}
          />
          <Icon
            name={
              this._isCorrectPassword(password)
                ? "checkmark-circle"
                : "close-circle"
            }
          />
        </Item>
        <Button rounded style={styles.nextButton} onPress={this._onSignUp}>
          <Text style={styles.nextButtonText}>Create Account</Text>
        </Button>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          activeOpacity={0.6}
        >
          <Text>Already have an account? Log In</Text>
        </TouchableOpacity>
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
  inputItem: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 10,
    width: 300
  },
  input: {
    fontSize: 15
  },
  nextButton: {
    minHeight: 45,
    alignSelf: "center",
    minWidth: 200,
    justifyContent: "center"
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff"
  }
});
