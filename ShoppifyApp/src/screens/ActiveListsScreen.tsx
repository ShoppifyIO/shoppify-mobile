import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActiveListsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aktywne listy</Text>
      {/* Tutaj możesz dodać logikę wyświetlania aktywnych list */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ActiveListsScreen;
