import React, { Component } from "react";
import { ScrollView, PixelRatio, Dimensions, Text, View } from "react-native";
import YouTube from "react-native-youtube";

import { API_KEY } from "react-native-dotenv";
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
    return (
      <ScrollView style={styles.container}>
        <YouTube
          ref={this.youTubeRef}
          apiKey={API_KEY}
          videoId="mddmc_a9Rlw"
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
        <View style={{ marginTop: 30, marginLeft: 30, marginRight: 30 }}>
          <Text style={{ fontSize: 16 }}>
            شبابنا و وسائل التواصل الإجتماعي ـ الشيخ محمد بن عيسى
          </Text>
        </View>
      </ScrollView>
    );
  }
}
export default YouTubeScreen;
