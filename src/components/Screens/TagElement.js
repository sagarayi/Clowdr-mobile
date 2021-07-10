import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import {Chip, Colors, Spacings} from 'react-native-ui-lib';
import Color from "tinycolor2";
import tinycolor from "tinycolor2";

const styles = StyleSheet.create({
    rectangle: {
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'flex-start', flexDirection: 'row'
    },
    tagName: {
        alignContent: "center",
        textAlignVertical: "center",
        textAlign: "center"
    }
})

function getColorForString(colorString){
    const color = tinycolor(colorString)
    console.log("Color hex: "+color.toHex())
    return "#"+color.toHex()
}

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
            return <View style={styles.rectangle}>
            <Chip label={tag.name} backgroundColor={getColorForString(tag.colour)} labelStyle={{
                color: 'black'
              }}/>
            </View>
        })}
    </View>
}