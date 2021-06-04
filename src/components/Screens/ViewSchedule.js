//ViewSchedule.js
import React, { Component } from "react";
import { View, Button, Alert } from "react-native";
import { Calendar } from 'react-native-big-calendar'

import AppButton from "../common/AppButton";

const events = [
    {
      title: 'Meeting',
      start: new Date(2021, 5, 4, 11, 0),
      end: new Date(2021, 5, 4, 11, 30)
    },
    {
      title: 'Coffee break',
      start: new Date(2020, 1, 11, 15, 45),
      end: new Date(2020, 1, 11, 16, 30),
    },
  ]

export default class ViewSchedule extends React.Component {

    render() {
        return <View>
            <Calendar events={events} height={600} mode="day" />
        </View>
    }
}