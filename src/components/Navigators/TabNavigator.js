import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import Login from "./login/Login";
import Home from "./Home";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
  );
}

export default TabNavigator;