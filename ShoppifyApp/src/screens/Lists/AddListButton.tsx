import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AddListButtonProps {
  onPress: () => void;
}

const AddListButton: React.FC<AddListButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7C7E7',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddListButton;
