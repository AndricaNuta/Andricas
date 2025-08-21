import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCity, setDate, resetFilters } from '../../redux/slices/filterSlice';

export default function Filters() {
  const dispatch = useDispatch();
  const { city, date } = useSelector((s: RootState) => s.filters);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Filter by city"
        style={styles.input}
        value={city ?? ''}
        onChangeText={(val) => dispatch(setCity(val))}
      />
      <TextInput
        placeholder="Filter by date (YYYY-MM-DD)"
        style={styles.input}
        value={date ?? ''}
        onChangeText={(val) => dispatch(setDate(val))}
      />
      <Button title="Reset" onPress={() => dispatch(resetFilters())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, backgroundColor: '#f2f2f2' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
  },
});
