import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import api from './api';
import { storage } from '../utils/storage';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;

export const authService = {
  // Initialize Google sign in
  useGoogleAuth() {
    return Google.useAuthRequest({
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
    });
  },

  // Handle Google login
  async handleGoogleLogin(token) {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userInfo = await userInfoResponse.json();

      // Send to backend
      const { data } = await api.post('/auth/google', {
        googleId: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        profilePicture: userInfo.picture,
      });

      // Save token and user
      await storage.saveToken(data.token);
      await storage.saveUser(data.user);

      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Verify stored token
  async verifyToken() {
    try {
      const token = await storage.getToken();
      if (!token) return null;

      const { data } = await api.get('/auth/verify');
      return data.user;
    } catch (error) {
      await storage.clearAll();
      return null;
    }
  },

  // Logout
  async logout() {
    await storage.clearAll();
  }
};
