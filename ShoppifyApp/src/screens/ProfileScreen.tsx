import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Upewnij się, że masz zainstalowaną tę bibliotekę

interface UserProfileScreenProps {
  navigation: any;
}

const ProfileScreen = (props: UserProfileScreenProps) => {

  const handleLogout = () => {
    //todo: Logika wylogowania
    props.navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={userProfileStyles.profileSection}>
      <Image
        source={require('./../../assets/profiles/bear.jpg')} // Zastąp ścieżką do zdjęcia profilowego
        style={userProfileStyles.profileImage}
      />
      <Text style={userProfileStyles.usernameText}> BearBear</Text>
      <Text style={userProfileStyles.emailText}>bearcor@hive.com</Text>

      {/* Ikona wylogowania w prawym górnym rogu */}
      <TouchableOpacity style={userProfileStyles.logoutIcon} onPress={handleLogout}>
        <Icon name="logout" size={30} color="gray" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Dodajemy i dostosowujemy style specyficzne dla UserProfileScreen
const userProfileStyles = StyleSheet.create({
  profileSection: {
    alignItems: 'center', // Wyśrodkowanie zdjęcia i informacji o użytkowniku
    paddingVertical: 20,
    flex: 1
  },
  profileImage: {
    width: 150, // Dostosuj rozmiar według potrzeb
    height: 150,
    borderRadius: 50, // Okrągłe zdjęcie profilowe
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 32,
    color: '#333',
    marginBottom: 10
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10
  },
  logoutIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProfileScreen;
