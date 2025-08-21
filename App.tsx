import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store, useAppDispatch } from './src/redux/store';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { startAuthListener } from './src/redux/slices/authSlice';

function Bootstrap() {
  const dispatch = useAppDispatch();            
  useEffect(() => {
    dispatch(startAuthListener());             
  }, [dispatch]);

  return <AppNavigator />;
}

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Bootstrap />
      </SafeAreaProvider>
    </Provider>
  );
}
