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
      height: "200%",
      
      marginLeft: 10
    },
    rowContainer: {
        flexDirection: 'row'
      },
    authorName: {
        left: 20,
        marginLeft: 10,
        fontWeight: "bold"
    },
    day: {  
        marginLeft: 10
    },
    outerView: {
        marginTop: 10,
        marginBottom: 10
    },
    message:{
        left: 20
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
    return <View style={styles.outerView}>
        <View style={styles.rowContainer}>
            <Text style={styles.day} >{getDayFromDate(messageInfo.created_at)}</Text>
            <Text style={styles.authorName} >{messageInfo.senderId}</Text>
        </View>
        <View style={styles.rowContainer}>
            <Text style={styles.day}>{getTimeFromDate(messageInfo.created_at)}</Text>
        </View>
        <View style={styles.rowContainer}>
            <Image 
                style={styles.tinyLogo}
                source={require("../../../assets/avatar.png")} />
            <Text style={styles.message}>{messageInfo.message}</Text>
        </View>
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 40
  }}
/>
    </View>
}