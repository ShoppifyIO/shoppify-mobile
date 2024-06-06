import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../models/category';

const SHOPPING_LIST_CATEGORY_NAME: string = "ShoppingList";

export const getCategories = async (onSuccess: (categories: Category[]) => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.get('/categories/list', {
            headers: { token: token }
        });

        if (response.status === 200) {
            const categories = response.data;
            onSuccess(categories);
        } else {
            console.error("Failed to fetch categories", response.status);
            onError(new Error("Nie udało się pobrać kategorii"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};

export const addCategory = async (title: string, color: string, onSuccess: (category: Category) => void, onError: (error: any) => void) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.post('/categories/add', {
            title: title,
            color: color,
            type: SHOPPING_LIST_CATEGORY_NAME,
            description: ""
        }, {
            headers: { token: token }
        });

        if (response.status === 200 || response.status === 201) {
            const newCategory = response.data;
            onSuccess(newCategory);
        } else {
            console.error("Failed to add category", response.status);
            onError(new Error("Nie udało się dodać kategorii"));
        }
    } catch (error) {
        console.error(error);
        onError(error);
    }
};
