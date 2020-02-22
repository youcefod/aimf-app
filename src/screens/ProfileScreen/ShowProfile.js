import React, {Component} from "react";
import {View, Image} from "react-native";
import {Button, Icon, Text} from "native-base";
import firebase from "react-native-firebase";
import {styles} from "./css";
import {UPDATE_ACTION} from "../../Utils/Constants";

class ShowProfile extends Component {
    static navigationOptions = {
        header: null
    };

    _onLogout = () => {
        firebase.auth().signOut();
    };

    render() {
        let icon = null;
        if (this.props.kind === 'men') {
            icon = require('../../../assets/images/men.png');
        } else if (this.props.kind === 'women') {

            icon = require('../../../assets/images/women.png');
        }
        return (
            <View style={styles.container}>
                <Text style={styles.myAccountText}>
                    Mon compte
                </Text>
                <Image style={styles.logo} source={icon}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.fullnameText}>
                        {this.props.fullName}
                    </Text>
                    <Button
                        transparent
                        onPress={() => {
                            this.props.updateAction(UPDATE_ACTION);
                        }}
                        style={{alignSelf: "center", borderRadius: 30, paddingBottom: 15}}
                    >
                        <Icon name="edit" type="AntDesign" style={styles.updateIcon}/>
                    </Button>
                </View>
                <Button
                    rounded
                    danger
                    onPress={this._onLogout}
                    style={styles.logoutButton}
                >
                    <Text>Déconnexion</Text>
                </Button>
            </View>
        );
    }
}

export default ShowProfile;
