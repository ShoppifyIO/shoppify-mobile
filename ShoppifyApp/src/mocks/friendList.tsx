import { Friend } from "../models/friend";

export const friendsMockData: Friend[] = [
    { id: '1', username: 'Alice', image: require('./../../assets/profiles/image2.jpg'), email: 'alice@example.com' },
    { id: '2', username: 'Bob', image: require('./../../assets/profiles/image3.jpg'), email: 'bob@example.com' },
    { id: '3', username: 'Charlie', image: require('./../../assets/profiles/image4.jpg'), email: 'charlie@example.com' },
    { id: '4', username: 'Will', image: require('./../../assets/profiles/image5.jpg'), email: 'will@example.com' },
    { id: '5', username: 'Rea', image: require('./../../assets/profiles/image6.jpg'), email: 'rea@example.com' },
  ];

export const mockNewFriend = (id: string, name: string): Friend => {
  return{
    id: id, 
    username: name, 
    image: require('./../../assets/profiles/image7.jpg'), 
    email: name + '@example.com' }
}