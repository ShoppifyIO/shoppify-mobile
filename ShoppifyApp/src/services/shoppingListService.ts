import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../models/ShoppingList';

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

export const getShoppingList = (id: number): ShoppingList => {
    if (id > 0) {
        return exampleShoppingList;
    }
    return newShoppingList;
};

const exampleShoppingList: ShoppingList = {
    id: 1,
    owner_id: 1,
    title: 'Tygodniowe zakupy',
    creation_date: new Date().toISOString(),
    update_date: new Date().toISOString(),
    is_completed: false,
    category: {
        id: 1,
        owner_id: 1,
        title: 'Spożywcze',
        color: "#00BFFF"
    },
    items: [
        { name: 'Chleb', isCompleted: false, quantity: 1 },
        { name: 'Mleko', isCompleted: true, quantity: 1 },
        { name: 'Jajka', isCompleted: false, quantity: 1 },
        { name: 'Ser żółty', isCompleted: false, quantity: 1 },
        { name: 'Masło', isCompleted: true, quantity: 1 },
        { name: 'Pomidory', isCompleted: false, quantity: 1 },
        { name: 'Ziemniaki', isCompleted: false, quantity: 1 },
        { name: 'Jabłka', isCompleted: false, quantity: 1 },
        { name: 'Cebula', isCompleted: true, quantity: 1 },
        { name: 'Kawa', isCompleted: false, quantity: 1 },
        { name: 'Herbata', isCompleted: true, quantity: 1 },
        { name: 'Cukier', isCompleted: false, quantity: 1 },
        { name: 'Mąka', isCompleted: false, quantity: 1 },
        { name: 'Ryż', isCompleted: false, quantity: 1 },
        { name: 'Makaron', isCompleted: true, quantity: 1 },
        { name: 'Olej słonecznikowy', isCompleted: false, quantity: 1 },
        { name: 'Papier toaletowy', isCompleted: true, quantity: 1 },
        { name: 'Szampon', isCompleted: false, quantity: 1 },
        { name: 'Mydło', isCompleted: true, quantity: 1 },
        { name: 'Pasta do zębów', isCompleted: false, quantity: 1 }
    ]
};

export const newShoppingList: ShoppingList = {
    id: -1,
    owner_id: -1,
    title: 'Nowa lista zakupów',
    creation_date: new Date().toISOString(),
    update_date: new Date().toISOString(),
    is_completed: false,
    category: {
        id: -1,
        owner_id: -1,
        title: '',
        color: ''
    },
    items: []
};
