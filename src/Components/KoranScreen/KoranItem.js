import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { gray, black, white } from "../../Utils/colors";

const styles = StyleSheet.create({
  cardConatiner: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    height: 200,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 15,
    fontWeight: "600",
    color: black,
  },
  textInfo: {
    flex: 3,
    justifyContent: "center",
    fontSize: 14,
    fontWeight: "400",
    color: gray,
    paddingLeft: 10,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class KoranItem extends Component {
  render() {
    const { title, numberofPartDispo, navigate, loading } = this.props;

    return (
      <View style={styles.cardConatiner}>
        <TouchableOpacity onPress={navigate} disabled={loading}>
          <View style={styles.card}>
            <View style={{ flex: 2 }}>
              <Image
                source={require("../../../assets/images/Khatma.png")}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "cover",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: loading ? "#f7f7f7" : white,
              }}
            >
              <Text style={styles.textHeader}>{title}</Text>
              <Text style={styles.textInfo}>Votre Khatma est ouverte</Text>
              <Text style={styles.textInfo}>
                {numberofPartDispo} Thikheroubine sont disponibles
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

KoranItem.propTypes = {
  title: PropTypes.string,
  numberofPartDispo: PropTypes.number,
  loading: PropTypes.bool,
  navigate: PropTypes.func,
};

export default KoranItem;
