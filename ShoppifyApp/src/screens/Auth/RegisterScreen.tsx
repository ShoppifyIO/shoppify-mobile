import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen = (props: RegisterScreenProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loading } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne!");
      return;
    }

    try {
      await signUp(username, email, password);
      props.navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Registration Error', (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Adres e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Potwierdź hasło"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{loading ? 'Rejestracja...' : 'Zarejestruj się'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Powrót do logowania</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
