import React, {Component} from "react";
import {View, FlatList, ActivityIndicator, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import BookCard from "./LibraryScreen/BookCard";
import {BOOK_GENRES, LIST_ACTION, SHOW_ACTION} from "../Utils/Constants";
import ShowBook from "./LibraryScreen/ShowBook";
import {getBooks} from "../store/reducers/bookRedux";
import {dispatchErrorMessage} from "../store/reducers/errorMessageRedux";
import {Icon, Input, Item} from "native-base";

import FilterList from "./LibraryScreen/FilterList";
import ErrorModal from "../Components/ErrorModal";

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
            filterValue: null,
            modalVisible: false,
            errorMessage: '',
            lanceSearch: false,
        };
    }

    componentDidMount() {
        this.props.getBooks([], 1);
    }

    componentDidUpdate() {
        if (this.state.lanceSearch) {
            this.handleRefresh();
            this.setState({lanceSearch: false});
        }
    }

    handleRefresh = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading) {
            this.props.getBooks([], 1, this.state.searchValue, this.state.filterValue, true);
        }
    };

    handleLoadMore = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading) {
            this.props.getBooks(this.props.books, this.props.page + 1, this.state.searchValue, this.state.filterValue, false, true);
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
        return this.props.loading && this.props.books && this.props.books > 5 && (
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

        return null;
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
    };

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
        if (!this.state.searchValue || this.state.searchValue.length > 2) {
            this.handleRefresh();
        } else {
            this.props.dispatchErrorMessage('Le mot recherché doit avoir au minimum 3 caractères');
        }
    };

    updaterFilterValue = filterValue => {
        this.setState({filterValue, lanceSearch: true});
    };

    getFilterLabel = () => {
        if (!this.state.filterValue) {
            return 'Sélectionner un genre...';
        }
        const bookGenre = BOOK_GENRES.find(element => element.id === this.state.filterValue);
        if (bookGenre) {
            return bookGenre.label;
        }
        return '';
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
                        placeholder="Rechercher un livre"
                        value={this.state.searchValue}
                    />
                </Item>
                <View style={{flexDirection: "row-reverse"}}>
                    <FilterList selectedValue={this.getFilterLabel()} updateValue={this.updaterFilterValue}/>
                </View>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={this.props.books}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => '' + item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.props.refreshing !== undefined ? this.props.refreshing : false}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                />

                {this.props.errorMessage && <ErrorModal visible={true}
                                                        setVisible={this.setModalVisible.bind(this)}
                                                        message={this.props.errorMessage}/>}

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

    const {
        errorMessage,
    } = state.errorMessageStore;
    return {
        books,
        loading,
        refreshing,
        handleMore,
        page,
        errorMessage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooks: (books, page, searchValue = '', genre = null, refreshing = false, handleMore = false) => dispatch(getBooks(books, page, searchValue, genre, refreshing, handleMore)),
        dispatchErrorMessage: (errorMessage) => dispatch(dispatchErrorMessage(errorMessage)),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(LibraryScreen);
