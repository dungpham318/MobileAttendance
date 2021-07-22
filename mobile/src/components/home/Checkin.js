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
  Alert,
  Vibration,
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
import { RNCamera } from 'react-native-camera';
const { WifiModule } = NativeModules

export default class Checkin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sessionData: this.props.route?.params.data,
      qrCode: '',
      callApi: false
    }
  }

  async componentDidMount() {
    console.log(this.state.sessionData)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qrCode !== this.state.qrCode) {
      if (this.state.sessionData.attendance == null) {
        this.checkinAPI()

      } else {
        this.checkoutAPI()
      }
    }
  }

  onCheckQRSuccess = e => {
    try {
      Vibration.vibrate()
      this.setState({
        qrCode: e,

      }, () => {
        if (this.state.callApi) {
        }
      })
    } catch (err) { }


  };

  checkinAPI = async () => {
    await this.setState({ loading: true })
    let info = await WifiModule.getWifiInfo()
    console.log(info.BSSID.toString())

    let url = '/attendance/checkin'
    return fetch(URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userProfile?.token}`,
      },
      body: JSON.stringify({
        "sessionID": this.state.sessionData?.id.toString(),
        "macAddress": info.BSSID.toString(),
        "deviceCode": await getUniqueId(),
        "qrCode": this.state.qrCode
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        this.setState({ loading: false }, () => {
          console.log(result)
          if (result.resultCode === -1) {
            Alert.alert(
              "Thông báo",
              result.message,
              [{
                text: "OK", onPress: () => {
                  this.setState({
                    qrCode: '',
                    callApi: false
                  })
                }
              }],
              { cancelable: false }
            )
          } else {
            Alert.alert(
              "Thông báo",
              result.message,
              [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
              { cancelable: false }
            )
          }
        })
        return result
      })
      .catch((error) => {
        console.log(error)
      });
  }

  checkoutAPI = async () => {
    await this.setState({ loading: true })
    let info = await WifiModule.getWifiInfo()
    console.log(info.BSSID.toString())

    let url = '/attendance/checkout'
    return fetch(URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userProfile?.token}`,
      },
      body: JSON.stringify({
        "sessionID": this.state.sessionData?.id.toString(),
        "macAddress": info.BSSID.toString(),
        "deviceCode": await getUniqueId(),
        "qrCode": this.state.qrCode
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        this.setState({ loading: false }, () => {
          if (result.resultCode === -1) {
            Alert.alert(
              "Thông báo",
              result.message,
              [{
                text: "OK", onPress: () => {
                  this.setState({
                    qrCode: '',
                    callApi: false
                  })
                }
              }],
              { cancelable: false }
            )
          } else {
            Alert.alert(
              "Thông báo",
              result.message,
              [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
              { cancelable: false }
            )
          }
        })
        return result
      })
      .catch((error) => {
        console.log(error)
      });
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
        {this.state.loading && <Loading />}

        <RNCamera
          style={{
            flex: 1,
          }}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          // zoom={0.15}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(e) => {
            this.setState({
              callApi: true
            }, () => {
              this.onCheckQRSuccess(e.data)
            })
          }}
          // onGoogleVisionBarcodesDetected={onSuccess} //scan with google services firebase
          // googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
          // googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
          androidCameraPermissionOptions={{
            title: 'Cấp quyền sử dụng máy ảnh',
            message: 'Bạn vui lòng cấp quyền để sử dụng máy ảnh quét mã QR',
            buttonPositive: 'Cho phép',
            buttonNegative: 'Từ chối',
          }}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: size.s100,
            left: size.s40,
          }}
          onPress={() => {
            this.props.navigation.goBack()
          }}>
          <Image
            source={require('../../res/image/close.png')}
            style={{
              tintColor: '#ffffff',
              width: size.s40,
              height: size.s40,
            }}
          />
        </TouchableOpacity>

      </ImageBackground>
    )
  }

}