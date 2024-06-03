import { ImageSourcePropType } from "react-native";

export interface Friend {
    id: string;
    name: string;
    image: ImageSourcePropType;
    email: string; 
  }