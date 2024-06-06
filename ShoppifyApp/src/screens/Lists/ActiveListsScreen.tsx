import React, { useState, useEffect } from 'react';
import { View, Modal, FlatList, Alert } from 'react-native';
import EditListModal from '../../controls/ShoppingList/EditListModal';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { listStyles } from './listStyles';
import ListHeader from './ListHeader';
import ActionButton from './ActionButton';
import { getActiveShoppingLists } from '../../services/shoppingListService';
import { ShoppingList } from '../../models/ShoppingList';

const ActiveListsScreen: React.FC = () => {
  const [lists, setLists] = useState<ShoppingListHeader[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentListId, setCurrentListId] = useState<number | null>(null);

  useEffect(() => {
    fetchActiveLists();
  }, []);

  const fetchActiveLists = () => {
    getActiveShoppingLists(
      (fetchedLists) => {
        console.log(fetchedLists[0].name)
        setLists(fetchedLists);
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać aktywnych list");
      }
    );
  };

  const addNewList = () => {
    setCurrentListId(-1);
    setModalVisible(true);
  };

  const saveList = (updatedList: ShoppingList) => {
    const header: ShoppingListHeader = {
      id: updatedList.id,
      name: updatedList.title,
      categoryName: updatedList.category?.title ?? "",
      categoryColor: updatedList.category?.color ?? "",
      ownerUsername: updatedList.owner_id.toString(),
      updateDate: updatedList.update_date,
      updatedBy: updatedList.owner_id.toString(),
      completed: updatedList.is_completed,
    };
    setLists([header, ...lists.filter(list => list.id !== header.id)]);
    setModalVisible(false);
  };

  const onPress = (id: number) => {
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
      <ActionButton onPress={addNewList} label={'+'} />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <EditListModal
          listId={currentListId ?? -1}
          editMode={currentListId === -1}
          onSave={saveList}
        />
      </Modal>
    </View>
  );
};

export default ActiveListsScreen;
