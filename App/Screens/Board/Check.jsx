import { View, Image } from 'react-native'
import React from 'react'

export default function Check({image, index}) {
    console.log("hello+++===>>>",image, index)
  return (
    <View>
      <Image
          key={image.key} // Important for performance and accessibility
          source={image.uri}
          style={{ width: 50, height: 50, margin: 5 }} // Adjust individual image styles
          alt={`Image ${index + 1}`} // Set descriptive alt text
        />
    </View>
  )
}