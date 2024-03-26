import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import CustomCheckbox from '../../controls/CustomCheckbox';

interface ProductItemProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (text: string) => void;
  onCompletedChange: (newValue: boolean) => void;
  onAddNewItem: () => void; 
}

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {

    
  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.itemInput}
        value={props.name}
        onChangeText={props.onNameChange}
        placeholder="Nazwa produktu"
        placeholderTextColor="#999" // Jasniejszy kolor dla placeholdera
        onSubmitEditing={props.onAddNewItem} 
      />
      <CustomCheckbox isChecked={props.isCompleted} onCheckChange={props.onCompletedChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: Dimensions.get('window').width - 40, 
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    color: 'black', 
  },
});

export default ProductItem;
