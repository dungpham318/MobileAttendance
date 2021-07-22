import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import size from '../../res/size'
import font from '../../res/font'

const Button = (props) => {

  // if (props.backgroundColor !== undefined) {
  //   <TouchableOpacity
  //     disabled
  //     style={[{
  //       width: '100%',
  //       borderRadius: size.s20,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       backgroundColor: props.backgroundColor
  //     }, props.style]}
  //     onPress={() => props.onPress()}>

  //     <Text style={{
  //       color: '#ffffff',
  //       fontSize: size.s30,
  //       paddingVertical: size.s30,
  //       paddingHorizontal: size.s30,
  //       fontFamily: font.bold,
  //     }}>{props.label}</Text>
  //   </TouchableOpacity>
  // } else if (props.disable) {
  return (
    <TouchableOpacity
      disabled={props.disable}
      style={[{
        width: '100%',
        borderRadius: size.s20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FE9E23'
      }, props.style]}
      onPress={() => props.onPress()}>

      <Text style={{
        fontSize: size.s30,
        paddingVertical: size.s25,
        paddingHorizontal: size.s30,
        fontFamily: font.bold,
        color: '#ffffff'
      }}>{props.label}</Text>
    </TouchableOpacity>
  )
  // } else {

  //   return (

  //     <TouchableOpacity style={props.style} onPress={() => props.onPress()}>
  //       <LinearGradient
  //         colors={['rgba(223, 119, 181, 1)', 'rgba(221, 86, 157, 1)']}
  //         style={[{
  //           width: '100%',
  //           borderRadius: size.s20,
  //           alignItems: 'center',
  //           justifyContent: 'center'
  //         }]}
  //       >
  //         <Text style={{
  //           color: '#ffffff',
  //           fontSize: size.s30,
  //           paddingVertical: size.s30,
  //           fontFamily: font.bold
  //         }}>{props.label}</Text>

  //       </LinearGradient>
  //     </TouchableOpacity>
  //   )
  // }


}

Button.defaultProps = {
  label: 'Button',
  onPress: () => { },
  disable: false
}

export default Button