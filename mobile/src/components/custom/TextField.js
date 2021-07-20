import React, { Component, useState } from 'react'
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Platform
} from 'react-native'
import size from '../../res/size'
import ErrorView from './ErrorView'
import image from '../../res/image'
import font from '../../res/font'
import { BlurView } from "@react-native-community/blur"
class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      _animatedLabel: new Animated.Value(0),
      isFocused: false,
      error: '',

    }
    // this._animatedLabel = Animated.Value(0)
  }

  componentDidMount() {
    if (this.props.value !== '') {
      this.setState({
        value: this.props.value
      }, () => {
        this.animatedLabel(1)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value === '') {
        this.setState({
          value: this.props.value
        }, () => {
          if (!this.state.isFocused) {
            this.animatedLabel(0)
          }
        })
      } else {
        this.setState({
          value: this.props.value
        }, () => {
          if (prevState.value.trim() === '' && this.state.value.trim() !== '') {
            this.animatedLabel(1)
          }
        })
      }
    }
  }

  animatedLabel = (value) => {
    Animated.timing(this.state._animatedLabel, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  setError = (value) => {
    this.setState({
      error: value
    })
  }

  render() {
    const {
      size,
      label,
      placeholder,
      defaultValue,
      secureTextEntry,
      onChangeText,
      editable,
      style,
      time,
      type,
      clearButton,
      textStyle,
      autoFocus,
      onFocus,
      onBlur,
      multiline,
      numberOfLines,
      keyboardAppearance,
      showEye,
      maxLength,
      minLength,
      numeric,
      keyboardType,
      isRequired,
      suggestMoney
    } = this.props;
    const labelStyle = {
      fontFamily: font.regular,
      left: 16,
      right: 16,
      position: 'absolute',
      top: this.state._animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [
          size * 1.1,
          size * 0.25,
          // OS === 'android' ? size * 1.35 : size * 1.1235,
          // OS === 'android' ? size * 0.2 : 0
        ],
      }),
      bottom: this.state._animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [
          size,
          size * 2,
          // Platform.OS === 'android' ? size * 1.35 : size * 1.125,
          // Platform.OS === 'android' ? size * 0.2 : 0
        ],
      }),
      fontSize: this.state._animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [size, size * 0.75],
      }),
      color: this.state._animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: ['#D9D9D9', '#E8E8E8'],
      }),
      lineHeight: this.state._animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [size * 1.25, Platform.OS === 'ios' ? size * 1.25 : size],
      }),
    }
    let borderColor = '#E8E8E8';
    if (this.state.isFocused) {
      if (this.state.error === '') {
        borderColor = '#E8E8E8'
      } else {
        borderColor = '#FF7875'
      }
    } else {
      if (this.state.error === '') {
        borderColor = '#E8E8E8'
      } else {
        borderColor = '#FF7875'
      }
    }
    return (
      <View>

        <View style={[{
          width: '100%',
          minHeight: size,
          justifyContent: 'center',
          // flexDirection: 'row',
          // alignItems: 'center',
          borderWidth: 1,
          borderColor: borderColor,
          minHeight: size * 3.5,
          borderRadius: 10,
          backgroundColor: !editable ? 'rgba(204, 204, 204, 0.2)' : 'transparent',


        }, this.props.style]}>
          {/* <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 10,
            }}
            blurType="light"
            blurAmount={0}
          /> */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode='interactive'
          >
            <View>

              <View style={{
                width: '100%',
                minHeight: size,
                flexDirection: 'row',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: borderColor,
                minHeight: size * 3.5,
                // borderRadius: 10,
                // backgroundColor: !editable ? '#F5F5F5' : '#ffffff',
              }}
              // type === 'border' && styleBorder,
              // type === 'borderColor' && styleBorderColor,
              // type === 'normal' && {
              //   borderBottomWidth: isFocused ? 0 : 1,
              //   borderBottomColor: borderColor,
              //   justifyContent: 'center',
              // }}
              >
                <Animated.Text style={labelStyle}>
                  {
                    isRequired ?
                      this.props.label + " (bắt buộc)" :
                      this.props.label
                  }
                  {/* {props.isRequired && (
            <Text
              style={{
                color: '#E60A32',
                fontSize: props.size,
              }}>
              {' '}
              *
            </Text> */}
                  {/* )} */}
                </Animated.Text>
                <TextInput
                  secureTextEntry={showEye ? false : secureTextEntry}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  autoFocus={autoFocus}
                  placeholder={this.state.isFocused ? placeholder : ''}
                  editable={editable}
                  maxLength={maxLength}
                  // defaultValue={defaultValue}
                  onChangeText={(text) => {
                    this.props.onChangeText(text)
                    this.setState({
                      value: text
                    })
                  }}
                  value={this.state.value}
                  style={{
                    paddingVertical: !this.state.isFocused && this.state.value === '' ? size * 1.125 : 0,
                    paddingTop: this.state.isFocused || this.state.value !== '' ? size * 1.4 : 0,
                    lineHeight: size * 1.25,
                    fontSize: size,
                    paddingLeft: 16,
                    paddingRight: 16,
                    flex: 1,
                    color: '#FFFFFF',
                    fontFamily: font.regular,
                    paddingBottom: multiline ? size * 0.25 : 0
                  }}
                  keyboardType={numeric ? 'numeric' : keyboardType}
                  onFocus={() => {
                    this.setState({
                      isFocused: true,
                      error: ''
                    }, () => {
                      this.animatedLabel(1)
                    })
                  }}
                  onBlur={() => {
                    if (this.state.value === '' && isRequired) {
                      this.setState({
                        error: 'Vui lòng nhập đầy đủ thông tin ' + label.toLowerCase()
                      })
                    }
                    this.setState({
                      isFocused: false
                    }, () => {
                      if (this.state.value === '') {
                        this.animatedLabel(0)
                      }
                    })
                    if (this.state.value && minLength && maxLength) {
                      let length = this.state.value.length
                      if (length < minLength || length > maxLength) {
                        this.setError(label + ' không hợp lệ')
                        isError = true
                      }
                    }
                    onBlur(this.state.value)
                  }}
                />
                {/* {clearButton && this.state.value !== '' && this.state.isFocused && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        value: ''
                      })
                      onChangeText('');
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View>
                      <Image
                        style={{
                          width: size * 2.25,
                          height: size * 2.25,
                        }}
                        resizeMode="contain"
                        source={image.ic_close}
                      />
                    </View>
                  </TouchableOpacity>
                )} */}

              </View>
            </View>

          </ScrollView>



        </View>
        {
          this.state.error !== '' &&
          <ErrorView
            error={this.state.error}
          />
        }

      </View>

    )
  }

}



TextField.defaultProps = {
  // onChangeText: () => { },
  size: size.s30,
  placeholder: '',
  label: 'Input text',
  defaultValue: '',
  editable: true,
  time: 200,
  keyboardAppearance: '',
  numeric: false,
  type: 'border',
  clearButton: true,
  autoFocus: false,
  onChangeText: (text) => { },
  onFocus: () => { },
  onBlur: () => { },
  multiline: false,
  numberOfLines: 1,
  error: '',
  value: '',
  secureTextEntry: false,
  showEye: false,
  onPress: () => { },
  suggestMoney: false
}

export default TextField
