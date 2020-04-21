import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Button, Icon } from "native-base";
import { LIST_ACTION} from "../../Utils/Constants";

class ShowBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollViewOpacity: 1,
    };
  }

  render() {
    return (
      <ScrollView
        centerContent
        style={{
          paddingTop: 20,
          paddingBottom: 14,
          paddingRight: 14,
          opacity: this.state.scrollViewOpacity,
        }}
      >
        <View>
          <Button
            transparent
            onPress={() => {
              this.props.updateState({
                action: LIST_ACTION,
              });
            }}
            style={{ borderRadius: 30, marginLeft: 20, marginBottom: 20 }}
          >
            <Icon
              style={{ color: "#000" }}
              name="md-arrow-back"
              type="Ionicons"
            />
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default ShowBook;
