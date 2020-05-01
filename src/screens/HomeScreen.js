import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { getFrDate } from "../Utils/Functions";
import FeedCard from "./HomeScreen/FeedCard";
import { getAnnouncements } from "../store/reducers/announcementsRedux";
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getAnnouncements([], 1, true);
  }

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getAnnouncements([], 1, true);
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading &&
      !this.props.lastPage
    ) {
      this.props.getAnnouncements(
        this.props.announcements,
        this.props.page + 1,
        false,
        true
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
    if (!this.props.loading) return null;
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
    let now = new Date();
    const announcementDate = new Date(announcement.date);
    now = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    );
    return announcementDate >= now;
  };

  renderItem = (item) => {
    return (
      <FeedCard
        title={item.title}
        date={getFrDate(new Date(item.date), true)}
        text={item.text}
        backgroundColor={this.isNewAnnouncement(item) ? "#ffffff" : "#dadada"}
      />
    );
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <FlatList
            data={this.props.announcements}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={
              this.props.refreshing !== undefined
                ? this.props.refreshing
                : false
            }
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </SafeAreaView>
        <Loader visible={!!this.props.loading} />
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const {
    announcements,
    loading,
    refreshing,
    handleMore,
    page,
    lastPage,
  } = state.announcementStore;
  return {
    announcements,
    loading,
    refreshing,
    handleMore,
    page,
    errorMessage,
    lastPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnnouncements: (
      announcements,
      page,
      refreshing = false,
      handleMore = false
    ) =>
      dispatch(getAnnouncements(announcements, page, refreshing, handleMore)),
  };
};

HomeScreen.propTypes = {
  page: PropTypes.number,
  announcements: PropTypes.array,
  getAnnouncements: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  errorMessage: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
