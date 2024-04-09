import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ListRenderItemInfo, ImageSourcePropType, SafeAreaView } from 'react-native';

interface Friend {
  id: string;
  name: string;
  image: ImageSourcePropType;
}
const friendsData: Friend[] = [
  { id: '1', name: 'Alice', image: require('./../../assets/profiles/kitty.jpg') },
  { id: '2', name: 'Bob', image: require('./../../assets/profiles/bear2.jpg') },
  { id: '3', name: 'Charlie', image: require('./../../assets/profiles/squirrel.jpeg') },
];

const FriendsScreen = () => {

  const renderFriend = ({ item }: ListRenderItemInfo<Friend>) => (
    <TouchableOpacity style={styles.friendItem}>
      <Image source={item.image} style={styles.friendImage} />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friendsData}
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 18,
    color: '#333',
  },
});

export default FriendsScreen;
