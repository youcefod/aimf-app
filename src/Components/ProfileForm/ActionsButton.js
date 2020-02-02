import React, {Component} from "react";
import SpinnerButton from "react-native-spinner-button";
import {styles} from "./css";
import {Text, TouchableOpacity} from "react-native";
import {UPDATE_ACTION, CREATE_ACTION} from "../../Utils/Constants";

export default class ActionsButton extends Component {

    render() {
        const spinnerButtonStyle = {
            ...styles.registerButton,
            marginBottom: this.props.action === UPDATE_ACTION ? 100 : 0
        };
        return (
            <>
                <SpinnerButton
                    buttonStyle={spinnerButtonStyle}
                    onPress={this.props.onValidate}
                    indicatorCount={10}
                    spinnerType="SkypeIndicator">
                    <Text
                        style={styles.nextButtonText}>{this.props.action === CREATE_ACTION ? 'Continuer' : 'Valider'}</Text>
                </SpinnerButton>

                {this.props.action === CREATE_ACTION ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Login")}
                        activeOpacity={0.6}
                        style={styles.loginLink}
                    >
                        <Text>Vous êtes déjà inscrit? Cliquez ici</Text>
                    </TouchableOpacity> :
                    null
                }

            </>
        );
    }
}
