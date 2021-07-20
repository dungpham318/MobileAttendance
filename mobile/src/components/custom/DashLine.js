import React, { Component, useState } from 'react'
import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput
} from 'react-native'
import size from '../../res/size'
import color from '../../res/color'

class DashLine extends Component {

  state = {
    list: [],
    width: 0,
    height: 0
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    let list = []
    let quantity = 0
    if (this.props.type === 'vertical') {
      quantity = parseInt(this.state.width / size.s10)
    } else {
      quantity = parseInt(this.state.height / size.s10)
    }

    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        if (i % 2 === 0) {
          if (this.props.type === 'vertical') {
            list.push(<View
              key={i}
              style={{
                height: 1,
                width: size.s10,
                backgroundColor: this.props.color,
                marginRight: size.s10
              }} />)
          } else {
            list.push(<View
              key={i}
              style={{
                height: size.s10,
                width: 1,
                backgroundColor: this.props.color,
                marginTop: size.s10
              }} />)
          }

        }
      }
    }

    return (
      <View
        onLayout={(event) => {
          if (this.props.type === 'vertical') {
            this.setState({ width: event.nativeEvent.layout.width })
          } else {
            this.setState({ height: event.nativeEvent.layout.height })
          }
        }}
        style={[{
          flex: 1,
          flexDirection: this.props.type === 'vertical' ? 'row' : 'column'
        }, this.props.style]}>
        {list}
      </View>
    )
  }
}

DashLine.defaultProps = {
  color: color.text,
  type: 'vertical'
}

export default DashLine