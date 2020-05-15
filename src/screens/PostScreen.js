import React, { Component } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Icon, Input, Item, Label } from "native-base";
import SpinnerButton from "react-native-spinner-button";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import styles from "./PostScreen/css";
import ErrorModal from "../Components/ErrorModal";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";
import Loader from "../Components/Loader";
import {
  createPost,
  updatePost,
  getDraftArticle,
} from "../store/reducers/articlesRedux";
import { DRAFT_ARTICLE_STATUS, VALID_ARTICLE_STATUS } from "../Utils/Constants";
import ImageUploader from "../Components/ImageUploader";

class PostScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      photo: null,
    };
  }

  componentDidMount() {
    if (!this.props.draftArticle) {
      this.props.getDraftArticle();
    }
    if (this.props.draftArticle) {
      const { title, description } = this.props.draftArticle;
      this.setState({ title, description });
    }
  }

  componentWillReceiveProps(nextProps): void {
    if (this.props.loading && !nextProps.loading && !nextProps.errorMessage) {
      let title = null;
      let description = null;
      if (nextProps.draftArticle) {
        title = nextProps.draftArticle.title;
        description = nextProps.draftArticle.description;
      }
      this.setState({ title, description });
    }
  }

  updatePhoto = (photo) => {
    this.setState({ photo });
  };

  disabledButtons = () => {
    return !(this.state.title.trim() && this.state.description.trim());
  };

  sendPost = (status) => {
    const { description, title, photo } = this.state;

    if (!title.trim() || !description.trim()) {
      this.props.dispatchErrorMessage(
        "Le titre et le messagde de l'annonce doivent êtres renseignés"
      );
      return;
    }
    if (this.props.draftArticle && this.props.draftArticle.id) {
      this.props.updatePost(this.props.draftArticle.id, {
        status,
        description: description.trim(),
        title: title.trim(),
        uri: photo && photo.uri,
      });
    } else {
      this.props.createPost({
        status,
        description: description.trim(),
        title: title.trim(),
      });
    }
  };

  render() {
    const { description, title } = this.state;
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
          <Label style={styles.label}>Photo intervenant</Label>
          <ImageUploader
            style={{ marginBottom: 15, marginLeft: 30, flexDirection: "row" }}
            updatePhoto={(value) => this.updatePhoto(value)}
            photo={this.state.photo}
            imageStyle={{ width: 60, height: 60 }}
            buttonStyle={styles.uploadPhotoButton}
            iconStyle={styles.buttonIcon}
          />
          <Label style={styles.label}>Message*</Label>
          <Item rounded style={styles.textItem}>
            <TextInput
              style={styles.textInput}
              textAlignVertical="top"
              autoCapitalize="characters"
              keyboardType="default"
              multiline
              numberOfLines={10}
              onChangeText={(value) => this.setState({ description: value })}
              value={description}
            />
          </Item>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 70,
            }}
          >
            <SpinnerButton
              buttonStyle={{
                ...styles.spinnerButton,
                marginRight: 20,
                backgroundColor: "#f6a351",
              }}
              onPress={() => this.sendPost(DRAFT_ARTICLE_STATUS)}
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
                backgroundColor: "#cb8347",
              }}
              onPress={() => this.sendPost(VALID_ARTICLE_STATUS)}
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
  const { loading, draftArticle } = state.articleStore;
  const { user } = state.accountStore;
  return {
    errorMessage,
    loading,
    user,
    draftArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
    createPost: (data) => dispatch(createPost(data)),
    updatePost: (id, data) => dispatch(updatePost(id, data)),
    getDraftArticle: () => dispatch(getDraftArticle()),
  };
};
PostScreen.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  draftArticle: PropTypes.object,
  createPost: PropTypes.func,
  updatePost: PropTypes.func,
  getDraftArticle: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
