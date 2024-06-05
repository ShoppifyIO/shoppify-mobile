import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useAuth } from '../context/AuthContext';
import StartScreen from './StartScreen';
import ProfileScreen from './ProfileScreen';
import FriendsScreen from './FriendsScreen';
import { View, Text } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  const { signed } = useAuth();

  if (!signed) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Access Denied</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={StartScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Znajomi" component={FriendsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
