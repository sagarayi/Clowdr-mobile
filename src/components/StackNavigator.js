// Root.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./login/Login";
import Home from "./Home";
import LoginScreen from './login/LoginScreen';

const Stack = createStackNavigator();

function StackNavigator() {
    return <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
            </NavigationContainer>
}

export default StackNavigator;