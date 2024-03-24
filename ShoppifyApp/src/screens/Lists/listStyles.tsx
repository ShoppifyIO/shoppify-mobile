import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    width: '100%',
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
  listItemCategory: {
    fontStyle: 'italic',
    color: '#666',
    paddingTop: 5,
  },
  listItemUpdateInfo: {
    fontSize: 14,
    color: '#999',
    paddingTop: 5,
  }
});
