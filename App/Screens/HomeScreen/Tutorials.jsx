import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import TutorialDetails from "./TutorialDetails";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    setBusinessList([
      {
        about: "This is first entry",
        address: "Kathmandu",
        category: { name: "Beginner" },
        description: "Practice Your Tactics",
        email: "customer1@gmail.com",
        id: "clsenwr661j3j0bo1mqn276jk",
        images: [{ 
          url: "https://cdn-media-1.freecodecamp.org/images/1*GzOiJRh6Z3FOC3xmPEmKrQ.gif",
        }],
        name: "Chess Basic",
      },
      {
        about: "This is second entry",
        address: "Pokhara",
        category: { name: "Pro" },
        description: "Today Not Tommorrow",
        email: "customer2@gmail.com",
        id: "clseo1gwt1j720bo1vkfe1sqw",
        images: [
          {
            url: "https://study.com/cimages/multimages/16/rsz_chess_moves.jpg",
          },
        ],
        name: "Don't miss this",
      },
      {
        about: "This is third entry",
        address: "Bhaktapur",
        category: { name: "Pro" },
        description: "Do or Lie",
        email: "customer3@gmail.com",
        id: "clseo2ttp1jbz0aoaro56ab2f",
        images: [
          {
            url: "https://i.pinimg.com/564x/79/84/51/798451e01c10bdfe816fcc532ec867d0.jpg",
          },
          {
            url: "https://media.graphassets.com/9Hv7AmutTqi62Eprkub0",
          },
          {
            url: "https://media.graphassets.com/g6141erASsWBMeuViJRz",
          },
        ],
        name: "You won't regret",
      },
      {
        about: "This is second entry",
        address: "Pokhara",
        category: { name: "Intermediate" },
        description: "Let's Play",
        email: "customer2@gmail.com",
        id: "clse1sqw",
        images: [
          {
            url: "https://www.wikihow.com/images/thumb/b/b2/Play-Chess-Step-1-Version-5.jpg/v4-460px-Play-Chess-Step-1-Version-5.jpg.webp" 
          },
        ],
        name: "Polish your capability",
      },
    ]);
  }, []);
  
  return (
    <View style={{ marginTop: 5 }}>
      <Heading text="Tutorials" isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <TutorialDetails tutorial={item} />
          </View>
        )}
      />
    </View>
  );
}
