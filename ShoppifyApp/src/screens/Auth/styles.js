import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7C7E7',
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
