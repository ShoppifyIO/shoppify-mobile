import { ImageSourcePropType } from "react-native";

export interface Friend {
    id: number;
    username: string;
    image: ImageSourcePropType;
    email: string; 
  }