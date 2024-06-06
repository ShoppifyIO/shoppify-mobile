import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/ShoppingList';
import { ShoppingListItem } from '../../models/shoppingListItem';
import ConfettiCannon from 'react-native-confetti-cannon';
import { friendsMockData } from '../../mocks/friendList';
import { Friend } from '../../models/friend';
import FriendsShareModal from '../FriendShareModal';
import CategoryPicker from '../CategoryPicker';
import { saveShoppingList, getShoppingList, newShoppingList } from '../../services/shoppingListService';

interface EditListModalProps {
  listId: number;
  editMode?: boolean;
  onSave?: (list: ShoppingList) => void;
}

interface Category {
  id: number;
  title: string;
  color: string;
}

const EditListModal: React.FC<EditListModalProps> = (props: EditListModalProps) => {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(props.editMode ?? false);
  const [completed, setCompleted] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const confettiRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    if (props.listId !== -1) {
      getShoppingList(
        props.listId,
        (fetchedList) => {
          setList(fetchedList);
          setName(fetchedList.title);
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
      addItem();
    }
  }, [editMode]);

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...list.shopping_items];
    newItems[index] = item;
    setList((previousList:ShoppingList) => ({ ...previousList, shopping_items: newItems }));
  };

  const addItem = () => {
    if (list.shopping_items[0]?.name !== "") {
      const newItem = { name: '', isCompleted: false, quantity: 1 };
      setList((previousList: ShoppingList )=> ({
        ...previousList,
        shopping_items: [newItem, ...previousList.shopping_items]
      }));
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
  };

  const handleSave = () => {
    saveShoppingList(name, list.shopping_items.filter(e => e.name != ""), (updatedList) => {
      if (props.onSave) {
        props.onSave(updatedList);
      }
      console.log("List saved successfully");
      setEditMode(false);
    }, (error) => {
      console.error(error);
      Alert.alert("Błąd", "Wystąpił błąd podczas zapisywania listy");
    });
  };

  const handleShareConfirmed = (selectedFriends: Friend[]) => {
    console.log('List shared with:', selectedFriends);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCategoryPickerVisible(false);
  };

  return (
    <View style={[styles.modalContainer, { backgroundColor: completed ? '#f0f0f0' : 'white' }]}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={editMode ? "Nazwa listy" : ""}
          editable={editMode}
        />
        {editMode ? (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.saveIcon} onPress={handleSave}>
              <Ionicons name="checkmark" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelIcon} onPress={handleCancel}>
              <Ionicons name="close" size={32} color="gray" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={() => setEditMode(true)}>
              <Ionicons name="pencil" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => setShareModalVisible(true)}>
              <Ionicons name="share-social-outline" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.star} onPress={handleCompletion}>
              <Ionicons name={completed ? "checkmark-circle" : "checkmark-circle-outline"} size={completed ? 48 : 28} color={completed ? "#A7C7E7" : "gray"} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: selectedCategory ? selectedCategory.color : '#ddd' }]}
        onPress={() => setCategoryPickerVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedCategory ? selectedCategory.title : 'Wybierz kategorię'}
        </Text>
      </TouchableOpacity>

      <>
        {editMode && list.shopping_items.length === 0 && (
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={list.shopping_items}
          renderItem={({ item, index }) => (
            <ProductItem
              name={item.name}
              isCompleted={item.isCompleted}
              onNameChange={(text) => handleItemChange({ ...item, name: text }, index)}
              onCompletedChange={(newValue) => handleItemChange({ ...item, isCompleted: newValue }, index)}
              onAddNewItem={addItem}
              readOnly={!editMode}
              checkDisabled={completed}
              isOdd={index % 2 == 1}
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
        onShareConfirmed={handleShareConfirmed}
        friends={friendsMockData}
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