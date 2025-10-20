import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/slices/authSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((s: RootState) => s.auth);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>You’re not logged in</Text>
        <Text style={styles.muted}>Go to Login to access your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar placeholder */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{(user.email ?? 'U')[0]?.toUpperCase()}</Text>
      </View>

      <Text style={styles.title}>Profile</Text>
      <View style={styles.row}>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value} numberOfLines={1}>{user.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email ?? '—'}</Text>
      </View>

      <View style={styles.divider} />

      <Button
        title={loading ? 'Signing out…' : 'Logout'}
        onPress={() => dispatch(logoutUser())}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  muted: { color: '#666', marginTop: 6, textAlign: 'center' },
  row: { marginBottom: 12 },
  label: { color: '#666', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600' },
  divider: { height: 16 },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#e8e8e8',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#555' },
});
