import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { gray, black, white, gray2, blue } from '../../Utils/colors'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../config/icons/selection.json';


const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

class KoranItem extends Component {
    render() {

        const { title, numberOfPicked, numberOfRead, numberofPartDispo, navigate } = this.props


        return (
            <View style={styles.cardConatiner}>
                <TouchableOpacity onPress={navigate}>
                    <View style={{
                        height: 200, borderWidth: 0.5, borderColor: '#dddddd',
                        borderRadius: 10,
                    }}>
                        <View style={{ flex: 2 }}>
                            <Image source={require('../../../assets/images/Khatma.png')}
                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                            />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={styles.textHeader}>{title}</Text>
                            <Text style={styles.textInfo}>Votre Khatma est ouverte</Text>
                            <Text style={styles.textInfo}>{numberofPartDispo} Thikheroubine sont disponibles</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


export default KoranItem

const styles = StyleSheet.create({
    cardConatiner: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
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
        fontSize: 15,
        fontWeight: '600',
        color: black
    },
    textDetails: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 10,
        color: black
    },
    textInfo: {
        flex: 3,
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: gray,
        paddingLeft: 10
    },
})