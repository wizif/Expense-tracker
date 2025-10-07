import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.3:5000/api';
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Only initialize Google auth if client ID exists
  const googleAuthConfig = GOOGLE_CLIENT_ID ? {
    clientId: GOOGLE_CLIENT_ID,
  } : null;

  const [request, response, promptAsync] = Google.useAuthRequest(
    googleAuthConfig || { clientId: 'dummy' }
  );

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleLogin(authentication.accessToken);
      }
    }
  }, [response]);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');

      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (accessToken) => {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const userInfo = await userInfoResponse.json();

      const { data } = await axios.post(`${API_URL}/auth/google`, {
        googleId: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        profilePicture: userInfo.picture,
      });

      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    if (!GOOGLE_CLIENT_ID) {
      alert('Google Client ID not configured. Please add it to your .env file.');
      return;
    }
    try {
      await promptAsync();
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed. Please try again.');
    }
  };

  const login = () => {
    signInWithGoogle();
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['userToken', 'userData']);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
