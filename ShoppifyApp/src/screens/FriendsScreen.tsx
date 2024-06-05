import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ListRenderItemInfo, Modal, TextInput, SafeAreaView } from 'react-native';
import { friendsMockData, mockNewFriend } from '../mocks/friendList';
import { Friend } from '../models/friend';
import ActionButton from './Lists/ActionButton';

const FriendsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [friends, setFriends] = useState<Friend[]>(friendsMockData);

  const addFriend = () => {
    console.log('Adding friend:', newFriendName);
    //todo: through api
    setFriends([...friends, mockNewFriend(String(friends.length + 1), newFriendName)]);
    setModalVisible(false);
    setNewFriendName('');
  };

  const renderFriend = ({ item }: ListRenderItemInfo<Friend>) => (
    <TouchableOpacity style={styles.friendItem}>
      <Image source={item.image} style={styles.friendImage} />
      <View style={styles.friendTextContainer}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
      <ActionButton onPress={() => setModalVisible(true)} label="+" />
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dodaj Przyjaciela</Text>
            <TextInput
              placeholder="Nazwa użytkownika"
              value={newFriendName}
              onChangeText={setNewFriendName}
              style={styles.input}
            />
            <TouchableOpacity onPress={addFriend} style={styles.addButton}>
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
});

export default FriendsScreen;
