import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";


const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        left: 10,
        right: 10
    },

    abstractText: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: "justify"
    }
})

export default function PresentationEvent({route, navigation}) {

    const event = route.params.event

    navigation.setOptions({
        headerTitle: event.title
    }) 
    const authors = [1, 2, 3]

    return <ScrollView>
        <AppButton title="Discussion Room" onPress={()=>{alert("this will join the presentation")}}/>
        {authors.map((author) => {
            // alert(author)
           return <EventAuthorView name={"Author name"+author} institution="Northeastern" role="Author" />
        })}
        <Text>{Constants.lineBreak}</Text>
        <Text style={styles.heading}>Abstract</Text>
        <Text style={styles.abstractText}>{Constants.loremIpsumText}</Text>
    </ScrollView>
}