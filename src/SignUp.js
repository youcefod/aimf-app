import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    View,
    Image,
    ActivityIndicator
} from "react-native";
import {Item, Icon, Input, Label, DatePicker, Picker} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import DropdownAlert from "react-native-dropdownalert";
import { RadioButtons } from 'react-native-radio-buttons'
import firebase from "react-native-firebase";
import {
    isCorrectMobilePhone,
    isCorrectName,
    isCorrectEmailAddress,
    isCorrectPassword,
    isCorrectZipCode,
    getFrDate
} from "./Utils/Functions";
import {styles} from "./signUp/css";
import Loader from './Components/Loader';
import ErrorModal from "./Components/ErrorModal";
import {EMAIL_EXIST_ERROR, SERVER_ERROR} from "./Utils/Constants";
import {checkFormValues} from "./signUp/ValidateSignUp";
import {getQuestions, getRandomQuestionIndex} from "./signUp/Functions";

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        _isMounted = false;
        this.state = {
            kind: null,
            email: "",
            password: "",
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
            questionIndex1: null,
            questionIndex2: null,
        };
        this.setDate = this.setDate.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setQuestions = this.setQuestions.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.shwoLoading(true);
        getQuestions(this.setQuestions);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setDate(newDate) {
        this.setState({birthDate: newDate});
    }

    shwoLoading(value: boolean) {
        this.setState({
            loading: value
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setKind = (kind) =>{
        this.setState({
            kind
        });
    }

    setQuestions = (questions, index) =>{
        if (index === 1) {
            this.setState({
                questions1: questions,
                questionIndex1: getRandomQuestionIndex(questions)
            });
        } else {
            this.setState({
                questions2: questions,
                questionIndex2: getRandomQuestionIndex(questions)
            });
        }
    }

    setQuestionIndex1 = () => {
        const questions = this.state.questions1;
        this.setState({
            questionIndex1: getRandomQuestionIndex(questions, this.state.questionIndex1)
        });
    }

    setQuestionIndex2 = () => {
        const questions = this.state.questions2;
        this.setState({
            questionIndex2: getRandomQuestionIndex(questions, this.state.questionIndex2)
        });
    }

    getKinIcon = (option, selected) => {
        if (option === 'men') {
            return selected ? require('../assets/images/men_selected.png') : require('../assets/images/men.png');
        }
        return selected ? require('../assets/images/women_selected.png') : require('../assets/images/women.png');
    }

    renderKindOption = (option, selected, onSelect, index) => {
        const marginLeft = option === 'women' ?  50 : 0;
        const icon = this.getKinIcon(option, selected);
        return (<TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Image style={{ width: 60, height: 60,  marginLeft: marginLeft }} source={icon} />
            </TouchableWithoutFeedback>
        );
    }

    renderKindContainer = (optionNodes) => {
        return <View style={{flexDirection: 'row', justifyContent: 'center'}}>{optionNodes}</View>;
    }

    save = () => {
        const {email, password, lastname, brother, maidename, firstname, kind, birthDate, zipCode, phoneNumber, response1, response2} = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.user.uid)
                    .set({
                        kind: kind,
                        email: email.trim().toLowerCase(),
                        lastname: lastname.trim(),
                        brother: brother.trim(),
                        maidename: maidename.trim().toLowerCase(),
                        firstname: firstname.trim().toLowerCase(),
                        birthDate: getFrDate(birthDate),
                        zipCode: zipCode,
                        phoneNumber: phoneNumber,
                        response1: response1.trim().toLowerCase(),
                        response2: response2.trim().toLowerCase(),
                        isAuthorized: false,
                        isAdmin: false,
                    })
                    .then(() => {
                        if (this._isMounted) {
                            this.shwoLoading(false)
                        }
                    });
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({errorMessage: SERVER_ERROR});
                    this.setModalVisible(true);
                    this.shwoLoading(false)
                }
            });
        return;
    };

    _onSignUp = () => {
        const error = checkFormValues(this.state);
        // if (error) {
        //     this.setState({errorMessage: error});
        //     this.setModalVisible(true);
        //     return;
        // }

        this.shwoLoading(true);
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
                    this.shwoLoading(false);
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({errorMessage: SERVER_ERROR});
                    this.shwoLoading(false);
                }
            });
        return;
    };

    render() {
        console.log('##############Render##############"');
        console.log(this.state.questionIndex1);
        console.log(this.state.questions1);
        console.log(this.state.questions1[this.state.questionIndex1]);
        const {email, password, confirmPassword, brother, lastname, maidename, firstname, zipCode, phoneNumber, buttonSpinner, response1, response2} = this.state;
        const ScrollViewOpacity = this.state.modalVisible ? 0.6 : 1;
        return (
            this.state.questions1 &&  this.state.questions1.length > 0?
            <>
                <ScrollView
                    centerContent={true}
                    style={{paddingTop: 40, opacity: ScrollViewOpacity, backgroundColor: '#f3aa2329'}}>
                    <Label
                        style={styles.label}>Je suis *</Label>
                    <RadioButtons
                        options={["men", "women"]}
                        onSelection={this.setKind.bind(this)}
                        selectedOption={this.state.kind }
                        renderOption={ this.renderKindOption }
                        renderContainer={ this.renderKindContainer }
                    />
                    <Label
                        style={styles.label}
                    >Nom*</Label>
                    <Item
                        rounded
                        success={lastname.length > 0 && isCorrectName(lastname)}
                        error={lastname.length > 0 && !isCorrectName(lastname)}
                        style={styles.inputItem}
                    >

                        <Input
                            style={styles.input}
                            autoCapitalize="characters"
                            keyboardType="default"
                            onChangeText={lastname => this.setState({lastname})}
                            value={lastname}
                        />
                        {lastname.length > 0 ? (<Icon
                            name={
                                isCorrectName(lastname)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectName(lastname)
                                ? styles.green
                                : styles.red}
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
                            autoCapitalize="characters"
                            keyboardType="default"
                            onChangeText={maidename => this.setState({maidename})}
                            value={maidename}
                        />

                        {maidename.length > 0 ? (<Icon
                            name={
                                isCorrectName(maidename)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectName(maidename)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>

                    <Label
                        style={styles.label}
                    >Fils de*</Label>
                    <Item
                        rounded
                        success={brother.length > 0 && isCorrectName(brother)}
                        error={brother.length > 0 && !isCorrectName(brother)}
                        style={styles.inputItem}
                    >

                        <Input
                            style={styles.input}
                            autoCapitalize="characters"
                            keyboardType="default"
                            onChangeText={brother => this.setState({brother})}
                            value={brother}
                        />
                        {brother.length > 0 ? (<Icon
                            name={
                                isCorrectName(brother)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectName(brother)
                                ? styles.green
                                : styles.red}
                        />) : null}

                    </Item>

                    <Label
                        style={styles.label}
                    >Prénom*</Label>
                    <Item
                        rounded
                        success={firstname.length > 0 && isCorrectName(firstname)}
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
                        {firstname.length > 0 ? (<Icon
                            name={
                                isCorrectName(firstname)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectName(firstname)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    <Label
                        style={styles.label}
                    >Date de naissance*</Label>
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
                            formatChosenDate={(date) => {
                                return getFrDate(date);
                            }}
                            androidMode={"spinner"}
                            animationType={"slide"}
                            placeHolderText="Séléctionner une date"
                            textStyle={{color: "#000"}}
                            placeHolderTextStyle={{color: "#d3d3d3"}}
                            onDateChange={this.setDate}
                            customStyles={styles.datePicker}
                        />
                    </Item>
                    <Label
                        style={styles.label}
                    >Code postal*</Label>
                    <Item
                        rounded
                        style={styles.inputItem}
                    >
                        <Input
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={5}
                            onChangeText={zipCode => this.setState({zipCode})}
                            value={zipCode}
                        />
                        {zipCode.length > 0 ? (<Icon
                            name={
                                isCorrectZipCode(zipCode)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectZipCode(zipCode)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    <Label
                        style={styles.label}
                    >Email*</Label>
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
                            onBlur={() => function () {
                            }}
                            value={email}
                        />
                        {email.length > 0 ? (<Icon
                            name={
                                isCorrectEmailAddress(email)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectEmailAddress(email)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    <Label
                        style={styles.label}
                    >téléphone*</Label>
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
                        {phoneNumber.length > 0 ? (<Icon
                            name={
                                isCorrectMobilePhone(phoneNumber)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectMobilePhone(phoneNumber)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    <View style={{flexDirection: 'row', justifyContent: 'center', width: 300, marginLeft: "auto",
                        marginRight: "auto"}}>
                        <Label
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: 280,
                            }}
                        >{this.state.questions1[this.state.questionIndex1]}*</Label>
                        <SpinnerButton
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: 280,
                            }}
                            buttonStyle={styles.refreshButton}
                            onPress={this.setQuestionIndex1}
                            indicatorCount={10}
                            spinnerType="SkypeIndicator"
                        >
                            <Icon
                                style={{color: "#d3d3d3", fontSize: 14}}
                                name="sync"/>
                        </SpinnerButton>
                    </View>
                    <Item
                        rounded
                        style={styles.inputItem}
                    >

                        <Input
                            style={styles.input}
                            autoCapitalize="sentences"
                            keyboardType="default"
                            onChangeText={response1 => this.setState({response1})}
                            value={response1}
                        />
                    </Item>

                    <View style={{flexDirection: 'row', justifyContent: 'center', width: 300, marginLeft: "auto",
                        marginRight: "auto"}}>
                        <Label
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: 280,
                            }}
                        >{this.state.questions2[this.state.questionIndex2]}*</Label>
                        <SpinnerButton
                            buttonStyle={styles.refreshButton}
                            onPress={this.setQuestionIndex2}
                            indicatorCount={10}
                            spinnerType="SkypeIndicator"
                        >
                            <Icon
                                style={{color: "#d3d3d3", fontSize: 14}}
                                name="sync"/>
                        </SpinnerButton>

                    </View>
                    <Item
                        rounded
                        style={styles.inputItem}
                    >

                        <Input
                            style={styles.input}
                            autoCapitalize="sentences"
                            keyboardType="default"
                            onChangeText={response2 => this.setState({response2})}
                            value={response2}
                        />
                    </Item>
                    <Label
                        style={styles.label}
                    >Mot de passe*</Label>
                    <Item
                        rounded
                        success={isCorrectPassword(password)}
                        error={password.length > 0 && (!isCorrectPassword(password))}
                        style={styles.inputItem}
                    >
                        <Input
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={password => this.setState({password})}
                            value={password}
                        />
                        {password.length > 0 ? (<Icon
                            name={
                                isCorrectPassword(password)
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectPassword(password)
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    <Label
                        style={styles.label}
                    >Confirmer mot de passe*</Label>
                    <Item
                        rounded
                        success={isCorrectPassword(confirmPassword)}
                        error={confirmPassword.length > 0 && (!isCorrectPassword(confirmPassword) || password != confirmPassword)}
                        style={styles.inputItem}
                    >
                        <Input
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            value={confirmPassword}
                        />
                        {confirmPassword.length > 0 ? (<Icon
                            name={
                                isCorrectPassword(confirmPassword) && password === confirmPassword
                                    ? "checkmark-circle"
                                    : "close-circle"
                            }
                            style={isCorrectPassword(confirmPassword) && password === confirmPassword
                                ? styles.green
                                : styles.red}
                        />) : null}
                    </Item>
                    {this.state.loading ? (
                        <Item style={{
                            marginLeft: "auto",
                            marginRight: "auto", position: "relative",
                            width: 50, marginTop: -80
                        }}>
                            <Loader/>
                        </Item>

                    ) : null}
                    <SpinnerButton
                        buttonStyle={styles.registerButton}
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

                    <ImageBackground style={{width: '100%', height: '100%'}}>
                        <Text>Inside</Text>
                    </ImageBackground>
                </ScrollView>
                <ErrorModal visible={this.state.modalVisible} setVisible={this.setModalVisible}
                            message={this.state.errorMessage}/>
            </>
            :
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Chargement</Text>
                    <ActivityIndicator size="large" />
                </View>
            );
    }
}
