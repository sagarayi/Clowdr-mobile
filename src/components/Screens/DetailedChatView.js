import React from "react";
import { useQuery } from '@apollo/client';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Alert, Image, TouchableOpacity, View, Button,KeyboardAvoidingView } from "react-native";
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
import MessageList from "./MessageListView";

const styles = StyleSheet.create({
    container: {
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
        margin:10,
        width: "80%",
        backgroundColor: '#ffffff',
        borderRadius: 10
    },

    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 30,
        backgroundColor: '#D9D9D9',
    },

    button: {
        backgroundColor: '#58b655',
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        height:50,
        width:50,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },
    buttonIcon: {
        height: 25,
        width: 25,
        padding:10,
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

let count  = 0;
export default function DetailedChatView({route, navigation}) {

    const title = route.params.chatTitle
    navigation.setOptions({
        headerTitle: title
    }) 


    const token = route.params.token
    const userId = route.params.userId
    const confId = route.params.confId

    const [chatText, setChatText] = useState("")

    const chatId = route.params.chatId
    

    const client = io(Config.WEBSOCKET_SERVER_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });

    useEffect(() => {
        return () => {
            console.log("Called while exiting view : ", )
            // client.off("chat.messages.send.ack")
            // client.off("chat.messages.receive")
            // client.off("chat.messages.send")
            // client.off("connect_error")
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

    function submitChatMessage(chatMessage) {
        const message = getMessageObject(chatId, chatMessage, senderId)
        
        client.emit("chat.messages.send", message)
        console.log("Sent?? "+JSON.stringify(message))
      }

    function onTextChanged(text) {
        setChatText(text)
    }

    function sendMessage(){
        console.log("Send called")
        console.log("Current chat text is : ", chatText)
        if (chatText.length > 0) {
            submitChatMessage(chatText)
            setChatText("")
        }
    }
    

    return <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={60}
    style={styles.container} >
         <View style={styles.messages}>
             <MessageList 
             socket={client} 
             chatId={chatId}
             senderIdDict={senderIdDict}/>
    </View> 
        
        <View style={styles.rowContainer}>
            <TextInput 
            style={styles.textInput}
            value={chatText}
            returnKeyType='done'
            onChangeText={(text) => onTextChanged(text)}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{sendMessage()}}>
                <Image source={require(("../../../assets/send_icon.png"))} style={styles.buttonIcon}/>
            </TouchableOpacity>
            {/* <Button onPress={() => sendMessage() } title="Send Message"/> */}
        </View>        
        </KeyboardAvoidingView> 
}