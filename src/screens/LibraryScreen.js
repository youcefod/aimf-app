import React, { Component } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Icon, Input, Item } from "native-base";
import * as PropTypes from "prop-types";
import BookCard from "./LibraryScreen/BookCard";
import { BOOK_GENRES, LIST_ACTION, SHOW_ACTION } from "../Utils/Constants";
import ShowBook from "./LibraryScreen/ShowBook";
import { getBooks } from "../store/reducers/bookRedux";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";

import FilterList from "./LibraryScreen/FilterList";
import ErrorModal from "../Components/ErrorModal";
import Loader from "../Components/Loader";

class LibraryScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      opacity: 1,
      action: LIST_ACTION,
      bookData: [],
      searchValue: "",
      filterValue: null,
      lanceSearch: false,
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  componentDidUpdate() {
    if (this.state.lanceSearch) {
      this.handleRefresh();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ lanceSearch: false });
    }
  }

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getBooks(
        [],
        1,
        this.state.searchValue,
        this.state.filterValue,
        true
      );
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading &&
      !this.props.lastPage
    ) {
      this.props.getBooks(
        this.props.books,
        this.props.page + 1,
        this.state.searchValue,
        this.state.filterValue,
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

  showBook = (data) => {
    this.setState({ bookData: data, action: SHOW_ACTION });
  };

  updateCard = (data) => {
    let { books } = this.state;
    books = books.map((book) => {
      if (book.id === data.id) {
        return data;
      }
      return book;
    });

    this.setState({ books });
  };

  renderItem = (item) => {
    return (
      <BookCard
        data={item}
        showBook={(data) => this.showBook(data)}
        backgroundColor="#ffffff"
      />
    );
  };

  search = () => {
    if (!this.state.searchValue || this.state.searchValue.length > 2) {
      this.handleRefresh();
    } else {
      this.props.dispatchErrorMessage(
        "Le mot recherché doit avoir au minimum 3 caractères"
      );
    }
  };

  updaterFilterValue = (filterValue) => {
    this.setState({ filterValue, lanceSearch: true });
  };

  getFilterLabel = () => {
    if (!this.state.filterValue) {
      return "Sélectionner un genre...";
    }
    const bookGenre = BOOK_GENRES.find(
      (element) => element.id === this.state.filterValue
    );
    if (bookGenre) {
      return bookGenre.label;
    }
    return "";
  };

  render() {
    return (
      <>
        {this.state.action === SHOW_ACTION ? (
          <ShowBook
            data={this.state.bookData}
            updateCard={(data) => this.updateCard(data)}
            updateState={(state) => this.setState(state)}
          />
        ) : (
          <SafeAreaView style={{ marginTop: 0, opacity: this.state.opacity }}>
            <Item
              rounded
              style={{
                margin: 10,
                marginLeft: 15,
                paddingHorizontal: 10,
                paddingLeft: 5,
                borderRadius: 5,
                height: 40,
                backgroundColor: "#FFF",
                fontSize: 12,
              }}
            >
              <Icon type="AntDesign" name="search1" />
              <Input
                onChangeText={(value) => this.setState({ searchValue: value })}
                onBlur={this.search}
                style={{
                  fontSize: 15,
                  paddingLeft: 10,
                }}
                keyboardType="default"
                placeholder="Rechercher un livre"
                value={this.state.searchValue}
              />
            </Item>
            <View style={{ flexDirection: "row-reverse" }}>
              <FilterList
                selectedValue={this.getFilterLabel()}
                updateValue={this.updaterFilterValue}
              />
            </View>
            <FlatList
              ListHeaderComponent={this.renderHeader}
              data={this.props.books}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item) => `${item.id}`}
              ItemSeparatorComponent={this.renderSeparator}
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
        )}
        <Loader visible={!!this.props.loading} />
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    books,
    loading,
    refreshing,
    handleMore,
    page,
    lastPage,
  } = state.bookStore;

  const { errorMessage } = state.errorMessageStore;
  return {
    books,
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
    getBooks: (
      books,
      page,
      searchValue = "",
      genre = null,
      refreshing = false,
      handleMore = false
    ) =>
      dispatch(
        getBooks(books, page, searchValue, genre, refreshing, handleMore)
      ),
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
  };
};

LibraryScreen.propTypes = {
  books: PropTypes.array,
  page: PropTypes.number,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  getBooks: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
