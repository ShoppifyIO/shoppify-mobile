import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingList{
    id: number;
    name: string;
    categoryName: string;
    categoryColor: string | null;
    ownerUsername: string;
    updateDate: string;
    updatedBy: string;
    items: ShoppingListItem [];
}