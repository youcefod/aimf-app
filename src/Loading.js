import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "react-native-firebase";
import Notifications from "./services/Notifications";

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            tokenCreated: false,
        };
    }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          new Notifications(this.onRegister.bind(this));
          if (!this.state.user) {
            this.setState({user: user});
          }
          firebase.firestore().collection("users")
              .doc(user._user.uid)
              .get()
              .then(doc => {
                  const navigation = doc.data().isAuthorized ? 'bottomActiveUserTabNavigator' : 'bottomNotActiveUserTabNavigator';
                  this.props.navigation.navigate(doc.data().isAdmin ? 'bottomAdminUserTabNavigator' : navigation);
              });
      }
      else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  saveDeviceToken(token, userRefecrence) {
      firebase
          .firestore()
          .collection("deviceToken")
          .add({
              value: token,
              user: userRefecrence
          })
          .then(() => {
          })
          .catch(error => {
          });
  }

    onRegister(token) {
        if (!this.state.tokenCreated) {
            const userRefecrence = firebase.firestore().collection("users").doc(this.state.user._user.uid);
            firebase
                .firestore()
                .collection("deviceToken")
                .where('value', '==', token.token)
                .where('user', '==', userRefecrence)
                .get()
                .then(tokens => {
                    if (tokens.size == 0) {
                        this.saveDeviceToken(token.token, userRefecrence);
                    }
                })
                .catch(error => {
                });
        }
        this.setState({tokenCreated: true});
    }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
