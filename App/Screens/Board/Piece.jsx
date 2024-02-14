import { Chess } from "chess.js";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SIZE = width / 8;

const postition = 'a1' | 'a2';
export default function Piece({
  xCoordinate,
  yCoordinate,
  imgUri,
  onTurn,
  enabled,
}) {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(xCoordinate);
  const translateY = useSharedValue(yCoordinate);
  const chess = new Chess();
  const movePiece = useCallback((from , to) => {
      const move = chess.moves({ verbose: true }).find((m) => m.from === from && m.to === to);
      // const from = toPosition({ x: offsetX.value, y: offsetY.value });
      // const move = moves.find((m) => m.from === from && m.to === to);
      const filterMove = (move ? move.to : from);
      const [col, row] = filterMove.split("");
      
      const indexes = {
        x: col.charCodeAt(0) - "a".charCodeAt(0),
        y: parseInt(row, 10) - 1,
      };
  
      const { x, y } = {
        x: indexes.x * SIZE,
        y: 7 * SIZE - indexes.y * SIZE,
      };
      translateX.value = withTiming(x);
      translateY.value = withTiming(y);
      // translateX.value = withTiming(
      //   x,
      //   {},
      //   () => (offsetX.value = translateX.value)
      // );
      // translateY.value = withTiming(y, {}, () => {
      //   offsetY.value = translateY.value;
      //   isGestureActive.value = false;
      // });
      if (move) {
        chess.move({ from, to });
        // chess.move(move);
        onTurn();
      }
    }, [chess, translateX, translateY, enabled, onTurn]  );


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
      // const position = toPosition({x: translateX.value, y: translateY.value});
      // const translation = toTranslation(position);
      let colFrom = String.fromCharCode(97 + Math.round(offsetX.value / SIZE));
      let rowFrom = `${8 - Math.round(offsetY.value / SIZE)}`;
      const from = `${colFrom}${rowFrom}`;
      
      let colTo = String.fromCharCode(97 + Math.round(translateX.value / SIZE));
      let rowTo = `${8 - Math.round(translateY.value / SIZE)}`;
      const to = `${colTo}${rowTo}`;

      runOnJS(movePiece)(from, to);
      // runOnJS(

        // if (!colTo || !rowTo) {
        //   throw new Error("Invalid notation: " + `${colTo}${rowTo}`);
        // }
        // const indexes = {
        //   x: colTo.charCodeAt(0) - "a".charCodeAt(0),
        //   y: parseInt(rowTo, 10) - 1,
        // };
        // const { x, y } = {
        //   x: indexes.x * SIZE,
        //   y: 7 * SIZE - indexes.y * SIZE,
        // };
        // translateX.value = withTiming(
        //   x,
        //   {},
        //   () => (offsetX.value = translateX.value)
        // );
        // translateY.value = withTiming(y, {}, () => {
        //   offsetY.value = translateY.value;
        //   isGestureActive.value = false;
        // });
      //   toPosition({ x: translateX.value, y: translateY.value })
      // );
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
    let col = String.fromCharCode(97 + Math.round(translateX.value / SIZE));
    let row = `${8 - Math.round(translateY.value / SIZE)}`;
    if (!col || !row) {
      throw new Error("Invalid notation: " + `${col}${row}`);
    }
    const indexes = {
      x: col.charCodeAt(0) - "a".charCodeAt(0),
      y: parseInt(row, 10) - 1,
    };

    const { x, y} = {
      x: indexes.x * SIZE,
      y: 7 * SIZE - indexes.y * SIZE,
    };

    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value ? "red" : "transparent",
      // : "rgba(255, 255, 0, 0.5)",
      transform: [{ translateX: x }, { translateY: y }],
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
