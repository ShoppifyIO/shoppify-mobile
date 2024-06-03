import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';
import ConfettiCannon from 'react-native-confetti-cannon';
import { friendsMockData } from '../../mocks/friendList';
import { Friend } from '../../models/friend';
import FriendsShareModal from '../FriendShareModal';

interface EditListModalProps {
  listId: number;
  editMode?: boolean;
}

const EditListModal: React.FC<EditListModalProps> = (props: EditListModalProps) => {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(props.editMode ?? false);
  const [completed, setCompleted] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const confettiRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    const fetchedList = getList(props.listId);
    setList(fetchedList);
    setName(fetchedList.name);
  }, [props.listId, editMode]);

  useEffect(() => {
    if (editMode && list.items.length > 0) {
      addItem();
    }
  }, [editMode]);

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...list.items];
    newItems[index] = item;
    setList(previousList => ({ ...previousList, items: newItems }));
  };

  const addItem = () => {
    if (list.items[0]?.name !== "") {
      const newItem = { name: '', isCompleted: false, quantity: 1 };
      setList(previousList => ({
        ...previousList,
        items: [newItem, ...previousList.items]
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
    console.log("save");
    setEditMode(false);
  };

  const handleShareConfirmed = (selectedFriends: Friend[]) => {
    console.log('List shared with:', selectedFriends);
  };

  return (
    <View style={[styles.modalContainer, { backgroundColor: completed ? '#f0f0f0' : 'white' }]}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nazwa listy"
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
              <Ionicons name="share-outline" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.star} onPress={handleCompletion}>
              <Ionicons name={completed ? "checkmark-circle" : "checkmark-circle-outline"} size={completed ? 48 : 28} color={completed ? "#A7C7E7" : "gray"} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <>
        {editMode && list.items.length === 0 && (
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={list.items}
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
    color: "white",
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

const exampleShoppingList: ShoppingList = {
  id: 1,
  name: 'Tygodniowe zakupy',
  categoryName: 'Spożywcze',
  categoryColor: '#FFD700', 
  ownerUsername: 'JanKowalski',
  updateDate: new Date().toISOString().slice(0, 10),
  updatedBy: 'JanKowalski',
  items: [
    { name: 'Chleb', isCompleted: false, quantity: 1 },
    { name: 'Mleko', isCompleted: true, quantity: 1 },
    { name: 'Jajka', isCompleted: false, quantity: 1 },
    { name: 'Ser żółty', isCompleted: false, quantity: 1 },
    { name: 'Masło', isCompleted: true, quantity: 1 },
    { name: 'Pomidory', isCompleted: false, quantity: 1 },
    { name: 'Ziemniaki', isCompleted: false, quantity: 1 },
    { name: 'Jabłka', isCompleted: false, quantity: 1 },
    { name: 'Cebula', isCompleted: true, quantity: 1 },
    { name: 'Kawa', isCompleted: false, quantity: 1 },
    { name: 'Herbata', isCompleted: true, quantity: 1 },
    { name: 'Cukier', isCompleted: false, quantity: 1 },
    { name: 'Mąka', isCompleted: false, quantity: 1 },
    { name: 'Ryż', isCompleted: false, quantity: 1 },
    { name: 'Makaron', isCompleted: true, quantity: 1 },
    { name: 'Olej słonecznikowy', isCompleted: false, quantity: 1 },
    { name: 'Papier toaletowy', isCompleted: true, quantity: 1 },
    { name: 'Szampon', isCompleted: false, quantity: 1 },
    { name: 'Mydło', isCompleted: true, quantity: 1 },
    { name: 'Pasta do zębów', isCompleted: false, quantity: 1}
  ]
};

const newShoppingList: ShoppingList = {
  id: -1,
  name: 'Nowa lista zakupów',
  categoryName: 'Nowa kategoria',
  ownerUsername: 'NowyUżytkownik',
  updateDate: new Date().toISOString().slice(0, 10),
  updatedBy: 'NowyUżytkownik',
  categoryColor: null,
  items: []
};

function getList(id: number): ShoppingList {
  console.log("id", id);
  if (id > 0) {
    console.log("here");
    return exampleShoppingList;
  }
  return newShoppingList;
}