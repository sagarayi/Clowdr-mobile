import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View, Image, StyleSheet } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import {Chip, Colors} from 'react-native-ui-lib';



const styles = StyleSheet.create({
    tinyLogo: {
      width: 20,
      height: 20,
      top: 25,
      marginLeft: 10
    },
    authorName: {
        left: 30,
        marginLeft: 10,
        fontWeight: "bold"
    },
    authorDetails: {
        left: 30,
        marginLeft: 10
    },
    rectangle: {
        marginTop: 10,
        marginLeft: 40,
        justifyContent: 'flex-start', flexDirection: 'row'
    }
  });

function getRoleText(roleName){
    if (roleName === Constants.RoleName.Author){
        return "Author"
    }

    if (roleName === Constants.RoleName.Presenter) {
        return "Presenter"
    }

    return "Chair"
}

function getBackgroundColorForRole(roleName){
    if (roleName === Constants.RoleName.Author){
        return Colors.purple70
    }

    if (roleName === Constants.RoleName.Presenter) {
        return Colors.red70
    }

    return Colors.yellow70
}

function getTextColorForRole(roleName){
    if (roleName === Constants.RoleName.Author){
        return "purple"
    }

    if (roleName === Constants.RoleName.Presenter) {
        return "red"
    }

    return "yellow"
}

export default function EventAuthorView({author}){
    console.log(author)


    return <View>
        <Image style={styles.tinyLogo}
        source={require("../../../assets/avatar.png")} />
        <Text style={styles.authorName}>{author.person.name}</Text>
        <View style={styles.rectangle} >
            <Chip label={getRoleText(author.roleName)} 
            backgroundColor={getBackgroundColorForRole(author.roleName)} 
            containerStyle={{borderWidth: 0}} 
            labelStyle={{
                color: getTextColorForRole(author.roleName)
              }}/>
        </View>
        <Text style={styles.authorDetails}>{author.person.affiliation}</Text>
        <Text>{Constants.lineBreak}</Text>
    </View>
}