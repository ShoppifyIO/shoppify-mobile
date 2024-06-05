import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Upewnij się, że masz zainstalowaną tę bibliotekę
import { useAuth } from '../context/AuthContext';

interface UserProfileScreenProps {
  navigation: any;
}

const ProfileScreen = (props: UserProfileScreenProps) => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    props.navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={userProfileStyles.profileSection}>
      <Image
        source={require('./../../assets/profiles/bear1.jpg')} 
        style={userProfileStyles.profileImage}
      />
      <Text style={userProfileStyles.usernameText}>{user?.username}</Text>
      <Text style={userProfileStyles.emailText}>{user?.email}</Text>

      {/* Ikona wylogowania */}
      <TouchableOpacity style={userProfileStyles.logoutIcon} onPress={handleLogout}>
        <Icon name="logout" size={30} color="gray" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const userProfileStyles = StyleSheet.create({
  profileSection: {
    alignItems: 'center', 
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center', 
  },
  profileImage: {
    width: 170, 
    height: 170,
    borderRadius: 75, 
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
    marginBottom: 30, 
  },
  logoutIcon: {
    position: 'absolute',
    top: 30, 
    right: 20,
  },
});

export default ProfileScreen;
