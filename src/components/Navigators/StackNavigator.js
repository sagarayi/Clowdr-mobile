// Root.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

function StackNavigator() {
    return <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="TabNav" component={TabNavigator}/>
                </Stack.Navigator>
            </NavigationContainer>
}

export default StackNavigator;