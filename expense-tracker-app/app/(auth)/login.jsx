import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const router = useRouter();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });

      await setActiveSignIn({ session: result.createdSessionId });
      router.replace('/(tabs)');
    } catch (err) {
      alert(err.errors?.[0]?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      // For simplicity, auto-verify in development
      await setActiveSignUp({ session: result.createdSessionId });
      router.replace('/(tabs)');
    } catch (err) {
      alert(err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <MaterialIcons name="account-balance-wallet" size={80} color="#4f7cff" />
        <Text style={styles.title}>Expense Tracker</Text>
        <Text style={styles.subtitle}>{isSignUp ? 'Create your account' : 'Welcome back!'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6c757d"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password (min 8 characters)"
          placeholderTextColor="#6c757d"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={isSignUp ? handleSignUp : handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        </Pressable>

        <Pressable onPress={() => setIsSignUp(!isSignUp)} style={styles.switchButton}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </Pressable>

        <Text style={styles.footer}>Powered by Clerk</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0c0',
    marginTop: 8,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252542',
  },
  button: {
    width: '100%',
    backgroundColor: '#4f7cff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#3a5fcc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
  },
  switchText: {
    color: '#4f7cff',
    fontSize: 14,
  },
  footer: {
    color: '#6c757d',
    fontSize: 12,
    marginTop: 40,
  },
});
