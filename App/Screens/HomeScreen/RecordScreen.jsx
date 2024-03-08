import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import RecordCss from "../../Utils/RecordCss";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import { useChess } from "../BoardScreen/Design/ChessContext";
import InternetCheck from "../../Components/InternetCheck";
import NoInternet from "../../Components/NoInternet";

const RecordScreen = () => {
  const { getSavedGames } = useChess();
  const [savedGames, setSavedGames] = useState([]);
  const isConnected = InternetCheck();


  const dummyData = [
    { player: "John Doe", time: "10:30" },
    { player: "Jane Smith", time: "12:45" },
    { player: "Bob Johnson", time: "14:15" },
    { player: "Alice Williams", time: "16:00" },
    { player: "Charlie Brown", time: "18:20" },
    { player: "John Doe", time: "10:30" },
    { player: "Jane Smith", time: "12:45" },
    { player: "Charlie Brown", time: "18:20" },
    { player: "John Doe", time: "10:30" },
    { player: "Jane Smith", time: "12:45" },
  ];
  useEffect(() => {
    // const fetchSavedGames = async () => {
    //   const gameRecords = await getSavedGames();
    //   setSavedGames(gameRecords);
    // };

    // fetchSavedGames();
    setSavedGames(dummyData);
  }, []);
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
    <View>
      <Heading text="Game Records" isRecord={true} />
      <View style={[RecordCss.container, RecordCss.scrollContainer,]}>
        {
          isConnected &&
          <View style={RecordCss.tableHeader}>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
              Position
            </Text>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
              Player
            </Text>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>Time</Text>
          </View>
        }
        <View style={[{
          paddingHorizontal: "3%",
        }]}>
          {
            isConnected ? (
              <FlatList
                data={savedGames}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />

            ) : (
                <NoInternet />
            )}
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

export default RecordScreen;