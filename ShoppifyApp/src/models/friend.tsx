import { ImageSourcePropType } from "react-native";

export interface Friend {
    id: string;
    username: string;
    image: ImageSourcePropType;
    email: string; 
  }