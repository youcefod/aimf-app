import React, { Component } from "react"
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native"
import { connect } from "react-redux"
import { Container, Content } from 'native-base';
import CostumHeader from "../../Components/KoranScreen/CostumHeader"
import CostumItemList from "../../Components/KoranScreen/CostumItemList"
import TextButton from "../../Components/KoranScreen/TextButton"
import { saveUserPicks, saveUserReads, saveKhatmaStatus } from '../../store/reducers/khatmaRedux'
import { getFormatedDate } from "../../Utils/Functions"
import { gray3, black } from "../../Utils/colors"

class Khatma extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dateParams: this.props.navigation.state.params.dateParams,
            toggleUserToReadList: [],
            toggleUserReadList: []
        };
    }

    componentDidMount = () => {

        const { userReadList, userToReadList, isOpen } = this.props

        this.setState({
            toggleUserToReadList: userToReadList,
            toggleUserReadList: userReadList,
            isOpen: isOpen
        })

    }

    onChangeOpenKhetma = () => {

        const { khatma, dispatch } = this.props
        const newState = !this.state.isOpen

        this.setState({ isOpen: newState })
        dispatch(saveKhatmaStatus(khatma[0].id, newState))
    }

    onChangeToggleToRead = (id) => {

        const { toggleUserToReadList } = this.state
        const { userToReadList, koranList } = this.props
        const include = Object.values(toggleUserToReadList).includes(id)
        const includeInToRead = Object.values(userToReadList).includes(id)

        if (includeInToRead) {
            Alert.alert("Opération non permise",
                `Vous avez déjà validé la selection de  ${koranList[id].value}.
            Vous ne pouvez pas annuler une selection déjâ validée`)
        }
        else {
            include
                ? this.setState(prevState => ({ toggleUserToReadList: prevState.toggleUserToReadList.filter(item => item !== id) }))
                : this.setState(prevState => ({ toggleUserToReadList: [...prevState.toggleUserToReadList, id], }))
        }


    }

    onChangeToggleRead = (id) => {

        const { toggleUserReadList } = this.state
        const { userReadList, koranList } = this.props
        const include = Object.values(toggleUserReadList).includes(id)
        const includeInRead = Object.values(userReadList).includes(id)


        if (includeInRead) {
            Alert.alert("Opération non permise",
                `Vous avez déjà validé la lecture de  ${koranList[id].value}.
            Vous ne pouvez pas annuler une lecture déjâ validée`)

        }
        else {
            include
                ? this.setState(prevState => ({ toggleUserReadList: prevState.toggleUserReadList.filter(item => item !== id) }))
                : this.setState(prevState => ({ toggleUserReadList: [...prevState.toggleUserReadList, id], }))

        }

    }

    dispatchAndNavigate = () => {

        const { dispatch, authedUser, khatma, navigation } = this.props
        const { toggleUserToReadList, toggleUserReadList } = this.state
        dispatch(saveUserPicks(authedUser, khatma[0].id, toggleUserToReadList))
        dispatch(saveUserReads(authedUser, khatma[0].id, toggleUserReadList))
        navigation.navigate('KoranTimeLine')

    }


    validateUserChoise = (event) => {
        event.preventDefault()

        const { toggleUserToReadList, toggleUserReadList } = this.state

        if (toggleUserToReadList.length || toggleUserReadList.length) {
            Alert.alert(
                'Confirmation',
                //body
                'Vous êtes sur le point de valider votre selection',
                [
                    {
                        text: 'Confirmer',
                        onPress: () => this.dispatchAndNavigate()
                    },
                    {
                        text: 'Annuler',
                        onPress: () => { },
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
                //clicking out side of alert will not cancel
            )

        }
        else {
            Alert.alert("Aucune selection", 'Merci de bien vouloir sélectioner une Takheroubt à lire')
        }

    }


    render() {

        const { dateParams, toggleUserToReadList, toggleUserReadList, isOpen } = this.state
        const date = getFormatedDate(dateParams)
        const { koranList, khatma, userToReadList } = this.props
        const numberOfToRead = userToReadList.length

        return (
            <View style={{ flex: 1, backgroundColor: gray3 }}>
                <Container>
                    <CostumHeader
                        title="Khetma"
                        subtile={date}
                        isHome={false}
                        navigation={this.props.navigation}
                        validate={this.validateUserChoise}
                    />
                    <ScrollView scrollEventThrottle={16} >
                        {
                            isOpen ? <TextButton style={{ marginTop: 10 }} onPress={this.onChangeOpenKhetma}>Fermer Khetma</TextButton>
                                : <TextButton style={{ marginTop: 10 }} onPress={this.onChangeOpenKhetma}>Ouvrir Khetma</TextButton>
                        }

                        {

                            (numberOfToRead > 0) &&

                            <View>
                                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                    <Text style={styles.textHeader}>
                                        Valider la lecture de vos Tekheroubines
                                        </Text>
                                    <Text style={styles.textDetails}>
                                        Vous avez choisi dans cette Khatma {numberOfToRead} {numberOfToRead == 1 ? 'Takheroubt' : ' Tikheroubine'}.
                                        Merci de confirmer vos lectures.
                                        </Text>
                                </View>

                                <View>
                                    {
                                        userToReadList.map((id) => {
                                            const alreadyReadByAuthedUser = Object.values(toggleUserReadList).includes(id)
                                            let numberOfReader = Object.keys(khatma[0].koranPart[id].pickedBy).length
                                            return (
                                                <CostumItemList
                                                    key={koranList[id].id}
                                                    text={koranList[id].value}
                                                    colorText={alreadyReadByAuthedUser}
                                                    value={alreadyReadByAuthedUser}
                                                    id={id}
                                                    numberOfReader={numberOfReader}
                                                    onChangeToggle={this.onChangeToggleRead}
                                                />
                                            )

                                        })


                                    }
                                </View>
                            </View>
                        }

                        {
                            (isOpen)
                            &&
                            <View>

                                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                    <Text style={styles.textHeader}>
                                        Choisir une ou plusieurs Tekheroubine
                                    </Text>
                                    {
                                        (!numberOfToRead) && (

                                            <View>
                                                <Text style={styles.textDetails}>
                                                    Vous n'avez encore choisi aucune Takheroubt dans cette Khatma.
                                                </Text>
                                                <Text style={styles.textDetails}>
                                                    Privilégier une Takheroubte qui a un compteur à Zéro.
                                                    Celles qui ont un compteur différent de Zéro ont déjà été choisies par d'autres personnes.
                                                </Text>
                                            </View>
                                        )
                                    }
                                </View>
                                <View>
                                    {
                                        Object.keys(koranList).map((id) => {

                                            let alreadyPickedByAuthedUser = Object.values(toggleUserToReadList).includes(id)
                                            let numberOfReader = Object.keys(khatma[0].koranPart[id].pickedBy).length
                                            //let readByNumber = Object.keys(khatma[0].koranPart[id].readBy).length

                                            return (
                                                <CostumItemList
                                                    key={koranList[id].id}
                                                    text={koranList[id].value}
                                                    colorText={numberOfReader || alreadyPickedByAuthedUser}
                                                    value={alreadyPickedByAuthedUser}
                                                    numberOfReader={numberOfReader}
                                                    id={id}
                                                    onChangeToggle={this.onChangeToggleToRead}
                                                />

                                            )
                                        })
                                    }

                                </View>
                            </View>

                        }

                    </ScrollView>
                </Container>
            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {


    const { dateParams } = navigation.state.params
    const authedUser = "0ZAij3Nvipha3YYW9KZetBwSNx22"

    const currentKhatma = Object.values(state.khatmaStore.khatma).filter(function (khatma) {
        return khatma.date == dateParams
    })

    const users = currentKhatma[0].users ? currentKhatma[0].users : null
    const currentUser = users ? users[authedUser] : null
    const toRead = currentUser ? currentUser.toRead : []
    const read = currentUser ? currentUser.read : []

    return {
        koranList: state.koranStore,
        khatma: currentKhatma,
        isOpen: currentKhatma[0].isOpen,
        userReadList: read,
        userToReadList: toRead,
        authedUser,
        isAdmin: true
    }
}

export default connect(mapStateToProps)(Khatma)

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 24,
        fontWeight: '700',
        color: black
    },
    textDetails: {
        fontSize: 16,
        fontWeight: '300',
        paddingHorizontal: 5,
        marginTop: 10,
        marginBottom: 10
    },
})