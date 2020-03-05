import React, {Component} from "react";
import {View, FlatList, ActivityIndicator, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import UserCard from "./UserScreen/UserCard";
import {LIST_ACTION, SHOW_ACTION} from "../Utils/Constants";
import ShowUser from "./UserScreen/ShowUser";
import {getUsers} from "../store/reducers/userRedux";

class UserScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: [],
            page: 1,
            lastVisible: null,
            refreshing: false,
            opacity: 1,
            action: LIST_ACTION,
            userData: [],
            handleMore: false,
        };
    }

    componentDidMount() {
        this.props.getUsers([], 1);
    }

    handleRefresh = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading) {
            this.props.getUsers([], 1, true);
        }
    };

    handleLoadMore = () => {
        if (!this.props.refreshing && !this.props.handleMore && !this.props.loading)  {
            this.props.getUsers(this.props.users, this.props.page + 1, false, true);
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
        if (!this.props.loading) return null;
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

    showUser = data => {
        this.setState({userData: data, action: SHOW_ACTION});
    }

    updateCard = data => {
        const users = this.state.users.map(user => {
            if (user.id == data.id) {
                return data;
            }
            return user;
        });

        this.setState({users: users});
    }
    renderItem = item => {
        return (
            <UserCard
                data={item}
                showUser={this.showUser.bind(this)}
                backgroundColor="#ffffff"
            />
        );
    }

    render() {
        return this.state.action === SHOW_ACTION ?
            (<ShowUser data={this.state.userData} updateCard={this.updateCard.bind(this)}
                       updateState={this.setState.bind(this)}/>) :
            (<SafeAreaView style={{opacity: this.state.opacity}}>
                <FlatList
                    data={this.props.users}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.props.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                />
            </SafeAreaView>)
            ;
    }
}

const mapStateToProps = state => {
    const {
        users,
        loading,
        refreshing,
        handleMore,
        page,
    } = state.userStore;
    return {
        users,
        loading,
        refreshing,
        handleMore,
        page,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (users, page, refreshing = false, handleMore = false) => dispatch(getUsers(users, page, refreshing, handleMore)),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(UserScreen);
