import React from "react";
import { gql, useQuery } from '@apollo/client';
import { View, Text, AsyncStorage, Button } from "react-native";
import AppButton from "../common/AppButton";

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
export default function ListOfConferences() {
  const { loading1, error1, data1 } = useQuery(GET_ALL_USERS);

  function onButtonClick(id) {
    console.log("Clicked button id: "+id)
    // this.props.onClick()
    }

    // const accessToken =  AsyncStorage.getItem(USER_ID).then(userId => {
    const userId = "google-oauth2|112532042179139043360"
    
    const { loading, error, data } = useQuery(GET_ALL_CONFERENCES_FOR_USER, {
        variables: {userId: userId}
    });
    if (loading) return <Text>'Loading...'</Text>;;
    if (error) {
        console.log(error)
        return <Text>error</Text>;}

  return <View>
      
      {data.User_by_pk.registrants.map((conf) =>{
        return <AppButton title={conf.conference.shortName} onPress={() => onButtonClick(conf.conference.id)}/> 
       })} 
  </View>
}
