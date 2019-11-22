import React, { Component } from "react";
import { View } from "react-native";
import FeedCard from "../Components/FeedCard";
import {Container, Content} from "native-base";
import firebase from "react-native-firebase";
import {getFrDate} from "../Utils/Functions";

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };
  constructor(props) {
    super(props);
    this.state = {
        annonces: []
    };
    const that = this;

      firebase
        .firestore()
        .collection("annonce")
        // .where('enable', '==', 'true')
        .orderBy('date', 'desc')
        .get()
        .then(function (annonces) {
        const data = [];
        annonces.forEach(function (doc) {
          data.push(doc.data()) ;
      });
        that.setState({annonces: data});
    });
  }

  showAnnonces = () => {
      if (this.state.annonces.length > 0) {
          return (
              this.state.annonces.map((annonce, index) => {
                    return <FeedCard
                        key={index}
                        title={annonce.title}
                        date={getFrDate(annonce.date.toDate())}
                        text={annonce.text}
                        backgroundColor={this.isNewAnnonce(annonce) ? "#ffffff" : "#b3b3b3"}
                        dateColor={this.isNewAnnonce(annonce) ? "#000000" : "#ffffff"}
                    />
              })
          )
      }
      return null;
  }

  isNewAnnonce =(annonce) => {
      const now = new Date();
      const today = new Date(now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate());
      return annonce.date.toDate() >= today;
  }
  render() {
    return (
        <View style={{ flex: 1 }}>
            <Container>
            <Content>
                {this.showAnnonces()}
            </Content>
            </Container>
    </View>);

  }
}
export default HomeScreen;
