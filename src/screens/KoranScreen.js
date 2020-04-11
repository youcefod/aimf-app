import React, { Component } from "react";
import { connect } from "react-redux"
import { View, FlatList, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Container, Fab, Icon } from 'native-base'
import CostumHeader from '../Components/KoranScreen/CostumHeader'
import { getFormatedDate } from "../Utils/Functions"
import KoranItem from "../Components/KoranScreen/KoranItem"
import { ayncReceiveKhatma } from "../store/reducers/khatmaRedux"
import { gray3, black, white, gray } from "../Utils/colors";
import HistoryItem from "../Components/KoranScreen/HistoryItem";

class KoranScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = { active: false };
    }

    componentDidMount = () => {
        const { dispatch } = this.props
        dispatch(ayncReceiveKhatma())
    }

    renderKoranItem = ({ item }) => {

        const { navigation, authedUser } = this.props
        const date = getFormatedDate(item.date)
        const users = item.users ? item.users : null
        const currentUser = users ? users[authedUser] : null
        const numberOfPicked = currentUser ? Object.keys(currentUser.toRead).length : 0
        const numberOfRead = currentUser ? Object.keys(currentUser.read).length : 0
        let numberofPartDispo = 0

        Object.values(item.koranPart).map( (part) => {
            if (part.pickedBy.length === 0) {
                numberofPartDispo = numberofPartDispo + 1
            } 
        })


        return (
            <KoranItem
                key={item.id}
                title={date}
                numberOfPicked={numberOfPicked}
                numberOfRead={numberOfRead}
                numberofPartDispo={numberofPartDispo}
                navigate={() => navigation.navigate("Khatma", { dateParams: item.date })}
            />
        )
    }

    renderHistoryItem = ({ item }) => {

        const { navigation, authedUser } = this.props
        const date = getFormatedDate(item.date)
        const users = item.users ? item.users : null
        const currentUser = users ? users[authedUser] : null
        const numberOfPicked = currentUser ? Object.keys(currentUser.toRead).length : 0
        const numberOfRead = currentUser ? Object.keys(currentUser.read).length : 0


        return (
            <HistoryItem
                key={item.id}
                title={date}
                numberOfPicks={numberOfPicked}
                numberOfRead={numberOfRead}
                navigate={() => navigation.navigate("Khatma", { dateParams: item.date })}
            />
        )
    }

    render() {

        const { khatmaHistory, openKhatma, isLoading } = this.props

        if (isLoading) {

            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator animating size="large" />
                </View>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: gray3  }}>
                <Container>
                    <CostumHeader
                        title="Mon Espace Khatma"
                        isHome={true}
                    />
                    <ScrollView scrollEventThrottle={16} >
                        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                            <Text style={styles.textHeader}>
                                Mes Prochaines Khatma
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                (openKhatma.length === 0) &&
                                <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
                                    <Text style={styles.textDetails}>
                                         Aucune Khatma n'est ouverte à ce jour.
                                    </Text>
                                </View>
                            }
                                

                            <FlatList
                                data={Object.values(openKhatma)
                                    .sort((a, b) => b.date - a.date)}

                                keyExtractor={item => item.id}
                                renderItem={this.renderKoranItem}
                            />
                        </View>
                        <View style={{ marginTop: 20,  marginBottom: 10, paddingHorizontal: 15 }}>
                            <Text style={styles.textHeader}>
                                Mon Historique
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={Object.values(khatmaHistory)
                                    .sort((a, b) => b.date - a.date)}

                                keyExtractor={item => item.id}
                                renderItem={this.renderHistoryItem}
                            />
                        </View>
                    </ScrollView>
                    <View>

                        <Fab
                            active={this.state.active}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            direction="up"
                            onPress={() => this.props.navigation.navigate('AddKhatma')}>
                            <Icon name="add" />
                        </Fab>
                    </View>


                </Container>

            </SafeAreaView>

        )
    }
}

function mapStateToProps(state) {

    console.log('Je suis dans mapStateToProps de KoranScreen')
    console.log(state)

    const authedUser = "0ZAij3Nvipha3YYW9KZetBwSNx22"

    const openKhatma = Object.values(state.khatmaStore.khatma).filter(function (khatma) {
        return khatma.isOpen == true
    })

    const khatmaHistory = Object.values(state.khatmaStore.khatma).filter(function (khatma) {
        return (!khatma.isOpen) && !(khatma.users[authedUser]  === undefined )
    })

    return {
        authedUser,
        khatmaHistory,
        openKhatma,
        isLoading: state.khatmaStore.isLoading ? state.khatmaStore.isLoading : false,
    }
}

export default connect(mapStateToProps)(KoranScreen);

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 24,
        fontWeight: '700',
        color: black
    },
    textDetails: {
        fontSize: 15,
        fontWeight: '400',
        color: gray
    },
})
