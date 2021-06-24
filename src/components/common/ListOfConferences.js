import React from "react";
import { gql, useQuery } from '@apollo/client';
import { View, Text } from "react-native";

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

export default function ListOfConferences() {
  const { loading1, error1, data1 } = useQuery(GET_ALL_USERS);

//   if (loading) return null;
//   if (error) return `Error! ${error}`;

// console.log("Get all users")
//   console.log(data1)

//  const userId = data[0].id
    const userId = "google-oauth2|112532042179139043360"
    
    const { loading, error, data } = useQuery(GET_ALL_CONFERENCES_FOR_USER, {
        variables: {userId: userId}
    });
    const parsedData = JSON.stringify(data)
    console.log("***************************")
    console.log(parsedData)
    console.log("***************************")
    // const reg = data.registrants
    console.log("Conferences")
    // console.log(JSON.stringify(reg)){data.registrants.map((conf) => {
        //   <li>{conf.shortName}</li>
        // })}
    console.log(loading)
    if (loading) return <Text>'Loading...'</Text>;;
    if (error) {
        console.log(error)
        return <Text>error</Text>;}

  return <View>
      <Text>Data</Text>
  </View>
}
