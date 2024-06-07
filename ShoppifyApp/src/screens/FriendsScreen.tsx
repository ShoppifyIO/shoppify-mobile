import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ListRenderItemInfo, Modal, TextInput, SafeAreaView, Alert } from 'react-native';
import { Friend } from '../models/friend';
import ActionButton from './Lists/ActionButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addFriend, getFriends } from '../services/friendService';

const profileImages = [
  require('./../../assets/profiles/image1.jpg'),
  require('./../../assets/profiles/image2.jpg'),
  require('./../../assets/profiles/image3.jpg'),
  require('./../../assets/profiles/image4.jpg'),
  require('./../../assets/profiles/image5.jpg'),
  require('./../../assets/profiles/image6.jpg'),
  require('./../../assets/profiles/image7.jpg')
];

const getRandomImage = (usedImages: number[]) => {
  const availableImages = profileImages.filter(image => !usedImages.includes(image));
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

const FriendsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [usedImages, setUsedImages] = useState<number[]>([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = () => {
    getFriends(
      (fetchedFriends) => {
        const friendsWithImages = fetchedFriends.map(friend => {
          const randomImage = getRandomImage(usedImages);
          setUsedImages(prevUsedImages => [...prevUsedImages, randomImage]);
          return {
            ...friend,
            image: randomImage,
          };
        });
        setFriends(friendsWithImages);
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się pobrać listy przyjaciół");
      }
    );
  };

  const handleAddFriend = () => {
    if (newFriendName.trim() === '') {
      Alert.alert("Błąd", "Nazwa użytkownika nie może być pusta");
      return;
    }

    addFriend(
      newFriendName,
      () => {
        fetchFriends();
        setModalVisible(false);
        setNewFriendName('');
      },
      (error) => {
        console.error(error);
        Alert.alert("Błąd", "Nie udało się dodać przyjaciela", [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    );
  };

  const renderFriend = ({ item }: ListRenderItemInfo<Friend>) => (
    <TouchableOpacity style={styles.friendItem}>
      <Image source={item.image} style={styles.friendImage} />
      <View style={styles.friendTextContainer}>
        <Text style={styles.friendName}>{item.username}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {friends.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Dodaj znajomego!</Text>
        </View>
      ) : (
        <FlatList
          data={friends}
          renderItem={renderFriend}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <ActionButton onPress={() => setModalVisible(true)} label="+" />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Dodaj Przyjaciela</Text>
            <TextInput
              placeholder="Nazwa użytkownika"
              value={newFriendName}
              onChangeText={setNewFriendName}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddFriend} style={styles.addButton}>
              <Text style={styles.addButtonText}>Dodaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#555',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    elevation: 5,
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  friendTextContainer: {
    flexDirection: 'column',
  },
  friendName: {
    fontSize: 18,
    color: '#333',
  },
  friendEmail: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#505168',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default FriendsScreen;
