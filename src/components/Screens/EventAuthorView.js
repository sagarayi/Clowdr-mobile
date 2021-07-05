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
        marginLeft: 10
    },
    authorDetails: {
        left: 30,
        marginLeft: 10
    }
  });

export default function EventAuthorView({name, institution, role}){
    
    return <View>
        <Image style={styles.tinyLogo}
        source={require("../../../assets/avatar.png")} />
        <Text style={styles.authorName}>{name}</Text>
        <Text style={styles.authorDetails}>{role}</Text>
        <Text style={styles.authorDetails}>{institution}</Text>
        <Text>{Constants.lineBreak}</Text>
    </View>
}