import React, { Component } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import firebase from "react-native-firebase";
import {Icon, Input, Item, Label} from "native-base";
import SpinnerButton from "react-native-spinner-button";
import {styles} from "./PostScreen/css";
import {DRAFT_ANNONCE_ID} from "../Utils/Constants";
import ErrorModal from "../Components/ErrorModal";
export default class PostScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
      _isMounted = false;
      this.state = {
          title: '',
          text: '',
          saveSpinner: false,
          sendSpinner: false,
          modalVisible: false,
          errorMessage: ''
      };
      this.setModalVisible = this.setModalVisible.bind(this);
  }
    componentDidMount() {
      if (!this._isMounted) {
        this.setDraftAnnouncement();
      }
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    setDraftAnnouncement = () => {
        const that = this;
        firebase.firestore().collection("announcements")
            .doc(DRAFT_ANNONCE_ID)
            .get()
            .then(doc => {
                if (doc.data()) {
                    that.setState({text: doc.data().text, title: doc.data().title})
                }
            });
    };

    disabledButtons = () => {
        return !(this.state.title.trim() && this.state.text.trim());
    };

    sendPost = () => {
        const {text, title} = this.state;

        if (!title.trim() || !text.trim()) {
            this.setState({errorMessage: 'Le titre et le messagde de l\'annonce doivent êtres renseignés',
                           modalVisible: true});
            return;
        }

        if (text && title) {
            this.setState({sendSpinner: true});
            firebase
                .firestore()
                .collection("announcements")
                .add({
                    enable: true,
                    text: text,
                    title: title.trim(),
                    date: new Date(),
                    user: '/users/' + firebase.auth().currentUser.uid
                })
                .then(() => {
                    if (this._isMounted) {
                        this.notif.localNotif();
                        this.setState({sendSpinner: false});
                        this.setState({title: '', text: ''});
                        this.savePost(false);
                    }
                })
                .catch(error => {
                    if (this._isMounted) {
                        this.setState({sendSpinner: false});
                    }
                });
        }
    };

    savePost = (saveSpinner = true) => {
        const {text, title} = this.state;

        if (text && title) {
            this.setState({saveSpinner: saveSpinner});
            firebase
                .firestore()
                .collection("announcements")
                .doc(DRAFT_ANNONCE_ID)
                .set({
                    enable: false,
                    text: text,
                    title: title.trim(),
                    date: new Date(),
                    user: '/users/' + firebase.auth().currentUser.uid
                })
                .then(() => {
                    if (this._isMounted) {
                        this.setState({saveSpinner: false});
                    }
                })
                .catch(error => {
                    if (this._isMounted) {
                        this.setState({saveSpinner: false});
                    }
                });
        }
    };
  render() {
  const {text, title, saveSpinner, sendSpinner} = this.state;
      const viewOpacity = this.state.modalVisible ? 0.5 : 1;
    return <>
            <ScrollView style={{...styles.view, opacity: viewOpacity}}>
        <Label
            style={styles.label}
        >Titre*</Label>
        <Item
            rounded
            style={styles.inputItem}
        >

            <Input
                style={styles.input}
                autoCapitalize="characters"
                keyboardType="default"
                onChangeText={title => this.setState({title})}
                value={title}
            />

        </Item>
        <Label
            style={styles.label}
        >Message*</Label>
        <Item rounded
              style={styles.textItem}
        >
            <TextInput
                style={styles.textInput}
                textAlignVertical="top"
                autoCapitalize="characters"
                keyboardType="default"
                multiline
                numberOfLines={10}
                onChangeText={text => this.setState({text})}
                value={text}
            />

        </Item>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>

            <SpinnerButton
                buttonStyle={{...styles.spinnerButton, marginRight: 20, backgroundColor: "#f3aa2329"}}
                isLoading={saveSpinner}
                onPress={this.savePost}
                indicatorCount={10}
                spinnerType="SkypeIndicator"
                disabled={this.disabledButtons}
            >
                 <Text style={styles.buttonText}>
                     <Icon style={styles.buttonIcon}
                     name="save" type="Foundation"/>
                     {'   '}Enregistrer</Text>
            </SpinnerButton>
            <SpinnerButton
                buttonStyle={{...styles.spinnerButton, backgroundColor: "#FFD792"}}
                isLoading={sendSpinner}
                onPress={this.sendPost}
                indicatorCount={10}
                spinnerType="SkypeIndicator"
                disabled={this.disabledButtons}
            >
                <Text style={styles.buttonText}>
                    <Icon style={styles.buttonIcon}
                          name="send"/>
                    {'   '}Poster</Text>
            </SpinnerButton>
            </View>
    </ScrollView>
        <ErrorModal
            visible={this.state.modalVisible}
            setVisible={this.setModalVisible}
            message={this.state.errorMessage}/>
           </>;
  }
}