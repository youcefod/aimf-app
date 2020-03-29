import React, {Component } from "react";
import {Text, Modal, TouchableHighlight, View} from "react-native";
import {Icon} from "native-base";

export default class ErrorModal extends Component {

    render() {

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}>
                <View style={{position: 'absolute',
                    bottom:0, width:'100%', backgroundColor:"#FFF", alignItems: "center",  borderTopStartRadius: 20,
                    borderTopEndRadius: 20,  height: 130, borderWidth:1, borderColor: "#d7d7d7", paddingLeft: 20, paddingRight: 20}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.setVisible(false);
                        }}>
                        <Icon
                            name={"close-circle"}
                            style={{color : "#f26060", marginTop: -16, fontSize: 35}}
                        />
                    </TouchableHighlight>

                    <Text  style={{color: "#f26060", fontSize: 17, fontWeight:"bold", marginBottom: 30}}>
                        Erreur
                    </Text>
                    <Text style={{color: "#5d5d5d", fontSize: 15}}>{this.props.message}</Text>
                </View>
            </Modal>
        );
    }
}