import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, RefreshControl } from 'react-native';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { getArchivedShoppingLists } from '../../services/shoppingListService';
import ListHeader from './ListHeader';
import { listStyles } from './listStyles';

const HistoryScreen: React.FC = () => {
  const [archivedLists, setArchivedLists] = useState<ShoppingListHeader[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchArchivedLists();
  }, []);

  const fetchArchivedLists = () => {
    getArchivedShoppingLists(
      (fetchedLists) => {
        setArchivedLists(fetchedLists);
        setRefreshing(false);
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać archiwalnych list");
        setRefreshing(false);
      }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchArchivedLists();
  };


  return (
    <View style={listStyles.container}>
        <FlatList
        data={archivedLists}
        renderItem={({ item }) => <ListHeader onPress={()=>{}} model={item}/>}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};


export default HistoryScreen;
