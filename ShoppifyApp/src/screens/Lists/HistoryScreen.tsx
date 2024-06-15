import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, RefreshControl, Modal } from 'react-native';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import { deleteShoppingList, getArchivedShoppingLists } from '../../services/shoppingListService';
import ListHeader from './ListHeader';
import { listStyles } from './listStyles';
import EditListModal from '../../controls/ShoppingList/EditListModal';
import { ShoppingList } from '../../models/ShoppingList';

const HistoryScreen: React.FC = () => {
  const [archivedLists, setArchivedLists] = useState<ShoppingListHeader[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentListId, setCurrentListId] = useState<number | null>(null);

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

  const onPress = (id: number) => {
    setCurrentListId(id);
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
    setArchivedLists([header, ...archivedLists.filter(list => list.id !== header.id)]);
    closeModal();
    fetchArchivedLists();
  };

  const onCancel = () => {
    closeModal();
  };
  
  const closeModal = () => {
    setModalVisible(false);
    onRefresh();
  };

  const deleteList = (id: number) => {
    deleteShoppingList(
      id,
      () => {
        setArchivedLists(archivedLists.filter(list => list.id !== id));
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
        data={archivedLists}
        renderItem={({ item }) => <ListHeader onPress={onPress} model={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <EditListModal
          listId={currentListId ?? -1}
          editMode={false}
          onSave={saveList}
          onCancel={onCancel}
          onDeleteList={deleteList}
        />
      </Modal>
    </View>
  );
};

export default HistoryScreen;
