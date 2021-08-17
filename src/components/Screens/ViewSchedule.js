//ViewSchedule.js
import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Button, Text, ActivityIndicator, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import {HeaderBackButton} from "@react-navigation/stack";
import styles from "../../styles/Login";
import PresentationEvent from "../Screens/PresentationEvent";
// import { useAuth0 } from "@auth0/";
import GetAllConf from "../common/ListOfConferences"
import { useEffect } from "react";
var events = [ ]

var initialDate = new Date()


 function parseAndLoadEvents(data, confId) {
        console.log(JSON.stringify(data))
    if (data){
        data.schedule_Event.map((event) => {
            // if(event.conferenceId == confId){
                const eachEvent = {
                    start: event.startTime,
                    end: event.endTime,
                    title: event.name,
                    id: event.id,
                    itemId: event.itemId,
                    confId: confId
                }
                events.push(eachEvent)
            // }
        })
        events.sort(function(event1, event2){
            return new Date(event1.start) - new Date(event2.start)
        });
        if (events.length > 0) {
            initialDate = events[0].start   
        }
    }
}

export default function ViewSchedule({route, navigation}) {

    navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton
            label={confName}
             onPress={()=> {
                events = []
                navigation.pop()

            }}/>
        ),
        headerRight: null
    })

    function onEventTapped(event){
        navigation.navigate(Constants.PRESENTATION_EVENT, {
            event:event
        })
    }

    function navigateToAllChatView() {
        navigation.navigate(Constants.ALL_CHAT_VIEW)
    }
    
    const {confId, confName} = route.params

    // console.log(confId)
    navigation.setOptions({
        headerTitle: confName
    }) 

    const { loading, error, data } = useQuery(Queries.GET_ALL_EVENTS,{
        variables: {confId: confId}
    }, { fetchPolicy: "no-cache" });

    if (loading) {
        return <ActivityIndicator size="large" />
    }
    // if (error) return <Text> `Error! ${error.message}`;</Text>
    
    parseAndLoadEvents(data, confId)
    console.log("events ", events)
    if(events.length == 0) {
        return <View style={styles.container}>
            <Text> No Events to display</Text>
        </View>
    }
        
    return <EventCalendar
            initDate={initialDate}
            events={events}
            width={400}
            eventTapped={(event)=>{ onEventTapped(event, confId)}}/>
}