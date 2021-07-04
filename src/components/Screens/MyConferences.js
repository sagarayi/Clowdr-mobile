//MyConferences.js
import React, { Component } from "react";
import { View, Button, Alert, AsyncStorage } from "react-native";
import AppButton from "../common/AppButton";
import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import ListOfConferences from "../common/ListOfConferences"
import * as Constants from "../common/Constants";

const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
  });

export default class MyConferences extends React.Component {

    componentDidMount () {
        this.setNavigationBarStyle()
      }
    
    setNavigationBarStyle = () => {
    this.props.navigation.setOptions({
        headerLeft: ()=> null,
        headerRight: () => (<Button onPress={this.logout} title="Logout"/>),
        headerTitle: "My Conferences",
    }) 
    }

    logout = () => {
    this.deleteLocalCache(Constants.USER_ID)
    this.deleteLocalCache(Constants.ACCESS_TOKEN)
    .then(this.deleteLocalCache(Constants.REFRESH_TOKEN).then(() =>{
        // auth0.webAuth
        // .clearSession()
        // .then(res => {
        // console.log("clear session ok");
        // })
        // .catch(err => {
        // console.log("error clearing session: ", err);
        // });

    this.gotoLoginScreen(); 
    }))
    };
  
    gotoLoginScreen = () => {
        
        this.props.navigation.reset({
        index: 0,
        routes: [{name: Constants.LOGIN_SCREEN}]
        })

        this.props.navigation.navigate(Constants.LOGIN_SCREEN)
    };

    deleteLocalCache = async(key) => {
        await AsyncStorage.removeItem(key)
      }

    navigateToConference(conferenceId, shortName) {
        this.props.navigation.navigate(Constants.VIEW_SCHEDULE,{
            confId: conferenceId,
            confName: shortName
        })
    } 

    navigateToJoinConference() {
        Alert.prompt(
            "Join a conference",
            "Enter an invite code to join a conference.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Join",
                onPress: inviteCode => console.log("Invite code entered: " + inviteCode)
              }
            ]
          );
    }

    render() {
    return <View>
        <ListOfConferences onConfClick={(id, shortName)=>{
            this.navigateToConference(id, shortName)}}/>
        {/* <AppButton title="Conf 1" onPress={() => this.navigateToConference("Conf 1")}/> */}
        {/* <AppButton title="Conf 2" onPress={() => this.navigateToConference("Conf 2")}/> */}
        {/* <AppButton title="Join conf" onPress={() => this.navigateToJoinConference()}/> */}
    </View>
    }
}