import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0f1e', '#1a1a2e', '#252542']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <MaterialIcons name="account-balance-wallet" size={80} color="#4f7cff" />
          <Text style={styles.title}>Expense Tracker</Text>
          <Text style={styles.subtitle}>Track your spending, save smartly</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <MaterialIcons name="offline-bolt" size={32} color="#4ade80" />
            <Text style={styles.featureText}>Works Offline</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="bar-chart" size={32} color="#4f7cff" />
            <Text style={styles.featureText}>Smart Analytics</Text>
          </View>
          <View style={styles.feature}>
            <MaterialIcons name="security" size={32} color="#fbbf24" />
            <Text style={styles.featureText}>Secure & Private</Text>
          </View>
        </View>

        <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
          <MaterialIcons name="g-mobiledata" size={32} color="#fff" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </Pressable>

        <Text style={styles.footer}>Powered by Firebase Authentication</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0c0',
    marginTop: 8,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 40,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: '#a0a0c0',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f7cff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#4f7cff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    color: '#6c757d',
    fontSize: 12,
    marginTop: 20,
  },
});
