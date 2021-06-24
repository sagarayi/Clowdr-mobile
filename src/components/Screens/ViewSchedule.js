//ViewSchedule.js
import React, { Component } from "react";
import { gql, useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text } from "react-native";
// import { useAuth0 } from "@auth0/";
import GetAllConf from "../common/ListOfConferences"
  const events = [
    { start: new Date(), end: new Date(), title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 01:30:00', end: '2021-06-09 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 04:10:00', end: '2021-06-09 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 01:05:00', end: '2021-06-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 14:30:00', end: '2021-06-09 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 14:20:00', end: '2021-06-09 16:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]


const GET_ALL_USERS = gql`
query MyQuery {
    User {
      id
    }
  }
`;
export default function ViewSchedule({route, navigation}) {
    const {confId, confName} = route.params

    navigation.setOptions({
        headerTitle: confName
    }) 
    const { loading, error, data } = useQuery(GET_ALL_USERS, { fetchPolicy: "no-cache" });
    
    if (loading) return <Text>'Loading...'</Text>;
    if (error) return <Text> `Error! ${error.message}`;</Text>
        
    return <EventCalendar
            events={events}
            width={400}/>
}