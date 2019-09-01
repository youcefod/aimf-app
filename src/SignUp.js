import React, {Component} from "react";
import {Text, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import {View, Item, Icon, Input, Button, DatePicker, Label} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import DropdownAlert from "react-native-dropdownalert";
import firebase from "react-native-firebase";
import {isCorrectPhone, isCorrectName, isCorrectEmailAddress, isCorrectPassword, isCorrectZipCode} from "./Utils/Functions";

export default class SignUp extends Component {
    _isMounted = false;
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
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
        const {email, password, fullname} = this.state;
        if (!email || !password || !fullname) {
            this.dropdown.alertWithType(
                "error",
                "ERROR OCCURED",
                "Please, fill up all of your credintials!"
            );
            return;
        }
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
                        fullname: fullname
                    })
                    .then(() => {
                        if (this._isMounted) {
                            setTimeout(() => {
                                this.setState({buttonSpinner: false});
                            }, 2000);
                        }
                    });
            })
            .catch(error => {
                if (this._isMounted) {
                    setTimeout(() => {
                        this.setState({buttonSpinner: false});
                    }, 2000);
                }
            });
    };



    render() {
        const {email, password, confirmPassword, fullname, maideName, firstname, birthDate, zipCode, phoneNumber, buttonSpinner} = this.state;

        return (

            <ScrollView
                centerContent={true}

            >
                <Item
                    rounded
                    success={isCorrectName(fullname)}
                    error={!isCorrectName(fullname)}
                    style={styles.inputItem}
                    floatingLabel
                >
                    <Label>Nom</Label>
                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={fullname => this.setState({fullname})}
                        value={fullname}
                    />
                    <Icon
                        name={
                            isCorrectName(fullname)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(fullname)
                            ? styles.green
                            : styles.red }
                    />
                </Item>
                <Item
                    rounded
                    success={isCorrectName(maideName)}
                    error={!isCorrectName(maideName)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={maideName => this.setState({maideName})}
                        placeholder={"Nom de jeune fille"}
                        value={maideName}
                    />
                    <Icon
                        name={
                            isCorrectName(maideName)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(maideName)
                            ? styles.green
                            : styles.red }
                    />
                </Item>

                <Item
                    rounded
                    success={isCorrectName(firstname)}
                    error={!isCorrectName(firstname)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={firstname => this.setState({firstname})}
                        placeholder={"Prénom"}
                        value={firstname}
                    />
                    <Icon
                        name={
                            isCorrectName(firstname)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(firstname)
                            ? styles.green
                            : styles.red }
                    />
                </Item>

                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <DatePicker
                        style={styles.input}
                        value={birthDate}
                    />

                </Item>

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
                        placeholder={"Code postal"}
                        value={zipCode}
                    />
                    <Icon
                        name={
                            isCorrectZipCode(zipCode)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectZipCode(zipCode)
                            ? styles.green
                            : styles.red }

                    />
                </Item>

                <Item
                    rounded
                    success={isCorrectEmailAddress(email)}
                    error={!isCorrectEmailAddress(email)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={email => this.setState({email})}
                        placeholder={"Email address"}
                        value={email}
                    />
                    <Icon
                        name={
                            isCorrectEmailAddress(email)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectEmailAddress(email)
                            ? styles.green
                            : styles.red }
                    />
                </Item>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        placeholder={"Téléphone"}
                        value={phoneNumber}
                    />
                    <Icon
                        name={
                            isCorrectPhone(phoneNumber)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPhone(phoneNumber)
                            ? styles.green
                            : styles.red }
                    />
                </Item>
                <Item
                    rounded
                    success={isCorrectPassword(password)}
                    error={!isCorrectPassword(password)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                        placeholder={"Mot de passe"}
                        value={password}
                    />
                    <Icon
                        name={
                            isCorrectPassword(password)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPassword(password)
                            ? styles.green
                            : styles.red }
                    />
                </Item>
                <Item
                    rounded
                    success={isCorrectPassword(confirmPassword)}
                    error={!isCorrectPassword(confirmPassword)}
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                        placeholder={"Confirmer mot de passe"}
                        value={confirmPassword}
                    />
                    <Icon
                        name={
                            isCorrectPassword(confirmPassword)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectPassword(confirmPassword)
                            ? styles.green
                            : styles.red }
                    />
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
const styles = StyleSheet.create({
    bodyWrapper: {

        paddingTop: 50,
        alignItems: "center"
    },
    inputItem: {
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 10,
        width: 300
    },
    input: {
        fontSize: 15
    },
    signupButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 150,
        borderRadius: 50,
        backgroundColor: "#5CB85C",
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
    },
    nextButtonText: {
        fontSize: 18,
        color: "#fff"
    },

    loginLink: {
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
    },

    green:  {
        color : "green"
    },
    red:  {
        color : "red"
    }

});