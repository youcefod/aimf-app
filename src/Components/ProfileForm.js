import React, { Component } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { Item, Icon, Input, Label, DatePicker, Button } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import { RadioButtons, SegmentedControls } from "react-native-radio-buttons";
import * as PropTypes from "prop-types";
import {
  isCorrectPhoneNumber,
  isCorrectName,
  isCorrectEmailAddress,
  isCorrectPassword,
  isCorrectZipCode,
  getFrDate,
} from "../Utils/Functions";
import styles from "./ProfileForm/css";
import {
  CREATE_ACTION,
  MARRIED,
  MALE_GENDER,
  SHOW_ACTION,
  SINGLE,
  UPDATE_ACTION,
  FEMALE_GENDER,
} from "../Utils/Constants";
import getRandomQuestionIndex from "./ProfileForm/Functions";
import ActionsButton from "./ProfileForm/ActionsButton";
import ChildrenInformation from "./ProfileForm/ChildrenInformation";
import { RenderInput } from "./ProfileForm/RenderFunctions";

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex1: null,
      questionIndex2: null,
    };
  }

  componentDidMount() {
    const { questions1, questions2, question1, question2 } = this.props.data;
    if (question1) {
      this.props.updateState({ question1 });
      this.setState({
        questionIndex1: questions1.findIndex(
          (question) => question.id === question1.id
        ),
      });
    }

    if (question2) {
      this.props.updateState({ question2 });
      this.setState({
        questionIndex2: questions2.findIndex(
          (question) => question.id === question2.id
        ),
      });
    }
  }

  setDate(newDate) {
    this.props.updateState({ birthday: newDate });
  }

  setConjugalSituation = (option) => {
    this.props.updateState({
      maritalStatus: option,
    });
  };

  setQuestionIndex1 = () => {
    const { questionIndex1 } = this.state;

    const newQuestionIndex1 = getRandomQuestionIndex(questionIndex1);
    const question1 = this.props.data.questions1[newQuestionIndex1];
    this.props.updateState({ question1 });
    this.setState({
      questionIndex1: newQuestionIndex1,
    });
  };

  setQuestionIndex2 = () => {
    const { questionIndex2 } = this.state;
    const newQuestionIndex2 = getRandomQuestionIndex(questionIndex2);
    const question2 = this.props.data.questions2[newQuestionIndex2];
    this.props.updateState({ question2 });
    this.setState({
      questionIndex2: newQuestionIndex2,
    });
  };

  getKinIcon = (option, selected) => {
    if (option === MALE_GENDER) {
      return selected
        ? require("../../assets/images/men_selected.png")
        : require("../../assets/images/men.png");
    }
    return selected
      ? require("../../assets/images/women_selected.png")
      : require("../../assets/images/women.png");
  };

  renderGenderOption = (option, selected, onSelect, index) => {
    const icon = this.getKinIcon(option, selected);
    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Image style={{ width: 60, height: 60 }} source={icon} />
      </TouchableWithoutFeedback>
    );
  };

  renderGenderContainer = (optionNodes) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {optionNodes}
      </View>
    );
  };

  renderQuestionsBloc() {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 300,
            marginLeft: 30,
          }}
        >
          <Label
            style={{
              fontWeight: "bold",
              fontSize: 14,
              marginLeft: 30,
              width: 300,
            }}
          >
            {this.props.data.question1 && this.props.data.question1.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex1}
            indicatorCount={10}
            spinnerType="SkypeIndicator"
          >
            <Icon style={{ color: "#d3d3d3", fontSize: 14 }} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response1) => this.props.updateState({ response1 })}
            value={this.props.data.response1}
          />
        </Item>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
            marginLeft: 30,
          }}
        >
          <Label
            style={{
              fontWeight: "bold",
              fontSize: 14,
              width: 300,
            }}
          >
            {this.props.data.question2 && this.props.data.question2.question}*
          </Label>
          <SpinnerButton
            buttonStyle={styles.refreshButton}
            onPress={this.setQuestionIndex2}
            indicatorCount={10}
            spinnerType="SkypeIndicator"
          >
            <Icon style={{ color: "#d3d3d3", fontSize: 14 }} name="sync" />
          </SpinnerButton>
        </View>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            autoCapitalize="sentences"
            keyboardType="default"
            onChangeText={(response2) => this.props.updateState({ response2 })}
            value={this.props.data.response2}
          />
        </Item>
      </>
    );
  }

  render() {
    const {
      email,
      lastName,
      middleName,
      oldPassword,
      password,
      confirmPassword,
      fatherName,
      firstName,
      zipCode,
      phoneNumber,
      childrenNumber,
      maritalStatus,
      children,
      functionName,
      birthday,
      gender,
    } = this.props.data;
    const maritalStatusOptions = [MARRIED, SINGLE];
    return (
      <>
        <ScrollView
          centerContent
          style={{
            paddingTop: 20,
            opacity: this.props.scrollViewOpacity,
            backgroundColor: "#fce3ba",
          }}
        >
          <View>
            <Button
              transparent
              onPress={() => {
                if (this.props.action === UPDATE_ACTION) {
                  this.props.updateState({
                    ...this.props.initData,
                  });
                  this.props.updateAction(SHOW_ACTION);
                } else {
                  this.props.navigation.navigate("Login");
                }
              }}
              style={{ borderRadius: 30 }}
            >
              <Icon
                style={{ color: "#000" }}
                name="md-arrow-back"
                type="Ionicons"
              />
            </Button>
          </View>
          <Label style={styles.label}>Je suis *</Label>
          <RadioButtons
            options={[MALE_GENDER, FEMALE_GENDER]}
            onSelection={(value) => this.props.updateState({ gender: value })}
            selectedOption={gender}
            renderOption={this.renderGenderOption}
            renderContainer={this.renderGenderContainer}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Nom"
            onChange={(value) => this.props.updateState({ lastName: value })}
            required
            value={lastName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Nom jeune fille"
            onChange={(value) => this.props.updateState({ middleName: value })}
            required={false}
            value={middleName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Fils(fille) de"
            onChange={(value) => this.props.updateState({ fatherName: value })}
            required
            value={fatherName}
          />
          <RenderInput
            checkFunction={isCorrectName}
            label="Prénom"
            onChange={(value) => this.props.updateState({ firstName: value })}
            required
            value={firstName}
          />
          <Label style={styles.label}>Situation conjugale*</Label>
          <SegmentedControls
            containerStyle={{
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 15,
            }}
            tint="#cb8347"
            options={maritalStatusOptions}
            onSelection={(value) => this.setConjugalSituation(value)}
            selectedOption={maritalStatus}
            extractText={(option) =>
              option === MARRIED ? "Marié(e)" : "Célibataire"
            }
          />
          <Label style={styles.label}>Date de naissance*</Label>
          <Item rounded style={styles.inputItem}>
            <DatePicker
              defaultDate={new Date(birthday)}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date()}
              modalTransparent={false}
              locale="fr"
              formatChosenDate={(date) => {
                return getFrDate(date);
              }}
              androidMode="spinner"
              animationType="slide"
              placeHolderText={
                this.props.action === UPDATE_ACTION
                  ? undefined
                  : "Séléctionner une date"
              }
              textStyle={{ color: "#000" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(date) => this.setDate(date)}
              customStyles={styles.datePicker}
            />
          </Item>

          {this.props.action === UPDATE_ACTION ? (
            <>
              <ChildrenInformation
                maritalStatus={maritalStatus}
                childrenNumber={childrenNumber}
                childrenInformation={children || []}
                updateState={(state) => this.props.updateState(state)}
              />
              <RenderInput
                checkFunction={isCorrectName}
                label="Fonction"
                onChange={(value) =>
                  this.props.updateState({ functionName: value })
                }
                required
                value={functionName}
              />
            </>
          ) : null}
          <RenderInput
            checkFunction={isCorrectZipCode}
            label="Code postale"
            maxLength={5}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({ zipCode: value })}
            required
            value={zipCode}
          />
          <RenderInput
            checkFunction={
              this.props.action === CREATE_ACTION && isCorrectEmailAddress
            }
            label="Email"
            keyboardType="email-address"
            onChange={(value) => this.props.updateState({ email: value })}
            required
            disabled={this.props.action === UPDATE_ACTION}
            value={email}
            itemStyle={{
              ...styles.inputItem,
              opacity: this.props.action === CREATE_ACTION ? 1 : 0.5,
            }}
          />
          <RenderInput
            checkFunction={isCorrectPhoneNumber}
            label="Téléphone"
            maxLength={10}
            keyboardType="numeric"
            onChange={(value) => this.props.updateState({ phoneNumber: value })}
            required
            value={phoneNumber}
          />
          {this.props.action === CREATE_ACTION
            ? this.renderQuestionsBloc()
            : null}

          {this.props.action === UPDATE_ACTION ? (
            <RenderInput
              checkFunction={isCorrectPassword}
              label="Ancien mot de passe"
              secureTextEntry
              onChange={(value) =>
                this.props.updateState({ oldPassword: value })
              }
              required={this.props.action === CREATE_ACTION}
              value={oldPassword}
            />
          ) : null}

          <RenderInput
            checkFunction={isCorrectPassword}
            label={
              this.props.action === UPDATE_ACTION
                ? "Nouveau mot de passe"
                : "Mot de passe"
            }
            secureTextEntry
            onChange={(value) => this.props.updateState({ password: value })}
            required={this.props.action === CREATE_ACTION}
            value={password}
          />
          <RenderInput
            checkFunction={isCorrectPassword}
            label="Confirmer mot de passe"
            error={
              confirmPassword.length > 0 &&
              (!isCorrectPassword(confirmPassword) ||
                password !== confirmPassword)
            }
            secureTextEntry
            onChange={(value) =>
              this.props.updateState({ confirmPassword: value })
            }
            required={this.props.action === CREATE_ACTION}
            value={confirmPassword}
          />
          <ActionsButton
            action={this.props.action}
            onValidate={() => this.props.onSubmit()}
            onCancel={() => this.props.updateAction(SHOW_ACTION)}
            data={this.state}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </>
    );
  }
}

ProfileForm.propTypes = {
  navigation: PropTypes.object,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  updateState: PropTypes.func,
  updateAction: PropTypes.func,
  data: PropTypes.object,
  scrollViewOpacity: PropTypes.number,
  initData: PropTypes.object,
};
