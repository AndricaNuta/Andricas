import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';
import { mockEvents } from '../../data/mockEvents';

type Props = NativeStackScreenProps<HomeStackParamList, 'EventDetails'>;

export default function EventDetailsScreen({ route }: Props) {
  const event = useMemo(() => mockEvents.find(e => e.id === route.params.id), [route.params.id]);
  if (!event) return <View style={styles.center}><Text>Event not found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{new Date(event.date).toLocaleString()} • {event.city}</Text>
      <Text style={styles.meta}>{event.price ?? 'Free'}</Text>
      <View style={{ height: 16 }} />
      <Button title="Book ticket"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  meta: { color: '#555', marginTop: 4 },
});
