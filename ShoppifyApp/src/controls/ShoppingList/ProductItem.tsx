import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import CustomCheckbox from '../../controls/CustomCheckbox';

interface ProductItemProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (text: string) => void;
  onCompletedChange: (newValue: boolean) => void;
  onAddNewItem: () => void;
  readOnly: boolean;
  checkDisabled: boolean;
  isOdd: boolean;
}

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.name === '' && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [props.name]);

  return (
    <View style={[styles.itemContainer, props.isOdd ? styles.oddItem : {}]}>
      <TextInput
        style={styles.itemInput}
        ref={inputRef}
        value={props.name}
        onChangeText={props.onNameChange}
        placeholder="Nazwa produktu"
        placeholderTextColor="#999"
        onSubmitEditing={props.onAddNewItem}
        readOnly={props.readOnly}
        
        
      />
      <CustomCheckbox
        disabled={props.checkDisabled}
        isChecked={props.isCompleted}
        onCheckChange={props.onCompletedChange}
      />
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
    marginLeft: 10
  },
  oddItem: {
    backgroundColor: '#f7f7f7',  // A light gray color for odd items
  }
});

export default ProductItem;
