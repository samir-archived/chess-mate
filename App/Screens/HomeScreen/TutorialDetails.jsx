import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function TutorialDetails({ tutorial }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: tutorial.images[0].url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
          {tutorial.name}
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "outfit", color: Colors.GRAY }}>
          {tutorial.description}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            padding: 3,
            color: Colors.WHITE,
            backgroundColor: "lightgreen",
            borderRadius: 3,
            alignSelf: 'flex-start',
            paddingHorizontal: 7
          }}
        >
          {tutorial.category.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },infoContainer:{
    padding: 7,
    display: 'flex',
    gap: 3,
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 10,
  },
});
