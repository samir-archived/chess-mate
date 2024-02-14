import { Chess, Position } from 'chess.js';
import { View, Text } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { toTranslation, SIZE, toPosition } from "./Notation";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
function useConst<T>(initialValue: T | (() => T)): T {
    const ref = useRef<{ value: T }>();
    if (ref.current === undefined) {
        // Box the value in an object so we can tell if it's initialized even if the initializer
        // returns/is undefined
        ref.current = {
            value:
                typeof initialValue === "function"
                    ? // eslint-disable-next-line @typescript-eslint/ban-types
                    (initialValue as Function)()
                    : initialValue,
        };
    }
    return ref.current.value;
}

const chess = useConst(() => new Chess());

const [state, setState] = useState({
    player: "w",
    board: chess.board(),
});
const onTurn = useCallback(() => {
    setState({
        player: state.player === "w" ? "b" : "w",
        board: chess.board(),
    });
}, [chess, state.player]);

export const MovePiece = (offsetX, offsetY, translateX, translateY, isGestureActive) => useCallback(
    (to: Position) => {
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
            onTurn();
        }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
)