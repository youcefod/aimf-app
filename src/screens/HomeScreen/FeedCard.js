import React, { Component } from "react";
import { Card, CardItem, Thumbnail, Text, Left, Body } from "native-base";
import * as PropTypes from "prop-types";

class FeedCard extends Component {
  render() {
    const logo = require("../../../assets/images/logo_transparent.png");
    return (
      <Card style={{ flex: 0, marginLeft: 10, marginRight: 10 }}>
        <CardItem style={{ backgroundColor: this.props.backgroundColor }}>
          <Left>
            <Thumbnail source={logo} />
            <Body>
              <Text>{this.props.title}</Text>
              <Text note>{this.props.date}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{ backgroundColor: this.props.backgroundColor }}>
          <Body>
            <Text>{this.props.text}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

FeedCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default FeedCard;
