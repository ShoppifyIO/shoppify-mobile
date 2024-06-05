import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../axiosConfig';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signUp(username: string, email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem('user');
      const storagedToken = await AsyncStorage.getItem('token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        axiosInstance.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      });
      const { user, token } = response.data;

      setUser(user);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Rejestracja użytkownika
      await axiosInstance.put('/register', {
        username,
        email,
        password,
      });

      // Automatyczne logowanie po rejestracji
      await signIn(username, password);
    } catch (error) {
      console.error(error);
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
    delete axiosInstance.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
