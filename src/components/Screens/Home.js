 // Home.js
import React, { Component } from "react";
import { View, Button, AsyncStorage } from "react-native";

import Auth0 from "react-native-auth0";
import Config from "react-native-config";

const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
});

const ACCESS_TOKEN = "@accessToken"
const REFRESH_TOKEN = "@refreshToken"
const LOGIN_SCREEN = "Login"

import {
    headerColorStyle,
    headerTextColorStyle,
    buttonStyle
} from "../styles/Colors";
import styles from "../styles/Home";
import TabNavigator from "./TabNavigator";

export default class Home extends Component {

  componentDidMount () {
    this.setNavigationBarStyle()
  }

  setNavigationBarStyle = () => {
    this.props.navigation.setOptions({
      headerRight: () => (<Button onPress={this.logout} title="Logout"/>),
      headerTitle: "Home",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    }) 
  }

    deleteLocalCache = async(key) => {
      await AsyncStorage.removeItem(key)
    }

    logout = () => {
      this.deleteLocalCache(ACCESS_TOKEN)
      .then(this.deleteLocalCache(REFRESH_TOKEN).then(() =>{
        auth0.webAuth
        .clearSession()
        .then(res => {
        console.log("clear session ok");
        })
        .catch(err => {
        console.log("error clearing session: ", err);
        });

    this.gotoLoginScreen(); 
      }))
    };

    gotoLoginScreen = () => {
        
        this.props.navigation.reset({
          index: 0,
          routes: [{name: LOGIN_SCREEN}]
        })

        this.props.navigation.navigate(LOGIN_SCREEN)
      };

    render() {

        return (
            <View style={styles.container}>
              {/* <TabNavigator/> */}
            </View>
        );
    }

    
}