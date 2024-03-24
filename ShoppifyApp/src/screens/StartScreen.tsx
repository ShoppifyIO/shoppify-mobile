import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveListsScreen from './Lists/ActiveListsScreen';
import HistoryScreen from './Lists/HistoryScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTab = createMaterialTopTabNavigator();

const StartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopTab.Navigator>
        <TopTab.Screen name="Aktywne Listy" component={ActiveListsScreen} />
        <TopTab.Screen name="Historia" component={HistoryScreen} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

export default StartScreen;
