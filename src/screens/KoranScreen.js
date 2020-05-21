/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Container, Fab, Icon } from "native-base";
import PropTypes from "prop-types";
import CostumHeader from "../Components/KoranScreen/CostumHeader";
import { getFormatedDate } from "../Utils/Functions";
import KoranItem from "../Components/KoranScreen/KoranItem";
import {
  ayncReceiveKhatma,
  asyncReceiveUserKhatma,
} from "../store/reducers/khatmaRedux";
import { receiveKoran } from "../store/reducers/koranRedux";
import { gray3, black, gray, orange2 } from "../Utils/colors";
import HistoryItem from "../Components/KoranScreen/HistoryItem";
import { isAdmin } from "../Utils/Account";

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: black,
  },
  textDetails: {
    fontSize: 15,
    fontWeight: "400",
    color: gray,
  },
});

class KoranScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(ayncReceiveKhatma());
    dispatch(asyncReceiveUserKhatma());
    dispatch(receiveKoran());
  };

  renderKoranItem = ({ item }) => {
    const { navigation, loading } = this.props;
    const date = getFormatedDate(item.beginAt);
    let numberofPartDispo = 0;

    // eslint-disable-next-line array-callback-return
    Object.values(item.takharoubts).map((takharoubt) => {
      if (takharoubt.pickedTimes === 0) numberofPartDispo += 1;
    });

    return (
      <KoranItem
        key={item.id.toString()}
        title={date}
        numberofPartDispo={numberofPartDispo}
        loading={loading}
        navigate={() =>
          navigation.navigate("Khatma", { khatmaIdParam: item.id })
        }
      />
    );
  };

  renderHistoryItem = ({ item }) => {
    const { navigation, loading } = this.props;
    const date = getFormatedDate(item.beginAt);
    const numberOfPicks = item.userTakharoubts.length;
    let numberOfRead = 0;

    Object.values(item.userTakharoubts).map((takharoubt) => {
      if (takharoubt.isRead) numberOfRead += 1;
    });

    return (
      <HistoryItem
        key={item.id.toString()}
        title={date}
        numberOfPicks={numberOfPicks}
        numberOfRead={numberOfRead}
        loading={loading}
        navigate={() =>
          navigation.navigate("Khatma", { khatmaIdParam: item.id })
        }
      />
    );
  };

  render() {
    const {
      khatmaHistory,
      openKhatma,
      loading,
      account,
      dispatch,
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: loading ? "#f7f7f7" : gray3 }}>
        <NavigationEvents
          onDidFocus={() => {
            dispatch(ayncReceiveKhatma());
            dispatch(asyncReceiveUserKhatma());
          }}
        />
        <Container>
          <CostumHeader title="Mon Espace Khatma" isHome />
          <ScrollView scrollEventThrottle={16}>
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
              <Text style={styles.textHeader}>Mes Prochaines Khatma</Text>
            </View>
            {loading && (
              <View style={{ flex: 1, justifyContent: "center", marginTop: 5 }}>
                <ActivityIndicator animating size="small" />
              </View>
            )}
            <View style={{ flex: 1 }}>
              {openKhatma.length === 0 && (
                <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
                  <Text style={styles.textDetails}>
                    Aucune Khatma n'est ouverte à ce jour.
                  </Text>
                </View>
              )}

              <FlatList
                data={Object.values(openKhatma).sort((a, b) => b.id - a.id)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderKoranItem}
              />
            </View>
            <View
              style={{ marginTop: 20, marginBottom: 10, paddingHorizontal: 15 }}
            >
              <Text style={styles.textHeader}>Mon Historique</Text>
            </View>
            <View style={{ flex: 1 }} accessible={!loading}>
              {khatmaHistory.length === 0 && (
                <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
                  <Text style={styles.textDetails}>
                    Vous n'avez à ce jour partcipé à aucune Khatma
                  </Text>
                </View>
              )}
              <FlatList
                data={Object.values(khatmaHistory).sort((a, b) => b.id - a.id)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderHistoryItem}
              />
            </View>
          </ScrollView>
          {isAdmin(account.user) && (
            <View>
              <Fab
                active={this.state.active}
                style={{ backgroundColor: orange2 }}
                position="bottomRight"
                direction="up"
                onPress={() => this.props.navigation.navigate("AddKhatma")}
              >
                <Icon name="add" />
              </Fab>
            </View>
          )}
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const openKhatma = Object.values(state.khatmaStore.khatma).filter(
    (khatma) => {
      return khatma.isOpen;
    }
  );

  const khatmaHistory = Object.values(state.khatmaStore.userKhatma).filter(
    (khatma) => {
      return !khatma.isOpen && khatma.userTakharoubts.length > 0;
    }
  );

  return {
    khatmaHistory,
    openKhatma,
    loading: state.khatmaStore.loading,
    account: state.accountStore,
  };
}

KoranScreen.propTypes = {
  khatmaHistory: PropTypes.array,
  openKhatma: PropTypes.array,
  loading: PropTypes.bool,
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  account: PropTypes.object,
};

export default connect(mapStateToProps)(KoranScreen);
