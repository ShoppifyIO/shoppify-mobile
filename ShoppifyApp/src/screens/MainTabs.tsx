import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import StartScreen from './StartScreen';
import ProfileScreen from './ProfileScreen';
import FriendsScreen from './FriendsScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={StartScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Znajomi" component={FriendsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
