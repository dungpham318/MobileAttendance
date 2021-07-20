import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native'
import size from '../../res/size'
import font from '../../res/font'
import image from '../../res/image'

const SearchBar = (props) => {

  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <View style={[{
      backgroundColor: '#B094D7',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: size.s20,
      borderRadius: size.s15,
    }, props.style]}>

      <Image
        source={image.search}
        style={{
          width: size.s30,
          height: size.s30,
          marginHorizontal: size.s10
        }}
      />

      <TextInput
        placeholder={props.placeholder}
        style={{
          paddingHorizontal: size.s20,
          paddingRight: size.s60,
          fontFamily: font.regular,
          fontSize: size.s30,
          color: '#ffffff',
          flex: 1,
          paddingVertical: size.s30,
        }}
        value={value}
        placeholderTextColor='#E8E8E8'
        onChangeText={(text) => {
          props.onChangeText(text)
          setValue(text)
        }}
      />

    </View>
  )

}

SearchBar.defaultProps = {
  value: '',
  placeholder: '',
  onChangeText: () => { }
}

export default SearchBar