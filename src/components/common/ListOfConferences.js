import React from "react";
import { useQuery } from '@apollo/client';
import { View, Text, AsyncStorage, Button, ActivityIndicator } from "react-native";
import AppButton from "../common/AppButton";
import { useEffect, useState } from "react";
import * as Queries from "../common/GraphQLQueries";
import * as Constants from "../common/Constants";



const USER_ID="@userId"
export default function ListOfConferences(props) {

  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
      if(!currentUserId){
        fetchCurrentUserId();
      }
  },[]);

  const fetchCurrentUserId= async() =>{
    const userId = await AsyncStorage.getItem(Constants.USER_ID)
    setCurrentUserId(userId)
  };
  

  function onButtonClick(id, shortName) {
    console.log("Clicked button id: "+id)
    props.onConfClick(id, shortName)
    }
    
    const { loading, error, data } = useQuery(Queries.GET_ALL_CONFERENCES_FOR_USER, {
        variables: {userId: currentUserId}
    });
    if (loading) {
        return <ActivityIndicator size="large" />
    }
    if (error) {
        console.log(error)
        return <Text>error</Text>;}

  return <View>
      
       {data.User_by_pk && data.User_by_pk.registrants.map((conf) =>{
        return <AppButton title={conf.conference.shortName} onPress={() => onButtonClick(conf.conference.id, conf.conference.shortName)}/> 
       })} 
  </View>
}
