import React, {Component} from 'react';
import {Card, CardItem, Text, Left, Body} from 'native-base';
import {Image, View} from "react-native";

export default class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let logo = require("../../../assets/images/book.jpg");
        return (
            <Card
                transparent>
                <CardItem
                    button onPress={() => alert("This is Card Header")}
                >
                    <Left>
                        <Image style={{width: 65, height: 80}} source={logo}/>
                        <Body>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flexDirection: "column"}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: "#b48462",
                                        marginBottom: 5
                                    }}>{this.props.data.title}</Text>
                                    <Text style={{fontSize: 10, marginBottom: 5,  color: "#525252",}}>{this.props.data.author}</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "#919191",
                                        marginLeft: 10
                                    }}>{this.props.data.genre}</Text>
                                </View>
                                <View style={{flexDirection: "column"}}>
                                    <Text style={{fontSize: 11, color: "#919191",}}>{this.props.data.pages} pages</Text>
                                </View>
                            </View>
                        </Body>
                    </Left>
                </CardItem>
            </Card>

        );
    }
}