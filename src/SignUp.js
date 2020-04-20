import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIsoDate } from "./Utils/Functions";
import Loader from "./Components/Loader";
import ErrorModal from "./Components/ErrorModal";
import { CREATE_ACTION } from "./Utils/Constants";
import {
  getQuestions,
  getRandomQuestionIndex,
} from "./Components/ProfileForm/Functions";
import ProfileForm from "./Components/ProfileForm";
import { register } from "./store/reducers/profileRedux";
import { dispatchErrorMessage } from "./store/reducers/errorMessageRedux";
import navigate from "./Utils/Account";
import checkFormValues from "./Components/ProfileForm/Validate";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      maritalStatus: null,
      email: "",
      password: "",
      confirmPassword: "",
      lastName: "",
      fatherName: "",
      middleName: "",
      firstName: "",
      birthday: new Date(),
      zipCode: "",
      phoneNumber: "",
      response1: "",
      response2: "",
      questions1: [],
      questions2: [],
      question1: "",
      question2: "",
    };
  }

  componentDidMount() {
    getQuestions(this.setQuestions.bind(this));
  }

  componentDidUpdate() {
    navigate(this.props.account, this.props.navigation, "SignUp");
  }

  setQuestions = (questions, index) => {
    if (index === 1) {
      this.setState({
        questions1: questions,
        question1: questions[getRandomQuestionIndex()],
      });
    } else {
      this.setState({
        questions2: questions,
        question2: questions[getRandomQuestionIndex()],
      });
    }
  };

  getDataFromState = () => {
    const {
      email,
      password,
      confirmPassword,
      fatherName,
      lastName,
      middleName,
      firstName,
      maritalStatus,
      zipCode,
      phoneNumber,
      birthday,
      response1,
      response2,
      question1,
      question2,
      gender,
    } = this.state;
    return {
      email,
      password,
      confirmPassword,
      fatherName,
      lastName,
      middleName,
      firstName,
      maritalStatus,
      zipCode,
      phoneNumber,
      birthday: getIsoDate(birthday),
      response1,
      response2,
      question1,
      question2,
      gender,
    };
  };

  onSubmit = () => {
    const data = { ...this.getDataFromState(true), action: CREATE_ACTION };
    const error = checkFormValues(data);
    if (error) {
      this.props.dispatchErrorMessage(error);
      return;
    }
    data.password_confirmation = data.confirmPassword;
    this.props.register(data);
  };

  render() {
    const { questions1, questions2 } = this.state;
    return questions1 && questions1.length > 0 ? (
      <>
        <ProfileForm
          scrollViewOpacity={
            this.props.loading || this.props.errorMessage ? 0.6 : 1
          }
          action={CREATE_ACTION}
          data={{ ...this.getDataFromState(), questions1, questions2 }}
          initData={{}}
          navigation={this.props.navigation}
          updateState={(state) => this.setState(state)}
          onSubmit={() => this.onSubmit()}
        />
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader visible={!!this.props.loading} />
      </>
    ) : (
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
    register: (data) => dispatch(register(data)),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

SignUp.propTypes = {
  navigation: PropTypes.object,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  register: PropTypes.func,
  loading: PropTypes.bool,
  account: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
