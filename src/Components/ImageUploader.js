import React from "react";
import { View, Image, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import * as PropTypes from "prop-types";
import SpinnerButton from "react-native-spinner-button";
import { Icon } from "native-base";

class ImageUploader extends React.Component {
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.props.updatePhoto(response);
      }
    });
  };

  render() {
    const { photo } = this.props;
    console.log(photo);
    return (
      <View style={this.props.style}>
        <SpinnerButton
          buttonStyle={this.props.buttonStyle}
          onPress={() => this.handleChoosePhoto()}
          indicatorCount={10}
          spinnerType="SkypeIndicator"
        >
          <Text>
            <Icon
              style={this.props.iconStyle}
              name="cloud-upload"
              type="FontAwesome"
            />
          </Text>
        </SpinnerButton>
        {photo && (
          <Image source={{ uri: photo.uri }} style={this.props.imageStyle} />
        )}
      </View>
    );
  }
}

ImageUploader.propTypes = {
  photo: PropTypes.object,
  updatePhoto: PropTypes.func,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  iconStyle: PropTypes.object,
};

export default ImageUploader;
