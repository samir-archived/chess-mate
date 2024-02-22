import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Heading from "../../Components/Heading";
import HandleVibration from "../../Components/HandleVibration";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Play() {
  const navigation = useNavigation();

  return (
    <View style={{}}>
      {/* <Heading text="Tutorials" isViewAll={true} /> */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => {HandleVibration(50); navigation.navigate('board')}}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   buttons: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
//   button: {
//     padding: 15,
//     backgroundColor: Colors.WHITE,
//     borderRadius: 15,
//     marginTop: 0,
//   },
//   btnText: {
//     textAlign: "center",
//     fontSize: 17,
//     fontFamily: "outfit-medium",
//     color: Colors.PRIMARY,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    paddingHorizontal: 16, 
  },
  buttons: {
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.LIGHTGREEN, 
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "85%", 
    alignItems: "center", 
  },
  btnText: {
    color: Colors.WHITE, 
    fontSize: 18,
  },

});