import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveListsScreen from './ActiveListsScreen'; // Musisz utworzyć ten komponent
import HistoryScreen from './HistoryScreen'; // Musisz utworzyć ten komponent

const TopTab = createMaterialTopTabNavigator();

const StartScreen = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="cccAktywneListy" component={ActiveListsScreen} />
      <TopTab.Screen name="Historia" component={HistoryScreen} />
    </TopTab.Navigator>
  );
};

export default StartScreen;
