// Root.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import TabNavigator from './TabNavigator';
import MyConferences from '../Screens/MyConferences';
import ViewSchedule from '../Screens/ViewSchedule';
import * as Constants from "../common/Constants";
import PresentationEvent from '../Screens/PresentationEvent';
import VideoStream from '../Screens/VideoStream';

const Stack = createStackNavigator();

function StackNavigator() {
    return <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name={Constants.LOGIN_SCREEN} component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name={Constants.VIEW_SCHEDULE} component={ViewSchedule} />
                    <Stack.Screen name={Constants.MY_CONF_SCREEN} component={MyConferences} options={{headerLeft: ()=> null}}/>
                    <Stack.Screen name={Constants.PRESENTATION_EVENT} component={PresentationEvent} />
                    <Stack.Screen name={Constants.VIDEO_STREAM} component={VideoStream} />
                </Stack.Navigator>
            </NavigationContainer>
}

export default StackNavigator;