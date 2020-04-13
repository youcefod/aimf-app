import React, { Component } from "react";
import { Text, Animated, View, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";
import { getFrDate } from "./Utils/Functions";
import Loader from "./Components/Loader";
import ErrorModal from "./Components/ErrorModal";
import {
  CREATE_ACTION,
  EMAIL_EXIST_ERROR,
  SERVER_ERROR,
} from "./Utils/Constants";
import { checkFormValues } from "./Components/ProfileForm/Validate";
import {
  getQuestions,
  getRandomQuestionIndex,
} from "./Components/ProfileForm/Functions";
import ProfileForm from "./Components/ProfileForm";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    isMounted = false;
    this.state = {
      gender: null,
      maritalStatus: null,
      email: "",
      newPassword: "",
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
      buttonSpinner: false,
      spinValue: new Animated.Value(0),
      loading: false,
      modal: false,
      errorMessage: "",
      questions1: [],
      questions2: [],
      question1: "",
      question2: "",
    };
  }

  componentDidMount() {
    this.isMounted = true;
    getQuestions(this.setQuestions.bind(this));
  }

  componentWillUnmount() {
    this.isMounted = false;
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

  save = () => {
    const {
      email,
      newPassword,
      lastName,
      fatherName,
      middleName,
      firstName,
      gender,
      maritalStatus,
      birthday,
      zipCode,
      phoneNumber,
      response1,
      response2,
      question1,
      question2,
    } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, newPassword)
      .then((user) => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            gender,
            maritalStatus,
            email: email.trim().toLowerCase(),
            lastName: lastName.trim(),
            fatherName: fatherName.trim(),
            middleName: middleName.trim().toLowerCase(),
            firstName: firstName.trim().toLowerCase(),
            birthday: getFrDate(birthday),
            zipCode,
            phoneNumber,
            question1,
            question2,
            response1: response1.trim().toLowerCase(),
            response2: response2.trim().toLowerCase(),
            isAuthorized: false,
            isAdmin: false,
          })
          .then(() => {
            if (this.isMounted) {
              this.setState({ loading: false });
            }
          });
      })
      .catch((error) => {
        if (this.isMounted) {
          this.setState({ errorMessage: SERVER_ERROR, loading: false });
        }
      });
  };

  onSubmit = () => {
    const error = checkFormValues(this.state);
    if (error) {
      this.setState({ errorMessage: error });
      return;
    }

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", this.state.email.trim().toLowerCase())
      .get()
      .then((user) => {
        if (user.empty) {
          this.save();
          return;
        }
        if (this.isMounted) {
          this.setState({ errorMessage: EMAIL_EXIST_ERROR });
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        if (this.isMounted) {
          this.setState({ errorMessage: SERVER_ERROR });
          this.setState({ loading: false });
        }
      });
  };

  render() {
    const data = ({
      email,
      newPassword,
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
      questions1,
      questions2,
      question1,
      question2,
      gender,
    } = this.state);
    return questions1 && questions1.length > 0 ? (
      <>
        <ProfileForm
          scrollViewOpacity={
            this.state.loading || this.state.modalVisible ? 0.6 : 1
          }
          action={CREATE_ACTION}
          data={data}
          initData={{}}
          navigation={this.props.navigation}
          updateState={this.setState.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
        <ErrorModal
          visible={false}
          message={this.state.errorMessage}
        />
        <Loader visible={this.state.loading} />
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
