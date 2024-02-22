import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Heading({ text, isViewAll = false, isRecord = false }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: isRecord? 'center': 'stretch',
      justifyContent: "space-between",
    },
    heading: {
      fontSize: 20,
      fontFamily: "outfit-medium",
      marginBottom: 10,
      marginLeft: !isRecord ? 8 : 0,
      marginTop: isRecord ? 15 : 0,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      {isViewAll && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("tutorial");
          }}
        >
          <Text>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
