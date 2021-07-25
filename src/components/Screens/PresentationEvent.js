import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, Button } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";
import TagElement from "./TagElement";


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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

export default function PresentationEvent({route, navigation}) {

    navigation.setOptions({
        headerLeft: ()=> null,
        headerRight: () => (<Button onPress={showChatMenu} title="..."/>)
    }) 


    function navigateToVideoStream(){
        navigation.navigate(Constants.VIDEO_STREAM,{
            videoURI: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            // "https://www.youtube.com/embed/5qap5aO4i9A"
            // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            // 
            // https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
        })
    }

    function showChatMenu() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ['Cancel', 'Event chat', 'All chats'],
              cancelButtonIndex: 0
            },
            (buttonIndex) => {
              if (buttonIndex === 2) {
                navigateToAllChatView()
              }
              if (buttonIndex === 1) {
                alert("Will navigate to detailed chat view")
              }
            }
          );
    }

    function navigateToAllChatView() {
        navigation.navigate(Constants.ALL_CHAT_VIEW)
    }
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

    if (loading) {
        return <ActivityIndicator size="large" />
    }
    
    if (error) {
        console.log("error: "+error)
    }else {
        
    }
    console.log("Loading : "+ loading)
    console.log(JSON.stringify(data))

    const itemData = data.content_Item_by_pk

    // var abstractElement = <View></View>

    var abstractItem = []
    if (itemData && itemData.elements){
    //    const  abstractElement = (() => {
            abstractItem = itemData.elements.find(
                (element) => element.typeName === Constants.Content_ElementType.Abstract
            );
            // return abstractItem && <EventElement element={abstractItem} />;
        // });
    }
    

    return <ScrollView>
        {loading && <ActivityIndicator size="large"/>}
        {itemData && <TagElement confId={event.confId}/>}
        {itemData &&<AppButton title="Live Video" onPress={()=>{navigateToVideoStream()}}/>}
        {itemData && itemData.itemPeople && itemData.itemPeople.map((author) => {
           return <EventAuthorView author={author}/>
        })}
        {itemData && <EventElement element={abstractItem} />}
        <Text>{Constants.lineBreak}</Text>
        
    </ScrollView>
}