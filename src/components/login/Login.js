 // Login.js
 import React, { Component } from "react";
 import { View, Text, Button, ActivityIndicator } from "react-native";
 import { useNavigation } from '@react-navigation/native';


//  import { NavigationActions, StackActions } from "react-navigation";
 import Auth0 from "react-native-auth0";
 import Config from "react-native-config";
 import DeviceInfo from "react-native-device-info";
 import SInfo from "react-native-sensitive-info";
 import RNRestart from "react-native-restart";

 import {
    headerColorStyle,
    headerTextColorStyle,
    buttonStyle
  } from "../../styles/Colors";
  import styles from "../../styles/Login";

  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
  });

  
  

  export default class Login extends Component {
    
    // static navigationOptions = ({ navigation }) => {
    //   return {
    //     headerTitle: "Login", // the title to display in the header
    //     headerStyle: { // style of the headers body
    //       backgroundColor: headerColorStyle
    //     },
    //     headerTitleStyle: { // style of the header text
    //       color: headerTextColorStyle
    //     }
    //   };
    // };

    state = {
        hasInitialized: true
      };

    componentDidMount() {
        // SInfo.getItem("accessToken", {}).then(accessToken => {
        //   if (accessToken) {
        //     auth0.auth
        //          .userInfo({ token: accessToken })
        //          .then(data => {
        //            alert(accessToken)
        //              this.gotoHomeScreen()
        //         })
        //         .catch(err => {
        //         // next: add code for dealing with invalid access token
        //         });
        //   } else {
        //     SInfo.getItem("refreshToken", {}).then(refreshToken => { // get the refresh token from the secure storage
        //         // request for a new access token using the refresh token 
        //         auth0.auth
        //           .refreshToken({ refreshToken: refreshToken })
        //           .then(newAccessToken => {
        //             SInfo.setItem("accessToken", newAccessToken);
        //             RNRestart.Restart();
        //           })
        //           .catch(accessTokenErr => {
        //             console.log("error getting new access token: ", accessTokenErr);
        //           });
        //       });
        //     this.setState({
        //       hasInitialized: true
        //     });
        //   }
        // });
      }

      // const auth0 = new Auth0({ domain: 'dev-jjrbfhx5.us.auth0.com', clientId: 'CdIkhbvmgD4KlQgWmSyqiemdQAbOiP6Z' });
    login = () => {
      // alert("hi")
      // this.gotoHomeScreen()

      auth0
      .webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials =>
      // Successfully authenticated
      // Store the accessToken
      {
        console.log(credentials)
        console.log(credentials.accessToken)
        alert("Success")
            this.gotoHomeScreen()
            SInfo.setItem("accessToken", res.accessToken, {});
            SInfo.setItem("refreshToken", res.refreshToken, {});
          }
      
    )
    .catch(error => console.log(error));

      // alert("hi")
      // alert(Config.AUTH0_DOMAIN +Config.AUTH0_CLIENT_ID)
        // auth0.webAuth
        //   .authorize({
        //     scope: Config.AUTHO_SCOPE,
        //     audience: Config.AUTH0_AUDIENCE,
        //     // device: //DeviceInfo.getUniqueID(),
        //     prompt: "login" 
        //   })
        //   .then(res => {
        //     alert("Success")
        //     this.gotoHomeScreen()
        //     SInfo.setItem("accessToken", res.accessToken, {});
        //     SInfo.setItem("refreshToken", res.refreshToken, {});
            
        //   })
        //   .catch(error => {
        //     console.log("error occurred while trying to authenticate: ", error);
        //   });
      };
    
    gotoHomeScreen = data => {
        this.setState({
          hasInitialized: true
        });
        this.props.navigation.navigate('Home')
        this.props.navigation.reset({
          index: 0,
          routes: [{name: "Home"}]
        })
      };

    render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator
              size="large"
              color="#05a5d1"
              animating={!this.state.hasInitialized}
            />
            
            {this.state.hasInitialized && (
              <Button onPress={this.login} title="Login" />  
            )}
          </View>
        );
      }
  }

