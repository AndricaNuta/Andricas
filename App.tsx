import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootTabs from './src/navigation/RootTabs';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <RootTabs />
      </SafeAreaProvider>
    </Provider>
  );
}
