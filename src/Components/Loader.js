import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Animated, Easing} from 'react-native';

export default class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinValue: new Animated.Value(0),
        };
    }

    loading = () => {

        Animated.loop(
            Animated.timing(this.state.spinValue, {
                toValue: 1,
                duration: 600,
                delay: 0,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }
    render() {

        this.loading();
        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const logo = require("../../assets/images/logo_transparent.png");

        return (

            <Animated.Image
                style={{transform: [{rotate: spin}], width: 60, height: 60, position: 'absolute',  marginTop: 500, marginLeft: 150}}
                source={logo}
            />
        );
    }
}