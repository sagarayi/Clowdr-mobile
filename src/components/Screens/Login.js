 // Login.js
 import React, { Component } from "react";
 import { View, Text, Button, ActivityIndicator, AsyncStorage } from "react-native";

 import Auth0 from "react-native-auth0";
 import Config from "react-native-config";
 import RNRestart from "react-native-restart";
 import AppButton from "../common/AppButton"

import styles from "../../styles/Login";

  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
  });
  
  const ACCESS_TOKEN = "@accessToken"
  const REFRESH_TOKEN = "@refreshToken"
  const HOME_SCREEN = "Home"
  const TAB_NAV_SCREEN = "TabNav"

  export default class Login extends Component {

    state = {
        hasInitialized: false
      };

     componentDidMount() {
      // this.gotoHomeScreen()
      // const accessToken =  AsyncStorage.getItem("accessToken").then(accessToken => {
        // if (accessToken) {
        //   auth0.auth
        //        .userInfo({ token: accessToken })
        //        .then(data => {
        //           console.log("Token found")
        //           this.gotoHomeScreen()
        //       })
        //       .catch(err => {
        //         this.setState({
        //           hasInitialized: true
        //         });
        //         console.log("**********LOGIN*********")
        //         console.log("Could not find access token")
        //         console.log("**********LOGIN*********")
        //       });
        // } else {
        //   const refreshToken = AsyncStorage.getItem("refreshToken")
        //   console.log("Refresh token fetching"+ refreshToken)
        //           auth0.auth
        //             .refreshToken({ refreshToken: refreshToken })
        //             .then(newAccessToken => {
        //               this.saveData(ACCESS_TOKEN, newAccessToken);
        //               RNRestart.Restart();
        //             })
        //             .catch(accessTokenErr => {
        //               console.log("error getting new access token: ", accessTokenErr);
        //             });
              this.setState({
                hasInitialized: true
              });
          // }
        // })
      }
    

    saveData = async(key, value) => {
      console.log("Key :" +key+" , value: "+value)
      await AsyncStorage.setItem(key,value)
      // const toek = AsyncStorage.getItem(key) 
      // console.log("It got saved? "+toek)
    }

    login = () => {

      // auth0
      // .webAuth
      // .authorize({
      //   scope: Config.AUTHO_SCOPE,
      //   audience: Config.AUTH0_AUDIENCE,
      //   prompt: "login" 
      // })
      // .then(credentials =>
      // {
      //     this.saveData(ACCESS_TOKEN, credentials.accessToken).then()
      //     this.saveData(REFRESH_TOKEN, credentials.refreshToken).then()
          this.gotoHomeScreen()
      // }).catch(error => console.log(error));
    };
    
    gotoHomeScreen = data => {
      // this.setState({
      //   hasInitialized: false
      // });
      this.props.navigation.reset({
        index: 0,
        routes: [{name: TAB_NAV_SCREEN}]
      })
        this.props.navigation.navigate(TAB_NAV_SCREEN)
        
      };

    render() {
        return (
          <View style={styles.container}>
            {this.state.hasInitialized && (
              <AppButton title='Login' onPress={this.login}/>  
            )}
          </View>
        );
      }
  }

