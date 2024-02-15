import { Chess } from "chess.js";
import React, { useState, useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { toTranslation, SIZE, toPosition } from "./Notation";

function useConst(initialValue) {
  const ref = useRef();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
          initialValue()
          : initialValue,
    };
  }
  return ref.current.value;
}

export default function Piece({
  xCoordinate,
  yCoordinate,
  imgUri,
  chess,
  onTurn,
  enabled,
}) {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(xCoordinate);
  const translateY = useSharedValue(yCoordinate);
  
  const movePiece = useCallback(
    (to) => {
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);
      const { x, y } = toTranslation(move ? move.to : from);
      translateX.value = withTiming(
      x,
      {},
      () => (offsetX.value = translateX.value)
      );
      translateY.value = withTiming(y, {}, () => {
      offsetY.value = translateY.value;
      isGestureActive.value = false;
      });
      if (move) {
        chess.move({ from, to });
        // chess.move(move);
        onTurn();
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      if (
        0 <= translateY.value &&
        translateY.value <= 350 &&
        0 <= translateX.value &&
        translateX.value <= 350
      ) {
        translateX.value = offsetX.value + translationX;
        translateY.value = offsetY.value + translationY;
      }
    },
    onEnd: () => {
      runOnJS(movePiece)(
        toPosition({ x: translateX.value, y: translateY.value })
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const original = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    };
  });

  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });

  return (
    <>
      <Animated.View style={original} />
      <Animated.View style={underlay} />
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={style}>
          <Image source={imgUri} style={styles.piece} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  piece: {
    height: SIZE,
    width: SIZE,
  },
});
