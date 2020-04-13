import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import ShowProfile from "./ProfileScreen/ShowProfile";
import ProfileForm from "../Components/ProfileForm";
import { getFullName, getIsoDate } from "../Utils/Functions";
import { SHOW_ACTION, UPDATE_ACTION } from "../Utils/Constants";
import ErrorModal from "../Components/ErrorModal";
import { logout } from "../store/reducers/authenticationRedux";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";
import checkFormValues from "../Components/ProfileForm/Validate";
import {
  updateCurrentUser,
  updateAction,
} from "../store/reducers/profileRedux";
import Loader from "../Components/Loader";

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      maritalStatus: null,
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      lastName: "",
      fatherName: "",
      middleName: "",
      firstName: "",
      birthday: new Date(),
      zipCode: "",
      phoneNumber: "",
      childrenNumber: 0,
      functionName: "",
      childrenYears: [],
      schoolLevels: [],
      errorMessage: "",
    };
  }

  componentDidMount() {
    const { user } = this.props.account;
    if (user) {
      const { state } = this;
      user.functionName = user.function;
      this.setState({ ...state, ...user, initData: user });
    }
  }

  componentDidUpdate() {
    if (!this.props.account.user) {
      this.props.navigation.navigate("Login");
    }
  }

  getDataFromState = () => {
    const {
      gender,
      maritalStatus,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      childrenNumber,
      functionName,
      childrenYears,
      schoolLevels,
    } = this.state;
    childrenYears.slice(0, childrenNumber);
    schoolLevels.slice(0, childrenNumber);
    return {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      childrenNumber,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
      functionName,
      childrenYears,
      schoolLevels,
    };
  };

  onSubmit = () => {
    const data = this.getDataFromState(true);
    const error = checkFormValues(data);
    if (error) {
      this.props.dispatchErrorMessage(error);
      return;
    }

    const {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday,
      zipCode,
      phoneNumber,
      childrenNumber,
      functionName,
    } = data;

    this.props.updateCurrentUser(this.props.account.user.id, {
      gender,
      maritalStatus,
      lastName,
      fatherName,
      middleName,
      firstName,
      birthday: getIsoDate(birthday),
      zipCode,
      phoneNumber,
      childrenNumber,
      function: functionName,
    });
  };

  render() {
    const data = this.getDataFromState();
    if (this.state.email) {
      return (
        <>
          {this.props.action === SHOW_ACTION ? (
            <ShowProfile
              gender={this.state.gender}
              fullName={getFullName(this.state)}
              updateAction={(value) => this.props.updateAction(value)}
              logout={() => this.props.logout()}
            />
          ) : (
            <ProfileForm
              scrollViewOpacity={this.props.errorMessage ? 0.6 : 1}
              action={UPDATE_ACTION}
              data={data}
              initData={this.state.initData}
              navigation={this.props.navigation}
              updateAction={(value) => this.props.updateAction(value)}
              updateState={(state) => this.setState(state)}
              onSubmit={() => this.onSubmit()}
            />
          )}
          {this.props.errorMessage && (
            <ErrorModal visible message={this.props.errorMessage} />
          )}
          <Loader visible={!!this.props.loading} />
        </>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Chargement</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const { action } = state.profileStore;
  return {
    errorMessage,
    action,
    account: state.accountStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateCurrentUser: (id, data) => dispatch(updateCurrentUser(id, data)),
    updateAction: (action) => dispatch(updateAction(action)),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

ProfileScreen.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  logout: PropTypes.func,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  updateAction: PropTypes.func,
  loading: PropTypes.bool,
  action: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
