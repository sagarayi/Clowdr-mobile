//ViewSchedule.js
import React, { Component } from "react";
import { View, Button, Alert } from "react-native";
import EventCalendar from 'react-native-events-calendar'
import { Calendar } from 'react-native-big-calendar'

import AppButton from "../common/AppButton";
  const events = [
    { start: '2021-06-09 00:30:00', end: '2021-06-09 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 01:30:00', end: '2021-06-09 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 04:10:00', end: '2021-06-09 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 01:05:00', end: '2021-06-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 14:30:00', end: '2021-06-09 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2021-06-09 14:20:00', end: '2021-06-09 16:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]

export default class ViewSchedule extends React.Component {

    componentDidMount() {
        this.setState({
            events:[]
        })

    }

    fetchEventsForDate(){

    }
    render() {
        return <EventCalendar
        events={events}
        width={400}
      />
    }
}