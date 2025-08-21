import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, makeSelectEventById, selectFavoriteIds } from '../../redux/slices/eventsSlice';
import type { AppDispatch, RootState } from '../../redux/store';

type Props = NativeStackScreenProps<HomeStackParamList, 'EventDetails'>;

export default function EventDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const selectById = useMemo(() => makeSelectEventById(id), [id]);
  const event = useSelector((s: RootState) => selectById(s));
  const favIds = useSelector(selectFavoriteIds);
  const isFav = favIds.includes(id);
  const dispatch = useDispatch<AppDispatch>();

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {new Date(event.date).toLocaleString()} • {event.city}
      </Text>
      {event.price ? <Text style={styles.meta}>{event.price}</Text> : null}
      {event.description ? <Text style={styles.desc}>{event.description}</Text> : null}

      <View style={{ height: 16 }} />
      <Button
        title={isFav ? 'Remove from Favorites' : 'Save to Favorites'}
        onPress={() => dispatch(toggleFavorite(id))}
      />
      <View style={{ height: 12 }} />
      <Button title="Book ticket" onPress={() => { /* later */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  meta: { color: '#555', marginTop: 4 },
  desc: { marginTop: 12, lineHeight: 20 },
});
