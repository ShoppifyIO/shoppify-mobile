import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
interface CustomCheckboxProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isChecked, onCheckChange }) => {
  const handlePress = () => {
    onCheckChange(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
      {isChecked ? (
        <Icon name="checkbox-marked" size={24} color="#007AFF" /> // Ikonka zaznaczonego checkboxa
      ) : (
        <Icon name="checkbox-blank-outline" size={24} color="#999" /> // Ikonka niezaznaczonego checkboxa
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    padding: 10, 
  }
});

export default CustomCheckbox;
