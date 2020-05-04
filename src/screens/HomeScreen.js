import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import firebase from "react-native-firebase";
import { getFrDate } from "../Utils/Functions";
import FeedCard from "../Components/FeedCard";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      announcements: [],
      page: 1,
      lastVisible: null,
      refreshing: false,
      handleMore: false,
    };
  }

  componentDidMount() {
    this.loadAnnouncements();
  }

  loadAnnouncements = () => {
    this.setState({ loading: true });
    const thisComponent = this;
    let query = firebase
      .firestore()
      .collection("announcements")
      .where("enable", "==", true)
      .orderBy("date", "desc");

    if (thisComponent.state.lastVisible) {
      query = query.startAfter(thisComponent.state.lastVisible);
    }
    query
      .limit(5)
      .get()
      .then((announcements) => {
        if (announcements.docs.length > 0) {
          thisComponent.setState({
            lastVisible: announcements.docs[announcements.docs.length - 1],
          });
        }
        setTimeout(() => {
          const data = [];
          announcements.forEach(function (doc) {
            const row = doc.data();
            row.id = doc.id;
            data.push(row);
          });
          thisComponent.setState({
            announcements:
              thisComponent.state.page === 1
                ? data
                : [...thisComponent.state.announcements, ...data],
            loading: false,
            refreshing: false,
            handleMore: false,
          });
        }, 2000);
      })
      .catch((error) => {
        thisComponent.setState({
          error,
          loading: false,
          refreshing: false,
          handleMore: false,
        });
      });
  };

  handleRefresh = () => {
    if (!this.state.handleMore && !this.state.loading) {
      this.setState(
        {
          page: 1,
          refreshing: true,
          lastVisible: null,
        },
        () => {
          this.loadAnnouncements();
        }
      );
    }
  };

  handleLoadMore = () => {
    if (!this.state.refreshing && !this.state.loading) {
      this.setState(
        {
          page: this.state.page + 1,
          handleMore: true,
        },
        () => {
          this.loadAnnouncements();
        }
      );
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          marginBottom: 100,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  isNewAnnouncement = (announcement) => {
    const now = new Date();
    const today = new Date(
      `${now.getFullYear()}-${`${
        parseInt(now.getMonth().toString()) + 1
      }`.padStart(2, "0")}-${now
        .getDate()
        .toString()
        .padStart(2, "0")}T00:00:00`
    );
    return announcement.date.toDate() >= today;
  };

  renderItem = (item) => {
    return (
      <FeedCard
        title={item.title}
        date={getFrDate(item.date.toDate(), true)}
        text={item.text}
        backgroundColor={this.isNewAnnouncement(item) ? "#ffffff" : "#dadada"}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.announcements}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
        />
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
