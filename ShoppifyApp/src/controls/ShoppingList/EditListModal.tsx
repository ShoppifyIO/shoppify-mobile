import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from './ProductItem';
import { ShoppingList } from '../../models/list';
import { ShoppingListItem } from '../../models/shoppingListItem';
import ConfettiCannon from 'react-native-confetti-cannon';

interface EditListModalProps {
  listId: number;
  editMode?: boolean;
}

const EditListModal: React.FC<EditListModalProps> = (props: EditListModalProps) => {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<ShoppingList>(newShoppingList);
  const [editMode, setEditMode] = useState<boolean>(props.editMode ?? false);
  const [completed, setCompleted] = useState(false);
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
      const newItem = { name: '', isCompleted: false };
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

  return (
    <View style={[styles.modalContainer, { backgroundColor: completed ? '#f0f0f0' : 'white' }]}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nazwa listy"
          readOnly={!editMode}
        />
        {editMode ? (
          <>
            <TouchableOpacity style={styles.saveIcon} onPress={handleSave}>
              <Ionicons name="checkmark" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelIcon} onPress={handleCancel}>
              <Ionicons name="close" size={32} color="gray" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.icon} onPress={() => setEditMode(true)}>
              <Ionicons name="pencil" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.star} onPress={handleCompletion}>
              <Ionicons name={completed ? "checkmark-circle" : "checkmark-circle-outline"} size={completed ? 48 : 28} color={completed ? "#A7C7E7" : "gray"} />
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
              checkDisabled={completed}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </>
      {completed && <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        explosionSpeed={1000}
        fallSpeed={5000}
        colors={CONFETTI_COLORS}
        fadeOut={true}
        ref={confettiRef}
      />

      }

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

const CONFETTI_COLORS: string[] = [
  "#00BFFF", // Deep Sky Blue: A vivid, bright blue.
  "#FF69B4", // Hot Pink: A striking and bright pink.
  "#9370DB", // Medium Purple: A vibrant, yet not overly bright, purple.
  "#FF6347", // Tomato: A vivid red-orange.
  "#FFD700", // Gold: A bright and shiny gold.
  "#32CD32", // Lime Green: A bright and lively green.
  "#FFA500", // Orange: A pure, bright orange.
  "#40E0D0"  // Turquoise: A vibrant and energetic turquoise.
];

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