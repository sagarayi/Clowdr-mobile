// Root.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import TabNavigator from './TabNavigator';
import MyConferences from '../Screens/MyConferences';
import ViewSchedule from '../Screens/ViewSchedule';

const Stack = createStackNavigator();

const VIEW_SCHEDULE="View Schedule"
const LOGIN_SCREEN = "Login"
const MY_CONF_SCREEN = "MyConf"

function StackNavigator() {
    return <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name={LOGIN_SCREEN} component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name={VIEW_SCHEDULE} component={ViewSchedule} />
                    <Stack.Screen name={MY_CONF_SCREEN} component={MyConferences} options={{headerLeft: ()=> null}}/>
                </Stack.Navigator>
            </NavigationContainer>
}

export default StackNavigator;