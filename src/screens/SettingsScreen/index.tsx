import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLanguage, toggleDarkMode } from '../../redux/slices/settingsSlice';
import { Switch } from 'react-native';
import { HomeStackParamList } from '../../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<HomeStackParamList, 'Settings'>;

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Romana', value: 'ro' },
  { label: 'Français', value: 'fr' },
];

export default function SettingsScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { darkMode, language } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{t('settings.darkMode')}</Text>
        <Switch
            value={darkMode}
            onValueChange={(val) => {
                dispatch(toggleDarkMode());
            }}
            />
     </View>

      <View style={styles.row}>
        <Text style={styles.label}>{t('settings.language')}</Text>
        <Dropdown
          style={styles.dropdown}
          data={languages}
          labelField="label"
          valueField="value"
          value={language}
          onChange={(item) => dispatch(setLanguage(item.value))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  label: { flex: 1, fontSize: 16 },
  dropdown: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
