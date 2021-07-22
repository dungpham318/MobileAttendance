import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native'
import size from '../../res/size'
import font from '../../res/font'
import image from '../../res/image'

const Header = (props) => {


  return (

    <SafeAreaView>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: props.backgroundColor
      }}>

        <TouchableOpacity onPress={() => {
          props.onPressBackButton === undefined ?
            props.navigation.goBack() :
            props.onPressBackButton()
        }}>
          <Image
            resizeMode='contain'
            source={image.ic_goBack}
            style={{
              width: size.s30,
              height: size.s30,
              marginHorizontal: size.s40
            }}
          />
        </TouchableOpacity>
        <Text style={{
          color: '#262626',
          fontSize: size.s30,
          paddingVertical: size.s30,
          fontFamily: font.bold,
          flex: 1,
          textAlign: 'center'
        }}>{props.label}</Text>

        <TouchableOpacity>
          <Image
            // source={image.ic_goBack}
            style={{
              width: size.s30,
              height: size.s30,
              marginHorizontal: size.s40
            }}
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>

  )

}

Header.defaultProps = {
  label: '',
  onPress: () => { },
  backgroundColor: 'transparent'
}

export default Header