import { Category } from "../category";
import { ShoppingListItem } from "../shoppingListItem";


export interface ShoppingListEdit {
    id: number;

    title: string;
    isTitleEdited: boolean;

    category_id: number | null;
    isCategoryEdited: boolean;

    deleted_shopping_item_ids: number[];
    edited_shopping_items: ShoppingListItem[];
    new_shopping_items: ShoppingListItem[];
}

export function initShoppingListEdit(id: number): ShoppingListEdit {
    const shoppingListEdit: ShoppingListEdit = {
        id: id,
        title: "",
        isTitleEdited: false,
        category_id: null,
        isCategoryEdited: false,
        deleted_shopping_item_ids: [],
        edited_shopping_items: [],
        new_shopping_items: []
    };

    return shoppingListEdit;
}

export function updateShoppingItem(shoppingListEdit: ShoppingListEdit, newItem: ShoppingListItem): ShoppingListEdit {
    const editedItemIndex: number = shoppingListEdit.edited_shopping_items.findIndex(item => item.id === newItem.id);
    if (editedItemIndex !== -1) {
        const newEditedShoppingItems: ShoppingListItem[] = [...shoppingListEdit.edited_shopping_items];
        newEditedShoppingItems[editedItemIndex] = newItem;
        return {
            ...shoppingListEdit,
            edited_shopping_items: newEditedShoppingItems
        }
    } else if (newItem.id > 0) {
        return {
            ...shoppingListEdit,
            edited_shopping_items: [newItem, ...shoppingListEdit.edited_shopping_items]
        }
    }

    const newItemIndex: number = shoppingListEdit.new_shopping_items.findIndex(item => item.id === newItem.id);
    if (newItemIndex !== -1) {
        const newNewShoppingItems: ShoppingListItem[] = [...shoppingListEdit.new_shopping_items];
        newNewShoppingItems[newItemIndex] = newItem;
        return {
            ...shoppingListEdit,
            new_shopping_items: newNewShoppingItems
        }
    } else if (newItem.id < 0) {
        return {
            ...shoppingListEdit,
            new_shopping_items: [newItem, ...shoppingListEdit.new_shopping_items]
        }
    }

    return shoppingListEdit;
}
