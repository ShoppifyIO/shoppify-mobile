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
  const [currentListId, setCurrentListId] = useState<number | null>(null);

  const addNewList = () => {
    setCurrentListId(-1);
    setModalVisible(true);
  };

  const saveList = (updatedList: ShoppingListHeader) => {
    setLists([updatedList, ...lists.filter(list => list.id !== updatedList.id)]);
    setModalVisible(false);
  };

  const onPress = (id: number) => {
    console.log("selected id", id);
    setCurrentListId(id);
    setModalVisible(true); 
  }

  return (
    <View style={listStyles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => <ListHeader onPress={onPress} model={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddListButton onPress={addNewList} />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <EditListModal
          listId={currentListId ?? -1}
          editMode={currentListId == -1}
        />
      </Modal>
    </View>
  );
};

export default ActiveListsScreen;
