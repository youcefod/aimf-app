import React, { Component } from "react";
import { Platform } from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  Button,
  Icon,
  Text,
} from "native-base";

// eslint-disable-next-line react/prefer-stateless-function
class CostumHeader extends Component {
  render() {
    const { title, subtile, isHome, validate, navigation } = this.props;

    return (
      <Header>
        {!isHome && (
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        )}
        {isHome && Platform.OS === "android" && <Left />}
        <Body style={{ flex: 1, justifyContent: "center" }}>
          <Title style={{ fontSize: 14, textAlign: "center" }}>{title}</Title>
          {!(subtile === undefined) && (
            <Subtitle style={{ fontSize: 12, textAlign: "center" }}>
              {subtile}
            </Subtitle>
          )}
        </Body>
        {isHome && Platform.OS === "android" && <Right />}
        {!isHome && (
          <Right>
            <Button hasText transparent onPress={(event) => validate(event)}>
              <Text>Valider</Text>
            </Button>
          </Right>
        )}
      </Header>
    );
  }
}

export default CostumHeader;
