import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  NativeModules,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import DeviceInfo, { getUniqueId, getManufacturer } from 'react-native-device-info'
import { URL, userProfile } from '../../settings/index'
import Loading from '../custom/Loading';
import Header from '../custom/Header';
import Button from '../custom/Button';
import size from '../../res/size';
import font from '../../res/font';
import Geolocation from '@react-native-community/geolocation';
import { convertDate } from '../../res/functions'

export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {

  }


  render() {
    return (
      <ImageBackground
        source={require('../../res/image/bg_default.png')}
        style={{
          width: Dimensions.get('window').width,
          height: '100%'
        }}
      >
        <SafeAreaView style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <Image
            source={{ uri: userProfile.icon }}
            style={{
              width: size.s240,
              height: size.s240,
              borderRadius: size.s240,
            }}
          />
          <Text style={{
            fontFamily: font.medium,
            fontSize: size.s55,
            paddingTop: size.s30
          }}>{userProfile.name}</Text>
          <Text style={{
            fontFamily: font.italic,
            fontSize: size.s25,
            color: '#ccc'
          }}>{userProfile.email}</Text>

        </SafeAreaView>

        <View style={{
          flex: 0.6,
          justifyContent: 'flex-end'
        }}>

          <TouchableOpacity style={{
            flexDirection: 'row',
            marginVertical: size.s30,
            marginHorizontal: size.s30,
            alignItems: 'center'
          }}
            onPress={() => {
              this.props.navigation.reset({
                routes: [{
                  name: 'Login',
                }],
              })
            }}>
            <Image
              source={require('../../res/image/ic_logout.png')}
              style={{
                tintColor: '#C7272D',
                width: size.s50,
                height: size.s50
              }}
            />
            <Text style={{
              fontFamily: font.medium,
              fontSize: size.s30,
              color: '#C7272D',
              paddingLeft: size.s15
            }}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>

      </ImageBackground>
    )
  }

}