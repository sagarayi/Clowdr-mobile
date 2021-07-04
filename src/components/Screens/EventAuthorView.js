import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Text, View } from "react-native";
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import AppButton from "../common/AppButton";


export default function EventAuthorView({name, institution, role}){
    
    return <View>
        <Text>{name}</Text>
        <Text>{role}</Text>
        <Text>{institution}</Text>
    </View>
}