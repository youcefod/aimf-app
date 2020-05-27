import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, Alert } from "react-native";
import { DatePicker } from "native-base";
import PropTypes from "prop-types";
import CostumHeader from "../../Components/KoranScreen/CostumHeader";
import { gray3, black, white } from "../../Utils/colors";
import { ayncSaveKhatma } from "../../store/reducers/khatmaRedux";
import { formatDateWithDayAndMonthName } from "../../Utils/Functions";

const styles = StyleSheet.compose({
  container: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: black,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    margin: 10,
  },
});

class AddKhatma extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: 0 };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  addKhatma = () => {
    const { dispatch, navigation } = this.props;
    const { chosenDate } = this.state;
    dispatch(ayncSaveKhatma(chosenDate));
    navigation.navigate("KoranTimeLine");
  };

  alertAddKhetma = (event) => {
    event.preventDefault();
    const { chosenDate } = this.state;
    const date = chosenDate ? formatDateWithDayAndMonthName(chosenDate) : null;

    // eslint-disable-next-line no-unused-expressions
    chosenDate
      ? Alert.alert(
          "Confirmation",
          // body
          `Vous êtes sur le point de créer une Khatma en date du ${date}`,
          [
            {
              text: "Confirmer",
              onPress: () => this.addKhatma(),
            },
            {
              text: "Annuler",
              onPress: () => {},
              style: "cancel",
            },
          ],
          { cancelable: false }
          // clicking out side of alert will not cancel
        )
      : // eslint-disable-next-line no-alert
        Alert.alert("Merci de bien vouloir sélection une date");
  };

  render() {
    const today = new Date();

    return (
      <View style={{ flex: 1, backgroundColor: gray3 }}>
        <CostumHeader
          title="Ajouter une Khatma"
          isHome={false}
          navigation={this.props.navigation}
          validate={this.alertAddKhetma}
        />
        <View style={styles.container}>
          <Text style={styles.title}>
            Sélectionner la data de la prochiane Khatma
          </Text>
          <DatePicker
            defaultDate={today}
            minimumDate={today}
            locale="fr"
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType="fade"
            androidMode="spinner"
            placeHolderText="Sélectionner une date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
          />
        </View>
      </View>
    );
  }
}

AddKhatma.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(AddKhatma);
