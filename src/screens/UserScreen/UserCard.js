import React, { Component } from "react";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";
import { View } from "react-native";
import * as PropTypes from "prop-types";
import { FEMALE_GENDER } from "../../Utils/Constants";
import { getFullName } from "../../Utils/Functions";
import { isAdmin, isAuthorized, isSuperAdmin } from "../../Utils/Account";

class UserCard extends Component {
  render() {
    let logo = require("../../../assets/images/men.png");
    if (this.props.data.gender === FEMALE_GENDER) {
      logo = require("../../../assets/images/women.png");
    }
    return (
      <Card transparent>
        <CardItem>
          <Left>
            <Thumbnail source={logo} />
            <Body>
              <Text style={{ fontSize: 13 }}>
                {getFullName(this.props.data)}
              </Text>
              <Text style={{ fontSize: 11 }}>
                {this.props.data.phoneNumber}
              </Text>
            </Body>
          </Left>
          <Right style={{ height: 58 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                {isAuthorized(this.props.data) && (
                  <Text style={{ marginTop: 20, marginRight: 30 }}>
                    <Icon
                      type="AntDesign"
                      name="checkcircleo"
                      style={{ fontSize: 17, color: "#49bd78" }}
                    />
                  </Text>
                )}
                {isSuperAdmin(this.props.data) ||
                  (isAdmin(this.props.data) && (
                    <Text style={{ marginTop: 20, marginRight: 30 }}>
                      <Icon
                        type="FontAwesome5"
                        name="user-cog"
                        style={{ fontSize: 17, color: "#000" }}
                      />
                    </Text>
                  ))}
              </View>
              <Text
                onPress={() =>
                  this.props.showUser(
                    this.props.data,
                    this.props.currentUserIndex
                  )
                }
                style={{ fontSize: 17 }}
              >
                ...
              </Text>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

UserCard.propTypes = {
  data: PropTypes.object,
  showUser: PropTypes.func,
  currentUserIndex: PropTypes.number,
};

export default UserCard;
