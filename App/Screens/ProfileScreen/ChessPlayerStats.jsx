// ChessPlayerStats.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";

const ChessPlayerStats = ({ totalGames, wins, draws, losses }) => {
  return (
    <View style={styles.container}>
        <Heading text="Your Statistics" isStats={true}/>
      <View style={styles.rowContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{totalGames}</Text>
          <Text style={[styles.statLabel, {color: Colors.TOTAL}]}>Total Games</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{wins}</Text>
          <Text style={[styles.statLabel, {color: Colors.WIN}]}>Wins</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{draws}</Text>
          <Text style={[styles.statLabel, {color: Colors.DRAW}]}>Draws</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statValue}>{losses}</Text>
          <Text style={[styles.statLabel, {color: Colors.LOOSE}]}>Losses</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.statContainer}>
          <Text style={[styles.statLabel, {alignSelf: 'center'}]}>Remarks</Text>
          <Text style={styles.statValue}>You are doing great. Keep your brain sharp !!</Text>
        </View>
      </View>
      {/* Add more analytics or stats as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  statContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#F9E8C9',
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    alignSelf: 'center'
  },
});

export default ChessPlayerStats;
