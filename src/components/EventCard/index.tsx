import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Event } from '../../data/mockEvents';

export default function EventCard({ item, onPress }: { item: Event; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.meta}>{new Date(item.date).toLocaleString()} • {item.city}</Text>
      <Text style={styles.meta}>{item.price ?? 'Free'}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, elevation: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
});
