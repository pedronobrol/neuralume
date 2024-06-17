import {AuthToken} from './schema';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAuthToken = async (payload: AuthToken) => {
  AsyncStorage.setItem('token', payload.token);
  AsyncStorage.setItem('refreshToken', payload.refreshToken);
};

export const clearAuthToken = async () => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('refreshToken');
};

export const getAuthToken = async (): Promise<AuthToken | null> => {
  const authToken = {
    token: await AsyncStorage.getItem('token'),
    refreshToken: await AsyncStorage.getItem('refreshToken'),
  };
  if (
    typeof authToken.token === 'string' &&
    typeof authToken.refreshToken === 'string'
  ) {
    return authToken as AuthToken;
  }
  return null;
};
