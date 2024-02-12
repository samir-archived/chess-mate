import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Play() {
  const navigation = useNavigation();

  return (
    <View style={{}}>
      {/* <Heading text="Tutorials" isViewAll={true} /> */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.push('Board')}}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 40,
  },
  btnText: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
  },
});
