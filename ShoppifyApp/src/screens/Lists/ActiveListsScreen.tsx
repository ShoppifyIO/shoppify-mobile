import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import { mockActiveLists } from '../../mocks/activeLists';
import { listStyles } from './listStyles';
import ListHeader from './ListHeader';
import AddListButton from './AddListButton';
import { ShoppingListHeader } from '../../models/shoppingListHeader';

const ActiveListsScreen: React.FC = () => {
  const [lists, setLists] = useState<ShoppingListHeader[]>(mockActiveLists);

  const addNewList = () => {
    //todo: zmienić na generowane z formularza
    const newList: ShoppingListHeader = {
      id: String(lists.length + 1), // Proste generowanie nowego ID
      name: 'Nowa lista zakupów',
      categoryName: 'Nowa kategoria',
      ownerUsername: 'NowyUżytkownik',
      updateDate: new Date().toISOString().slice(0, 10),
      updatedBy: 'NowyUżytkownik',
      categoryColor: null, 
    };
    setLists([newList, ...lists]);
  };

  return (
    <View style={listStyles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => <ListHeader model={item} />}
        keyExtractor={(item) => item.id}
      />
      <AddListButton onPress={addNewList} />
    </View>
  );
};

export default ActiveListsScreen;
