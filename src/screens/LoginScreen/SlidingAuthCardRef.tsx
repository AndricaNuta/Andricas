import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Dimensions, Platform, StyleSheet, ViewProps } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Dir = 'left' | 'right' | 'none';

export type SlidingAuthCardRef = {
  slideOut: (dir: Exclude<Dir, 'none'>, onEnd?: () => void) => void;
};

type Props = ViewProps & {
  enterFrom?: Dir;
};

const DURATION = 420;

const SlidingAuthCard = forwardRef<SlidingAuthCardRef, React.PropsWithChildren<Props>>(
  ({ children, enterFrom = 'none', style, ...rest }, ref) => {
    const { width } = Dimensions.get('window');
    const initial =
      enterFrom === 'left' ? -width : enterFrom === 'right' ? width : 0;

    const tx = useSharedValue(initial);

    // entrance
    useEffect(() => {
      if (enterFrom !== 'none') {
        tx.value = withTiming(0, {
          duration: DURATION,
          easing: Easing.out(Easing.cubic),
        });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      slideOut: (dir, onEnd) => {
        tx.value = withTiming(
          dir === 'right' ? width : -width,
          { duration: DURATION, easing: Easing.out(Easing.cubic) },
          (finished) => {
            if (finished && onEnd) runOnJS(onEnd)();
          },
        );
      },
    }));

    const aStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: tx.value }],
    }));

    return (
      <Animated.View
        {...rest}
        style={[
          styles.card,
          style,
          aStyle,
          Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
            },
            android: { elevation: 4 },
          }),
        ]}
      >
        {children}
      </Animated.View>
    );
  }
);

export default SlidingAuthCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    padding: 20,
  },
});
