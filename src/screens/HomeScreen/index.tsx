import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, TextInput, FlatList, RefreshControl, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockEvents } from '../../data/mockEvents';
import EventCard from '../../components/EventCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setEvents } from '../../redux/slices/eventsSlice';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [q, setQ] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.items);

  useEffect(() => {
    dispatch(setEvents(mockEvents));
  }, [dispatch]);
  
  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return events;
    return events.filter(
      e => e.title.toLowerCase().includes(s) || e.city.toLowerCase().includes(s)
    );
  }, [q, events]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{alignSelf:'flex-end'}}onPress={()=>{navigation.navigate('Profile')}}> Profile </Text>
      <Text
        style={{ color: '#007AFF', marginBottom: 12, fontWeight: '600' }}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        + Create Event
      </Text>
      <Text style={styles.header}>Discover Events</Text>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search by title or city"
        style={styles.search}
        returnKeyType="search"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => navigation.navigate('EventDetails', { id: item.id })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events found.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8, backgroundColor: '#f7f7f7' },
  header: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  search: { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#e6e6e6', marginBottom: 12 },
  list: { paddingBottom: 24 },
  empty: { textAlign: 'center', color: '#777', marginTop: 40 },
});
