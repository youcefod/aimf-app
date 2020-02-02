import React, {Component} from "react";
import {
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
    View,
    Image
} from "react-native";
import {Item, Icon, Input, Label, DatePicker, Text, Button} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import {RadioButtons, SegmentedControls} from 'react-native-radio-buttons'
import {
    isCorrectPhoneNumber,
    isCorrectName,
    isCorrectEmailAddress,
    isCorrectPassword,
    isCorrectZipCode,
    getFrDate
} from "../Utils/Functions";
import {styles} from "./ProfileForm/css";
import Loader from '../Components/Loader';
import {CREATE_ACTION, MARRIED, MEN_KIND, SHOW_ACTION, SINGLE, UPDATE_ACTION, WOMEN_KIND} from "../Utils/Constants";
import {getRandomQuestionIndex} from "./ProfileForm/Functions";
import ActionsButton from './ProfileForm/ActionsButton'
import ChildrenInformation from "./ProfileForm/ChildrenInformation";
import {RenderInput} from "./ProfileForm/RenderFunctions";

export default class ProfileForm extends Component {

    constructor(props) {
        super(props);
        _isMounted = false;

        this.state = {
            spinValue: new Animated.Value(0),
            loading: false,
            modal: false,
            questionIndex1: null,
            questionIndex2: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    setDate(newDate) {
        this.props.updateState({birthDate: newDate});
    }

    setConjugalSituation = (option) => {
        this.props.updateState({
            conjugalSituation: option
        });
    }

    setQuestionIndex1 = () => {
        const questionIndex1 = getRandomQuestionIndex(this.state.questionIndex1);
        const question1 = this.props.data.questions1[questionIndex1];
        this.props.updateState({question1});
        this.setState({
            questionIndex1
        });
    }

    setQuestionIndex2 = () => {
        const questionIndex2 = getRandomQuestionIndex(this.state.questionIndex2);
        const question2 = this.props.data.questions2[questionIndex2];
        this.props.updateState({question2});
        this.setState({
            questionIndex2
        });
    }

    getKinIcon = (option, selected) => {
        if (option === MEN_KIND) {
            return selected ? require('../../assets/images/men_selected.png') : require('../../assets/images/men.png');
        }
        return selected ? require('../../assets/images/women_selected.png') : require('../../assets/images/women.png');
    }

    renderKindOption = (option, selected, onSelect, index) => {
        const marginLeft = option === WOMEN_KIND ? 50 : 0;
        const icon = this.getKinIcon(option, selected);
        return (<TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Image style={{width: 60, height: 60}} source={icon}/>
            </TouchableWithoutFeedback>
        );
    }

    renderKindContainer = (optionNodes) => {
        return <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>{optionNodes}</View>;
    }

    renderQuestionsBloc() {
        return (
            <>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', width: 300, marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <Label
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: 280,
                        }}
                    >{this.props.data.question1}*</Label>
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
                        onChangeText={response1 => this.props.updateState({response1})}
                        value={this.props.data.response1}
                    />
                </Item>

                <View style={{
                    flexDirection: 'row', justifyContent: 'center', width: 300, marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <Label
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: 280,
                        }}
                    >{this.props.data.question2}*</Label>
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
                        onChangeText={response2 => this.props.updateState({response2})}
                        value={this.props.data.response2}
                    />
                </Item>
            </>
        );
    }

    render() {
        const {
            email,
            currentPassword,
            newPassword,
            confirmPassword,
            brother,
            firstname,
            zipCode,
            phoneNumber,
            numberOfChildren,
            conjugalSituation,
            childrenYears,
            schoolLevels,
            fonction,
            birthDate,
            kind,
        } = this.props.data;
        const conjugalSituationOptions = [MARRIED, SINGLE];
        return (
            <>
                <ScrollView
                    centerContent={true}
                    style={{paddingTop: 20, opacity: this.props.scrollViewOpacity, backgroundColor: '#f3aa2329'}}>
                    <View>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.action === UPDATE_ACTION ?
                                    this.props.updateState({
                                        ...this.props.initData,
                                        action: SHOW_ACTION
                                    }) : this.props.navigation.navigate("Login");
                            }}
                            style={{borderRadius: 30}}
                        >
                            <Icon style={{color: "#000"}} name="md-arrow-back" type="Ionicons"/>
                        </Button>
                    </View>
                    <Label
                        style={styles.label}>Je suis *</Label>
                    <RadioButtons
                        options={["men", "women"]}
                        onSelection={kind => this.props.updateState({kind})}
                        selectedOption={kind}
                        renderOption={this.renderKindOption}
                        renderContainer={this.renderKindContainer}
                    />
                    <RenderInput
                        checkFunction={isCorrectName}
                        label="Nom"
                        onChange={lastname => this.props.updateState({lastname})}
                        required
                        value={lastname}
                    />
                    <RenderInput
                        checkFunction={isCorrectName}
                        label="Nom de jeune fille"
                        onChange={maidename => this.props.updateState({maidename})}
                        required={false}
                        value={maidename}
                    />
                    <RenderInput
                        checkFunction={isCorrectName}
                        label="Fils de"
                        onChange={brother => this.props.updateState({brother})}
                        required
                        value={brother}
                    />
                    <RenderInput
                        checkFunction={isCorrectName}
                        label="Prénom"
                        onChange={firstname => this.props.updateState({firstname})}
                        required
                        value={firstname}
                    />
                    <Label
                        style={styles.label}
                    >Situation conjugale*</Label>
                    <SegmentedControls
                        containerStyle={{width: 300, marginLeft: "auto", marginRight: "auto", marginBottom: 15}}
                        tint={'#CC9871'}
                        options={conjugalSituationOptions}
                        onSelection={this.setConjugalSituation.bind(this)}
                        selectedOption={conjugalSituation}
                    />
                    <Label
                        style={styles.label}
                    >Date de naissance*</Label>
                    <Item
                        rounded
                        style={styles.inputItem}
                    >
                        <DatePicker
                            defaultDate={birthDate}
                            minimumDate={new Date(1900, 1, 1)}
                            maximumDate={new Date()}
                            modalTransparent={false}
                            locale={"fr"}
                            formatChosenDate={(date) => {
                                return getFrDate(date);
                            }}
                            androidMode={"spinner"}
                            animationType={"slide"}
                            placeHolderText={this.props.action === UPDATE_ACTION ? undefined : "Séléctionner une date"}
                            textStyle={{color: "#000"}}
                            placeHolderTextStyle={{color: "#d3d3d3"}}
                            onDateChange={this.setDate.bind(this)}
                            customStyles={styles.datePicker}
                        />
                    </Item>

                    {this.props.action === UPDATE_ACTION ? (
                        <>
                            <ChildrenInformation
                                conjugalSituation={conjugalSituation}
                                numberOfChildren={numberOfChildren}
                                childrenYears={childrenYears}
                                schoolLevels={schoolLevels}
                                updateState={this.props.updateState}
                            />
                            <RenderInput
                                checkFunction={isCorrectName}
                                label="Fonction"
                                onChange={fonction => this.props.updateState({fonction})}
                                required
                                value={fonction}
                            />
                        </>
                    ) : null}
                    <RenderInput
                        checkFunction={isCorrectZipCode}
                        label="Code postale"
                        maxLength={5}
                        keyboardType="numeric"
                        onChange={zipCode => this.props.updateState({zipCode})}
                        required
                        value={zipCode}
                    />
                    <RenderInput
                        checkFunction={this.props.action === CREATE_ACTION && isCorrectEmailAddress}
                        label="Email"
                        keyboardType="email-address"
                        onChange={email => this.props.updateState({email})}
                        required
                        disabled={this.props.action === UPDATE_ACTION}
                        value={email}
                        itemStyle={{...styles.inputItem, opacity: this.props.action === CREATE_ACTION ? 1 : 0.5}}
                    />
                    <RenderInput
                        checkFunction={isCorrectPhoneNumber}
                        label="Téléphone"
                        maxLength={10}
                        keyboardType="numeric"
                        onChange={phoneNumber => this.props.updateState({phoneNumber})}
                        required
                        value={phoneNumber}
                    />
                    {this.props.action === CREATE_ACTION ? this.renderQuestionsBloc() : null}

                    {this.props.action === UPDATE_ACTION ?

                        <RenderInput
                            checkFunction={isCorrectPassword}
                            label="Ancien mot de passe"
                            secureTextEntry
                            onChange={currentPassword => this.props.updateState({currentPassword})}
                            required={this.props.action === CREATE_ACTION}
                            value={currentPassword}
                        /> : null}

                    <RenderInput
                        checkFunction={isCorrectPassword}
                        label={this.props.action === UPDATE_ACTION ? 'Nouveau mot de passe' : 'Mot de passe'}
                        secureTextEntry
                        onChange={newPassword => this.props.updateState({newPassword})}
                        required={this.props.action === CREATE_ACTION}
                        value={newPassword}
                    />
                    <RenderInput
                        checkFunction={isCorrectPassword}
                        label="Confirmer nouveau mot de passe"
                        error={confirmPassword.length > 0 && (!isCorrectPassword(confirmPassword) || newPassword != confirmPassword)}
                        secureTextEntry
                        onChange={confirmPassword => this.props.updateState({confirmPassword})}
                        required={this.props.action === CREATE_ACTION}
                        value={confirmPassword}
                    />
                    {this.state.loading ? (
                        <Item style={{
                            marginLeft: "auto",
                            marginRight: "auto", position: "relative",
                            width: 50, marginTop: -80
                        }}>
                            <Loader/>
                        </Item>
                    ) : null}

                    <ActionsButton
                        action={this.props.action}
                        onValidate={this.props.onSubmit}
                        onCancel={() => this.props.updateState({action: SHOW_ACTION})}
                        data={this.state}
                        navigation={this.props.navigation}/>
                </ScrollView>
            </>
        );
    }
}
