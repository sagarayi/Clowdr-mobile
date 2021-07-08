import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";


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

    const itemId = event.itemId

    navigation.setOptions({
        headerTitle: event.title
    }) 
    const authors = [1, 2, 3]

    console.log("Event id: "+event.itemId)
    const { loading, error, data }  = useQuery(Queries.GET_ITEM_ELEMENTS, {
        variables: {
            itemId: itemId,
        },
    })

    if (error) {
        console.log("error: "+error)
    }else {
        
    }
    console.log(JSON.stringify(data))

    const itemData = data.content_Item_by_pk


    const abstractElement = useMemo(() => {
        const abstractItem = itemData.elements.find(
            (element) => element.typeName === Constants.Content_ElementType.Abstract
        );
        return abstractItem && <EventElement element={abstractItem} />;
    }, [itemData.elements]);
    

    return <ScrollView>
        <AppButton title="Discussion Room" onPress={()=>{alert("this will join the presentation")}}/>
        {data.content_Item_by_pk.itemPeople && data.content_Item_by_pk.itemPeople.map((author) => {
            // alert(author)
           return <EventAuthorView author={author}/>
        })}
        {abstractElement}
        <Text>{Constants.lineBreak}</Text>
    </ScrollView>
}