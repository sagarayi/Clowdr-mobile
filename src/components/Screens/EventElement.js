import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View, Image, StyleSheet } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";

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

export default function EventElement({element}) {
    if(element.typeName === Constants.Content_ElementType.Abstract){
        const lastIndex = parseInt(element.data.length) - 1
        const abstractText = element.data[lastIndex].data.text 

        return <View>
            <Text style={styles.heading}>Abstract</Text>
            <Text style={styles.abstractText}>{abstractText}</Text>
        </View>
    }
    return <View>

    </View>
}