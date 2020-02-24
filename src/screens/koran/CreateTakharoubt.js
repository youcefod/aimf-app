import React, {Component} from "react";
import {Text, View} from "react-native";
import {Input, Item} from "native-base";
import SpinnerButton from "react-native-spinner-button";

class CreateTakharoubt extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.begin = null;
        this.end = null;
    }

    render() {
        return (<View style={{flex: 1, backgroundColor: "#f2f2f2"}}>
            <Text>Create Takharoubt</Text>

            <Item>
                <Input
                    onChangeText={begin => this.setBegin({begin})}
                    placeholder={"Debut de Takharoubt"}
                    value={this.begin}
                />
            </Item>

            <Item>
                <Input
                    onChangeText={end => this.setEnd({end})}
                    placeholder={"fin de Takharoubt"}
                    value={this.begin}
                />
            </Item>

            <SpinnerButton
                indicatorCount={10}
                spinnerType="SkypeIndicator"
            >
                <Text>Creer la Takharoubt</Text>
            </SpinnerButton>
        </View>);
    }
}

export default CreateTakharoubt;
