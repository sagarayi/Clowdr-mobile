import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../Screens/Login";
import Home from "../Screens/Home";

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