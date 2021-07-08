import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View, Image, StyleSheet } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";



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

export default function EventAuthorView({author}){
    console.log(author)


    return <View>
        <Image style={styles.tinyLogo}
        source={require("../../../assets/avatar.png")} />
        <Text style={styles.authorName}>{author.person.name}</Text>
        <Text style={styles.authorDetails}>{getRoleText(author.roleName)}</Text>
        <Text style={styles.authorDetails}>{author.person.affiliation}</Text>
        <Text>{Constants.lineBreak}</Text>
    </View>
}