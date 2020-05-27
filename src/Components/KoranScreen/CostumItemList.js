import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Body, Right, ListItem, Switch, Badge } from "native-base";
import { black, gray, white } from "../../Utils/colors";

const styles = StyleSheet.create({
  blackText: {
    color: black,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  grayText: {
    color: gray,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  badgeText: {
    color: white,
    fontSize: 10,
    fontWeight: "400",
  },
});

export default function CostumItemList(props) {
  const {
    colorText,
    text,
    value,
    onChangeToggle,
    id,
    numberOfReader,
    badge,
  } = props;

  return (
    <ListItem>
      <Body style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={colorText ? styles.blackText : styles.grayText}>
          {text}
        </Text>
        {badge && (
          <Badge
            primary
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <Text style={styles.badgeText}>{numberOfReader}</Text>
          </Badge>
        )}
      </Body>
      <Right>
        <Switch value={value} onValueChange={() => onChangeToggle(id)} />
      </Right>
    </ListItem>
  );
}

CostumItemList.propTypes = {
  colorText: PropTypes.bool,
  text: PropTypes.string,
  value: PropTypes.bool,
  onChangeToggle: PropTypes.func,
  id: PropTypes.number,
  numberOfReader: PropTypes.number,
  badge: PropTypes.bool,
};
