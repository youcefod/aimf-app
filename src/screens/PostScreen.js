import React, { Component } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Icon, Input, Item, Label } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { styles } from "./PostScreen/css";
import ErrorModal from "../Components/ErrorModal";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";
import Loader from "../Components/Loader";
import { createPost, updatePost } from "../store/reducers/announcementsRedux";

class PostScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
    };
  }

  componentDidMount() {
    if (this.props.currentAnnouncement) {
      const { title, text } = this.props.currentAnnouncement;
      this.setState({ title, text });
    }
  }

  componentWillReceiveProps(nextProps): void {
    if (this.props.loading && !nextProps.loading && !nextProps.errorMessage) {
      let title = null;
      let text = null;
      if (nextProps.currentAnnouncement) {
        title = nextProps.currentAnnouncement.title;
        text = nextProps.currentAnnouncement.text;
      }
      this.setState({ title, text });
    }
  }

  disabledButtons = () => {
    return !(this.state.title.trim() && this.state.text.trim());
  };

  sendPost = (enable) => {
    const { text, title } = this.state;

    if (!title.trim() || !text.trim()) {
      this.props.dispatchErrorMessage(
        "Le titre et le messagde de l'annonce doivent êtres renseignés"
      );
      return;
    }
    if (this.props.currentAnnouncement) {
      this.props.updatePost(this.props.currentAnnouncement.id, {
        enable,
        text: text.trim(),
        title: title.trim(),
      });
    } else {
      this.props.createPost({
        enable,
        text: text.trim(),
        title: title.trim(),
      });
    }
  };

  render() {
    const { text, title } = this.state;
    return (
      <>
        <ScrollView
          style={{
            ...styles.view,
            opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
          }}
        >
          <Label style={styles.label}>Titre*</Label>
          <Item rounded style={styles.inputItem}>
            <Input
              style={styles.input}
              autoCapitalize="characters"
              keyboardType="default"
              onChangeText={(value) => this.setState({ title: value })}
              value={title}
            />
          </Item>
          <Label style={styles.label}>Message*</Label>
          <Item rounded style={styles.textItem}>
            <TextInput
              style={styles.textInput}
              textAlignVertical="top"
              autoCapitalize="characters"
              keyboardType="default"
              multiline
              numberOfLines={10}
              onChangeText={(value) => this.setState({ text: value })}
              value={text}
            />
          </Item>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SpinnerButton
              buttonStyle={{
                ...styles.spinnerButton,
                marginRight: 20,
                backgroundColor: "#f3aa2329",
              }}
              onPress={() => this.sendPost(false)}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              disabled={this.disabledButtons}
            >
              <Text style={styles.buttonText}>
                <Icon style={styles.buttonIcon} name="save" type="Foundation" />
                {"   "}Enregistrer
              </Text>
            </SpinnerButton>
            <SpinnerButton
              buttonStyle={{
                ...styles.spinnerButton,
                backgroundColor: "#FFD792",
              }}
              onPress={() => this.sendPost(true)}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              disabled={this.disabledButtons}
            >
              <Text style={styles.buttonText}>
                <Icon style={styles.buttonIcon} name="send" />
                {"   "}Poster
              </Text>
            </SpinnerButton>
          </View>
        </ScrollView>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader visible={!!this.props.loading} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const { loading, currentAnnouncement } = state.announcementStore;
  const { user } = state.accountStore;
  return {
    errorMessage,
    loading,
    user,
    currentAnnouncement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
    createPost: (data) => dispatch(createPost(data)),
    updatePost: (id, data) => dispatch(updatePost(id, data)),
  };
};
PostScreen.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  currentAnnouncement: PropTypes.object,
  createPost: PropTypes.func,
  updatePost: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
