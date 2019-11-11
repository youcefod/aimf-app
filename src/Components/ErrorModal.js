import React, {Component } from "react";
import {Text, ActivityIndicator, Modal, TouchableHighlight, View} from "react-native";
import {Icon} from "native-base";

export default class ErrorModal extends Component {

    render() {

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}>
                <View style={{position: 'absolute',
                    bottom:0, backgroundColor: "#FFF",  width:'100%', alignItems: "center",  borderTopStartRadius: 20,
                    borderTopEndRadius: 20,  height: 130}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.setVisible(false);
                        }}>
                        <Icon
                            name={"close-circle"}
                            style={{color : "#f26060", marginTop: -16, fontSize: 40}}
                        />
                    </TouchableHighlight>

                    <Text  style={{color: "#f26060", fontSize: 20, fontWeight:"bold", marginBottom: 30}}>
                        Erreur
                    </Text>
                    <Text>{this.props.message}</Text>
                </View>
            </Modal>
        );
    }
}