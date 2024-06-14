import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const completeShoppingListItem = async (itemId: number, onSuccess: () => void, onError: (error: any) => void) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`/shopping-item/complete/${itemId}`, {}, {
      headers: { token: token }
    });

    if (response.status === 200) {
      onSuccess();
    } else {
      onError(new Error("Nie udało się oznaczyć elementu jako ukończonego"));
    }
  } catch (error) {
    onError(error);
  }
};

export const incompleteShoppingListItem = async (itemId: number, onSuccess: () => void, onError: (error: any) => void) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`/shopping-item/incomplete/${itemId}`, {}, {
      headers: { token: token }
    });

    if (response.status === 200) {
      onSuccess();
    } else {
      onError(new Error("Nie udało się oznaczyć elementu jako nieukończonego"));
    }
  } catch (error) {
    onError(error);
  }
};
