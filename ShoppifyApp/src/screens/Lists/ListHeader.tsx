// ActiveListItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { listStyles } from './listStyles';
import { ShoppingListHeader } from '../../models/shoppingListHeader';

interface ListHeaderProps {
  model: ShoppingListHeader;
}

const ListHeader: React.FC<ListHeaderProps> = ({ model }) => {
  return (
    <View style={[
      listStyles.listItem,
      { borderLeftColor: model.categoryColor || 'transparent', borderLeftWidth: 15 }
    ]}>
      <Text style={listStyles.listItemTitle}>{model.name}</Text>
      <Text style={listStyles.listItemCategory}>{model.categoryName}</Text>
      <Text style={listStyles.listItemUpdateInfo}>
        {`Ostatnio zaktualizowano: ${model.updateDate}`}
      </Text>
      <Text style={listStyles.listItemUpdateInfo}>{`Przez: ${model.updatedBy}`}</Text>
    </View>
  );
};

export default ListHeader;
