import React, {Component} from "react";
import {View, FlatList, Button} from "react-native";

import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createAppContainer,
} from 'react-navigation';

import CreateKhatma from "./koran/CreateKhatma";
import CreateTakharoubt from "./koran/CreateTakharoubt";
import PickUpTakharoubt from "./koran/PickUpTakharoubt";

const TabScreen = createMaterialTopTabNavigator(
    {
        CreateKhatma: {screen: CreateKhatma},
        CreateTakharoubt: {screen: CreateTakharoubt},
        PickUpTakharoubt: {screen: PickUpTakharoubt},
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#633689',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);

const KoranScreen = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#633689',
            },
            headerTintColor: '#FFFFFF',
            title: 'Coran',
        },
    },
});

export default createAppContainer(KoranScreen);
