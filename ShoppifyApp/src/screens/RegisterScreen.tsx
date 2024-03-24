import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

interface RegisterScreenProps{
    navigation: any;
}

const RegisterScreen = (props: RegisterScreenProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Tutaj możesz dodać logikę rejestracji (np. walidację, komunikację z API)
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne!");
      return;
    }

    // Po pomyślnej rejestracji, przekieruj do ekranu głównego
    props.navigation.navigate('Main');
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
      <Button title="Zarejestruj się" onPress={handleRegister} />
      <Button title="Powrót do logowania" onPress={() => props.navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default RegisterScreen;
