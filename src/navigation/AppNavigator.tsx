import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import OnboardingStack from './OnboardingStack';
import { useAppSelector } from '../redux/store';


export default function AppNavigator() {
  const { user, isHydrated } = useAppSelector((s) => s.auth);
  if (!isHydrated) return null;
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
