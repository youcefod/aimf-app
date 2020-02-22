import React, {Component} from "react";
import {LIST_ACTION, MARRIED, SHOW_ACTION, UPDATE_ACTION, WOMEN_KIND} from "../../Utils/Constants";
import SettingsSwitch from "../../Components/switch";
import InformationsModal from "../../Components/InformationsModal";
import {ScrollView, View} from "react-native";
import {Button, Icon, Text, Thumbnail} from "native-base";
import firebase from "react-native-firebase";
import SpinnerButton from "react-native-spinner-button";

class ShowUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            informationModalVisible: false,
            confirmUpdateVisible: false,
            isAuthorized: props.data.isAuthorized,
            isAdmin: props.data.isAdmin,
            confirmMessage: '',
            updateUserLoadding: false,
            scrollViewOpacity: 1,
        }
    }

    setConfirmModalVisible = visible => {
        if (!visible) {
            this.setState({isAuthorized: this.props.data.isAuthorized, isAdmin: this.props.data.isAdmin});
        }
        this.setState({confirmUpdateVisible: visible, scrollViewOpacity: visible ? 0.5 : 1});
    }

    cancelUpdateEnableAdminFields = () => {
        this.setState({isAuthorized: this.props.data.isAuthorized, isAdmin: this.props.data.isAdmin});
        this.setConfirmModalVisible(false);
    }

    updateUser = () => {
        const thatComponent = this;
        this.setState({
            updateUserLoadding: true
        });
        const data = {
            ...this.props.data,
            isAuthorized: this.state.isAuthorized,
            isAdmin: this.state.isAdmin,
        };
        firebase
            .firestore()
            .collection("users")
            .doc(this.props.data.id)
            .set(data)
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        updateUserLoadding: false
                    });
                    this.props.updateState({userData: data});
                    this.props.updateCard(data);
                    this.setConfirmModalVisible(false)
                }, 2000);
            }).catch(function (error) {
            thatComponent.setState({
                errorMessage: 'Une erreur est survenue lors de la modification de vos informations',
                updateUserLoadding: false,
                isAuthorized: thatComponent.props.isAuthorized,
                isAdmin: thatComponent.props.isAdmin,
            });
            thatComponent.setConfirmModalVisible(false)
        });

        return;
    }

    renderInformation = () => {
        const rows = [];
        const fields = [
            {field: 'lastname', label: 'Nom'},
            {field: 'firstname', label: 'Prénom'},
            {field: 'brothe', label: 'Fils de'},
            {field: 'birthDate', label: 'Date de naissance'},
            {field: 'conjugalSituation', label: 'Situation familiale'},
            {field: 'fonction', label: 'Fonction'},
            {field: 'email', label: 'Email'},
            {field: 'phoneNumber', label: 'Téléphone'},
            {field: 'zipCode', label: 'Code postal'},
        ];

        if (this.props.data.conjugalSituation === MARRIED) {
            fields.push({field: 'numberOfChildren', label: 'Nombre d\'enfants'})
        }

        fields.forEach(row => {
            rows.push(<View key={row.field} style={{
                height: 40,
                width: '100%',
                flexDirection: 'row',
                justifyContent: "space-between",
            }}>
                <Text style={{marginLeft: 14, color: "#3E3E3E", fontSize: 15}}>
                    {row.label}
                </Text>
                <Text style={{color: "#3E3E3E", fontSize: 15}}>
                    {this.props.data[row.field]}
                </Text>
            </View>);

            rows.push(<View
                key={"separator_" + row.field}
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />);
        });

        if (this.props.data.numberOfChildren > 0) {
            rows.push(<View key="childrens" style={{
                height: 40,
                width: '100%',
                flexDirection: 'row',
                justifyContent: "space-between",
                marginBottom: 10,
            }}>
                <Text style={{marginLeft: 14, color: "#3E3E3E", fontSize: 15}}>
                    Les enfants :
                </Text>
            </View>)
            for (i = 0; i < this.props.data.numberOfChildren; i++) {
                rows.push(<View
                    key={"separator_" + i}
                    style={{
                        height: 1,
                        width: "86%",
                        backgroundColor: "#CED0CE",
                        marginLeft: "14%"
                    }}
                />);
                rows.push(<View key={"children_year_" + i} style={{
                    height: 30,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                }}>
                    <Text style={{marginLeft: 14, color: "#3E3E3E", fontSize: 14}}>
                        Année de naissance
                    </Text>
                    <Text style={{marginRight: 14, color: "#3E3E3E", fontSize: 14}}>
                        {this.props.data.childrenYears[i]}
                    </Text>
                </View>);
                rows.push(<View key={'children_schoolLevels_' + i} style={{
                    height: 30,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                }}>
                    <Text style={{marginLeft: 14, color: "#3E3E3E", fontSize: 14}}>
                        Année scolaire
                    </Text>
                    <Text style={{marginRight: 14, color: "#3E3E3E", fontSize: 14}}>
                        {this.props.data.schoolLevels[i]}
                    </Text>
                </View>);
            }
        }
        return rows;
    }

    render() {
        let logo = require("../../../assets/images/men.png");
        if (this.props.data.kind === WOMEN_KIND) {
            logo = require("../../../assets/images/women.png");
        }
        return (
            <ScrollView
                centerContent={true}
                style={{paddingTop: 20, paddingBottom: 14, paddingRight: 14, opacity: this.state.scrollViewOpacity}}>
                <View>
                    <Button
                        transparent
                        onPress={() => {
                            this.props.updateState({
                                action: LIST_ACTION
                            });
                        }}
                        style={{borderRadius: 30, marginLeft: 20, marginBottom: 20}}
                    >
                        <Icon style={{color: "#000"}} name="md-arrow-back" type="Ionicons"/>
                    </Button>
                </View>
                <Thumbnail source={logo} style={{marginBottom: 14}}/>
                {this.renderInformation()}
                <SettingsSwitch
                    title={"Autorisé"}
                    titleStyle={{marginLeft: -5, color: "#3E3E3E", fontSize: 15}}
                    onValueChange={value => {
                        this.setState({
                            isAuthorized: value,
                            confirmMessage: 'Etes vous sûr de vouloir activer/désactiver cet utilisateur ?',
                        });
                        this.setConfirmModalVisible(true)
                    }}
                    value={this.state.isAuthorized}
                    trackColor={{
                        true: "#c18b64",
                        false: "#efeff3",
                    }}
                />
                <SettingsSwitch
                    title={"Administrateur"}
                    titleStyle={{marginLeft: -5, color: "#3E3E3E", fontSize: 15}}
                    onValueChange={value => {
                        this.setState({
                            isAdmin: value,
                            confirmMessage: 'Etes vous sûr de vouloir changer les droits d\'administration pour cet utilisateur ?',
                        });
                        this.setConfirmModalVisible(true)
                    }}
                    value={this.state.isAdmin}
                    trackColor={{
                        true: "#c18b64",
                        false: "#efeff3",
                    }}
                />
                <View style={{marginBottom: 30}}></View>
                <InformationsModal visible={this.state.confirmUpdateVisible}
                                   setVisible={this.setConfirmModalVisible.bind(this)}
                                   title="Confirmer la modification">
                    <Text
                        style={{color: "#3E3E3E", marginLeft: 5, marginBottom: 50}}> {this.state.confirmMessage}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40}}>
                        <SpinnerButton
                            buttonStyle={{
                                height: 40,
                                width: 110,
                                borderRadius: 10,
                                backgroundColor: "#f8f8f8",
                                color: "#3E3E3E",
                                marginRight: 4,
                                borderWidth: 1,
                                borderColor: "#FFD792",
                            }}
                            onPress={this.cancelUpdateEnableAdminFields}
                        >
                            <Text>Annuler</Text>
                        </SpinnerButton>
                        <SpinnerButton
                            buttonStyle={{
                                height: 40,
                                width: 110,
                                borderRadius: 10,
                                backgroundColor: "#FFD792",
                                marginLeft: 4,
                            }}
                            isLoading={this.state.updateUserLoadding}
                            indicatorCount={10}
                            spinnerType="SkypeIndicator"
                            onPress={this.updateUser}
                        >
                            <Text>Confirmer</Text>
                        </SpinnerButton>
                    </View>
                </InformationsModal>
            </ScrollView>
        );
    }
}

export default ShowUser;