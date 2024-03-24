import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Text, FlatList, Switch } from 'react-native';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import CustomCheckbox from '../../controls/CustomCheckbox';

interface EditListModalProps {
  list: ShoppingListHeader | null;
  onSave: (list: ShoppingList) => void;
  onClose: () => void;
}

const EditListModal: React.FC<EditListModalProps> = ({ list, onSave, onClose }) => {
  const [name, setName] = useState("");
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    if (list) {
      setName(list.name);
      setItems(getListItems(list.id));
    }
  }, [list]);

  const handleSave = () => {
    if (list) {
      onSave({ ...list, name, items });
    }
    onClose();
  };

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', isCompleted: false }]);
  };

  return (
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nazwa listy"
      />
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <TextInput
              style={styles.itemInput}
              value={item.name}
              onChangeText={(text) => handleItemChange({ ...item, name: text }, index)}
              placeholder="Nazwa produktu"
            />
            <CustomCheckbox
              isChecked={item.isCompleted}
              onCheckChange={(newValue: boolean) => handleItemChange({ ...item, isCompleted: newValue }, index)}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={<Button title="Dodaj produkt" onPress={addItem} />}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Zapisz" onPress={handleSave} />
        <Button title="Anuluj" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default EditListModal;
function getListItems(id: number) {
  //todo: sięgnąć do backendu po elementy listy 
  return [];
}

