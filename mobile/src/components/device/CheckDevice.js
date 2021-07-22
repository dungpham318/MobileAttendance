import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native'
import DeviceInfo, { getUniqueId, getManufacturer } from 'react-native-device-info'
import { URL, userProfile } from '../../settings/index'
import Loading from '../custom/Loading';
import Header from '../custom/Header';
import Button from '../custom/Button';
import size from '../../res/size';
import font from '../../res/font';
export default class CheckDevice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkType: undefined,
      loading: false,
      deviceName: '',
      deviceId: ''
    }
  }


  async componentDidMount() {
    let deviceId = await getUniqueId()
    this.setState({
      deviceId: deviceId,
      deviceName: await DeviceInfo.getDeviceName(),
      checkType: this.props.route.params.checkType
    })

    // let checkDevice = await this.checkDevice(deviceId)
    // console.log(checkDevice)
    // if (checkDevice.resultCode === -1) {
    //   this.setState({
    //     checkType: checkDevice.checkType
    //   })
    // } else {
    //   this.props.navigation.replace('Home')
    // }

  }

  // checkDevice = async (deviceCode) => {
  //   await this.setState({ loading: true })
  //   let url = '/device/check_device?deviceCode=' + deviceCode
  //   return fetch(URL + url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${userProfile?.token}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(result => {
  //       this.setState({ loading: false })
  //       return result
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  registerDevice = async () => {
    await this.setState({ loading: true })
    let url = '/device/register_new_device'
    return fetch(URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userProfile?.token}`,
      },
      body: JSON.stringify({
        "code": this.state.deviceId,
        "token": '',
        "os": Platform.OS,
        "status": true
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        this.setState({ loading: false })
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }


  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ffffff'
      }}>

        {this.state.loading && <Loading />}
        <Header
          label='Đăng ký thiết bị'
        />
        <View style={{
          flex: 1,

        }}>
          <View style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              source={require('../../res/image/img_phone.png')}
              style={{
                width: size.s260,
                height: size.s260
              }}
            />
          </View>
          <View style={{
            paddingHorizontal: size.s30,
          }}>
            <Text style={{
              fontFamily: font.regular,
              paddingVertical: size.s30,
            }}>
              <Text style={{
                color: '#262626',
                fontSize: size.s30,
                fontFamily: font.bold,
              }}>Tên thiết bị:  </Text>
              {this.state.deviceName}</Text>
            <Text style={{
              fontFamily: font.regular,
              paddingVertical: size.s30,
            }}>
              <Text style={{
                color: '#262626',
                fontSize: size.s30,
                fontFamily: font.bold,
              }}>ID thiết bị:  </Text>
              {this.state.deviceId}</Text>

          </View>


        </View>
        <SafeAreaView style={{
          marginHorizontal: size.s30
        }}>

          <Button
            label={'Đăng ký thiết bị'}
            onPress={async () => {
              let res = await this.registerDevice()
              if (res.resultCode === 1) {
                this.props.navigation.replace('Home')
              } else {
                alert(res.message)
              }
            }}
          />
        </SafeAreaView>


      </View>
    )
  }

}