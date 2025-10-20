import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loginUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { OnboardingStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const onLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap(); 
      //navigation.replace('Home');
    } catch (e) {
        console.log(typeof e === 'string' ? e : 'Login failed');
        //Toast.show(typeof e === 'string' ? e : 'Login failed');    }
        };
    };

  const disabled = loading || !email || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {loading ? <ActivityIndicator /> : <Button title="Login" onPress={onLogin} disabled={disabled} />}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 8 },
  error: { color: 'red', marginTop: 8 },
  link: { marginTop: 12, color: 'blue', textAlign: 'center' },
});
