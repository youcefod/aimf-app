import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { Item, Input } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import ErrorModal from "./Components/ErrorModal";
import { CREDENTIALS_EMPTY_ERROR } from "./Utils/Constants";
import { dispatchErrorMessage } from "./store/reducers/errorMessageRedux";
import { login } from "./store/reducers/authenticationRedux";
import navigate from "./Utils/Account";

const styles = StyleSheet.create({
  bodyWrapper: {
    height: 550,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  createAccount: {
    textAlign: "center",
  },
  inputItem: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: "#cb8347",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidUpdate() {
    navigate(this.props.account, this.props.navigation);
  }

  handleLogin = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.props.dispatchErrorMessage(CREDENTIALS_EMPTY_ERROR);
      return;
    }

    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;
    const logo = require("../assets/images/logo_transparent.png");
    return (
      <>
        <View style={styles.bodyWrapper}>
          <Image style={{ width: 120, height: 120 }} source={logo} />
          <Item rounded style={styles.inputItem}>
            <Input
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(value) => this.setState({ email: value })}
              placeholder="Adresse email"
              value={email}
            />
          </Item>
          <Item rounded style={styles.inputItem}>
            <Input
              secureTextEntry
              style={styles.input}
              onChangeText={(value) => this.setState({ password: value })}
              placeholder="Mot de passe"
              value={password}
            />
          </Item>
          <SpinnerButton
            buttonStyle={styles.loginButton}
            isLoading={this.props.loading}
            onPress={this.handleLogin}
            spinnerType="SkypeIndicator"
          >
            <Text style={styles.nextButtonText}>Connexion</Text>
          </SpinnerButton>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.touchable}
            activeOpacity={0.6}
          >
            <Text style={styles.createAccount}>
              Vous n&apos;`avez pas encore un compte?
            </Text>
          </TouchableOpacity>
        </View>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const { loading } = state.authenticationStore;
  return {
    errorMessage,
    loading,
    account: state.accountStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

Login.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  login: PropTypes.func,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  account: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
