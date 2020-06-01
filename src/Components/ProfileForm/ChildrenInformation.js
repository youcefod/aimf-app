import React, { Component } from "react";
import { Input, Item, Label } from "native-base";
import { Picker } from "react-native-wheel-pick";
import { View } from "react-native";
import * as PropTypes from "prop-types";
import {
  CHILDREN_YEAR_LABEL,
  DEFAULT_SCHOOL_LEVEL,
  MARRIED,
  SCHOOL_LEVELS,
} from "../../Utils/Constants";
import styles from "./css";

class ChildrenInformation extends Component {
  renderPicker = (index) => {
    const currentYear = new Date().getFullYear();
    const defaultSchoolLevel = DEFAULT_SCHOOL_LEVEL;
    const start = currentYear - 18;
    const yearList = Array(currentYear - start + 1)
      .fill()
      .map((_, idx) => start + idx);
    return (
      <View key={index}>
        <Label
          style={this.props.itemStyle ? this.props.itemStyle : styles.label}
        >
          Année de naissance {CHILDREN_YEAR_LABEL[index]} enfant
        </Label>
        <Item rounded style={{ ...styles.inputItem, height: 60, padding: 5 }}>
          <Picker
            style={{ backgroundColor: "#FFF", width: 280, height: 55 }}
            selectedValue={
              this.props.childrenInformation[index] &&
              this.props.childrenInformation[index].yearOfBirth
                ? this.props.childrenInformation[index].yearOfBirth
                : currentYear
            }
            pickerData={yearList}
            onValueChange={(value) => {
              if (!this.props.childrenInformation[index]) {
                this.props.childrenInformation[index] = {};
              }
              this.props.childrenInformation[index].yearOfBirth = value;
              this.props.updateState({
                children: this.props.childrenInformation,
              });
            }}
            itemSpace={30}
          />
        </Item>
        <Label style={styles.label}>
          Niveau scolaire du {CHILDREN_YEAR_LABEL[index]} enfant
        </Label>
        <Item rounded style={{ ...styles.inputItem, height: 60, padding: 5 }}>
          <Picker
            style={{ backgroundColor: "#FFF", width: 280, height: 55 }}
            selectedValue={
              this.props.childrenInformation[index] &&
              this.props.childrenInformation[index].schoolLevel
                ? this.props.childrenInformation[index].schoolLevel
                : defaultSchoolLevel
            }
            pickerData={SCHOOL_LEVELS}
            onValueChange={(value) => {
              if (!this.props.childrenInformation[index]) {
                this.props.childrenInformation[index] = {};
              }
              this.props.childrenInformation[index].schoolLevel = value;
              this.props.updateState({
                children: this.props.childrenInformation,
              });
            }}
            itemSpace={30}
          />
        </Item>
      </View>
    );
  };

  renderAdditionalInformationForm = () => {
    const pickers = [];
    for (let i = 0; i < this.props.childrenNumber; i += 1) {
      pickers.push(this.renderPicker(i));
    }
    return pickers;
  };

  render() {
    return this.props.maritalStatus === MARRIED ? (
      <>
        <Label style={styles.label}>Nombre d&apos;enfant*</Label>
        <Item rounded style={styles.inputItem}>
          <Input
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(childrenNumber) => {
              const children = this.props.childrenInformation;
              this.props.updateState({
                children: children.slice(0, childrenNumber),
                childrenNumber,
              });
            }}
            value={`${this.props.childrenNumber}`}
          />
        </Item>
        {this.renderAdditionalInformationForm()}
      </>
    ) : null;
  }
}

ChildrenInformation.propTypes = {
  childrenNumber: PropTypes.string,
  maritalStatus: PropTypes.string,
  updateState: PropTypes.func,
  childrenInformation: PropTypes.array,
  itemStyle: PropTypes.object,
};

export default ChildrenInformation;
