import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, AsyncStorage, View, Button } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";
import TagElement from "./TagElement";
import { SearchBar } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";
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
    }
  });



const fetchCurrentUserId= async() =>{
    const userId = await AsyncStorage.getItem(Constants.USER_ID)
    // console.log("User id : "+ userId)
    return userId
  };

function getMessageObject(chatId, message, senderId) {
    // created_at: string;
    // updated_at: string;
    // type: Chat_MessageType_Enum;
    // chatId: string;
    // senderId: string | null | undefined;
    // message: string;
    // data: any;
    // isPinned: boolean;
    // duplicatedMessageSId?: string | null | undefined;
    // systemId?: string | null | undefined;
    // remoteServiceId?: string | null | undefined;
    // sId: string;
    const sId = uuidv4();
    const newMsg = {
                    sId: sId,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    chatId: chatId, 
                    message: message,
                    senderId: "c370b4fb-be18-4d61-9e9d-3802e9d0d373",
                    // uuidv4(),
                    // 
                    // senderId,
                    type: Constants.ChatMessageType.Message,
                    data: {},
                    isPinned: false
                }
    const action = {
        op: "INSERT",
        data: newMsg,
    };
    // console.log("Constructed object: "+ JSON.stringify(action))
    return action
}

const messages1 = [
    {
        sId: uuidv4(),
        message: "Test message 1",
        senderId: "Sender Name 1",
        created_at: Date()
    },
    {
        sId: uuidv4(),
        message: "Test message 2",
        senderId: "Sender Name 2",
        created_at: Date()
    }
]

function getMessageObjectFromResponse(response) {
    const res = JSON.parse(response)
    
    if (!res || !res.data) {
        return {}
    }
    const data = res.data
    // console.log("response parsed  : "+ JSON.stringify(data))
    // console.log("response parsed sid : "+ data.sId)
    // console.log("response parsed message : "+ data.message)
    // console.log("response parsed senderId : "+ data.senderId)
    // console.log("response parsed created_at : "+ data.created_at)
    const msg =     {
        sId: data.sId,
        message: data.message,
        senderId: data.senderId,
        // data.senderId,
        created_at: data.created_at
    }

    return msg

}

function parseRegistrants(registrants){
    console.log("Registrants : ",JSON.stringify(registrants))
    if (registrants){
        const userDict = {}
        const regs = registrants.registrant_Registrant
        regs.map((person) => {
            console.log(person)
            console.log(JSON.stringify(person))
            userDict[person.id] = person
        })

        console.log(userDict)
        return userDict
    }
    return {}
}

function getNameForId(registrants, id) {
    return registrants[id].displayName
}

export default function DetailedChatView({route, navigation}) {
    // var client = null
    // useEffect(() => {

    // })

    // console.log("route : "+ JSON.stringify(route))
    
    const title = route.params.chatTitle

    // const socket = io("http://localhost:1234");

    const token = route.params.token
    const userId = route.params.userId
    const confId = route.params.confId
    console.log("token : ", token)
    // 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJOeW9NQ1BtLWpzeWVFY2JPVDRkRyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJ1bmF1dGhlbnRpY2F0ZWQiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTEyNTMyMDQyMTc5MTM5MDQzMzYwIiwieC1oYXN1cmEtY29uZmVyZW5jZS1zbHVncyI6IntcIm1hYzIwMjFcIixcIm1hYzIwMjJcIn0ifSwiaXNzIjoiaHR0cHM6Ly9kZXYtampyYmZoeDUudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyNTMyMDQyMTc5MTM5MDQzMzYwIiwiYXVkIjpbImhhc3VyYSIsImh0dHBzOi8vZGV2LWpqcmJmaHg1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mjg1MjQzMTMsImV4cCI6MTYyODYxMDcxMywiYXpwIjoiQ2RJa2hidm1nRDRLbFFnV21TeXFpZW1kUUFiT2lQNloiLCJzY29wZSI6Im9wZW5pZCJ9.ZsVlNpZFhAAyB39R6BGLJMNZXBeHl87HXIesCcWh_GfInh0x5-cITPVLnaRWsiqRR8oAU397gNmK4uCSNaVKpGH5jCPvsWMbWfniW-ebq-6bclRbZnUYfzigtzypMMTU-STb4wEAwDJATcR6PB5zGqRcA_liNcwkqVJsShCzGQQKZC6kO4ZLc1zn3VtdGsyuuTV4PYHD3o5Os-euzia8rwPKPgcPSce7VOIC0J8i4cBuQhcLQ60i6uQLtjYA2pJEVhCkfEHpTz1uGm4xJPIqaZBtorj0iFr1-r15b0fHOjL3cGp07gChmH7BzmnAonIvQBXg-L63T86NkojH-1e8-g'
    // console.log("Token: ",token)
    // 
    // fetchCurrentUserId()
    // console.log("Access token : "+token)

    // io.connect(Config.WEBSOCKET_SERVER_URL)

    console.log(client)
    const [messages, setMessages] = useState([])
    // console.log("Messages : ", messages)

    // console.log(Config.WEBSOCKET_SERVER_URL)

    const uuid = uuidv4()
    
    // client.emit('chat.messages.send', {});

    // client.on("connect", () => {
    //     console.log("Socket connected")
    // })

    const chatId = route.params.chatId
    // const server_url = "ws://localhost:3002"
    // var ws = new WebSocket('ws://localhost:3002');
    // console.log(ws)
    // ws.send("Test")
    // ws.onopen = () => {
    //     // connection opened
    //     console.log("It connected !!")
    //   };

    const client = io(Config.WEBSOCKET_SERVER_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });

    const { loading, error, data }  = useQuery(Queries.FETCH_SENDER_IDS)

    if (loading) {
        console.log("Isloading : ", loading)
    }
    
    if (error) {
        console.log("Error: ",error)
        // alert("Error fetching participants for chat")
    }

    console.log("Data : ", data)

    const senderIdDict = parseRegistrants(data)
    console.log(getNameForId(senderIdDict, "9f471a0a-b99e-4d20-8465-a549fe29e4cb"))

    useEffect(() => {
        console.log("chatid inside: ", chatId)
        client.emit("chat.subscribe", chatId);
    },[]);
    // console.log("Auth : "+ JSON.stringify(client.auth))
    
    
    
    // console.log(client.io.)
    client.on("chat.subscribed", () => {
        console.log("Chat subscribed ")
        
    })

    client.on("chat.messages.send.ack", (msg) => {
        console.log("Chat message sent ", msg)
        populateMessages(msg)
    })

    client.on("chat.messages.receive", (msg) => {
        // console.info("Chat message received", msg);
        console.log("received: ", msg)
        populateMessages(msg)
    });

    client.on("connection", () => {
        console.log("Connected")
    })

    client.on("chat:chat."+userId, () => {
        console.log("Notification on")
    })


    // client.emit("chat.subscribe", uuid);
    

    // console.log(client)

    // const sId = uuidv4();
    //         const newMsg: Message = {
    //             sId,
    //             created_at: new Date().toISOString(),
    //             updated_at: new Date().toISOString(),
    //             chatId, e6a44245-60d8-4bd8-88da-bd488ab93b8b
    //             message,
    //             senderId: this.globalState.registrant.id,
    //             type,
    //             data,
    //             isPinned,
    //         };
    //         const action: Action<Message> = {
    //             op: "INSERT",
    //             data: newMsg,
    //         };
    //         socket.emit("chat.messages.send", action);

    
    // socket.on("chat message", msg => {
        

    //     setMessages(oldMessages => [...oldMessages, message])
    //     console.log(messages)
    //     chatMessagesObject.push(msg)
    //     console.log("Got back :" + msg)
    //     //   this.setState({ chatMessages: [...this.state.chatMessages, msg]   
    // });

    function submitChatMessage(chatMessage) {
        const uuid = uuidv4()
        
        const message = getMessageObject(chatId, chatMessage, userId)
        
        client.emit("chat.messages.send", message)
        console.log("Sent?? "+message)
        // socket.emit('chat message', message);
        chatMessage = ''

        chatMessages = messages.map(msgInfo => (
            <MessageView messageInfo={msgInfo}/>
        ));
    
      }

    function populateMessages(msg) {
        // const message = getMessageObjectFromResponse(JSON.parse(msg))
        messages.push(msg)
        console.log(messages)
    }


    var chatMessage = ""
    var chatMessagesObject= []

    // var chatMessages = messages.map(msgInfo => (
    //     <MessageView messageInfo={msgInfo}/>
    //   ));
    // console.log("Camer here ")
    navigation.setOptions({
        headerTitle: title
    }) 

    // console.log(chatMessages)
    

    return <ScrollView style={styles.container}>
            
            {/* {chatMessagesObject.map((msg)=> {
                return <Text style={{borderWidth: 2, top: 500}}>{msg}</Text>
            })} */}
        {/* {chatMessages} */}
         <View style={styles.messages}>
        {messages && messages.map((msgInfo) => {
            return <MessageView messageInfo={msgInfo}/>
        })}
    </View> 
        <View style={styles.footer}>
        <Button onPress={() => submitChatMessage("Test message from mobile")} title="Send Message"/>
        {/* <TextInput
          style={{height: 40, borderWidth: 1, top: 600}}
        //   autoCorrect={false}
        //   value={chatMessage}
        //   onSubmitEditing={() => submitChatMessage()}
        //   onChangeText={(chat) => {
        //       console.log("new chat "+chat)
        //       console.log("current "+chatMessage)
        //     chatMessage = chatMessage + chat
        //   }}
        /> */}
        </View> 

      </ScrollView>
}