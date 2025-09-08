import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loginUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { OnboardingStackParamList } from '../../types/navigation';
import SlidingAuthCard, { SlidingAuthCardRef } from './SlidingAuthCardRef';
import { Easing } from 'react-native-reanimated';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Login'>;

const CARD_DUR = 560;
const CARD_EASE = Easing.bezier(0.22, 1, 0.36, 1);

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const sheetRef = useRef<SlidingAuthCardRef>(null);
  const [exiting, setExiting] = useState(false);

  const onLogin = async () => {
    try { await dispatch(loginUser({ email, password })).unwrap(); } catch {}
  };

  const goRegister = () => {
    if (exiting) return;
    setExiting(true);
    sheetRef.current?.slideOut(
      'right',
      () => {
        requestAnimationFrame(() => {
          navigation.navigate('Register');
          setExiting(false);
        });
      },
    );
  };

  const disabled = loading || !email || !password;

  return (
    <View style={styles.root}>
      <SlidingAuthCard ref={sheetRef} enterFrom="none" style={styles.cardShapeLogin}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <TextInput placeholder="Email" value={email} onChangeText={setEmail}
                     autoCapitalize="none" keyboardType="email-address" style={styles.input} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword}
                     secureTextEntry style={styles.input} />

          {loading ? <ActivityIndicator /> : <Button title="Login" onPress={onLogin} disabled={disabled} />}

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.link} onPress={goRegister}>
            Don’t have an account? Sign up
          </Text>
        </View>
      </SlidingAuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'black' },
  container: { flex: 1, paddingTop: 40, backgroundColor: 'white', borderTopLeftRadius: 80, top: '30%', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { width: '80%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 8 },
  error: { color: 'red', marginTop: 8 },
  link: { marginTop: 12, color: 'blue', textAlign: 'center' },
  cardShapeLogin: { borderTopLeftRadius: 80, marginTop: 190 },
});
