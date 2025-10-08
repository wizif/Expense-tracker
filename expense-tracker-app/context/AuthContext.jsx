import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// Get these from your Google Cloud Console (the ones we created before)
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

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

  // Expo Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          profilePicture: firebaseUser.photoURL,
        };
        setUser(userData);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } else {
        setUser(null);
        await AsyncStorage.removeItem('userData');
      }
      setLoading(false);
    });

    checkStoredUser();
    return () => unsubscribe();
  }, []);

  // Handle Google OAuth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.idToken) {
        handleGoogleSignIn(authentication.idToken);
      }
    }
  }, [response]);

  const checkStoredUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Error checking stored user:', error);
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    try {
      setLoading(true);
      
      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the credential
      await signInWithCredential(auth, credential);
      
      // Firebase onAuthStateChanged will handle setting the user
    } catch (error) {
      console.error('Firebase sign in error:', error);
      alert('Sign in failed: ' + error.message);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Google OAuth error:', error);
      alert('Sign in failed: ' + error.message);
    }
  };

  const login = () => {
    signInWithGoogle();
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
