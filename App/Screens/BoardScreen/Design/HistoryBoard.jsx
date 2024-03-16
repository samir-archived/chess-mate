import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList } from "react-native";
import ChessboardSquare from "./ChessboardSquare"; // Create ChessboardSquare component
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../Utils/Colors";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainContainer: {
        top: height / 2 - width / .9, // Half box above center
    },
    middleContainer: {
        width,
        height: width,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    infoText: {
        fontSize: 18,
        fontFamily: "outfit-medium"
    },
    timerContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    image: {
        height: 35,
        width: 35
    },
    imageRedo: {
        transform: [{ scaleX: -1 }]
    },
    container: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    evenRow: {
        backgroundColor: '#f0f0f0',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    headerRow: {
        backgroundColor: '#333333',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        padding: 5,
        color: '#333333',
    },
    headerCell: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

});

const HistoryBoard = () => {
    const navigatior = useNavigation();

    const handleRedo = () => {

    }
    const handleUndo = () => {

    }
    const onCancelGame = () => {

    }
    const renderMoveItem = () => {

    }

    const backOption = () => {
        navigatior.navigate('home');
    }

    // Sample moves data
    const moves = [
        { moveNumber: 1, whiteMove: 'e4', blackMove: 'e5' },
        { moveNumber: 2, whiteMove: 'Nf3', blackMove: 'Nc6' },
        { moveNumber: 3, whiteMove: 'Bb5', blackMove: 'a6' },
        { moveNumber: 4, whiteMove: 'Ba4', blackMove: 'Nf6' },
        { moveNumber: 5, whiteMove: 'O-O', blackMove: 'Be7' },
        // Add more moves as needed
    ];


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 20,
                }}
                onPress={backOption}
            >
                <Ionicons name="arrow-back-circle-outline" size={27} color="black" />
                <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
                    <Text>Home</Text>
                </Text>
            </TouchableOpacity>

            {/* Table Header */}
            <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Move</Text>
                <Text style={[styles.cell, styles.headerCell]}>White</Text>
                <Text style={[styles.cell, styles.headerCell]}>Black</Text>
            </View>

            {/* Table Body */}
            <FlatList
                data={moves}
                renderItem={renderMoveItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.infoContainer}>
                {/* <Text style={styles.infoText}>{`Turn: 1`}</Text> */}
                {/* <Text style={[styles.timerContainer, styles.infoText]}> Time : 11:12</Text> */}
                <Text style={styles.infoText}>Turn : Hello</Text>
                <Text style={styles.infoText}>Turn : Hello</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.middleContainer}>
                    <ChessboardSquare fen="rnbqkbnr/pp2pppp/2p5/3p4/8/3P4/PPP1PPPP/RNBQKBNR w KQkq - 0 1" />
                </View>
                <View style={styles.infoContainer}>
                    {/* <View style={styles.infoContainer}> */}
                    <Text style={styles.infoText}>Game Status : {`a4 - a5`}</Text>
                    {/* </View> */}
                </View>
                <View style={styles.infoContainer}>
                    <TouchableOpacity onPress={handleUndo}>
                        <Image style={[styles.image]} source={require("../../../../assets/images/undo.png")} />
                        {/* <FontAwesome name="arrow-left" size={24} color="black" /> */}
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={onCancelGame}>
                        <MaterialIcons name="restart-alt" size={24} color="black" />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={handleRedo}>
                        <Image style={[styles.image, styles.imageRedo]} source={require("../../../../assets/images/undo.png")} />
                        {/* <FontAwesome name="arrow-right" size={24} color="black" /> */}
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};


export default HistoryBoard;
