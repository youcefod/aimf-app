import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "react-native-firebase";

export default class Loading extends Component {
  
  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          firebase.firestore().collection("users")
              .doc(user._user.uid)
              .get()
              .then(doc => {
                  const navigation = doc.data().isAuthorized ? 'bottomActiveUserTabNavigator' : 'bottomUnActiveUserTabNavigator';
                  this.props.navigation.navigate(doc.data().isAdmin ? 'bottomAdminUserTabNavigator' : navigation);
              });
      }
      else {
        this.props.navigation.navigate('Login');
        //this.props.navigation.navigate('bottomActiveUserTabNavigator');
        
      }
    });
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
