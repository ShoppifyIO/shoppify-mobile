import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ListRenderItemInfo, ImageSourcePropType, SafeAreaView } from 'react-native';

interface Friend {
  id: string;
  name: string;
  image: ImageSourcePropType;
  email: string; 
}

const friendsData: Friend[] = [
  { id: '1', name: 'Alice', image: require('./../../assets/profiles/kitty.jpg'), email: 'alice@example.com' },
  { id: '2', name: 'Bob', image: require('./../../assets/profiles/bear2.jpg'), email: 'bob@example.com' },
  { id: '3', name: 'Charlie', image: require('./../../assets/profiles/squirrel.jpg'), email: 'charlie@example.com' },
  { id: '4', name: 'Will', image: require('./../../assets/profiles/bear4.jpg'), email: 'will@example.com' },
  { id: '5', name: 'Rea', image: require('./../../assets/profiles/rabbit.jpg'), email: 'rea@example.com' },
];

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
