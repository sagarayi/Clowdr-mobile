//ViewSchedule.js
import React, { Component } from "react";
import { gql, useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text } from "react-native";
// import { useAuth0 } from "@auth0/";
import GetAllConf from "../common/ListOfConferences"
import { useEffect } from "react";
const events = [
    { start: new Date(), end: new Date(), title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]

var initialDate = new Date()


const GET_ALL_USERS = gql`
query MyQuery {
    User {
      id
    }
  }
`;

const GET_ALL_EVENTS = gql`
query MyQuery {
    schedule_Event {
      conferenceId
      durationSeconds
      endTime
      id
      name
      roomId
      startTime
    }
  }
`
 function parseAndLoadEvents(data, confId) {
        
    if (data){
        data.schedule_Event.map((event) => {
            if(event.conferenceId == confId){
                const eachEvent = {
                    start: event.startTime,
                    end: event.endTime,
                    title: event.name
                }
                events.push(eachEvent)
            }
        })
        events.sort(function(event1, event2){
            return new Date(event1.start) - new Date(event2.start)
        });
        initialDate = events[0].start
    }
}

export default function ViewSchedule({route, navigation}) {
    // useEffect(() => {
    //     return function cleanup(){
    //         events.length = 0
    //     }
    //     // fetchEventData()
    // });
    
    const {confId, confName} = route.params

    // console.log(confId)
    navigation.setOptions({
        headerTitle: confName
    }) 

    const { loading, error, data } = useQuery(GET_ALL_EVENTS, { fetchPolicy: "no-cache" });

    if (loading) return <Text>'Loading...'</Text>;
    if (error) return <Text> `Error! ${error.message}`;</Text>
    
    parseAndLoadEvents(data, confId)
        
    return <EventCalendar
            initDate={initialDate}
            events={events}
            width={400}/>
}