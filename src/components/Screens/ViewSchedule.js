//ViewSchedule.js
import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import PresentationEvent from "../Screens/PresentationEvent";
// import { useAuth0 } from "@auth0/";
import GetAllConf from "../common/ListOfConferences"
import { useEffect } from "react";
const events = [
    { start: new Date(), end: new Date(), title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]

var initialDate = new Date()


 function parseAndLoadEvents(data) {
        console.log(JSON.stringify(data))
    if (data){
        data.schedule_Event.map((event) => {
            // if(event.conferenceId == confId){
                const eachEvent = {
                    start: event.startTime,
                    end: event.endTime,
                    title: event.name,
                    id: event.id,
                }
                events.push(eachEvent)
            // }
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

    function onEventTapped(event){
        navigation.navigate(Constants.PRESENTATION_EVENT, {
            event:event
        })
    }
    
    const {confId, confName} = route.params

    // console.log(confId)
    navigation.setOptions({
        headerTitle: confName
    }) 

    const { loading, error, data } = useQuery(Queries.GET_ALL_EVENTS,{
        variables: {confId: confId}
    }, { fetchPolicy: "no-cache" });

    if (loading) return <Text>'Loading...'</Text>;
    if (error) return <Text> `Error! ${error.message}`;</Text>
    
    parseAndLoadEvents(data, confId)
        
    return <EventCalendar
            initDate={initialDate}
            events={events}
            width={400}
            eventTapped={(event)=>{ onEventTapped(event)}}/>
}