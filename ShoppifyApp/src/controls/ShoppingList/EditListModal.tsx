import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/ShoppingList';
import { ShoppingListItem, createEmptyItem } from '../../models/shoppingListItem';
import ConfettiCannon from 'react-native-confetti-cannon';
import FriendsShareModal from '../FriendShareModal';
import CategoryPicker from '../CategoryPicker';
import { saveShoppingList as addShoppingList, getShoppingList, modifyShoppingList, newShoppingList } from '../../services/shoppingListService';
import { ShoppingListEdit, initShoppingListEdit, updateShoppingItem } from '../../models/edit/shoppingListEdit';
import { Category } from '../../models/category';
import { completeShoppingListItem, incompleteShoppingListItem } from '../../services/shoppingListItemService';

interface EditListModalProps {
  listId: number;
  editMode?: boolean;
  onSave?: (list: ShoppingList) => void;
  onCancel: () => void;
}

const EditListModal: React.FC<EditListModalProps> = (props: EditListModalProps) => {
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(props.editMode ?? false);
  const [listModifications, setListModifications] = useState<ShoppingListEdit | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);
  const confettiRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    if (editMode == true) {
      return;
    }
    if (props.listId !== -1) {
      getShoppingList(
        props.listId,
        (fetchedList) => {
          setList(fetchedList);
        },
        (error) => {
          console.error(error);
          Alert.alert("Błąd", "Nie udało się pobrać listy");
        }
      );
    }
  }, [props.listId, editMode]);

  useEffect(() => {
    if (editMode && list.shopping_items.length > 0) {
      addEmptyItem();
    }
  }, [editMode]);

  const hasListModificationObject: boolean = useMemo(() => {
    return list.id !== -1 && listModifications !== null;
  }, [list, listModifications])

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...list.shopping_items];
    newItems[index] = item;
    setList((previousList: ShoppingList) => ({ ...previousList, shopping_items: newItems }));
    
    if (hasListModificationObject) {
      setListModifications((prev: ShoppingListEdit | null) => {
        return prev === null ? null : updateShoppingItem(prev, item);
      });
    }
  };

  const handleItemCompleted = (item: ShoppingListItem, index: number) => {
    const newItems = [...list.shopping_items];
    newItems[index] = item;
    setList((previousList: ShoppingList) => ({ ...previousList, shopping_items: newItems }));
    
    if (item.is_completed) {
      completeShoppingListItem(item.id, () => {
        console.log("Item completed successfully");
      }, (error) => {
        console.error("Failed to complete item", error);
        Alert.alert("Błąd", "Wystąpił błąd podczas oznaczania elementu jako ukończony");
      });
    } else {
      incompleteShoppingListItem(item.id, () => {
        console.log("Item marked as incomplete successfully");
      }, (error) => {
        console.error("Failed to mark item as incomplete", error);
        Alert.alert("Błąd", "Wystąpił błąd podczas oznaczania elementu jako nieukończony");
      });
    }
  };

  const addEmptyItem = () => {
    if (list.shopping_items[0]?.name == "") {
      return;
    }

    const newEmptyItem: ShoppingListItem = createEmptyItem(list.shopping_items);

    setList((prevList: ShoppingList) => ({
      ...prevList,
      shopping_items: [newEmptyItem, ...prevList.shopping_items]
    }));

    if (hasListModificationObject) {
      setListModifications((prev: ShoppingListEdit | null) => {
        return prev === null ? null : {
          ...prev,
          new_shopping_items: [newEmptyItem, ...prev.new_shopping_items]
        }
      });
    }
  };

  const handleCompletion = () => {
    setCompleted(!completed);
    if (!completed && confettiRef.current) {
      confettiRef.current.start();
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    setEditMode(false);
    setListModifications(null);
    if (list.id === -1) {
      props.onCancel();
    }
  };

  const handleSave = () => {
    const handleSaveSuccess = (updatedList: any) => {
      props.onSave?.(updatedList);
      console.log("List saved successfully");
      setEditMode(false);
      setListModifications(null);
    }

    const handleSaveError = (error: any) => {
      console.error(error);
      Alert.alert("Błąd", "Wystąpił błąd podczas zapisywania listy");
    }

    if (hasListModificationObject && listModifications) {
      modifyShoppingList(listModifications, handleSaveSuccess, handleSaveError);
    } else {
      addShoppingList(list.title, list.shopping_items.filter(e => e.name !== ""), list.category?.id ?? null, handleSaveSuccess, handleSaveError);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setList((prev: ShoppingList) => ({
      ...prev,
      category: category
    }));

    setCategoryPickerVisible(false);

    if (hasListModificationObject) {
      setListModifications((prev: ShoppingListEdit | null) => {
        return prev === null ? null : {
          ...prev,
          category_id: category.id,
          isCategoryEdited: true
        }
      });
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setList((prev: ShoppingList) => ({
      ...prev,
      title: newTitle
    }));

    if (hasListModificationObject) {
      setListModifications((prev: ShoppingListEdit | null) => {
        return prev === null ? null : {
          ...prev,
          title: newTitle,
          isTitleEdited: true
        }
      });
    }
  }

  const startEditing = () => {
    setEditMode(true);

    if (list.id > 0) {
      setListModifications(initShoppingListEdit(list.id));
    }
  }

  const handleDelete = (index: number) => {
    const itemToDelete = list.shopping_items[index];

    setList((prevList: ShoppingList) => {
      const newItems = prevList.shopping_items.filter((_, i) => i !== index);
      return { ...prevList, shopping_items: newItems };
    });

    if(!hasListModificationObject){
      return;
    }

    if (itemToDelete.id < 0) {  // New unsaved item, remove from new_shopping_items
      setListModifications((prev: ShoppingListEdit | null) => {
        if (!prev) return null;
        return {
          ...prev,
          new_shopping_items: prev.new_shopping_items.filter(item => item.id !== itemToDelete.id),
        };
      });
    } else {  // Existing item, add to deleted_shopping_item_ids
      setListModifications((prev: ShoppingListEdit | null) => {
        if (!prev) return null;
        return {
          ...prev,
          deleted_shopping_item_ids: [...prev.deleted_shopping_item_ids, itemToDelete.id],
          edited_shopping_items: prev.edited_shopping_items.filter(item => item.id !== itemToDelete.id),
        };
      });
    }
  };

  return (
    <View style={[styles.modalContainer, { backgroundColor: completed ? '#f0f0f0' : 'white' }]}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={list.title}
          onChangeText={handleTitleChange}
          placeholder={editMode ? "Nazwa listy" : ""}
          editable={editMode}
        />
        {editMode ? (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.saveIcon} onPress={handleSave}>
              <Ionicons name="checkmark" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelIcon} onPress={handleCancel}>
              <Ionicons name="return-down-back" size={32} color="gray" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={startEditing}>
              <Ionicons name="pencil" size={28} color="gray" />
            </TouchableOpacity>
            {list.id > 0 &&
              <TouchableOpacity style={styles.icon} onPress={() => setShareModalVisible(true)}>
                <Ionicons name="share-social-outline" size={28} color="gray" />
              </TouchableOpacity>
            }
            <TouchableOpacity style={styles.star} onPress={handleCompletion}>
              <Ionicons name={completed ? "checkmark-circle" : "checkmark-circle-outline"} size={completed ? 48 : 28} color={completed ? "#A7C7E7" : "gray"} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: list.category?.color ?? '#ddd' }]}
        onPress={() => setCategoryPickerVisible(true)}
        disabled={!editMode}
      >
        <Text style={styles.buttonText}>
          {list.category?.title ?? 'Wybierz kategorię'}
        </Text>
      </TouchableOpacity>

      <>
        {editMode && list.shopping_items.length === 0 && (
          <TouchableOpacity style={styles.button} onPress={addEmptyItem}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={list.shopping_items}
          renderItem={({ item, index }) => (
            <ProductItem
              item={item}
              onNameChange={(text) => handleItemChange({ ...item, name: text }, index)}
              onCompletedChange={(newValue) => handleItemCompleted({ ...item, is_completed: newValue }, index)}
              onAddNewItem={addEmptyItem}
              readOnly={!editMode}
              checkDisabled={completed || editMode}
              isOdd={index % 2 == 1}
              onDeleted={()=> handleDelete(index)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </>
      {completed && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          explosionSpeed={1000}
          fallSpeed={5000}
          colors={CONFETTI_COLORS}
          fadeOut={false}
          ref={confettiRef}
        />
      )}
      <FriendsShareModal
        visible={isShareModalVisible}
        onClose={() => setShareModalVisible(false)}
        onShareConfirmed={(selectedFriends) => {
          console.log('List shared with:', selectedFriends);
        }}
        listId={list.id}
      />
      <CategoryPicker
        visible={isCategoryPickerVisible}
        onClose={() => setCategoryPickerVisible(false)}
        onCategorySelect={handleCategorySelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  star: {
    marginLeft: 10,
  },
  saveIcon: {
    marginLeft: 10,
  },
  cancelIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#505168',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default EditListModal;

const CONFETTI_COLORS: string[] = [
  "#00BFFF",
  "#FF69B4",
  "#9370DB",
  "#FF6347",
  "#FFD700",
  "#32CD32",
  "#FFA500",
  "#40E0D0"
];