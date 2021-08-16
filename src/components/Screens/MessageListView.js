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

let count = 0
export default function MessageList({socket, chatId, senderIdDict}){

    let mounted = false
    useEffect(() => {
        mounted = true
        
        return () => {
            mounted = false
            client.off("chat.messages.send.ack")
            client.off("chat.messages.receive")
            client.off("chat.messages.send")
            client.off("connect_error")
            client.disconnect()
        }
    } ,[])

    socket.emit("chat.subscribe", chatId);

    function populateMessages(msg) {
        if (mounted) {
            setMessages(oldMessages => [...oldMessages, msg])    
        }
    }

    const [messages, setMessages] = useState([])

    socket.on("chat.messages.send.ack", (msg) => {
        console.log("Chat message sent ", msg)
    })

    socket.on("chat.messages.receive", (msg) => {
        console.log("received: ", msg)
        populateMessages(msg)
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        alert(`Error connecting to the server. Reason : ${err.message}. Please navigate back to the previous screen and try again later.`);
        socket.off("connect_error")
    });
    
    socket.on("disconnect",(disc) => {
        count--
        console.log("client disconnect : ", count)
    });

    socket.on("connect",(disc) => {
        count++
        console.log("client connected : ",count )
    });


    return <ScrollView>
        {messages && messages.map((msgInfo) => {
            return <MessageView 
            key={msgInfo.sId}
                    messageInfo={msgInfo} 
                    senderName={senderIdDict[msgInfo.senderId].displayName}/>
        })}
    </ScrollView>
}