//MyConferences.js
import React, { Component } from "react";
import { View, Button, AsyncStorage } from "react-native";
import AppButton from "../common/AppButton";


const TAB_NAV_SCREEN = "TabNav"
export default class MyConferences extends React.Component {

    navigateToConference(conference) {
        this.props.navigation.navigate(TAB_NAV_SCREEN)
    } 

    navigateToJoinConference() {
        this.props.navigation.navigate(TAB_NAV_SCREEN)
    }

    render() {
    return <View>
        <AppButton title="Conf 1" onPress={() => this.navigateToConference("Conf 1")}/>
        <AppButton title="Conf 2" onPress={() => this.navigateToConference("Conf 2")}/>
        <AppButton title="Join conf" onPress={() => this.navigateToJoinConference()}/>
    </View>
    }
}