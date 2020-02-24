import React, {Component} from "react";
import {Text, View} from "react-native";
import {Body, CheckBox, List, ListItem} from "native-base";

class PickUpTakharoubt extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<View style={{flex: 1, backgroundColor: "#dd4df1"}}>
            <Text>Pick Up Takharoubt</Text>

            <List>
                <ListItem>
                    <Body>
                        <Text>
                            البقرة - الأية 141 الفاتحة
                        </Text>
                    </Body>
                    <CheckBox checked={true} color="green"/>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>
                            البقرة - الأية 252 البقرة - الأية 142
                        </Text>
                    </Body>
                    <CheckBox checked={false} color="green"/>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>
                            أل عمران - الأية 91 البقرة - الأية 253
                        </Text>
                    </Body>
                    <CheckBox checked={false} color="green"/>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>
                            النساء - الأية 23 ال عمران - الأية 92
                        </Text>
                    </Body>
                    <CheckBox checked={true} color="green"/>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>
                            البقرة - الأية 141 الفاتحة
                        </Text>
                    </Body>
                    <CheckBox checked={true} color="green"/>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>
                            أل عمران - الأية 91 البقرة - الأية 253
                        </Text>
                    </Body>
                    <CheckBox checked={false} color="green"/>
                </ListItem>
            </List>
        </View>);
    }
}

export default PickUpTakharoubt;
