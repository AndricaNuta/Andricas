import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/slices/eventsSlice';
import type { AppDispatch } from '../../redux/store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../..//types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateEvent'>;

export default function CreateEventScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(''); // ISO string, e.g. 2025-09-30T18:00:00Z
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const onSubmit = () => {
    if (!title.trim() || !city.trim() || !date.trim()) {
      Alert.alert('Missing fields', 'Title, City and Date are required.');
      return;
    }
    dispatch(addEvent({
      id: Date.now().toString(), // simple id for demo
      title: title.trim(),
      city: city.trim(),
      date: date.trim(),
      description: description.trim() || undefined,
      price: price.trim() || undefined,
    }));
    navigation.goBack(); // back to Home; the new event will appear
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Event</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput
        style={styles.input}
        placeholder="Date (ISO) e.g. 2025-09-30T18:00:00Z"
        autoCapitalize="none"
        value={date}
        onChangeText={setDate}
      />
      <TextInput style={styles.input} placeholder="Price (optional)" value={price} onChangeText={setPrice} />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 12,
  },
});
