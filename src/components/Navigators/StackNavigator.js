// Root.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";
import MyConferences from '../Screens/MyConferences';
import ViewSchedule from '../Screens/ViewSchedule';
import * as Constants from "../common/Constants";
import PresentationEvent from '../Screens/PresentationEvent';
import VideoStream from '../Screens/VideoStream';
import AllChatView from '../Screens/AllChatView';
import DetailedChatView from '../Screens/DetailedChatView';

const Stack = createStackNavigator();

function StackNavigator() {
    return <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name={Constants.LOGIN_SCREEN} component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name={Constants.VIEW_SCHEDULE} component={ViewSchedule} />
                    <Stack.Screen name={Constants.MY_CONF_SCREEN} component={MyConferences} options={{headerLeft: ()=> null}}/>
                    <Stack.Screen name={Constants.PRESENTATION_EVENT} component={PresentationEvent} />
                    <Stack.Screen name={Constants.VIDEO_STREAM} component={VideoStream} />
                    <Stack.Screen name={Constants.ALL_CHAT_VIEW} component={AllChatView} />
                    <Stack.Screen name={Constants.DETAILED_CHAT_VIEW} component={DetailedChatView} />
                </Stack.Navigator>
            </NavigationContainer>
}

export default StackNavigator;