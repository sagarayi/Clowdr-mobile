import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import {Chip, Colors, Spacings} from 'react-native-ui-lib';

const styles = StyleSheet.create({
    rectangle: {
        width: 50,
        height: 20,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2
    },
    tagName: {
        alignContent: "center",
        textAlignVertical: "center",
        textAlign: "center"
    }
})

export default function TagElement({confId}) {
    console.log("ConfId : "+confId)

    const {loading, error, data} = useQuery(Queries.FETCH_TAGS,{
        variables: {
            conferenceId: confId,
        },
    })

    
    if (loading){
        return <ActivityIndicator size="large"/>
    }
    console.log(error)
    console.log(data)

    return <View>
        { data.collection_Tag && data.collection_Tag.map((tag) => {
            return <Chip label={tag.name}/>
        })}
    </View>
}