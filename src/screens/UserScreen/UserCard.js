import React, {Component} from 'react';
import {Card, CardItem, Thumbnail, Text, Icon, Left, Right, Body} from 'native-base';
import {WOMEN_KIND} from "../../Utils/Constants";
import {getFullName} from "../../Utils/Functions";
import {View} from "react-native";

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informationModalVisible: false,
            confirmUpdateVisible: false,
            isAuthorized: props.data.isAuthorized,
            isAdmin: props.data.isAdmin,
            confirmMessage: '',
            updateUserLoadding: false,
        }
    }

    render() {
        let logo = require("../../../assets/images/men.png");
        if (this.props.data.kind == WOMEN_KIND) {
            logo = require("../../../assets/images/women.png");
        }

        return (
            <Card transparent>
                <CardItem>
                    <Left>
                        <Thumbnail source={logo}/>
                        <Body>
                            <Text style={{fontSize: 11}}>{getFullName(this.props.data)}</Text>
                            <Text style={{fontSize: 8}}>{this.props.data.phoneNumber}</Text>
                        </Body>
                    </Left>
                    <Right style={{height: 58}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                {this.state.isAuthorized && (
                                    <Text style={{marginTop: 20, marginRight: 30}}>
                                        <Icon
                                            type="AntDesign" name="checkcircleo"
                                            style={{fontSize: 17, color: "#49bd78"}}/></Text>)}
                                {this.state.isAdmin && (
                                    <Text style={{marginTop: 20, marginRight: 30}}>
                                        <Icon
                                            type="FontAwesome5" name="user-cog"
                                            style={{fontSize: 17, color: "#000"}}/></Text>)}
                            </View>
                            <Text onPress={() => this.props.showUser(this.props.data)}
                                  style={{fontSize: 17}}>...</Text>
                        </View>
                    </Right>
                </CardItem>
            </Card>

        );
    }
}