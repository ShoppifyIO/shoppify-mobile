import React, { useState } from 'react';
import { View, Modal, Button, FlatList, GestureResponderEvent } from 'react-native';
import EditListModal from '../../controls/ShoppingList/EditListModal';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { listStyles } from './listStyles';
import ListHeader from './ListHeader';
import AddListButton from './AddListButton';
import { mockActiveLists } from '../../mocks/activeLists';

const ActiveListsScreen: React.FC = () => {
  const [lists, setLists] = useState<ShoppingListHeader[]>(mockActiveLists);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState<ShoppingListHeader | null>(null);

  const addNewList = () => {
    // Przykładowe domyślne dane nowej listy
    const newList: ShoppingListHeader = {
      id: lists.length + 1,
      name: 'Nowa lista zakupów',
      categoryName: 'Nowa kategoria',
      ownerUsername: 'NowyUżytkownik',
      updateDate: new Date().toISOString().slice(0, 10),
      updatedBy: 'NowyUżytkownik',
      categoryColor: null,
    };
    setCurrentList(newList);
    setModalVisible(true);
  };

  const saveList = (updatedList: ShoppingListHeader) => {
    setLists([updatedList, ...lists.filter(list => list.id !== updatedList.id)]);
    setModalVisible(false);
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    console.log("e", e);
  }

  return (
    <View style={listStyles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => <ListHeader model={item} />}
        keyExtractor={(item) => item.id.toString()}
        onTouchEnd={onTouchEnd}
      />
      <AddListButton onPress={addNewList} />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <EditListModal
          list={currentList}
          onSave={saveList}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default ActiveListsScreen;
