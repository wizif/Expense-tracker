import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAuth } from '../../app/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>{user?.name || 'User'}</Text>
        </View>
        <MaterialIcons name="notifications-none" size={28} color="#fff" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹0.00</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <MaterialIcons name="arrow-upward" size={20} color="#4ade80" />
              <View>
                <Text style={styles.balanceType}>Income</Text>
                <Text style={styles.balanceValue}>₹0</Text>
              </View>
            </View>
            <View style={styles.balanceItem}>
              <MaterialIcons name="arrow-downward" size={20} color="#f43f5e" />
              <View>
                <Text style={styles.balanceType}>Expenses</Text>
                <Text style={styles.balanceValue}>₹0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionCard}>
              <MaterialIcons name="add" size={32} color="#4f7cff" />
              <Text style={styles.actionText}>Add Expense</Text>
            </Pressable>
            <Pressable style={styles.actionCard}>
              <MaterialIcons name="attach-money" size={32} color="#4ade80" />
              <Text style={styles.actionText}>Add Income</Text>
            </Pressable>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Pressable onPress={() => router.push('/(tabs)/expenses')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.emptyState}>
            <MaterialIcons name="receipt-long" size={64} color="#252542" />
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptySubtext}>Start tracking your expenses</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#a0a0c0',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: '#1a1a2e',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252542',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#a0a0c0',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceType: {
    fontSize: 12,
    color: '#a0a0c0',
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  seeAll: {
    fontSize: 14,
    color: '#4f7cff',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252542',
  },
  actionText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#a0a0c0',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});
