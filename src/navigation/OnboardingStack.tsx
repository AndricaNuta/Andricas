import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreeen from '../screens/RegisterScreeen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Events' }} />
      <Stack.Screen name="Register" component={RegisterScreeen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
