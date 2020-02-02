import React, {Component} from "react";
import {
    Text,
    Animated,
    View,
    ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import {
    getFrDate
} from "./Utils/Functions";
import Loader from './Components/Loader';
import ErrorModal from "./Components/ErrorModal";
import {CREATE_ACTION, EMAIL_EXIST_ERROR, SERVER_ERROR} from "./Utils/Constants";
import {checkFormValues} from "./Components/ProfileForm/Validate";
import {getQuestions, getRandomQuestionIndex} from "./Components/ProfileForm/Functions";
import ProfileForm from "./Components/ProfileForm";

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        _isMounted = false;
        this.state = {
            kind: null,
            conjugalSituation: null,
            email: "",
            newPassword: "",
            confirmPassword: "",
            lastname: "",
            brother: "",
            maidename: "",
            firstname: "",
            birthDate: new Date(),
            zipCode: "",
            phoneNumber: "",
            response1: "",
            response2: "",
            buttonSpinner: false,
            spinValue: new Animated.Value(0),
            loading: false,
            modal: false,
            modalVisible: false,
            errorMessage: '',
            questions1: [],
            questions2: [],
            question1: "",
            question2: "",
        };
    }

    componentDidMount() {
        this._isMounted = true;
        getQuestions(this.setQuestions.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
                question2: questions[getRandomQuestionIndex()]
            });
        }
    }
    save = () => {
        const {email, newPassword, lastname, brother, maidename, firstname, kind, conjugalSituation, birthDate, zipCode, phoneNumber, response1, response2, question1, question2} = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, newPassword)
            .then(user => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.user.uid)
                    .set({
                        kind: kind,
                        conjugalSituation: conjugalSituation,
                        email: email.trim().toLowerCase(),
                        lastname: lastname.trim(),
                        brother: brother.trim(),
                        maidename: maidename.trim().toLowerCase(),
                        firstname: firstname.trim().toLowerCase(),
                        birthDate: getFrDate(birthDate),
                        zipCode: zipCode,
                        phoneNumber: phoneNumber,
                        question1: question1,
                        question2: question2,
                        response1: response1.trim().toLowerCase(),
                        response2: response2.trim().toLowerCase(),
                        isAuthorized: false,
                        isAdmin: false,
                    })
                    .then(() => {
                        if (this._isMounted) {
                            this.setState({loading: false});
                        }
                    });
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({errorMessage: SERVER_ERROR, loading: false});
                    this.setModalVisible(true);
                }
            });
        return;
    };

    onSubmit = () => {
        const error = checkFormValues(this.state);
        if (error) {
            this.setState({errorMessage: error});
            this.setModalVisible(true);
            return;
        }

        this.setState({loading: true});
        firebase
            .firestore()
            .collection('users')
            .where('email', '==', this.state.email.trim().toLowerCase()).get()
            .then(user => {
                if (user.empty) {
                    this.save();
                    return;
                }
                if (this._isMounted) {
                    this.setState({errorMessage: EMAIL_EXIST_ERROR});
                    this.setModalVisible(true);
                    this.setState({loading: false});
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({errorMessage: SERVER_ERROR});
                    this.setState({loading: false});
                }
            });
        return;
    };

    render() {
        const data = {
            email,
            newPassword,
            confirmPassword,
            brother,
            lastname,
            maidename,
            firstname,
            conjugalSituation,
            zipCode,
            phoneNumber,
            birthDate,
            response1,
            response2,
            questions1,
            questions2,
            question1,
            question2,
            kind,
        } = this.state;
        return (
            questions1 && questions1.length > 0 ?
                <>
                    <ProfileForm
                        scrollViewOpacity={this.state.loading || this.state.modalVisible ? 0.6 : 1}
                        action={CREATE_ACTION}
                        data={data}
                        initData={{}}
                        navigation={this.props.navigation}
                        updateState={this.setState.bind(this)}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                    <ErrorModal visible={this.state.modalVisible} setVisible={this.setModalVisible.bind(this)}
                                message={this.state.errorMessage}/>
                    <Loader visible={this.state.loading}/>
                </>
                :
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Chargement</Text>
                    <ActivityIndicator size="large"/>
                </View>
        );
    }
}
