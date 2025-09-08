// src/screens/Auth/RegisterScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle, cancelAnimation } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { signupUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SlidingAuthCard, { SlidingAuthCardRef } from '../LoginScreen/SlidingAuthCardRef';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Register'>;


export default function RegisterScreen({ navigation }: Props) {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast]   = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [confirm, setConfirm] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const sheetRef = useRef<SlidingAuthCardRef>(null);

  const backTx = useSharedValue(-32);
  const backOp = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      backTx.value = withTiming(0, { duration: 280, easing: Easing.out(Easing.cubic) }); // L → R to 0
      backOp.value = withTiming(1, { duration: 280 });
    }, [])
  );

  const backStyle = useAnimatedStyle(() => ({
    opacity: backOp.value,
    transform: [{ translateX: backTx.value }],
  }));

  const [exiting, setExiting] = useState(false);
  const leaveToLogin = () => {
    if (exiting) return;
    setExiting(true);

    // 1) back arrow → LEFT & fade out (quick)
    backOp.value = withTiming(0, { duration: 160 });
    backTx.value = withTiming(-28, { duration: 160 });

    // 2) card → RIGHT, then navigate
    sheetRef.current?.slideOut(
      'right',
      () => {
        requestAnimationFrame(() => {
          navigation.navigate('Login');
          setExiting(false);
        });
      },

    );
  };

  const onSignup = async () => {
    try { await dispatch(signupUser({ email, password })).unwrap(); }
    catch {}
  };

  const disabled = !firstName || !lastName || !email || !password || confirm !== password || loading;

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.backWrap, backStyle]}>
        <Pressable onPress={leaveToLogin} hitSlop={12} accessibilityLabel="Back to Login">
          <Text style={styles.backIcon}>{'‹'}</Text>
        </Pressable>
      </Animated.View>

      {/* enters from RIGHT so it overlays Login */}
      <SlidingAuthCard
        ref={sheetRef}
        enterFrom="right"
        style={styles.cardShapeSignup}
      >
        <Text style={styles.title}>Sign Up</Text>

        <TextInput placeholder="First name" value={firstName} onChangeText={setFirst} style={styles.input} placeholderTextColor="#9DA3AE" />
        <TextInput placeholder="Last name"  value={lastName}  onChangeText={setLast}  style={styles.input} placeholderTextColor="#9DA3AE" />
        <TextInput placeholder="Email"      value={email}     onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholderTextColor="#9DA3AE" />
        <TextInput placeholder="Password"   value={password}  onChangeText={setPass}  secureTextEntry style={styles.input} placeholderTextColor="#9DA3AE" />
        <TextInput placeholder="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry style={styles.input} placeholderTextColor="#9DA3AE" />

        {loading ? <ActivityIndicator /> : <Button title="Sign Up" onPress={onSignup} disabled={disabled} />}

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.link} onPress={leaveToLogin}>
          Already have any account? <Text style={styles.linkBold}>Sign In</Text>
        </Text>
      </SlidingAuthCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'black' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#111' },
  cardShapeSignup: {
    borderTopLeftRadius: 80,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 40,
    marginTop: 100,
  },
  input: {
    width: '100%', height: 48, borderRadius: 12, backgroundColor: '#FFF',
    paddingHorizontal: 14, borderWidth: 1, borderColor: '#E8E8ED', marginBottom: 12,
  },
  error: { color: '#FF3B30', marginTop: 10, textAlign: 'center' },
  link: { marginTop: 22, textAlign: 'center', color: '#6B7280' },
  linkBold: { color: '#111', fontWeight: '600' },
  backWrap: { position: 'absolute', left: 12, top: 24, zIndex: 10 },
  backIcon: { fontSize: 26, color: '#fff' },
});
