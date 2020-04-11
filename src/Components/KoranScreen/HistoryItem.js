import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { gray, black, white, gray2, blue } from '../../Utils/colors'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../config/icons/selection.json';


const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

class HistoryItem extends Component {
    render() {

        const { title, numberOfPicks, numberOfRead, navigate } = this.props


        return (
            <View style={styles.cardConatiner}>
                <TouchableOpacity onPress={navigate}>
                    <View style={{height: 60, borderWidth: 0.5, borderColor: '#dddddd',borderRadius: 0.5}}>
                        <View style={styles.row}>
                            <CustomIcon  style={styles.iconContainer} name="coranOpen" size={45} color={black} />
                            <View style={{flex: 3}}>
                                <Text style={styles.textHeader}>{title}</Text>
                                <Text style={styles.textDetails}>Vous avez dans cette Khatma</Text>
                                <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                                    <Text style={styles.textInfo}>Sélectionné:  {numberOfPicks}</Text>
                                    <Text style={styles.textInfo}>Lu: {numberOfRead}</Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


export default HistoryItem

const styles = StyleSheet.create({
    cardConatiner: {
        marginTop: 0.5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
        color: black
    },
    textDetails: {
        fontSize: 10,
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 5,
        color: black
    },
    textInfo: {
        flex: 3,
        justifyContent: 'center',
        fontSize: 9,
        fontWeight: '400',
        color: gray,
    },
})