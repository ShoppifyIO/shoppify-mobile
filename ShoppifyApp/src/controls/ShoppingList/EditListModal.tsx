import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';

interface EditListModalProps {
  listId: number;
  editMode?: boolean;
}

const EditListModal: React.FC<EditListModalProps> = (props: EditListModalProps) => {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(props.editMode ?? false);
  const nameInputRef = useRef<TextInput>(null);

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
    if ( list.items[0]?.name !== "") {
      const newItem = { name: '', isCompleted: false };
      setList(previousList => ({
        ...previousList,
        items: [newItem, ...previousList.items]
      }));
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

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nazwa listy"
          ref={nameInputRef}
          readOnly={!editMode}
        />
        {editMode ? (
          <>
            <TouchableOpacity style={styles.saveIcon} onPress={handleSave}>
              <Ionicons name="checkmark" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelIcon} onPress={handleCancel}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.icon} onPress={() => setEditMode(true)}>
              <Ionicons name="pencil" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.star} onPress={() => { }}>
              <Ionicons name="star" size={24} color="gray" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <>
        {editMode && list.items.length === 0 &&

          <TouchableOpacity 
          style={styles.button} 
          onPress={addItem}
          >
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        }
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
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </>
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
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  star: {
    position: 'absolute',
    top: 10
  },
  saveIcon: {
    position: 'absolute',
    right: 35,
    top: 10
  },
  cancelIcon: {
    position: 'absolute',
    right: 1,
    top: 10
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
  }
});

export default EditListModal;

const exampleShoppingList: ShoppingList = {
  id: 1,
  name: 'Tygodniowe zakupy',
  categoryName: 'Spożywcze',
  categoryColor: '#FFD700',  // Złoty kolor dla kategorii spożywczych
  ownerUsername: 'JanKowalski',
  updateDate: new Date().toISOString().slice(0, 10),
  updatedBy: 'JanKowalski',
  items: [
    { name: 'Chleb', isCompleted: false },
    { name: 'Mleko', isCompleted: true },
    { name: 'Jajka', isCompleted: false },
    { name: 'Ser żółty', isCompleted: false },
    { name: 'Masło', isCompleted: true },
    { name: 'Pomidory', isCompleted: false },
    { name: 'Ziemniaki', isCompleted: false },
    { name: 'Jabłka', isCompleted: false },
    { name: 'Cebula', isCompleted: true },
    { name: 'Kawa', isCompleted: false },
    { name: 'Herbata', isCompleted: true },
    { name: 'Cukier', isCompleted: false },
    { name: 'Mąka', isCompleted: false },
    { name: 'Ryż', isCompleted: false },
    { name: 'Makaron', isCompleted: true },
    { name: 'Olej słonecznikowy', isCompleted: false },
    { name: 'Papier toaletowy', isCompleted: true },
    { name: 'Szampon', isCompleted: false },
    { name: 'Mydło', isCompleted: true },
    { name: 'Pasta do zębów', isCompleted: false }
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