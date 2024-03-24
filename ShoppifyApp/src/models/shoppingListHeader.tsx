import { ShoppingListItem } from "./shoppingListItem";

export interface ShoppingListHeader {
    id: string;
    name: string;
    categoryName: string;
    categoryColor: string | null;
    ownerUsername: string;
    updateDate: string;
    updatedBy: string;
}