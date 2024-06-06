import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../models/ShoppingList';
import { ShoppingListHeader } from '../models/shoppingListHeader';

export const saveShoppingList = async (title: string, items: any[], onSuccess: (list: ShoppingList) => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.post('/shopping-list/add', {
            title: title,
            shopping_items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                isCompleted: false
            }))
        }, {
            headers: { token: token }
        });

        if (response.status === 200 || response.status === 201) {
            const updatedList = response.data;
            onSuccess(updatedList);
        } else {
            console.error("Failed to save the list", response.status);
            onError(new Error("Nie udało się zapisać listy"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};

export const getShoppingList = async (id: number, onSuccess: (list: ShoppingList) => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.get(`/shopping-list/${id}`, {
            headers: { token: token }
        });

        if (response.status === 200) {
            const list = response.data;
            onSuccess(list);
        } else {
            console.error("Failed to fetch the list", response.status);
            onError(new Error("Nie udało się pobrać listy"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};

export const getActiveShoppingLists = async (onSuccess: (lists: ShoppingListHeader[]) => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.get('/shopping-list/active', {
            headers: { token: token }
        });

        if (response.status === 200) {
            const lists = response.data.map((list: ShoppingList) => ({
                id: list.id,
                name: list.title,
                categoryName: list.category?.title,
                categoryColor: list.category?.color,
                ownerUsername: list.owner_id?.toString(),
                updateDate: list.update_date,
                updatedBy: list.owner_id?.toString(),
                completed: list.is_completed
            }));
            onSuccess(lists);
        } else {
            console.error("Failed to fetch active lists", response.status);
            onError(new Error("Nie udało się pobrać aktywnych list"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};


export const newShoppingList: ShoppingList = {
    id: -1,
    owner_id: -1,
    title: '',
    creation_date: new Date().toISOString(),
    update_date: new Date().toISOString(),
    is_completed: false,
    category: {
        id: -1,
        owner_id: -1,
        title: '',
        color: ''
    },
    shopping_items: []
};
