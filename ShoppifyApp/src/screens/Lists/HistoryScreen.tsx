import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { getArchivedShoppingLists } from '../../services/shoppingListService';

const HistoryScreen: React.FC = () => {
  const [archivedLists, setArchivedLists] = useState<ShoppingListHeader[]>([]);

  useEffect(() => {
    fetchArchivedLists();
  }, []);

  const fetchArchivedLists = () => {
    getArchivedShoppingLists(
      (fetchedLists) => {
        setArchivedLists(fetchedLists);
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać archiwalnych list");
      }
    );
  };

  return (
    <View style={styles.container}>
      {archivedLists.length > 0 ? (
        <FlatList
          data={archivedLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.details}>{item.updateDate}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>Brak archiwalnych list</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HistoryScreen;
