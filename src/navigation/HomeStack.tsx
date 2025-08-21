import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import type { HomeStackParamList } from '../types/navigation';
import ProfileScreen from '../screens/ProfileScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Events' }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ title: 'Create Event' }} />
    </Stack.Navigator>
  );
}
