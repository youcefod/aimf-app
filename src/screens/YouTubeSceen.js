import React, { Component } from "react";
import { ScrollView, PixelRatio, Dimensions, Text, View } from "react-native";
import YouTube from "react-native-youtube";

import { Thumbnail } from "native-base";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./YouTubeScreen/css";

class YouTubeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  youTubeRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      isLooping: true,
      playerWidth: Dimensions.get("window").width,
    };
  }

  render() {
    const logo = require("../../assets/images/tamejida_47.jpg");
    return (
      <ScrollView style={styles.container}>
        <YouTube
          ref={this.youTubeRef}
          apiKey="apiKey"
          videoId={this.props.video && this.props.video.youtube_id}
          play={this.state.isPlaying}
          loop={this.state.isLooping}
          fullscreen={false}
          controls={1}
          style={[
            {
              height: PixelRatio.roundToNearestPixel(
                this.state.playerWidth / (16 / 9)
              ),
            },
            styles.player,
          ]}
        />
        <View
          style={{
            margin: 25,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {this.props.video && this.props.video.title}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Thumbnail source={logo} />
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Tamejida 47
            </Text>
          </View>
        </View>
        <View
          style={{
            margin: 25,
          }}
        >
          <Text style={{ fontSize: 16}}>
            {this.props.video && this.props.video.description}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { video } = state.liveVideoStore;
  return {
    video,
  };
};

YouTubeScreen.propTypes = {
  video: PropTypes.object,
};

export default connect(mapStateToProps, null)(YouTubeScreen);
