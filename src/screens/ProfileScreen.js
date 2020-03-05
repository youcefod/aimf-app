import React, {Component} from "react";
import firebase from "react-native-firebase";
import ShowProfile from "./ProfileScreen/ShowProfile";
import ProfileForm from "../Components/ProfileForm";
import {getFrDate, getDateFromFr, getFullName} from "../Utils/Functions";
import {SHOW_ACTION, UPDATE_ACTION} from "../Utils/Constants";
import {checkFormValues} from "../Components/ProfileForm/Validate";
import {ActivityIndicator, Text, View} from "react-native";
import ErrorModal from "../Components/ErrorModal";
import Loader from "../Components/Loader";

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gender: null,
            conjugalSituation: null,
            email: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            lastname: "",
            father: "",
            middlename: "",
            firstname: "",
            birthDate: new Date(),
            zipCode: "",
            phoneNumber: "",
            numberOfChildren: 0,
            fonction: '',
            childrenYears: [],
            schoolLevels: [],
            action: SHOW_ACTION,
            modalVisible: false,
            errorMessage: '',
            loading: false,
        };
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        this.setState({currentUser});
        firebase.firestore().collection("users")
            .doc(currentUser._user.uid)
            .get()
            .then(doc => {
                const data = doc.data();
                data.birthDate = getDateFromFr(data.birthDate);
                this.setState({...this.state, ...data, initData: data});
            });

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    updateAction(action) {
        this.setState({action: action});
    }

    reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(credential);
    }

    updatePassword = (newPassword, currentPassword) => {
        const thatComponent = this;
        this.reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                this.setState({action: SHOW_ACTION, loading: false});
            }).catch((error) => {
                thatComponent.setState({
                    errorMessage: 'Une erreur est survenue lors de la modification de mot de passe',
                    loading: false
                });
                thatComponent.setModalVisible(true);
            });
        }).catch((error) => {
            thatComponent.setState({errorMessage: 'L\'ancien mot de passe est incorrect', loading: false});
            thatComponent.setModalVisible(true);
        });
    }
    onSubmit = () => {
        const error = checkFormValues(this.state);
        if (error) {
            this.setState({errorMessage: error});
            this.setModalVisible(true);
            return;
        }
        const thatComponent = this;
        this.setState({loading: true});
        const {
            lastname,
            father,
            middlename,
            firstname,
            gender,
            conjugalSituation,
            birthDate,
            zipCode,
            phoneNumber,
            numberOfChildren,
            childrenYears,
            schoolLevels,
            fonction,
            isAuthorized,
            isAdmin,
            newPassword,
            currentPassword,
            confirmPassword,
        } = this.state;
        childrenYears.slice(0, numberOfChildren);
        schoolLevels.slice(0, numberOfChildren);

        firebase
            .firestore()
            .collection("users")
            .doc(this.state.currentUser.uid)
            .set({
                gender: gender,
                conjugalSituation: conjugalSituation,
                email: email.trim().toLowerCase(),
                lastname: lastname.trim(),
                father: father.trim(),
                middlename: middlename.trim().toLowerCase(),
                firstname: firstname.trim().toLowerCase(),
                birthDate: getFrDate(birthDate),
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                numberOfChildren: numberOfChildren,
                childrenYears: childrenYears,
                schoolLevels: schoolLevels,
                fonction: fonction,
                isAuthorized: isAuthorized,
                isAdmin: isAdmin,
            })
            .then(() => {
                setTimeout(() => {
                    if (newPassword && confirmPassword) {
                        this.updatePassword(newPassword, currentPassword);
                    } else {
                        this.setState({action: SHOW_ACTION, loading: false});
                    }
                }, 2000);
            }).catch(function (error) {
            thatComponent.setState({
                errorMessage: 'Une erreur est survenue lors de la modification de vos informations',
                loading: false
            });
            thatComponent.setModalVisible(true);
        });

        return;
    }

    render() {
        const data = {
            gender,
            conjugalSituation,
            email,
            currentPassword,
            newPassword,
            confirmPassword,
            lastname,
            father,
            middlename,
            firstname,
            birthDate,
            zipCode,
            phoneNumber,
            numberOfChildren,
            fonction,
            childrenYears,
            schoolLevels,
            action,
        } = this.state;

        if (this.state.email) {
            return (
                this.state.action === SHOW_ACTION ?
                    <ShowProfile gender={this.state.gender} fullName={getFullName(this.state)}
                                 updateAction={this.updateAction.bind(this)}/> :
                    <>
                        <ProfileForm
                            scrollViewOpacity={this.state.loading || this.state.modalVisible ? 0.6 : 1}
                            action={UPDATE_ACTION}
                            data={data}
                            initData={this.state.initData}
                            navigation={this.props.navigation}
                            updateState={this.setState.bind(this)}
                            onSubmit={this.onSubmit.bind(this)}
                        />
                        <ErrorModal visible={this.state.modalVisible} setVisible={this.setModalVisible.bind(this)}
                                    message={this.state.errorMessage}/>
                        <Loader visible={this.state.loading}/>
                    </>
            );
        } else
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Chargement</Text>
                    <ActivityIndicator size="large"/>
                </View>);
    }
}

export default ProfileScreen;
