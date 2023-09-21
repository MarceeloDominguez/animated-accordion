import {View, Text} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

type Prop = {
  progress: Animated.useSharedValue<number>;
};

export default function Chevron({progress}: Prop) {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));

  return (
    <Animated.View style={iconStyle}>
      <Text>Icon</Text>
    </Animated.View>
  );
}
