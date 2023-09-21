import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedRef,
  runOnUI,
  measure,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {Data} from '../interface/dataInterface';

type Prop = {
  item: Data;
};

export default function RenderItem({item}: Prop) {
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue<number | undefined>(0);
  const open = useSharedValue(false);

  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value as number],
      Extrapolate.CLAMP,
    ),
  }));

  const handleHeightElementRef = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = measure(listRef)?.height;
      })();
    }
  };

  return (
    <View key={item.id} style={styles.contentCard}>
      <TouchableOpacity
        style={styles.headerCard}
        activeOpacity={1}
        onPress={() => {
          handleHeightElementRef();
          open.value = !open.value;
        }}>
        <Text style={styles.titleHeader}>{item.title}</Text>
        <Animated.View style={iconStyle}>
          <Image
            source={require('../icon/chevron-down.png')}
            style={styles.iconChevron}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.textContent}>{item.content}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentCard: {
    marginBottom: 14,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 5,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#96B6C5',
    padding: 14,
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#ADC4CE',
  },
  content: {
    padding: 14,
  },
  titleHeader: {
    color: '#0A2647',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textContent: {
    lineHeight: 18,
    fontWeight: '500',
  },
  iconChevron: {
    width: 25,
    height: 25,
  },
});
