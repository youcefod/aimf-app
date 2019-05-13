import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Item, Icon, Input, Button } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import DropdownAlert from "react-native-dropdownalert";
import firebase from "react-native-firebase";

export default class SignUp extends Component {
  _isMounted = false;
  state = {
    email: "",
    password: "",
    fullname: "",
    buttonSpinner: false
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onSignUp = () => {
    const { email, password, fullname } = this.state;
    if (!email || !password || !fullname) {
      this.dropdown.alertWithType(
        "error",
        "ERROR OCCURED",
        "Please, fill up all of your credintials!"
      );
      return;
    }
    this.setState({ buttonSpinner: true });
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
          })
          .then(() => {
            if (this._isMounted) {
              setTimeout(() => {
                this.setState({ buttonSpinner: false });
              }, 2000);
            }
          });
      })
      .catch(error => {
        if (this._isMounted) {
          setTimeout(() => {
            this.setState({ buttonSpinner: false });
          }, 2000);
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
    const { email, password, fullname, buttonSpinner } = this.state;
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
          <Icon
            name={
              this._isCorrectFullname(fullname)
                ? "checkmark-circle"
                : "close-circle"
            }
          />
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
        <SpinnerButton
          buttonStyle={styles.signupButton}
          isLoading={buttonSpinner}
          onPress={this._onSignUp}
          indicatorCount={10}
          spinnerType="SkypeIndicator"
        >
          <Text style={styles.nextButtonText}>Create Account</Text>
        </SpinnerButton>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          activeOpacity={0.6}
        >
          <Text>Already have an account? Log In</Text>
        </TouchableOpacity>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyWrapper: {
    height: 550,
    paddingTop: 50,
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
  signupButton: {
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
