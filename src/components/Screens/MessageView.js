import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ActivityIndicator, ScrollView, StyleSheet, Text, Image, Button, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";
import TagElement from "./TagElement";
import { SearchBar } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    tinyLogo: {
      width: "10%",
      height: "30%",
      
      marginLeft: 10
    },
    authorName: {
        left: 40,
        marginLeft: 10,
        fontWeight: "bold"
    },
    authorDetails: {
        left: 30,
        marginLeft: 10
    },
    message:{
        left: 30
    },
    rectangle: {
        marginTop: 10,
        marginLeft: 40,
        justifyContent: 'flex-start', flexDirection: 'row'
    }
  });

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function getDayFromDate(dateString) {
    console.log(dateString)
    var d = new Date(dateString);
    return days[d.getDay()];
}

function getTimeFromDate(dateString) {
    var d = new Date(dateString);
    
    console.log(d.toTimeString())
    return d.getHours() + ":" + d.getMinutes()
    return new Date(dateString).format("HH:MM")
}

export default function MessageView({messageInfo}) {
    return <View>
        <Text style={styles.authorName} >Name</Text>
        <Text>{getDayFromDate(Date())}</Text>
        <Text>{getTimeFromDate(Date())}</Text>
        <Image style={styles.tinyLogo}
        source={require("../../../assets/avatar.png")} />
        <Text style={styles.message}>Message</Text>
    </View>
}