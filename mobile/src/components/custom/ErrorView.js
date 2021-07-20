import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'
import font from '../../res/font'

const ErrorView = (props) => {
  return (
    <View style={props.style}>
      <Text style={{
        fontSize: props.size,
        color: 'rgba(255, 204, 199, 1)',
        paddingTop: props.size * 0.5,
        fontFamily: font.medium
      }}>{props.error}</Text>
    </View>
  )
}
ErrorView.defaultProps = {
  size: 12,
}
export default ErrorView