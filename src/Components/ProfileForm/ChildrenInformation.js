import React, {Component} from "react";
import {styles} from "./css";
import {Input, Item, Label} from "native-base";
import {CHILDREN_YEAR_LABEL, DEFAULT_SCHOOL_LEVEL, MARRIED, SCHOOL_LEVELS} from "../../Utils/Constants";
import {Picker} from 'react-native-wheel-pick';
import {View} from "react-native";

export default class ChildrenInformation extends Component {

    renderPicke = index => {
        const currentYear = (new Date()).getFullYear();
        const defaultSchoolLevel = DEFAULT_SCHOOL_LEVEL;
        const start = currentYear - 18;
        const yearList = Array(currentYear - start + 1).fill().map((_, idx) => start + idx);
        return (
            <View key={index}>
                <Label
                    style={this.props.itemStyle ? this.props.itemStyle : styles.label}
                >Année de naissance {CHILDREN_YEAR_LABEL[index]} enfant</Label>
                <Item
                    rounded
                    style={{...styles.inputItem, height: 60, padding: 5}}
                >
                    <Picker
                        style={{backgroundColor: "#FFF", width: 280, height: 55}}
                        selectedValue={this.props.childrenYears[index] ? this.props.childrenYears[index] : currentYear}
                        pickerData={yearList}
                        onValueChange={value => {
                            this.props.childrenYears[index] = value;
                            this.props.updateState({childrenYears: this.props.childrenYears});
                        }}
                        itemSpace={30}
                    />
                </Item>
                <Label
                    style={styles.label}
                >Niveau scolaire du {CHILDREN_YEAR_LABEL[index]} enfant</Label>
                <Item
                    rounded
                    style={{...styles.inputItem, height: 60, padding: 5}}
                >
                    <Picker
                        style={{backgroundColor: "#FFF", width: 280, height: 55}}
                        selectedValue={this.props.schoolLevels[index] ? this.props.schoolLevels[index] : defaultSchoolLevel}
                        pickerData={SCHOOL_LEVELS}
                        onValueChange={value => {
                            this.props.schoolLevels[index] = value;
                            this.props.updateState({schoolLevels: this.props.schoolLevels});
                        }}
                        itemSpace={30}
                    />
                </Item>
            </View>
        );
    };

    renderAdditionalInformationForm = () => {
        let pickers = [];
        for (i = 0; i < this.props.numberOfChildren; i++) {
            pickers.push(this.renderPicke(i));
        }
        return pickers;
    };

    render() {
        return this.props.conjugalSituation === MARRIED ? (
            <>
                <Label
                    style={styles.label}
                >Nombre d'enfant*</Label>
                <Item
                    rounded
                    style={styles.inputItem}
                >
                    <Input
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={numberOfChildren => this.props.updateState({numberOfChildren: numberOfChildren})}
                        value={this.props.numberOfChildren.toString()}
                    />
                </Item>
                {this.renderAdditionalInformationForm()}
            </>
        ) : null;
    }
}

