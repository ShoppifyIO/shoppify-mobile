import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingListHeader {
    id: number;
    name: string;
    categoryName: string;
    categoryColor: string | null;
    ownerUsername: string;
    updateDate: string;
    updatedBy: string;
}