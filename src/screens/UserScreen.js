import React, {Component} from "react";
import {View, FlatList, ActivityIndicator, SafeAreaView} from "react-native";
import UserCard from "./UserScreen/UserCard";
import firebase from "react-native-firebase";
import {LIST_ACTION, SHOW_ACTION} from "../Utils/Constants";
import ShowUser from "./UserScreen/ShowUser";

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

        this.loadUsers();
    }

    loadUsers = () => {
        this.setState({loading: true});
        const thisComponent = this;
        const currentUser = firebase.auth().currentUser;
        let query = firebase
            .firestore()
            .collection("users")
            .orderBy('lastname', 'asc')
        ;

        if (thisComponent.state.lastVisible) {
            query = query.startAfter(thisComponent.state.lastVisible);
        }

        query
            .limit(5)
            .get()
            .then(users => {
                if (users.docs.length > 0) {
                    thisComponent.setState({lastVisible: users.docs[users.docs.length - 1]});
                }
                setTimeout(() => {
                    const data = [];
                    users.forEach(function (doc) {
                        if (currentUser.uid !== doc.id) {
                            data.push({...doc.data(), id: doc.id});
                        }
                    });
                    thisComponent.setState({
                        users: thisComponent.state.page === 1 ? data : [...thisComponent.state.users, ...data],
                        loading: false,
                        refreshing: false,
                        handleMore: false
                    });
                }, 500);

            })
            .catch(error => {
                thisComponent.setState({error, loading: false, refreshing: false, handleMore: false});
            });

    };

    handleRefresh = () => {
        if (!this.state.handleMore && !this.state.loading) {
            this.setState(
                {
                    page: 1,
                    refreshing: true,
                    lastVisible: null
                },
                () => {
                    this.loadUsers();
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
                    this.loadUsers();
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
                    marginLeft: "14%"
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
                    data={this.state.users}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                />
            </SafeAreaView>)
            ;
    }
}

export default UserScreen;