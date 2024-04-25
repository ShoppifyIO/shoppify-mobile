import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';

interface EditListModalProps {
  listId: number;
  onSave: (list: ShoppingList) => void;
}

const EditListModal: React.FC<EditListModalProps> = ({ listId, onSave }) => {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(false);
  const nameInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (listId !== -1) {
      const fetchedList = getList(listId);
      setList(fetchedList);
      setName(fetchedList.name);
    }
  }, [listId]);

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...list.items];
    newItems[index] = item;
    setList(previousList => ({ ...previousList, items: newItems }));
  };

  const addItem = () => {
    const newItem = { name: '', isCompleted: false };
    setList(previousList => ({
      ...previousList,
      items: [newItem, ...previousList.items]
    }));
  };

  const handleCancel = () => {
    console.log("cancel");
    setEditMode(false);
  };

  const handleSave = () => {
    onSave(list);
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
            <TouchableOpacity style={styles.star} onPress={() => {}}>
              <Ionicons name="star" size={24} color="gray" />
            </TouchableOpacity>
          </>
        )}
      </View>
      {editMode && (
                <>
                {list.items.length === 0 && (
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
              autoFocus={index === 0}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        </>
      )}
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

function getList(id: number): ShoppingList {
  return newShoppingList;
}

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
