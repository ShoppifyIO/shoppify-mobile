import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { ShoppingListItem } from '../../models/shoppingListItem';
import { ShoppingList } from '../../models/list';

interface EditListScreenProps {
  list: ShoppingList;
  onSave: (list: ShoppingList) => void;
  navigation: any;
}

const EditListScreen = (props: EditListScreenProps) => {
  const [name, setName] = useState(props.list.name);
  const [items, setItems] = useState(props.list.items);

  const addItem = () => {
    const newItem: ShoppingListItem = { name: '', isCompleted: false };
    setItems([...items, newItem]);
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const toggleCompletion = (index: number) => {
    const newItems = [...items];
    newItems[index].isCompleted = !newItems[index].isCompleted;
    setItems(newItems);
  };

  const saveList = () => {
    props.onSave({
      ...props.list,
      name,
      items,
    });
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Nazwa listy" />
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View>
            <TextInput
              value={item.name}
              onChangeText={(text) => {
                const newItems = [...items];
                newItems[index].name = text;
                setItems(newItems);
              }}
              placeholder="Nazwa produktu"
            />
            <TouchableOpacity onPress={() => toggleCompletion(index)}>
              <Text>{item.isCompleted ? 'Kupione' : 'Do kupienia'}</Text>
            </TouchableOpacity>
            <Button title="Usuń" onPress={() => deleteItem(index)} />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Button title="Dodaj produkt" onPress={addItem} />
      <Button title="Zapisz" onPress={saveList} />
    </View>
  );
};

export default EditListScreen;
