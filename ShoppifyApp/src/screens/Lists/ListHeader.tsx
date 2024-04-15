import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { listStyles } from './listStyles';
import { ShoppingListHeader } from '../../models/shoppingListHeader';

interface ListHeaderProps {
  model: ShoppingListHeader;
  onPress: (id: number) => void; 
}

const ListHeader: React.FC<ListHeaderProps> = (props: ListHeaderProps) => {

  const onPress = () => {
    props.onPress(props.model.id);
  }

  return (
    <TouchableOpacity onPress={onPress} style={[
      listStyles.listItem,
      { borderLeftColor: props.model.categoryColor || 'transparent', borderLeftWidth: 15 }
    ]}>
      <View>
        <Text style={listStyles.listItemTitle}>{props.model.name}</Text>
        <Text style={listStyles.listItemCategory}>{props.model.categoryName}</Text>
        <Text style={listStyles.listItemUpdateInfo}>
          {`Ostatnio zaktualizowano: ${props.model.updateDate}`}
        </Text>
        <Text style={listStyles.listItemUpdateInfo}>{`Przez: ${props.model.updatedBy}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListHeader;
