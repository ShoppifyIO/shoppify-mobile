import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ListRenderItemInfo, ImageSourcePropType, SafeAreaView } from 'react-native';
import { friendsMockData } from '../mocks/friendList';
import { Friend } from '../models/friend';

const FriendsScreen = () => {
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
        data={friendsMockData}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
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
});

export default FriendsScreen;
