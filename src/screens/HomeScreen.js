import React, { Component } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { getDateFromIso, isoDateToFr } from "../Utils/Functions";
import FeedCard from "./HomeScreen/FeedCard";
import { getArticles } from "../store/reducers/articlesRedux";
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getArticles([], 1, true);
  }

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getArticles([], 1, true);
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading &&
      !this.props.lastPage
    ) {
      this.props.getArticles(
        this.props.articles,
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

  isNewArticle = (article) => {
    const articleDate = getDateFromIso(article.publishedAt);
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return articleDate >= now;
  };

  renderItem = (item) => {
    return (
      <FeedCard
        title={item.title}
        date={isoDateToFr(item.publishedAt)}
        description={item.description}
        backgroundColor={this.isNewArticle(item) ? "#ffffff" : "#dadada"}
      />
    );
  };

  render() {
    return (
      <>
        <SafeAreaView
          style={{
            backgroundColor: "#fce3ba",
            opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
          }}
        >
          <FlatList
            data={this.props.articles}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => `${item.id}`}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.handleRefresh}
            refreshing={false}
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
    articles,
    loading,
    refreshing,
    handleMore,
    page,
    lastPage,
  } = state.articleStore;
  return {
    articles,
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
    getArticles: (articles, page, refreshing = false, handleMore = false) =>
      dispatch(getArticles(articles, page, refreshing, handleMore)),
  };
};

HomeScreen.propTypes = {
  page: PropTypes.number,
  articles: PropTypes.array,
  getArticles: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  errorMessage: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
