import React from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SIZE = width / 8;

// Constants
const WHITE = "rgb(100, 133, 68)";
const BLACK = "rgb(230, 233, 198)";
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Chessboard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        board.push([]);
        for (let j = 0; j < 8; j++) {
            board[i][j] = null; // Initially, no piece on squares
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const isBlackSquare = (i + j) % 2 === 0;
            const backgroundColor = isBlackSquare ? BLACK : WHITE;
            const color = isBlackSquare ? WHITE : BLACK;
            const textStyle = { fontWeight: "500" as const, color };
            const position = `${horizontalAxis[j]}${verticalAxis[7 - i]}`;
            //   const piece = // Determine piece based on position (e.g., rook on corners, pawns on rank 2)
            board[i][j] = (
                <View key={position} style={[styles.piece, { backgroundColor }]}>
                    <Text style={[textStyle, { opacity: j === 0 ? 1 : 0 }]}>
                        {verticalAxis[7 - i]}
                    </Text>
                    {i === 7 && (
                        <Text style={[textStyle, { alignSelf: "flex-end" }]}>
                            {horizontalAxis[j]}
                        </Text>
                    )}
                    <Text>{position}</Text>
                    {/* {piece} // Render piece or empty element */}
                </View>
            );
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.chessboardContainer}>
                {/* Chess Board View */}
                <View style={styles.column}>
                    {new Array(8).fill(0).map((_, i) => (
                        <View style={styles.row}>
                            {new Array(8).fill(0).map((_, j) => (
                                board[i][j]
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        position: "absolute",
        top: height / 2.2 - width / 2, // Half box above center
    },
    chessboardContainer: {
        height: width,
        width: width,
    },
    column: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    piece: {
        flex: 1,
        padding: 1,
        justifyContent: "space-between",
        height: SIZE,
        width: SIZE,
    },
})
