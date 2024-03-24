import React from 'react';
import { View, Button, TextInput } from 'react-native';

interface LoginScreenProps{
    navigation: any
}

const LoginScreen = (props: LoginScreenProps) => {
  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => props.navigation.navigate('Main')} />
      <Button title="Register" onPress={() => props.navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;