import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker';
import { addCategory, getCategories, deleteCategory } from '../services/categoryService';
import { Category } from '../models/category';

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
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

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

  const confirmDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id,
        () => {
          setCategories(categories.filter(c => c.id !== categoryToDelete.id));
          setCategoryToDelete(null);
          Alert.alert("Sukces", "Usunięto kategorię");
        },
        (error: any) => {
          console.error(error);
          Alert.alert("Błąd", "Nie udało się usunąć kategorii");
          setCategoryToDelete(null);
        }
      );
    }
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
              <View style={styles.categoryItemContainer}>
                <TouchableOpacity onPress={() => onCategorySelect(item)} style={styles.categoryItem}>
                  <View style={[styles.categoryColorCircle, { backgroundColor: item.color }]} />
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDeleteCategory(item)}>
                  <Ionicons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>
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
        <Modal visible={!!categoryToDelete} onRequestClose={() => setCategoryToDelete(null)} animationType="slide" transparent>
          <View style={styles.confirmDeleteOverlay}>
            <View style={styles.confirmDeleteModalContent}>
              <Text style={styles.confirmDeleteText}>Czy na pewno chcesz usunąć kategorię?</Text>
              <View style={styles.confirmDeleteButtonContainer}>
                <TouchableOpacity onPress={() => setCategoryToDelete(null)} style={styles.confirmDeleteButton}>
                  <Text style={styles.confirmDeleteButtonText}>Nie</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteCategory} style={styles.confirmDeleteButton}>
                  <Text style={styles.confirmDeleteButtonText}>Tak</Text>
                </TouchableOpacity>
              </View>
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
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    flex: 1,
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
  confirmDeleteOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmDeleteModalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmDeleteText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmDeleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmDeleteButton: {
    backgroundColor: '#505168',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmDeleteButtonText: {
    color: 'white',
  },
});

export default CategoryPicker;
