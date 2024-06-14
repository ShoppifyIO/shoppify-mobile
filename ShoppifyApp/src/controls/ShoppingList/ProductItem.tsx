import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomCheckbox from '../../controls/CustomCheckbox';
import { ShoppingListItem } from '../../models/shoppingListItem';

interface ProductItemProps {
  onNameChange: (text: string) => void;
  onCompletedChange: (newValue: boolean) => void;
  onAddNewItem: () => void;
  readOnly: boolean;
  checkDisabled: boolean;
  isOdd: boolean;
  onDeleted: () => void;
  item: ShoppingListItem;
}

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.item?.name === '' && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [props.item?.name]);

  return (
    <View style={[styles.itemContainer, props.isOdd ? styles.oddItem : {}]}>
      <TextInput
        style={styles.itemInput}
        ref={inputRef}
        value={props.item?.name}
        onChangeText={props.onNameChange}
        placeholder="Nazwa produktu"
        placeholderTextColor="#999"
        onSubmitEditing={props.onAddNewItem}
        readOnly={props.readOnly}
      />
      <CustomCheckbox
        disabled={props.checkDisabled}
        isChecked={props.item?.is_completed}
        onCheckChange={props.onCompletedChange}
      />
      {!props.readOnly && (
        <TouchableOpacity onPress={props.onDeleted}>
          <Ionicons name="close-outline" size={24} color="gray" style={styles.deleteIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    height: 40,
    width: Dimensions.get('window').width - 40,
  },
  itemInput: {
    flex: 1,
    borderWidth: 0,
    borderColor: '#ccc',
    marginRight: 10,
    borderRadius: 5,
    color: 'black',
    marginLeft: 10,
  },
  oddItem: {
    backgroundColor: '#f7f7f7',  // A light gray color for odd items
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default ProductItem;
