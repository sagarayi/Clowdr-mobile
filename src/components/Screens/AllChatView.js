import React, {useMemo} from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { ActivityIndicator, ScrollView, StyleSheet, Text, ActionSheetIOS, Button, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";
import EventAuthorView from "./EventAuthorView";
import EventElement from "./EventElement";
import TagElement from "./TagElement";
import { SearchBar } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      alignItems: 'center',
      height: '100%',
    },
    searchBar: {
        borderRadius:10,
      
      margin: 10,
      width: '90%',
      height: "20%",
      backgroundColor: 'white',
    },
  });

export default function AllChatView({route, navigation}) {

    navigation.setOptions({
        headerTitle: "All chats",
    }) 

    var searchValue = ""

    function updateSearch(search){
        searchValue = search
        console.log("Typed: "+search)
    }


    return <View>
        <TextInput
        placeholder="Type to search"
        style = {styles.searchBar}
        onTextChanged = {(search)=> {
            updateSearch(search)
        }}
        />
        </View>
}