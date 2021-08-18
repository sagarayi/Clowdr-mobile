 // Login.js
 import React, { Component } from "react";
 import { View, Text, Button, ActivityIndicator, AsyncStorage, Image } from "react-native";

 import Auth0 from "react-native-auth0";
 import Config from "react-native-config";
 import RNRestart from "react-native-restart";
 import AppButton from "../common/AppButton"
 import jwt_decode from "jwt-decode";

import styles from "../../styles/Login";
import * as Constants from "../common/Constants";
import { LogBox } from 'react-native';


  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
  });
  LogBox.ignoreAllLogs();
  export default class Login extends Component {
    
    state = {
        hasInitialized: false
      };

     componentDidMount() {
      // this.gotoHomeScreen()
      // this.login()
      const accessToken =  AsyncStorage.getItem(Constants.ACCESS_TOKEN).then(accessToken => {
        if (accessToken) {
          auth0.auth
               .userInfo({ token: accessToken })
               .then(data => {
                  console.log("Token found")
                  this.gotoHomeScreen()
              })
              .catch(err => {
                this.setState({
                  hasInitialized: true
                });
                console.log("**********LOGIN*********")
                console.log("Invalid access token: ", err)
                console.log("**********LOGIN*********")
              });
        } else {
          // const refreshToken = AsyncStorage.getItem(REFRESH_TOKEN)
          // console.log("Refresh token fetching"+ refreshToken)
          //         auth0.auth
          //           .refreshToken({ refreshToken: refreshToken })
          //           .then(newAccessToken => {
          //             this.saveData(ACCESS_TOKEN, newAccessToken);
          //             RNRestart.Restart();
          //           })
          //           .catch(accessTokenErr => {
          //             console.log("error getting new access token: ", accessTokenErr);
          //           });
              this.setState({
                hasInitialized: true
              });
          }
        })
      }
    

    saveData = async(key, value) => {
      console.log("Key :" +key+" , value: "+value)
      await AsyncStorage.setItem(key,value)
    }

    login = () => {

      auth0
      .webAuth
      .authorize({
        scope: "openid user",
        audience: "hasura",
        prompt: "login" 
      })
      .then(credentials =>
      {
        console.log("**************")
        console.log(credentials)
        console.log("**************")
          this.saveData(Constants.ACCESS_TOKEN, credentials.accessToken)
          const accessTokenDecoded =  JSON.parse(JSON.stringify(jwt_decode(credentials.accessToken)));
          console.log(accessTokenDecoded)
          const hasuraCreds = accessTokenDecoded["https://hasura.io/jwt/claims"]
          console.log(hasuraCreds)
          console.log(hasuraCreds["x-hasura-user-id"])
          this.saveData(Constants.USER_ID, hasuraCreds["x-hasura-user-id"])
          this.gotoHomeScreen()
      }).catch(error => console.log(error));
    };
    
    gotoHomeScreen = data => {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: Constants.MY_CONF_SCREEN}]
      })
        this.props.navigation.navigate(Constants.MY_CONF_SCREEN)
        
      };

    render() {
        return (
            <View style={styles.container}>
            <Image style={styles.logo}
              source={require("../../../assets/clowdr-512x512.png")} />
              {this.state.hasInitialized && (
                <AppButton title='Login' onPress={this.login}/>  
              )}
            </View>
        );
      }
  }

