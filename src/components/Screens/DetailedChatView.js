import React from "react";
import { useQuery } from '@apollo/client';
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, AsyncStorage, View, Button } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import MessageView from "./MessageView";
import { v4 as uuidv4 } from "uuid";
import Config from "react-native-config";
import io from "socket.io-client";
import { graphql } from "graphql";
import { useState } from "react";
import { useEffect } from "react";

const styles = StyleSheet.create({
    container: {
    //   height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    footer : {
        height: 100
    },
    messages: {
        flex: 1,
        height: "80%"
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
        width: 100
      }
  });

function getSenderIdForUserId(userId, senderDict) {
    if (senderDict){
        for (let user in senderDict) {
            console.log("Key : ", user)
            console.log("Value : ", senderDict[user])
            if (senderDict[user].userId === userId){
                return user
            }
        }
    }

    return ""
}

function getMessageObject(chatId, message, senderId) {
    const sId = uuidv4();
    const newMsg = {
                    sId: sId,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    chatId: chatId, 
                    message: message,
                    senderId: senderId,
                    // "c370b4fb-be18-4d61-9e9d-3802e9d0d373",
                    type: Constants.ChatMessageType.Message,
                    data: {},
                    isPinned: false
                }
    const action = {
        op: "INSERT",
        data: newMsg,
    };
    return action
}

function parseRegistrants(registrants){
    if (registrants){
        const userDict = {}
        const regs = registrants.registrant_Registrant
        for (let i=0; i<regs.length; i++) {
            userDict[regs[i].id] = regs[i]
        }
        return userDict
    }
    return {}
}

export default function DetailedChatView({route, navigation}) {

    const title = route.params.chatTitle
    navigation.setOptions({
        headerTitle: title
    }) 


    const token = route.params.token
    const userId = route.params.userId
    const confId = route.params.confId

    const [messages, setMessages] = useState([])
    const [chatText, setChatText] = useState("")

    const chatId = route.params.chatId

    const client = io(Config.WEBSOCKET_SERVER_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });
    client.emit("chat.subscribe", chatId);

    useEffect(() => {
        
        return () => {
            client.disconnect()
            console.log("Called while exiting view : ", )
            // client.off("chat.messages.send.ack")
            // client.off("chat.messages.receive")
            // client.off("chat.messages.send")
            // client.off("connect_error")
        }
        
    },[]);

    const { loading, error, data }  = useQuery(Queries.FETCH_SENDER_IDS)

    if (loading) {
        return <ActivityIndicator/>
        console.log("Isloading : ", loading)
    }
    
    if (error) {
        console.log("Error: ",error)
    }

    console.log("Data : ", data)

    const senderIdDict = parseRegistrants(data)

    const senderId = getSenderIdForUserId(userId, senderIdDict)

    client.on("chat.messages.send.ack", (msg) => {
        console.log("Chat message sent ", msg)
    })

    client.on("chat.messages.receive", (msg) => {
        console.log("received: ", msg)
        populateMessages(msg)
    });

    client.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    
      client.on("disconnect",(disc) => {
        console.log("client disconnect")
      });

      client.on("connect",(disc) => {
        console.log("client connected")
        
      });

    function submitChatMessage(chatMessage) {
        const uuid = uuidv4()
        
        const message = getMessageObject(chatId, chatMessage, senderId)
        
        client.emit("chat.messages.send", message)
        console.log("Sent?? "+JSON.stringify(message))
        chatMessage = ''

        chatMessages = messages.map(msgInfo => (
            <MessageView messageInfo={msgInfo}/>
        ));
    
      }

    function populateMessages(msg) {
        setMessages(oldMessages => [...oldMessages, msg]) 
        console.log("***************")
        console.log(messages)
        console.log("***************")
    }

    function onTextChanged(text) {
        setChatText(text)
    }
    

    return <ScrollView style={styles.container}>
         <View style={styles.messages}>
        {messages && messages.map((msgInfo) => {
            return <MessageView messageInfo={msgInfo} senderName={senderIdDict[msgInfo.senderId].displayName}/>
        })}
    </View> 
        <View style={styles.footer}>
        <Button onPress={() => submitChatMessage("Test message from mobile")} title="Send Message"/>
        </View> 

      </ScrollView>
}