import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// Token cache using AsyncStorage
const tokenCache = {
  async getToken(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      return;
    }
  },
};

// Initial Layout that's always shown
function InitialLayout() {
  return (
    <ClerkLoaded>
      <RootLayoutNav />
    </ClerkLoaded>
  );
}

// Navigation with auth check - INSIDE ClerkLoaded
function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isSignedIn && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1e' }}>
        <ActivityIndicator size="large" color="#4f7cff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
