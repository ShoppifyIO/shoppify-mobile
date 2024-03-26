import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';
import { ShoppingListHeader } from '../../models/shoppingListHeader';
import ProductItem from './ProductItem'; // Upewnij się, że ścieżka do komponentu ProductItem jest poprawna

interface EditListModalProps {
  list: ShoppingListHeader | null;
  onSave: (list: ShoppingList) => void;
  onClose: () => void;
}

const EditListModal: React.FC<EditListModalProps> = ({ list, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    if (list) {
      setName(list.name);
    
      //todo:
      setItems(getListItems(list.id));
    }
  }, [list]);

  const handleSave = () => {
    if (list) {
      const filteredItems = items.filter(item => item.name.trim() !== '');
      onSave({ ...list, name, items: filteredItems });
    }
    onClose();
  };

  const handleItemChange = (item: ShoppingListItem, index: number) => {
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    if (items.length === 0 || items[items.length - 1].name.trim() !== '') {
      setItems([...items, { name: '', isCompleted: false }]);
    }
  };

  const renderProductItem = ({ item, index }: { item: ShoppingListItem; index: number }) => (
    <ProductItem
      name={item.name}
      isCompleted={item.isCompleted}
      onNameChange={(text) => handleItemChange({ ...item, name: text }, index)}
      onCompletedChange={(newValue) => handleItemChange({ ...item, isCompleted: newValue }, index)}
      onAddNewItem={addItem}
    />
  );

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Edytuj listę zakupów</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nazwa listy"
      />
      <FlatList
        data={items}
        renderItem={renderProductItem}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={<Button title="Dodaj produkt" onPress={addItem} disabled={items.length > 0 && items[items.length - 1].name.trim() === ''} />}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default EditListModal;

function getListItems(id: number) {
  return [];
}
