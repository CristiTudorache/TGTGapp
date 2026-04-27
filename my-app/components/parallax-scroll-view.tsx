import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  headerImage: React.ReactElement;
  headerBackgroundColor: { dark: string; light: string };
};

const HEADER_HEIGHT = 250;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0],
      [2, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateY: Number(translateY) },
        { scale: Number(scale) },
      ] as any,
    };
  });

  const bgColor =
    colorScheme === "dark"
      ? headerBackgroundColor.dark
      : headerBackgroundColor.light;

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: bgColor },
          animatedHeaderStyle,
        ]}
      >
        {headerImage}
      </Animated.View>

      {/* CONTENT */}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}

/*  STYLES  */

const styles: any = StyleSheet.create({
  header: {
    position: "absolute",
    height: HEADER_HEIGHT,
    width: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
});