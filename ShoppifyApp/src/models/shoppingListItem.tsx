export interface ShoppingListItem {
    id: number,
    name: string;
    quantity: number;
    is_completed: boolean;
}

export function createEmptyItem(currentListItems: ShoppingListItem[]): ShoppingListItem {
    const minIdItem: ShoppingListItem | null = getItemWithLowestId(currentListItems);

    const newEmptyItem: ShoppingListItem = {
        id: 0,
        is_completed: false,
        name: '',
        quantity: 1
    }

    if (minIdItem === null || minIdItem.id >= 0) {
        newEmptyItem.id = -1;
    } else {
        newEmptyItem.id = minIdItem.id - 1;
    }
    
    return newEmptyItem;
}

function getItemWithLowestId(items: ShoppingListItem[]): ShoppingListItem | null {
    if (items.length === 0) {
        return null;
    }

    return items.reduce((lowestItem, currentItem) => {
        return currentItem.id < lowestItem.id ? currentItem : lowestItem;
    });
};
