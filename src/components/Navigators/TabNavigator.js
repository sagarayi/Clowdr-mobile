import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import ViewSchedule from '../Screens/ViewSchedule';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
        <Tab.Navigator>
          <Tab.Screen name="View Schedule" component={ViewSchedule} />
            <Tab.Screen name="Dummy View" component={Home} />
        </Tab.Navigator>
  );
}

export default TabNavigator;