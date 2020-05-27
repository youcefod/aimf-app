/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "native-base";
import CostumHeader from "../../Components/KoranScreen/CostumHeader";
import CostumItemList from "../../Components/KoranScreen/CostumItemList";
import TextButton from "../../Components/KoranScreen/TextButton";
import {
  saveUserPicksReads,
  saveUserReads,
  updateKhatma,
} from "../../store/reducers/khatmaRedux";
import { formatDateWithDayAndMonthName } from "../../Utils/Functions";
import { gray3, black } from "../../Utils/colors";
import { isAdmin } from "../../Utils/Account";

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: black,
  },
  textDetails: {
    fontSize: 16,
    fontWeight: "300",
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});

class Khatma extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleUserToReadList: [],
      toggleUserReadList: [],
    };
  }

  componentDidMount = () => {
    const { userReadList, userToReadList, isOpen } = this.props;

    this.setState({
      toggleUserToReadList: userToReadList,
      toggleUserReadList: userReadList,
      isOpen,
    });
  };

  onChangeOpenKhetma = () => {
    const { khatma, dispatch } = this.props;
    const newState = !this.state.isOpen;

    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    dispatch(updateKhatma(khatma.id, newState));
  };

  onChangeToggleToRead = (id) => {
    const { toggleUserToReadList } = this.state;
    const { userToReadList, koranStore } = this.props;
    const include = Object.values(toggleUserToReadList).includes(id);
    const includeInToRead = Object.values(userToReadList).includes(id);
    const koranListe = koranStore.koranListe.data;

    if (includeInToRead) {
      Alert.alert(
        "Opération non permise",
        `Vous avez déjà validé la selection de  ${koranListe[id - 1].name}.
            Vous ne pouvez pas annuler une selection déjâ validée`
      );
    } else {
      // eslint-disable-next-line no-unused-expressions
      include
        ? this.setState((prevState) => ({
            toggleUserToReadList: prevState.toggleUserToReadList.filter(
              (item) => item !== id
            ),
          }))
        : this.setState((prevState) => ({
            toggleUserToReadList: [...prevState.toggleUserToReadList, id],
          }));
    }
  };

  onChangeToggleRead = (id) => {
    const { toggleUserReadList } = this.state;
    const { userReadList, koranStore } = this.props;
    const include = Object.values(toggleUserReadList).includes(id);
    const includeInRead = Object.values(userReadList).includes(id);
    const koranListe = koranStore.koranListe.data;

    if (includeInRead) {
      Alert.alert(
        "Opération non permise",
        `Vous avez déjà validé la lecture de  ${koranListe[id - 1].name}.
            Vous ne pouvez pas annuler une lecture déjâ validée`
      );
    } else {
      // eslint-disable-next-line no-unused-expressions
      include
        ? this.setState((prevState) => ({
            toggleUserReadList: prevState.toggleUserReadList.filter(
              (item) => item !== id
            ),
          }))
        : this.setState((prevState) => ({
            toggleUserReadList: [...prevState.toggleUserReadList, id],
          }));
    }
  };

  dispatchAndNavigate = () => {
    const { dispatch, khatma, navigation } = this.props;
    const { toggleUserToReadList, toggleUserReadList, isOpen } = this.state;
    if (isOpen) {
      dispatch(
        saveUserPicksReads(khatma.id, toggleUserToReadList, toggleUserReadList)
      );
    } else {
      dispatch(saveUserReads(khatma.id, toggleUserReadList));
    }
    navigation.navigate("KoranTimeLine");
  };

  validateUserChoise = (event) => {
    event.preventDefault();

    const { toggleUserToReadList, toggleUserReadList } = this.state;

    if (toggleUserToReadList.length || toggleUserReadList.length) {
      Alert.alert(
        "Confirmation",
        // body
        "Vous êtes sur le point de valider votre selection",
        [
          {
            text: "Confirmer",
            onPress: () => this.dispatchAndNavigate(),
          },
          {
            text: "Annuler",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
        // clicking out side of alert will not cancel
      );
    } else {
      Alert.alert(
        "Aucune selection",
        "Merci de bien vouloir sélectioner une Takheroubt à lire"
      );
    }
  };

  render() {
    const { toggleUserToReadList, toggleUserReadList, isOpen } = this.state;
    const { koranStore, khatma, userToReadList, account } = this.props;
    const numberOfToRead = userToReadList.length;
    const koranListe = koranStore.koranListe.data;

    if (koranStore.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: gray3 }}>
        <Container>
          <CostumHeader
            title="Khatmat"
            subtile={formatDateWithDayAndMonthName(khatma.beginAt)}
            isHome={false}
            navigation={this.props.navigation}
            validate={this.validateUserChoise}
          />
          <ScrollView scrollEventThrottle={16}>
            {isAdmin(account.user) &&
              (isOpen ? (
                <TextButton
                  style={{ marginTop: 10 }}
                  onPress={this.onChangeOpenKhetma}
                >
                  Fermer Khetma
                </TextButton>
              ) : (
                <TextButton
                  style={{ marginTop: 10 }}
                  onPress={this.onChangeOpenKhetma}
                >
                  Ouvrir Khetma
                </TextButton>
              ))}

            {numberOfToRead > 0 && (
              <View>
                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                  <Text style={styles.textHeader}>
                    Valider la lecture de vos Tekheroubines
                  </Text>
                  <Text style={styles.textDetails}>
                    Vous avez choisi dans cette Khatma {numberOfToRead}{" "}
                    {numberOfToRead === 1 ? "Takheroubt" : " Tikheroubine"}.
                    Merci de confirmer vos lectures.
                  </Text>
                </View>

                <View>
                  {userToReadList.map((id) => {
                    const alreadyReadByAuthedUser = Object.values(
                      toggleUserReadList
                    ).includes(id);
                    const numberOfReader = 0;
                    return (
                      <CostumItemList
                        key={koranListe[id - 1].id}
                        text={koranListe[id - 1].name}
                        colorText={!!alreadyReadByAuthedUser}
                        value={alreadyReadByAuthedUser}
                        id={koranListe[id - 1].id}
                        numberOfReader={numberOfReader}
                        onChangeToggle={this.onChangeToggleRead}
                        badge={false}
                      />
                    );
                  })}
                </View>
              </View>
            )}

            {isOpen && (
              <View>
                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                  <Text style={styles.textHeader}>
                    Choisir une ou plusieurs Tekheroubine
                  </Text>
                  {!numberOfToRead && (
                    <View>
                      <Text style={styles.textDetails}>
                        Vous n'avez encore choisi aucune Takheroubt dans cette
                        Khatma.
                      </Text>
                      <Text style={styles.textDetails}>
                        Privilégier une Takheroubte qui a un compteur à Zéro.
                        Celles qui ont un compteur différent de Zéro ont déjà
                        été choisies par d'autres personnes.
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  {Object.keys(koranListe).map((index) => {
                    const alreadyPickedByAuthedUser = Object.values(
                      toggleUserToReadList
                    ).includes(koranListe[index].id);
                    const numberOfReader =
                      khatma.takharoubts[index].pickedTimes;
                    return (
                      <CostumItemList
                        key={koranListe[index].id}
                        text={koranListe[index].name}
                        colorText={
                          !!(numberOfReader || alreadyPickedByAuthedUser)
                        }
                        value={alreadyPickedByAuthedUser}
                        numberOfReader={numberOfReader}
                        id={koranListe[index].id}
                        onChangeToggle={this.onChangeToggleToRead}
                        badge
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { khatmaIdParam } = navigation.state.params;
  const currentKhatma = Object.values(state.khatmaStore.khatma).filter(
    (khatma) => {
      return khatma.id === khatmaIdParam;
    }
  );
  const currentUserKhatma = Object.values(state.khatmaStore.userKhatma).filter(
    (userKhatma) => {
      return userKhatma.id === khatmaIdParam;
    }
  );
  const userToReadList = currentUserKhatma.length
    ? Object.values(currentUserKhatma[0].userTakharoubts).map(
        (userTakharoubts) => {
          return userTakharoubts.takharoubt;
        }
      )
    : [];
  const read = currentUserKhatma.length
    ? Object.values(currentUserKhatma[0].userTakharoubts).filter(
        (userTakharoubts) => {
          return userTakharoubts.isRead;
        }
      )
    : [];

  const userReadList = read.length
    ? Object.values(read).map((userTakharoubts) => {
        return userTakharoubts.takharoubt;
      })
    : [];

  return {
    koranStore: state.koranStore,
    khatma: currentKhatma[0],
    isOpen: currentKhatma[0].isOpen,
    userReadList,
    userToReadList,
    account: state.accountStore,
  };
};

Khatma.propTypes = {
  koranStore: PropTypes.object,
  khatma: PropTypes.object,
  isOpen: PropTypes.bool,
  userReadList: PropTypes.array,
  userToReadList: PropTypes.array,
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  account: PropTypes.object,
};

export default connect(mapStateToProps)(Khatma);
