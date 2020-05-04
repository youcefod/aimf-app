import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIsoDate } from "./Utils/Functions";
import Loader from "./Components/Loader";
import ErrorModal from "./Components/ErrorModal";
import { CREATE_ACTION } from "./Utils/Constants";
import ProfileForm from "./Components/ProfileForm";
import { register } from "./store/reducers/profileRedux";
import { dispatchErrorMessage } from "./store/reducers/errorMessageRedux";
import navigate from "./Utils/Account";
import checkFormValues from "./Components/ProfileForm/Validate";
import { getQuestions } from "./store/reducers/authenticationRedux";

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
      question1: null,
      question2: null,
    };
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  componentDidUpdate() {
    navigate(this.props.account, this.props.navigation, "SignUp");
  }

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
    this.props.register({
      ...data,
      password_confirmation: data.confirmPassword,
      securityQuestions: [
        {
          question: data.question1.id,
          answer: data.response1,
        },
        {
          question: data.question2.id,
          answer: data.response2,
        },
      ],
    });
  };

  render() {
    let { question1, question2 } = this.state;
    const { questions1, questions2 } = this.props;
    if (!question1 || !question2) {
      question1 = this.props.question1;
      question2 = this.props.question2;
    }
    return (
      <>
        {question1 && question2 && (
          <ProfileForm
            scrollViewOpacity={
              this.props.loadingQuestion ||
              this.props.loadingRegister ||
              this.props.errorMessage
                ? 0.6
                : 1
            }
            action={CREATE_ACTION}
            data={{
              ...this.getDataFromState(),
              questions1,
              questions2,
              question1,
              question2,
            }}
            initData={{}}
            navigation={this.props.navigation}
            updateState={(state) => this.setState(state)}
            onSubmit={() => this.onSubmit()}
          />
        )}

        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader
          visible={!!this.props.loadingRegister || !!this.props.loadingQuestion}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const { action, loading: loadingRegister } = state.profileStore;
  const {
    questions1,
    questions2,
    question1,
    question2,
    loading: loadingQuestion,
  } = state.authenticationStore;
  return {
    errorMessage,
    action,
    account: state.accountStore,
    questions1,
    questions2,
    question1,
    question2,
    loadingQuestion,
    loadingRegister,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
    getQuestions: () => dispatch(getQuestions()),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

SignUp.propTypes = {
  navigation: PropTypes.object,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  register: PropTypes.func,
  loadingQuestion: PropTypes.bool,
  loadingRegister: PropTypes.bool,
  account: PropTypes.object,
  getQuestions: PropTypes.func,
  questions1: PropTypes.array,
  questions2: PropTypes.array,
  question1: PropTypes.object,
  question2: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
