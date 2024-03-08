import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import InternetCheck from './InternetCheck';

export default function NoInternet() {

    const isConnected = InternetCheck();

    const styles = StyleSheet.create({
        text: {
            fontSize: 22,
            fontFamily: "outfit-bold",
        },
        image: {
            width: 320,
            height: 270,
            resizeMode: "cover",
            borderRadius: 10,
        },
        noInternetContainer: {
            marginTop: isConnected ? '15%' : '55%',
            alignItems: "center",
            justifyContent: "center",
        },
        noInternetText: {
            color: "red",
            fontFamily: "outfit-medium",
            textAlign: 'center',
        },
        whiteKing: {
            fontSize: 35,
        },
        blackKing: {
            fontSize: 35,
        },
    });
    
    return (
        <View style={styles.noInternetContainer}>
            <Text style={styles.text}>
                <Text style={styles.whiteKing}>&#9812; </Text>
                Chess Mate
                <Text style={styles.blackKing}> &#9818;</Text>
            </Text>
            <Image
                style={styles.image}
                source={require("../../assets/images/NoInternet.png")}
            />
            <Text style={styles.noInternetText}> No Internet Connection{"\n"} Reloads in every 5 second </Text>
        </View>
    );
}
