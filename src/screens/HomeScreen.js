import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import {getFrDate} from "../Utils/Functions";
import FeedCard from "../Components/FeedCard";
import firebase from "react-native-firebase";

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            annonces: [],
            page: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.loadAnnonces();
    }

    loadAnnonces = () => {
        this.setState({ loading: true });
        const that = this;
        firebase
            .firestore()
            .collection("annonces")
            // .where('enable', '==', true)
            .orderBy('date', 'desc')
            .limit(5)
            .get()
            .then(annonces => {

                setTimeout(() => {
                    const data = [];
                    annonces.forEach(function (doc) {
                        const row = doc.data();
                        row.id = doc.id;
                        data.push(row) ;
                    });
                that.setState({
                    annonces: that.state.page === 1 ? data : [...that.state.annonces, ...data],
                    loading: false,
                    refrloadAnnonceseshing: false});
                            }, 2000);

            });

    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true
            },
            () => {
                this.loadAnnonces();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.loadAnnonces();
            }
        );
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

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
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
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    isNewAnnonce =(annonce) => {
        const now = new Date();
        const today = new Date(now.getFullYear() + '-' +  ((parseInt(now.getMonth().toString()) + 1) + '') .padStart(2, "0") + '-' +  now.getDate().toString().padStart(2, "0") + 'T00:00:00');
        return annonce.date.toDate() >= today;
    }
    renderItem = item => {
        return (
            <FeedCard
                title={item.title}
                date={getFrDate(item.date.toDate())}
                text={item.text}
                backgroundColor={this.isNewAnnonce(item) ? "#ffffff" : "#b3b3b3"}
                dateColor={this.isNewAnnonce(item) ? "#000000" : "#ffffff"}
            />
        );
    }
    render() {
        return (
            <SafeAreaView >
                <FlatList
                    data={this.state.annonces}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
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