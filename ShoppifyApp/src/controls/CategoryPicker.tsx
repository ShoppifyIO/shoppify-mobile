import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../models/category';

interface CategoryPickerProps {
  visible: boolean;
  onClose: () => void;
  onCategorySelect: (category: Category) => void;
  categories: Category[];
  onAddCategory: (title: string, color: string) => void;
}

const NEW_CATEGORY_DEFAULT_COLOR: string = '#686D76';

const CategoryPicker: React.FC<CategoryPickerProps> = ({ visible, onClose, onCategorySelect, categories, onAddCategory }) => {
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState(NEW_CATEGORY_DEFAULT_COLOR);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  const handleAddCategory = () => {
    onAddCategory(newCategoryTitle, newCategoryColor);
    setNewCategoryTitle('');
    setNewCategoryColor(NEW_CATEGORY_DEFAULT_COLOR);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Wybierz kategorię</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onCategorySelect(item)} style={styles.categoryItem}>
                <View style={[styles.categoryColorCircle, { backgroundColor: item.color }]} />
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.newCategoryContainer}>
            <TextInput
              placeholder="Nazwa nowej kategorii"
              value={newCategoryTitle}
              onChangeText={setNewCategoryTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Kolor HEX (np. #ff5733)"
              value={newCategoryColor}
              onChangeText={setNewCategoryColor}
              style={[styles.input, { marginLeft: 10, width: 100 }]}
            />
          </View>
          <TouchableOpacity onPress={handleAddCategory} style={styles.addButton}>
            <Text style={styles.addButtonText}>Dodaj kategorię</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  categoryColorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 16,
  },
  newCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#505168',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
  },
});

export default CategoryPicker;
