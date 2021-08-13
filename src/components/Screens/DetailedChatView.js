import React from "react";
import { useQuery } from '@apollo/client';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Alert, ActionSheetIOS, AsyncStorage, View, Button } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import MessageView from "./MessageView";
import { v4 as uuidv4 } from "uuid";
import Config from "react-native-config";
import io from "socket.io-client";
import { graphql } from "graphql";
import { useState } from "react";
import { useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import { socket } from "../common/Socket";

const styles = StyleSheet.create({
    container: {
    //   height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    footer : {
        flex: 1,
        height: 100
    },
    messages: {
        flex: 1,
        height: "80%"
    },
    textInput: {
        borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding:10,
    height:50,
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

let count  = 0
export default function DetailedChatView({route, navigation}) {

    const title = route.params.chatTitle
    navigation.setOptions({
        headerTitle: title
    }) 


    const token = route.params.token
    const userId = route.params.userId
    const confId = route.params.confId

    const [messages, setMessages] = useState([])
    let [chatText, setChatText] = useState("")

    const chatId = route.params.chatId
    
    const client = io(Config.WEBSOCKET_SERVER_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });
    console.log("Client : ", client)
    client.emit("chat.subscribe", chatId);

    useEffect(() => {
        return () => {
            console.log("Called while exiting view : ", )
            client.off("chat.messages.send.ack")
            client.off("chat.messages.receive")
            client.off("chat.messages.send")
            client.off("connect_error")
            // client.disconnect()
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
          count--
        console.log("client disconnect : ", count)
      });

      client.on("connect",(disc) => {
          count++
        console.log("client connected : ",count )
        
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
        // console.log("New text: ", text)
        chatText = text
        // setChatText(text)
    }

    function sendMessage(){
        console.log("Send called")
        console.log("Current chat text is : ", chatText)
        if (chatText.length > 0) {
            submitChatMessage(chatText)
            setChatText("")
        }
    }

    function showTextInputPopUp() {
        Alert.prompt(
            "Send a message",
            "Enter the text that you want to send",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Send",
                onPress: messageText => submitChatMessage(messageText)
              }
            ]
          );
    }
    

    return <ScrollView style={styles.container}>
         <View style={styles.messages}>
        {messages && messages.map((msgInfo) => {
            return <MessageView messageInfo={msgInfo} senderName={senderIdDict[msgInfo.senderId].displayName}/>
        })}
    </View> 
        <View style={styles.footer}>
            <TextInput 
            style={styles.textInput}
            // value={chatText}
            returnKeyType='send'
            onChangeText={(text) => onTextChanged(text)}
            />
            
            <Button onPress={() => sendMessage() } title="Send Message"/>
        </View> 

      </ScrollView>
}