// ChessboardStyles.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChessboardStyles = ({ selectedStyle, onSelectStyle }) => {
  const chessboardOptions = ['classic', 'wooden', 'metallic', 'minimalist'];

  return (
    <View>
      <Text style={styles.sectionTitle}>Chessboard Style:</Text>
      <View style={styles.optionsContainer}>
        {chessboardOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              option === selectedStyle && styles.selectedOption,
            ]}
            onPress={() => onSelectStyle(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: 'lightgray',
  },
});

export default ChessboardStyles;
