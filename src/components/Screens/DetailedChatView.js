import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, AsyncStorage, View } from "react-native";
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

const styles = StyleSheet.create({
    container: {
      height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });

const fetchAccessToken = async() => {
    const accessToken = await AsyncStorage.getItem(Constants.ACCESS_TOKEN);
    console.log(accessToken)
    return accessToken
}

const fetchCurrentUserId= async() =>{
    const userId = await AsyncStorage.getItem(Constants.USER_ID)
    console.log("User id : "+ userId)
    return userId
  };

function getMessageObject(chatId, message, senderId) {
    const sId = uuidv4();
    const newMsg = {
                    sId: sId,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    chatId: chatId, 
                    message: message,
                    senderId: senderId,
                    type: Constants.ChatMessageType.Message,
                    data: "",
                    isPinned: "false",
                }
    const action = {
        op: "INSERT",
        data: newMsg,
    };
    console.log("Constructed object: "+ JSON.stringify(action))
    return action
}

export default function DetailedChatView({route, navigation}) {

    console.log("route : "+ JSON.stringify(route))
    const chatId = route.params.chatId
    const title = route.params.chatTitle

    // const socket = io("http://localhost:1234");

    const token = fetchAccessToken()
    const userId = fetchCurrentUserId()
    console.log("Access token : "+token)
    const client = io(Config.WEBSOCKET_SERVER_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });
    // io.connect(Config.WEBSOCKET_SERVER_URL)

    

    console.log(Config.WEBSOCKET_SERVER_URL)

    client.on("connect", () => {
        console.log("Socket connected")
    })

    client.on("chat.subscribe", () => {
        console.log("Chat subscribed ")
    })


    

    console.log(client)

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
    //     chatMessagesObject.push(msg)
    //     console.log("Got back :" + msg)
    //     //   this.setState({ chatMessages: [...this.state.chatMessages, msg]   
    // });

    function submitChatMessage() {
        const uuid = uuidv4()
        
        const message = getMessageObject(chatId, chatMessage, userId)
        // client.emit("chat.subscribe", uuid);
        client.emit("chat.messages.send", message)
        console.log("Sent?? "+uuid)
        // socket.emit('chat message', chatMessage);
        chatMessage = ''
      }


    var chatMessage = ""
    var chatMessagesObject= []

    const chatMessages = chatMessagesObject.map(chatMessage => (
        <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
      ));

    navigation.setOptions({
        headerTitle: title
    }) 

    console.log(chatMessages)
    

    return <View style={styles.container}>
            {chatMessagesObject.map((msg)=> {
                return <Text style={{borderWidth: 2, top: 500}}>{msg}</Text>
            })}
        {/* {chatMessages} */}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 600}}
          autoCorrect={false}
        //   value={chatMessage}
          onSubmitEditing={() => submitChatMessage()}
          onChangeText={(chat) => {
              console.log("new chat "+chat)
              console.log("current "+chatMessage)
            chatMessage = chatMessage + chat
          }}
        />
      </View>
}