import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomCheckboxProps {
  disabled?: boolean;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const CustomCheckbox = ({ isChecked, onCheckChange, disabled }: CustomCheckboxProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;  // Reference to manage scale animation

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isChecked ? 1.1 : 0.1,  // Scale up slightly when checked
      friction: 3,  // Controls "bounciness"/overshoot
      useNativeDriver: true,
    }).start();
  }, [isChecked, scaleAnim]);

  const iconSize = 20; 

  return (
    <TouchableOpacity
      style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
      disabled={disabled}
      onPress={() => onCheckChange(!isChecked)}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name="checkmark" size={iconSize} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#A7C7E7',
    borderColor: '#A7C7E7',
  },
});

export default CustomCheckbox;
