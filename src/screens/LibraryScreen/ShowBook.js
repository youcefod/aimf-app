import React, {Component} from "react";
import {LIST_ACTION, MARRIED, WOMEN_GENDER} from "../../Utils/Constants";
import {ScrollView, View} from "react-native";

class ShowBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let logo = require("../../../assets/images/men.png");
        if (this.props.data.gender === WOMEN_GENDER) {
            logo = require("../../../assets/images/women.png");
        }
        return (
            <ScrollView
                centerContent={true}
                style={{paddingTop: 20, paddingBottom: 14, paddingRight: 14, opacity: this.state.scrollViewOpacity}}>
            </ScrollView>
        );
    }
}

export default ShowBook;