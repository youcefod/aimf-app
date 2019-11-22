import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class FeedCard extends Component {
    render() {
        const logo = require("../../assets/images/logo_transparent.png");
        return (
            <Card style={{flex: 0, marginLeft: 10, marginRight: 10}}>
                <CardItem style={{backgroundColor: this.props.backgroundColor}}>
                    <Left>
                        <Thumbnail source={logo} />
                        <Body>
                            <Text>{this.props.title}</Text>
                            <Text note style={{color: this.props.dateColor}}>{this.props.date}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={{backgroundColor: this.props.backgroundColor}}>
                    <Body>
                        <Text>
                            {this.props.text}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={{backgroundColor: this.props.backgroundColor}}>
                    <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Icon name="logo-github" />
                            <Text>1,926</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}