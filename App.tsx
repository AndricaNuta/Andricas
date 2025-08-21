import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {  RootState, store, useAppDispatch } from './src/redux/store';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { startAuthListener } from './src/redux/slices/authSlice';
import './src/localization/i18n';
import { useTranslation } from 'react-i18next';

function Bootstrap() {
  const dispatch = useAppDispatch();             
  const language = useSelector((s: RootState) => s.settings.language); 
  const { i18n } = useTranslation();             

  useEffect(() => {
    dispatch(startAuthListener());
  }, [dispatch]);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

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
