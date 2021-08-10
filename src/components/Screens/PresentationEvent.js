import React from "react";
import { useQuery } from '@apollo/client';
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, AsyncStorage, Button } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";
import TagElement from "./TagElement";
import {HeaderBackButton} from "@react-navigation/stack";
import { useEffect, useState } from "react";


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
        headerLeft: () => (
            <HeaderBackButton
            label="Back"
             onPress={()=> {
                events = []
                navigation.pop()

            }}/>
        ),
        headerRight: () => (<Button onPress={showChatMenu} title="..."/>)
    }) 

    const [currentAcessToken, setCurrentAcessToken] = useState('');

    useEffect(() => {
      if(!currentAcessToken){
        fetchAccessToken();
      }
      if(!currentUserId){
        fetchCurrentUserId();
      }
  },[]);

  const fetchAccessToken= async() =>{
    const accessToken = await AsyncStorage.getItem(Constants.ACCESS_TOKEN)
    setCurrentAcessToken(accessToken)
  };

  const [currentUserId, setCurrentUserId] = useState('');



  const fetchCurrentUserId= async() =>{
    const userId = await AsyncStorage.getItem(Constants.USER_ID)
    setCurrentUserId(userId)
  };


    function showChatMenu() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ['Cancel', 'Event chat', 'All chats'],
              cancelButtonIndex: 0
            },
            (buttonIndex) => {
              if (buttonIndex === 2) {
                navigateTo(Constants.ALL_CHAT_VIEW)
              }
              if (buttonIndex === 1) {
                  console.log("chat Id: "+chatId)
                  console.log("chat title: "+title)
                  
                  navigation.navigate(Constants.DETAILED_CHAT_VIEW, {
                    chatId: chatId,
                    chatTitle: title,
                    token: currentAcessToken,
                    userId: currentUserId
                })
              }
            }
          );
    }

    function navigateToVideoStream(url){
        
        if (url) {
            navigation.navigate(Constants.VIDEO_STREAM,{
                videoURI: url
                // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                // "https://www.youtube.com/embed/5qap5aO4i9A"
            })
        } else {
            alert("Error loading URL")
        }
    }

    

    function navigateTo(screenName) {
        navigation.navigate(screenName)
    }
    const event = route.params.event
    console.log("Event : "+ JSON.stringify(event))

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
        return <Text>Error loading data</Text>
    }else {
        
    }
    console.log("Loading : "+ loading)
    console.log(JSON.stringify(data))

    const itemData = data.content_Item_by_pk

    // var abstractElement = <View></View>

    const chatId = itemData.chatId
    const title = event.title
    
    var abstractItem = []
    if (itemData && itemData.elements){
    //    const  abstractElement = (() => {
            abstractItem = itemData.elements.find(
                (element) => element.typeName === Constants.Content_ElementType.Abstract
            );
            // return abstractItem && <EventElement element={abstractItem} />;
        // });
    }

    var videoItem = []
    if (itemData && itemData.elements){
        itemData.elements.map((element) => {
         if(element.typeName === Constants.Content_ElementType.Video ||
            element.typeName === Constants.Content_ElementType.VideoLink ) {
             videoItem.push(element) 
         }
        });
    }
    
    

    return <ScrollView>
        {loading && <ActivityIndicator size="large"/>}
        {itemData && <TagElement confId={event.confId}/>}
        {itemData && videoItem && videoItem.map((video) => {
            const url = video.data[0].data.url
            if (url){
                return <AppButton title={video.name} onPress={()=>{navigateToVideoStream(url)}}/>   
            }
        })}
        {itemData && itemData.itemPeople && itemData.itemPeople.map((author) => {
           return <EventAuthorView author={author}/>
        })}
        {itemData && <EventElement element={abstractItem} />}
        <Text>{Constants.lineBreak}</Text>
        
    </ScrollView>
}