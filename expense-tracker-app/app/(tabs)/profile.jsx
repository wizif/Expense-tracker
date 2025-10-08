import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        {user?.imageUrl ? (
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={48} color="#4f7cff" />
          </View>
        )}
        <Text style={styles.name}>
          {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}
        </Text>
        <Text style={styles.email}>{user?.emailAddresses[0]?.emailAddress || 'email@example.com'}</Text>
      </View>

      <View style={styles.menu}>
        <Pressable style={styles.menuItem}>
          <MaterialIcons name="settings" size={24} color="#a0a0c0" />
          <Text style={styles.menuText}>Settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#a0a0c0" />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <MaterialIcons name="help-outline" size={24} color="#a0a0c0" />
          <Text style={styles.menuText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={24} color="#a0a0c0" />
        </Pressable>

        <Pressable style={styles.menuItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#f43f5e" />
          <Text style={[styles.menuText, { color: '#f43f5e' }]}>Logout</Text>
          <MaterialIcons name="chevron-right" size={24} color="#f43f5e" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    margin: 20,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252542',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#252542',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
  },
  email: {
    fontSize: 14,
    color: '#a0a0c0',
    marginTop: 4,
  },
  menu: {
    margin: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252542',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 16,
  },
});
