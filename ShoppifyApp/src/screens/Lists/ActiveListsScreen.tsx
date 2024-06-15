import React, { useState, useEffect } from 'react';
import { View, Modal, FlatList, Alert, RefreshControl } from 'react-native';
import EditListModal from '../../controls/ShoppingList/EditListModal';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { listStyles } from './listStyles';
import ListHeader from './ListHeader';
import ActionButton from './ActionButton';
import { getActiveShoppingLists, deleteShoppingList } from '../../services/shoppingListService';
import { ShoppingList } from '../../models/ShoppingList';

const ActiveListsScreen: React.FC = () => {
  const [lists, setLists] = useState<ShoppingListHeader[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchActiveLists();
  }, []);

  const fetchActiveLists = () => {
    getActiveShoppingLists(
      (fetchedLists) => {
        setLists(fetchedLists);
        setRefreshing(false);
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać aktywnych list");
        setRefreshing(false);
      }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchActiveLists();
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
    closeModal();
    fetchActiveLists();
  };

  const onCancel = () => {
    closeModal();
  };

  const onPress = (id: number) => {
    setCurrentListId(id);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    onRefresh();
  };

  const deleteList = (id: number) => {
    deleteShoppingList(
      id,
      () => {
        setLists(lists.filter(list => list.id !== id));
        closeModal();
        Alert.alert("Sukces", "Usunięto listę");
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się usunąć listy");
      }
    );
  };

  return (
    <View style={listStyles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) => <ListHeader onPress={onPress} model={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <ActionButton onPress={addNewList} label={'+'} />
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <EditListModal
          listId={currentListId ?? -1}
          editMode={currentListId === -1}
          onSave={saveList}
          onCancel={onCancel}
          onDeleteList={() => deleteList(currentListId!)}
        />
      </Modal>
    </View>
  );
};

export default ActiveListsScreen;
