import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Friend } from '../models/friend';

export const addFriend = async (username: string, onSuccess: () => void, onError: (error: any) => void) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.put('/friends/add', { username }, {
      headers: { token: token }
    });

    if (response.status === 201) {
      onSuccess();
    } else {
      console.error("Failed to add friend", response.status);
      onError(new Error("Nie udało się dodać przyjaciela"));
    }
  } catch (error) {
    console.error(error);
    onError(error);
  }
};

export const getFriends = async (onSuccess: (friends: Friend[]) => void, onError: (error: any) => void) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.get('/friends', {
      headers: { token: token }
    });

    if (response.status === 200) {
      const friends = response.data.map((friend: any) => ({
        id: friend.id,
        username: friend.username,
        email: friend.email,
        image: { uri: friend.image_url },
      }));
      onSuccess(friends);
    } else {
      console.error("Failed to fetch friends", response.status);
      onError(new Error("Nie udało się pobrać listy przyjaciół"));
    }
  } catch (error) {
    console.error(error);
    onError(error);
  }
};


export const shareShoppingList = async (listId: number, friendIds: number[], onSuccess: () => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.post('/shopping-list/share', { shopping_list_id: listId, friend_ids: friendIds }, {
            headers: { token: token }
        });

        if (response.status === 200) {
            onSuccess();
        } else {
            console.error("Failed to share shopping list", response.status);
            onError(new Error("Nie udało się udostępnić listy"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};