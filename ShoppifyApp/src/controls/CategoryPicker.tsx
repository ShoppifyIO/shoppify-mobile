import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker';
import { addCategory, getCategories } from '../services/categoryService';

interface Category {
  id: number;
  title: string;
  color: string;
}

interface CategoryPickerProps {
  visible: boolean;
  onClose: () => void;
  onCategorySelect: (category: Category) => void;
}

const NEW_CATEGORY_DEFAULT_COLOR: string = '#686D76';

const CategoryPicker: React.FC<CategoryPickerProps> = ({ visible, onClose, onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState(NEW_CATEGORY_DEFAULT_COLOR);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getCategories(
      (fetchedCategories: Category[]) => setCategories(fetchedCategories),
      (error: any) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać kategorii");
      }
    );
  };

  const handleAddCategory = () => {
    addCategory(newCategoryTitle, newCategoryColor,
      (newCategory: Category) => {
        setCategories([...categories, newCategory]);
        setNewCategoryTitle('');
        setNewCategoryColor(NEW_CATEGORY_DEFAULT_COLOR);
      },
      (error: any) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się dodać kategorii");
      }
    );
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
            <TouchableOpacity onPress={() => setColorPickerVisible(true)} style={styles.colorPickerButton}>
              <Ionicons name="brush" size={24} color={newCategoryColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleAddCategory} style={styles.addButton}>
            <Text style={styles.addButtonText}>Dodaj kategorię</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={isColorPickerVisible} animationType="slide" transparent>
          <View style={styles.colorPickerOverlay}>
            <View style={styles.colorPickerModalContent}>
              <ColorPicker
                color={newCategoryColor}
                onColorChangeComplete={(color) => setNewCategoryColor(color)}
                row={false}
                sliderHidden={true}
                gapSize={10}
                thumbSize={20}
              />
              <TouchableOpacity onPress={() => setColorPickerVisible(false)} style={styles.colorPickerCloseButton}>
                <Text style={styles.colorPickerCloseButtonText}>Zamknij</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  colorPickerButton: {
    marginLeft: 10,
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
  colorPickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  colorPickerModalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    flex: 1
    
  },
  colorPickerCloseButton: {
    backgroundColor: '#505168',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 60,
  },
  colorPickerCloseButtonText: {
    color: 'white',
  },
});

export default CategoryPicker;
