import { Category } from "./category";
import { ShoppingListItem } from "./shoppingListItem";


export interface ShoppingList {
    id: number;
    owner_id: number;
    title: string;
    creation_date: string;
    update_date: string;
    is_completed: boolean;
    category: Category;
    shopping_items: ShoppingListItem[];
}
