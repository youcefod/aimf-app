import React, {Component, useState, useEffect } from "react";
import {Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing} from "react-native";
import {Item, Icon, Input, Label, DatePicker, Picker} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import DropdownAlert from "react-native-dropdownalert";
import firebase from "react-native-firebase";
import {isCorrectMobilePhone, isCorrectName, isCorrectEmailAddress, isCorrectPassword, isCorrectZipCode, getFrDate} from "./Utils/Functions";
import {styles} from "./signUp/css";
import {checkFormValues} from "./signUp/ValidateSignUp";
export default class SignUpOld extends Component {

    constructor(props) {
        super(props);
        _isMounted = false;
        this.state = {
            kind: "homme",
            email: "",
            password: "",
            confirmPassword: "",
            lastname: "",
            maidename: "",
            firstname: "",
            birthDate: new Date(),
            zipCode: "",
            phoneNumber: "",
            buttonSpinner: false,
            spinValue: new Animated.Value(0)
        };
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setKind(value: string) {
        this.setState({
            kind: value
        });
    }

    setDate(newDate) {
        this.setState({ birthDate: newDate });
    }



    _onSignUp = () => {
        const {email, password, lastname, maidename, firstname, birthDate, zipCode, phoneNumber} = this.state;

        const error = checkFormValues(this.state);
        if (error) {
            this.dropdown.alertWithType(
                "error",
                "ERREUR",
                error
            );
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.user.uid)
                    .set({
                        genre: genre,
                        email: email,
                        lastname: lastname,
                        maidename: maidename,
                        firstname: firstname,
                        birthDate: getFrDate(birthDate),
                        zipCode: zipCode,
                        phoneNumber: phoneNumber,
                    })
                    .then(() => {
                        this.dropdown.alertWithType(
                            "success",
                            "success",
                            "success"
                        );

                        if (this._isMounted) {
                            setTimeout(() => {
                                // this.setState({buttonSpinner: false});
                            }, 2000);
                        }
                    });
            })
            .catch(error => {
                this.dropdown.alertWithType(
                    "error",
                    "Erreur",
                    "Une erreur est survenue, merci de réessayer ultirieurement"
                );
            });
        return;
    };

    loading = () => {

       Animated.loop(
            Animated.timing(this.state.spinValue, {
                toValue: 1,
                duration: 1000,
                delay: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }

    render() {


        this.loading();
        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const {email, password, confirmPassword, lastname, maidename, firstname, zipCode, phoneNumber, buttonSpinner} = this.state;

        const logo = require("../assets/images/logo_transparent.png");
        return (

            <ScrollView
                centerContent={true}
                style={styles.scrollView}
            >

                <Label
                    style={styles.label}
                >Genre</Label>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.kind}
                    onValueChange={this.setKind.bind(this)}
                >
                    <Picker.Item label="Home" value="homme" />
                    <Picker.Item label="Femme" value="femme" />
                </Picker>
                </Item>
                <Label
                    style={styles.label}
                >Nom</Label>
                <Item
                    rounded
                    success={lastname && isCorrectName(lastname)}
                    error={lastname.length > 0 && !isCorrectName(lastname)}
                    style={styles.inputItem}
                >

                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={lastname => this.setState({lastname})}
                        value={lastname}
                    />
                    {lastname.length > 0  ? (<Icon
                        name={
                            isCorrectName(lastname)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(lastname)
                            ? styles.green
                            : styles.red }
                    />) : null}

                </Item>
                <Label
                    style={styles.label}
                >Nom de jeune fille</Label>
                <Item
                    rounded
                    success={maidename.length > 0 && isCorrectName(maidename)}
                    error={maidename.length > 0 && !isCorrectName(maidename)}
                    style={styles.inputItem}
                >

                    <Input
                        style={styles.input}
                        autoCapitalize="words"
                        keyboardType="default"
                        onChangeText={maidename => this.setState({maidename})}
                        value={maidename}
                    />

                    {maidename.length > 0  ? (<Icon
                        name={
                            isCorrectName(maidename)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectName(maidename)
                            ? styles.green
                            : styles.red }
                    />) : null}
                </Item>
                <Label
                    style={styles.label}
                >Prénom</Label>
                <Item
                    rounded
                    success={firstname && isCorrectName(firstname)}
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
                        defaultDate={new Date()}
                        minimumDate={new Date(1900, 1, 1)}
                        maximumDate={new Date()}
                        modalTransparent={false}
                        locale={"fr"}
                        formatChosenDate={(date)=> {return getFrDate(date);} }
                        androidMode={"calendar"}
                        animationType={"slide"}
                        placeHolderText="Séléctionner une date"
                        textStyle={{ color: "#000" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
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
                >Mobile</Label>
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
                            isCorrectMobilePhone(phoneNumber)
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        style={isCorrectMobilePhone(phoneNumber)
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

                <Animated.Image
                    style={{transform: [{rotate: spin}], width: 60, height: 60, position: 'relative', lef: 'auto', right: 'auto'}}
                    source={logo}
                />
                <SpinnerButton
                    buttonStyle={styles.signupButton}
                    isLoading={buttonSpinner}
                    onPress={this._onSignUp}
                    indicatorCount={10}
                    spinnerType="SkypeIndicator"
                >
                    <Text style={styles.nextButtonText}>Continuer</Text>
                </SpinnerButton>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                    activeOpacity={0.6}
                    style={styles.loginLink}
                >
                    <Text>Vous êtes déjà inscrit? Cliquez ici</Text>
                </TouchableOpacity>
                <DropdownAlert ref={ref => (this.dropdown = ref)}/>
            </ScrollView>
        );
    }
}
