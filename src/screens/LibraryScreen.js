import React, {Component} from "react";
import {View, FlatList, ActivityIndicator, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import BookCard from "./LibraryScreen/BookCard";
import {LIST_ACTION, SHOW_ACTION} from "../Utils/Constants";
import ShowBook from "./LibraryScreen/ShowBook";
import {getBooks} from "../store/reducers/bookRedux";
import {Icon, Input, Item} from "native-base";

class LibraryScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            opacity: 1,
            action: LIST_ACTION,
            bookData: [],
            searchValue: '',
        };
    }

    componentDidMount() {
        this.props.getBooks([], 1);
    }

    handleRefresh = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading) {
            this.props.getBooks([], 1, this.state.searchValue, true);
        }
    };

    handleLoadMore = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading) {
            this.props.getBooks(this.props.books, this.props.page + 1, this.state.searchValue, false, true);
        }
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderFooter = () => {
        if (!this.props.loading || this.props.books.length < 5) return null;
        return (
            <View
                style={{
                    marginBottom: 100,
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    showBook = data => {
        this.setState({bookData: data, action: SHOW_ACTION});
    }

    updateCard = data => {
        const books = this.state.books.map(book => {
            if (book.id == data.id) {
                return data;
            }
            return book;
        });

        this.setState({books: books});
    }
    renderItem = item => {
        return (
            <BookCard
                data={item}
                showBook={this.showBook.bind(this)}
                backgroundColor="#ffffff"
            />
        );
    };

    search = () => {
        this.handleRefresh();
    };

    render() {
        return this.state.action === SHOW_ACTION ?
            (<ShowBook data={this.state.bookData} updateCard={this.updateCard.bind(this)}
                       updateState={this.setState.bind(this)}/>) :
            (<SafeAreaView style={{opacity: this.state.opacity}}>
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
                    <Icon
                        type="AntDesign"
                        name="search1"
                    />
                    <Input
                        onChangeText={value => this.setState({searchValue: value})}
                        onBlur={this.search}
                        style={{
                            fontSize: 15,
                            paddingLeft: 10
                        }}
                        keyboardType='default'
                        placeholder="Rechercher"
                        value={this.state.searchValue}
                    />
                </Item>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={this.props.books}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.props.refreshing !== undefined ? this.props.refreshing : false}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                />
            </SafeAreaView>)
            ;
    }
}

const mapStateToProps = state => {
    const {
        books,
        loading,
        refreshing,
        handleMore,
        page,
    } = state.bookStore;
    return {
        books,
        loading,
        refreshing,
        handleMore,
        page,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooks: (books, page, searchValue, refreshing = false, handleMore = false) => dispatch(getBooks(books, page, searchValue, refreshing, handleMore)),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(LibraryScreen);
