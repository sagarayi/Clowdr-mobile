import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";


export default function PresentationEvent({route, navigation}) {

    const event = route.params.event

    navigation.setOptions({
        headerTitle: event.title
    }) 
    const authors = [1, 2, 3]

    return <View>
        <AppButton title="Discussion Room" onPress={()=>{alert("this will join the presentation")}}/>
        {authors.map((author) => {
            // alert(author)
           return <EventAuthorView name={"Author name"+author} institution="Northeastern" role="Author" />
        })}
    </View>
}