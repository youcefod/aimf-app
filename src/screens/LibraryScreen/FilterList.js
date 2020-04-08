import React from 'react';

import {View, Text} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {BOOK_GENRES} from "../../Utils/Constants";
import {Icon} from "native-base";

class FilterList extends React.PureComponent {

    constructor(props) {
        super(props);
        _menu = null;
    }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = value => {
        this.props.updateValue(value);
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    rendetListMenu = () => {

        const list = [];
        BOOK_GENRES.forEach(element => list.push(<MenuItem key={element.id}
                                                           onPress={() => this.hideMenu(element.id)}>{element.label}</MenuItem>));

        return list;
    };

    render() {
        return (
            <View style={{
                marginRight: 20,
                marginTop: 20,
                width: 170,
                borderBottomWidth: 1,
                paddingBottom: 7,
                borderBottomColor: "#545454"
            }}>
                <View style={{
                    width: 170,
                    flexDirection: "row",
                }}>
                    <Text style={{width: 158}} onPress={this.showMenu}>{this.props.selectedValue}</Text>
                    <Text onPress={this.showMenu}><Icon
                        type="AntDesign"
                        name="caretdown"
                        style={{fontSize: 12, color: "#545454"}}
                    /></Text>
                </View>
                <Menu ref={this.setMenuRef}>
                    {(this.rendetListMenu())}
                </Menu>
            </View>
        );
    }
}

export default FilterList;