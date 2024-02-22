import React from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import RecordCss from "../../Utils/RecordCss";
import Colors from "../../Utils/Colors";

const RecordScreen = () => {
  const gameRecords = [
    { player: "Samir", time: "9:12:0" },
    { player: "Utsav", time: "10:12:0" },
    { player: "Rupak", time: "10:12:03" },
    { player: "Samir", time: "11:12:0" },
    { player: "Utsav", time: "11:12:0" },
    { player: "Rupak", time: "11:12:03" },
    { player: "Samir", time: "11:12:0" },
    { player: "Utsav", time: "11:12:0" },
    { player: "Rupak", time: "11:12:03" },
    // Add more records as needed
  ];
  let count = 0;

  const renderItem = ({ item }) => (
    <View
      style={[
        RecordCss.tableRow,
        {
          backgroundColor:
            count == 0
              ? "#f7c631"
              : count == 1
              ? "#bebdb9"
              : count == 2
              ? "#d5a47d"
              : Colors.WHITE,
        },
      ]}
    >
      <Text style={RecordCss.tableCell}>
        {count < 3 ? "#" : ""}
        {++count}
      </Text>
      <Text style={RecordCss.tableCell}>{item.player}</Text>
      <Text style={RecordCss.tableCell}>{item.time}</Text>
    </View>
  );

  return (
    // <ScrollView style={RecordCss.scrollContainer} showsVerticalScrollIndicator={false} >
    <View style={[RecordCss.container, RecordCss.scrollContainer]}>
      <FlatList
        data={gameRecords}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
    // </ScrollView>
  );
};

export default RecordScreen;
