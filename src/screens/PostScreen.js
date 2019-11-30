import React, { Component } from "react";
import {StyleSheet, Text, View, TextInput } from "react-native";
import firebase from "react-native-firebase";
import {Input, Item} from "native-base";
import SpinnerButton from "react-native-spinner-button";
export default class PostScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
      _isMounted = false;
      this.state = {
          title: '',
          text: '',
          buttonSpinner: false
      };
  }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    createPos = () => {
      const {text, title} = this.state;
      if (text && title) {
          this.setState({ buttonSpinner: true });
          firebase
              .firestore()
              .collection("annonces")
              .add({
                enable: true,
                text: text,
                title: title.trim(),
                date: new Date(),
                usder: '/users/'+firebase.auth().currentUser.uid
              })
              .then(() => {
                  if (this._isMounted) {
                      this.setState({ buttonSpinner: false });
                  }
        })
        .catch(error => {
            if (this._isMounted) {
                this.setState({ buttonSpinner: false });
            }
        });
      }
  };

  render() {
  const {text, title, buttonSpinner} = this.state;
    return <View style={{ flex: 1 }} >
        <Item
            rounded
            style={styles.inputItem}
        >

            <Input
                style={styles.input}
                autoCapitalize="characters"
                keyboardType="default"
                onChangeText={title => this.setState({title})}
                value={title}
            />

        </Item>

        <Item
            rounded
            style={styles.inputItem}
        >
            <TextInput
                style={styles.input}
                autoCapitalize="characters"
                keyboardType="default"
                multiline
                numberOfLines={4}
                onChangeText={text => this.setState({text})}
                value={text}
            />

        </Item>
        <SpinnerButton
            buttonStyle={styles.loginButton}
            isLoading={buttonSpinner}
            onPress={this.createPos}
            indicatorCount={10}
            spinnerType="SkypeIndicator"
        >
            <Text style={styles.nextButtonText}>Poster</Text>
        </SpinnerButton>
    </View>;
  }
}


const styles = StyleSheet.create({
    bodyWrapper: {
        height: 550,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "space-evenly"
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