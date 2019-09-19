import React, {Component} from "react";
import {Text, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import {Item, Icon, Input, DatePicker, Label} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import DropdownAlert from "react-native-dropdownalert";
import firebase from "react-native-firebase";
import {isCorrectPhone, isCorrectName, isCorrectEmailAddress, isCorrectPassword, isCorrectZipCode} from "./Utils/Functions";
import {styles} from "./signUp/css";
import {checkFormValues} from "./signUp/ValidateSignUp";

export default class SignUp extends Component {
    _isMounted = false;
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        maideName: "",
        firstname: "",
        birthDate: "",
        zipCode: "",
        phoneNumber: "",
        buttonSpinner: false
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _onSignUp = () => {
        const {email, password, lastName, firstname} = this.state;

        if (!checkFormValues(this.state)) {
            this.dropdown.alertWithType(
                   "error",
                  "ERROR OCCURED",
                "Please, fill up all of your credintials!"
            );
            return;
        }
        //if (!email || !password || !lastName) {
        //    this.dropdown.alertWithType(
         //       "error",
          //      "ERROR OCCURED",
            //    "Please, fill up all of your credintials!"
            //);
            return;
        //}
        this.setState({buttonSpinner: true});


        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.user.uid)
                    .set({
                        email: email,
                        lastname: lastName,
                    })
                    .then(() => {
                        // if (this._isMounted) {
                        //     setTimeout(() => {
                        //         this.setState({buttonSpinner: false});
                        //     }, 2000);
                        // }
                    });
            })
            .catch(error => {
                // if (this._isMounted) {
                //     setTimeout(() => {
                //         this.setState({buttonSpinner: false});
                //     }, 2000);
                // }
            });
    };



    render() {
        const {email, password, confirmPassword, lastName, maideName, firstname, birthDate, zipCode, phoneNumber, buttonSpinner} = this.state;

        return (

            <ScrollView
                centerContent={true}
                style={styles.scrollView}
            >

                <Label
                    style={styles.label}
                >Nom</Label>
                <Item
                    rounded
                    success={isCorrectName(lastName)}
                    error={lastName.length > 0 && !isCorrectName(lastName)}
                    style={styles.inputItem}
                >

                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={lastName => this.setState({lastName})}
                        value={lastName}
                    />
                    {lastName.length > 0  ? (<Icon
                        name={
                            isCorrectName(lastName)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(lastName)
                            ? styles.green
                            : styles.red }
                    />) : null}

                </Item>
                <Label
                    style={styles.label}
                >Nom de jeune fille</Label>
                <Item
                    rounded
                    success={isCorrectName(maideName)}
                    error={maideName.length > 0 && !isCorrectName(maideName)}
                    style={styles.inputItem}
                >

                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={maideName => this.setState({maideName})}
                        value={maideName}
                    />

                    {maideName.length > 0  ? (<Icon
                        name={
                            isCorrectName(maideName)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(maideName)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Prénom</Label>
                <Item
                    rounded
                    success={isCorrectName(firstname)}
                    error={firstname.length > 0 && !isCorrectName(firstname)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={firstname => this.setState({firstname})}
                        value={firstname}
                    />
                    {firstname.length > 0  ? (<Icon
                        name={
                            isCorrectName(firstname)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(firstname)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Date de naissance</Label>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <DatePicker
                        style={styles.input}
                        value={birthDate}
                    />

                </Item>
                <Label
                    style={styles.label}
                >Code postal</Label>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <Input
                        autoCompleteType={"autoCompleteType"}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={zipCode => this.setState({zipCode})}
                        value={zipCode}
                    />
                    {zipCode.length > 0  ? (<Icon
                        name={
                            isCorrectZipCode(zipCode)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectZipCode(zipCode)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Email</Label>
                <Item
                    rounded
                    success={isCorrectEmailAddress(email)}
                    error={email.length > 0 && !isCorrectEmailAddress(email)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={email => this.setState({email})}
                        value={email}
                    />
                    {email.length > 0  ? (<Icon
                        name={
                            isCorrectEmailAddress(email)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectEmailAddress(email)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Téléphone</Label>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        value={phoneNumber}
                    />
                    {phoneNumber.length > 0  ? (<Icon
                        name={
                            isCorrectPhone(phoneNumber)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPhone(phoneNumber)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Mot de passe</Label>
                <Item
                    rounded
                    success={isCorrectPassword(password)}
                    error={password.length > 0 && !isCorrectPassword(password)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                        value={password}
                    />
                    {password.length > 0  ? (<Icon
                        name={
                            isCorrectPassword(password)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPassword(password)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Confirmer mot de passe</Label>
                <Item
                    rounded
                    success={isCorrectPassword(confirmPassword)}
                    error={confirmPassword.length > 0 && !isCorrectPassword(confirmPassword)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                        value={confirmPassword}
                    />
                    {confirmPassword.length > 0  ? (<Icon
                        name={
                            isCorrectPassword(confirmPassword)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPassword(confirmPassword)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>

                <SpinnerButton
                    buttonStyle={styles.signupButton}
                    isLoading={buttonSpinner}
                    onPress={this._onSignUp}
                    indicatorCount={10}
                    spinnerType="SkypeIndicator"
                >
                    <Text style={styles.nextButtonText}>Create Account</Text>
                </SpinnerButton>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                    activeOpacity={0.6}
                    style={styles.loginLink}
                >
                    <Text>Already have an account? Log In</Text>
                </TouchableOpacity>
                <DropdownAlert ref={ref => (this.dropdown = ref)}/>
            </ScrollView>
        );
    }
}
