import React from "react";
import { gql, useQuery } from '@apollo/client';
import { View, Text, AsyncStorage, Button } from "react-native";
import AppButton from "../common/AppButton";
import { useEffect, useState } from "react";

const GET_ALL_USERS = gql`
  query GetAllUsers {
    User {
      id
    }
  }
`;
//"google-oauth2|112532042179139043360"
const GET_ALL_CONFERENCES_FOR_USER = gql`
  query ($userId: String!) {
    User_by_pk(id: $userId) {
        registrants {
          conference {
            id
            name
            shortName
          }
        }
      }
  }
`;



const USER_ID="@userId"
export default function ListOfConferences(props) {

  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
      if(!currentUserId){
        fetchCurrentUserId();
      }
  },[]);

  const fetchCurrentUserId= async() =>{
    const userId = await AsyncStorage.getItem(USER_ID)
    setCurrentUserId(userId)
  };
  

  function onButtonClick(id, shortName) {
    console.log("Clicked button id: "+id)
    props.onConfClick(id, shortName)
    }
    
    const { loading, error, data } = useQuery(GET_ALL_CONFERENCES_FOR_USER, {
        variables: {userId: currentUserId}
    });
    if (loading) return <Text>'Loading...'</Text>;;
    if (error) {
        console.log(error)
        return <Text>error</Text>;}

  return <View>
      
       {data.User_by_pk && data.User_by_pk.registrants.map((conf) =>{
        return <AppButton title={conf.conference.shortName} onPress={() => onButtonClick(conf.conference.id, conf.conference.shortName)}/> 
       })} 
  </View>
}
