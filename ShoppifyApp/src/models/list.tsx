import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingList{
    id: string;
    name: string;
    categoryName: string;
    categoryColor: string | null;
    ownerUsername: string;
    updateDate: string;
    updatedBy: string;
    items: ShoppingListItem [];
}