import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Friend } from '../models/friend';
import { Ionicons } from '@expo/vector-icons';
import { getFriends } from '../services/friendService';
import { profileImages } from '../mocks/friendList';

interface FriendsShareModalProps {
  visible: boolean;
  onClose: () => void;
  onShareConfirmed: (selectedFriends: Friend[]) => void;
  listId: number;
}

const getRandomImage = (usedImages: number[]) => {
  const availableImages = profileImages.filter(image => !usedImages.includes(image));
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

const FriendsShareModal: React.FC<FriendsShareModalProps> = ({ visible, onClose, onShareConfirmed, listId }) => {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [usedImages, setUsedImages] = useState<number[]>([]);

  useEffect(() => {
    if (visible) {
      fetchFriends();
      setSelectedFriends([]);
    }
  }, [visible]);

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

  const handleShare = () => {
    //todo: wykonać request share 
    onShareConfirmed(selectedFriends);
    onClose();
  };

  const toggleFriendSelection = (friend: Friend) => {
    const isSelected = selectedFriends.some(selected => selected.id === friend.id);
    const newSelectedFriends = isSelected
      ? selectedFriends.filter(selected => selected.id !== friend.id)
      : [...selectedFriends, friend];

    setSelectedFriends(newSelectedFriends);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Wybierz znajomych, którym chcesz udostępnić listę:</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={32} color="gray" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.friendItem,
                selectedFriends.some(selected => selected.id === item.id) && styles.friendItemSelected
              ]}
              onPress={() => toggleFriendSelection(item)}
            >
              <Image source={item.image} style={styles.friendImage} />
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.username}</Text>
                <Text style={styles.friendEmail}>{item.email}</Text>
              </View>
              {selectedFriends.some(selected => selected.id === item.id) && (
                <Ionicons name="checkmark" size={20} color="green" style={styles.checkmarkIcon} />
              )}
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Udostępnij</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    backgroundColor: '#fff',
  },
  friendItemSelected: {
    backgroundColor: '#e0f7fa',
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  friendName: {
    fontSize: 16,
  },
  friendEmail: {
    fontSize: 14,
    color: 'gray',
  },
  checkmarkIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#505168',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default FriendsShareModal;
