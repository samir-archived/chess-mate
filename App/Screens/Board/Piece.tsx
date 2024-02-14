// import { Position } from "chess.js";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import { toTranslation, toPosition } from "./Notation";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  Gesture,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";

// import { style, underlay, original } from "./MasterFile";

// import MovePiece from './MovePiece';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SIZE = width / 8;

export default function Piece({
  xCoordinate,
  yCoordinate,
  imgUri,
  enabled = true,
}) {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(xCoordinate);
  const translateY = useSharedValue(yCoordinate);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      // console.log(translateY.value, translateX.value);
      // if (translateY.value > -SIZE && translateX.value > -25) {
      translateX.value = offsetX.value + translationX;
      translateY.value = offsetY.value + translationY;
      // }
    },
    onEnd: () => {
      let col = String.fromCharCode(97 + Math.round(translateX.value / SIZE));
      let row = `${8 - Math.round(translateY.value / SIZE)}`;
      if (!col || !row) {
        throw new Error("Invalid notation: " + `${col}${row}`);
      }
      const indexes = {
        x: col.charCodeAt(0) - "a".charCodeAt(0),
        y: parseInt(row, 10) - 1,
      };
      const { x, y } = {
        x: indexes.x * SIZE,
        y: 7 * SIZE - indexes.y * SIZE,
      };
      translateX.value = withTiming(
        x,
        {},
        () => (offsetX.value = translateX.value)
      );
      translateY.value = withTiming(y, {}, () => {
        offsetY.value = translateY.value;
        isGestureActive.value = false;
      });
    },
  });

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log("Single tap!");
    });
  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log("Double tap!");
    });
  // const style = useAnimatedStyle(() => ({
  //   position: "absolute",
  //   zIndex: isGestureActive.value ? 100 : 10,
  //   transform: [
  //     { translateX: translateX.value },
  //     { translateY: translateY.value },
  //   ],
  // }));

  return (
    <GestureHandlerRootView style={{ position: "absolute" }}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        {/* <Animated.View style={{ style }}> */}
          {/* <Image source={imgUri} style={styles.piece} /> */}
        {/* </Animated.View> */}<View style={styles.box} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
  // return (
  //   <>
  //     <Animated.View style={original} />
  //     <Animated.View style={underlay} />
  //     <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
  //       <Animated.View style={style}>
  //         <Image source={imgUri} style={styles.piece} />
  //       </Animated.View>
  //     </PanGestureHandler>
  //   </>
  // );
}

const styles = StyleSheet.create({
  piece: {
    height: SIZE,
    width: SIZE,
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
},
});
