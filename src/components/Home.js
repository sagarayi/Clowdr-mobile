 // Home.js
import React, { Component } from "react";
import { View, Button } from "react-native";
// import { NavigationActions, StackActions } from "react-navigation";

import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
});

import {
    headerColorStyle,
    headerTextColorStyle,
    buttonStyle
} from "../styles/Colors";
import styles from "../styles/Home";

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: headerColorStyle
          },
          headerTitleStyle: {
            color: headerTextColorStyle
          }
        };
      };

    logout = () => {
        SInfo.deleteItem("accessToken", {});
        SInfo.deleteItem("refreshToken", {});

        auth0.webAuth
            .clearSession()
            .then(res => {
            console.log("clear session ok");
            })
            .catch(err => {
            console.log("error clearing session: ", err);
            });

        this.gotoLoginScreen(); 
    };

    gotoLogin = () => {
        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({
        //       routeName: "Login"
        //     })
        //   ]
        // });
  
        // this.props.navigation.dispatch(resetAction);
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