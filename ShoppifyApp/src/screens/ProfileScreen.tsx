import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
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
      <Text style={userProfileStyles.usernameText}>BearBear</Text>
      <Text style={userProfileStyles.emailText}>bearcor@hive.com</Text>

      {/* Ikona wylogowania */}
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
    flex: 1,
    justifyContent: 'center', // Zapewnia, że treści są wyśrodkowane wertykalnie
  },
  profileImage: {
    width: 150, // Dostosuj rozmiar według potrzeb
    height: 150,
    borderRadius: 75, // Ustawienie pełnego zaokrąglenia
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 32,
    color: '#333',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30, // Dodatkowy margines, aby zapewnić odstęp od przycisku wylogowania
  },
  logoutIcon: {
    position: 'absolute',
    top: 20, // Dodanie marginesu, aby ikona nie nachodziła na pasek statusu
    right: 20,
  },
});

export default ProfileScreen;
