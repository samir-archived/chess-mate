import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import Colors from "../../Utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { isGuest } from "../WelcomeScreen/WelcomeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export default function Header() {
  const { user, isLoading } = useUser();
  const navigation = useNavigation();
  
  return (
    (user || isGuest) && (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={()=>{navigation.push('ProfileScreen')}}>
            {isGuest ? (
              <FontAwesome5 name="user" size={25} color="white" />
            ) : (
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.userImage}
              />
            )}
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: "outfit",
                alignSelf: "center",
              }}
            >
              Welcome,
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 20,
                fontFamily: "outfit-medium",
              }}
            >
              {isGuest ? <Text>Guest User</Text> : user?.fullName}
            </Text>
          </View>
        </View>
        {/* <Feather name="bookmark" size={27} color="white" /> */}
        {/* <View style={styles.searchBarContainer}><TextInput placeholder="Search" style={styles.TextInput}/><Ionicons name="search" style={styles.searchBtn} size={24} color="black" /></View> */}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  TextInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
    fontFamily: "outfit",
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
});
