import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from "@react-navigation/native";


export default function Heading({text, isViewAll=false}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      {/* {isViewAll ? <Text>View All</Text> : null} */}
      {isViewAll && <TouchableOpacity onPress={()=>{navigation.push('TutorialScreen')}}><Text>View All</Text></TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
      fontSize: 20,
      fontFamily: "outfit-medium",
      marginBottom: 10,
    },
})