import React, { Component } from "react";
import {View} from "react-native";
import {Text} from "native-base";
import {styles} from "./css";
class EditProfile extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.myAccountText}>
          Edit
        </Text>
      </View>
    );
  }
}

export default EditProfile;
