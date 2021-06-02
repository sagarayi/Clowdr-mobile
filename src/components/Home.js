 // Home.js
import React, { Component } from "react";
import { View, Button, AsyncStorage } from "react-native";
// import { NavigationActions, StackActions } from "react-navigation";

import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
});

const ACCESS_TOKEN = "@accessToken"
const REFRESH_TOKEN = "@refreshToken"
const HOME_SCREEN = "Home"
const LOGIN_SCREEN = "Login"

import {
    headerColorStyle,
    headerTextColorStyle,
    buttonStyle
} from "../styles/Colors";
import styles from "../styles/Home";

export default class Home extends Component {

  componentDidMount () {
    // this.props.navigation.setParams({logoutAction: {() => this.logout()}})
  }
  
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
      return {
        headerRight: (<Button onPress={() => params.logoutAction } title="Logout"/>),
        headerTitle: "Home",
        headerStyle: {
          backgroundColor: headerColorStyle
        },
        headerTitleStyle: {
          color: headerTextColorStyle
        }
      };
    };

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
        // SInfo.deleteItem("accessToken", {});
        // SInfo.deleteItem("refreshToken", {});


    };

    gotoLoginScreen = () => {
        
        this.props.navigation.reset({
          index: 0,
          routes: [{name: LOGIN_SCREEN}]
        })
        
        this.props.navigation.navigate(LOGIN_SCREEN)
      };

    render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam("name");
    // const picture = navigation.getParam("picture");

        return (
            <View style={styles.container}>
                <Button onPress={this.logout} title="Logout" color={buttonStyle} />
            </View>
        );
    }

    
}