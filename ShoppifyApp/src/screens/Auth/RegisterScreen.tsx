import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles'; 


interface RegisterScreenProps{
    navigation: any;
}

const RegisterScreen = (props: RegisterScreenProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Tutaj dodać logikę rejestracji (np. walidację, komunikację z API)
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne!");
      return;
    }

    // Po pomyślnej rejestracji, przekieruj do ekranu głównego
    props.navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nazwa użytkownika" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Adres e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Hasło" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Potwierdź hasło" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Powrót do logowania</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
