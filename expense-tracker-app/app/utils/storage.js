import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Save token
  async saveToken(token) {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  // Get token
  async getToken() {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Save user data
  async saveUser(user) {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  async getUser() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Clear all data (logout)
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
