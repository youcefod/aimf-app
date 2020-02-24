import React, {Component} from "react";
import {Text, View} from "react-native";
import {Body, CheckBox, DatePicker, Input, Item, ListItem} from "native-base";
import {getFrDate} from "../../Utils/Functions";
import SpinnerButton from "react-native-spinner-button";

class CreateKhatma extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.name = null;
        this.beginDate = new Date();
        this.endDate = new Date();
        this.enabled = false;
    }

    render() {
        return (<View style={{flex: 1, backgroundColor: "#f1f1f1"}}>
            <Text>Create Khatma</Text>
            <Item>
                <Input
                    onChangeText={name => this.setName({name})}
                    placeholder={"Nom de Khatma"}
                    value={this.name}
                />
            </Item>

            <Item>
                <DatePicker
                    defaultDate={this.beginDate}
                    minimumDate={new Date(2000, 1, 1)}
                    locale={"fr"}
                    formatChosenDate={(date) => {
                        return getFrDate(date);
                    }}
                    androidMode={"spinner"}
                    animationType={"slide"}
                    placeHolderText="Date de debut"
                    onDateChange={date => this.setBeginDate(date)}
                />
            </Item>

            <Item>
                <DatePicker
                    defaultDate={this.endDate}
                    minimumDate={this.endDate}
                    locale={"fr"}
                    formatChosenDate={(date) => {
                        return getFrDate(date);
                    }}
                    androidMode={"spinner"}
                    animationType={"slide"}
                    placeHolderText="Date de fin"
                    onDateChange={date => this.setEndDate(date)}
                />
            </Item>

            <ListItem>
                <CheckBox checked={this.enabled} color="green"/>
                <Body>
                    <Text> Activer le Khatma</Text>
                </Body>
            </ListItem>

            <SpinnerButton
                indicatorCount={10}
                spinnerType="SkypeIndicator"
            >
                <Text>Creer la Khatma</Text>
            </SpinnerButton>
        </View>);
    }
}

export default CreateKhatma;
