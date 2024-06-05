import { Friend } from "../models/friend";

export const friendsMockData: Friend[] = [
    { id: '1', name: 'Alice', image: require('./../../assets/profiles/kitty.jpg'), email: 'alice@example.com' },
    { id: '2', name: 'Bob', image: require('./../../assets/profiles/bear2.jpg'), email: 'bob@example.com' },
    { id: '3', name: 'Charlie', image: require('./../../assets/profiles/squirrel.jpg'), email: 'charlie@example.com' },
    { id: '4', name: 'Will', image: require('./../../assets/profiles/bear4.jpg'), email: 'will@example.com' },
    { id: '5', name: 'Rea', image: require('./../../assets/profiles/rabbit.jpg'), email: 'rea@example.com' },
  ];

export const mockNewFriend = (id: string, name: string): Friend => {
  return{
    id: id, 
    name: name, 
    image: require('./../../assets/profiles/bear4.jpg'), 
    email: name + '@example.com' }
}