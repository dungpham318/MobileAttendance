import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import image from '../../res/image'
import size from '../../res/size'
import font from '../../res/font'
import TextField from '../custom/TextField'
import Button from '../custom/Button'
import SnackBar from '../custom/SnackBar'
import Loading from '../custom/Loading'
import { setKeyChain, getKeyChain, resetKeyChain } from '../custom/keychain'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { URL, userProfile } from '../../settings/index'
import DeviceInfo, { getUniqueId, getManufacturer } from 'react-native-device-info'

GoogleSignin.configure({
  // scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  // webClientId:
  //   'com.googleusercontent.apps.1039209918487-2e60el09rfmapdcrh65shic2hnd1okc7', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rememberLogin: false,
      username: '',
      password: '',
      loading: false
    }
    this.snackBar = React.createRef()
  }

  async componentDidMount() {


    // let keyChainValue = await getKeyChain()
    // if (keyChainValue.username !== undefined && keyChainValue.username !== '_pfo') {
    //   this.setState({
    //     username: keyChainValue.username,
    //     password: keyChainValue.password,
    //     rememberLogin: true
    //   })
    // }

    // if (this.props.route?.params?.isRegistered) {
    //   this.snackBar.current.showSnackBar(
    //     'Đăng ký tài khoản thành công',
    //     'success'
    //   )
    // }
    // if (this.props.route?.params?.isChangePassword) {
    //   this.snackBar.current.showSnackBar(
    //     'Thay đổi mật khẩu thành công',
    //     'success'
    //   )
    // }
    // if (this.props.route?.params?.ekycError) {
    //   this.snackBar.current.showSnackBar(
    //     'Xác thực thất bại',
    //     'error'
    //   )
    // }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.loadingLogin !== prevProps.loadingLogin && !this.props.loadingLogin) {
      if (this.props.errorLogin !== null) {
        Alert.alert(
          "Thông báo",
          this.props.errorLogin,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        )
      } else if (this.props.responseLogin !== null) {
        if (this.props?.responseLogin?.resultCode === 1) {
          userProfile.id = this.props?.responseLogin?.data?.userData?.id
          userProfile.name = this.props?.responseLogin?.data?.userData?.name
          userProfile.email = this.props?.responseLogin?.data?.userData?.email
          userProfile.emailToken = this.props?.responseLogin?.data?.userData?.emailToken
          userProfile.dateCreated = this.props?.responseLogin?.data?.userData?.dateCreated
          userProfile.dateUpdated = this.props?.responseLogin?.data?.userData?.dateUpdated
          userProfile.isAdmin = this.props?.responseLogin?.data?.userData?.isAdmin
          userProfile.googleId = this.props?.responseLogin?.data?.userData?.googleId
          userProfile.icon = this.props?.responseLogin?.data?.userData?.icon
          userProfile.role = this.props?.responseLogin?.data?.userData?.role
          userProfile.devices = this.props?.responseLogin?.data?.userData?.devices
          userProfile.notifications = this.props?.responseLogin?.data?.userData?.notifications
          userProfile.token = this.props?.responseLogin?.data?.token

          let deviceId = await getUniqueId()
          let checkDevice = await this.checkDevice(deviceId)
          console.log(checkDevice)
          if (checkDevice.resultCode === -1) {
            if (checkDevice?.checkType === -1) {
              alert(checkDevice.message)
            } else {
              this.props.navigation.replace('CheckDevice', {
                checkType: checkDevice?.checkType
              })
            }

          } else {
            this.props.navigation.replace('Home')
          }
        } else {
          Alert.alert(
            "Thông báo",
            this.props.responseLogin.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          )
        }
      }
    }
  }

  checkDevice = async (deviceCode) => {
    await this.setState({ loading: true })
    let url = '/device/check_device?deviceCode=' + deviceCode
    return fetch(URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userProfile?.token}`,
      },
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

  signIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();

      if (userInfo?.idToken) {
        this.props.loginAction({
          emailToken: userInfo?.idToken
        })
      } else {
        alert('Login fail!')
      }

    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  render() {
    return (

      <ImageBackground
        source={image.bg_default}
        style={{
          width: Dimensions.get('window').width,
          height: '100%'
        }}
      >
        {(this.props.loadingLogin || this.state.loading) && <Loading />}
        <SnackBar
          ref={this.snackBar}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >

            <View style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center'
            }}>
              <Image
                resizeMode='contain'
                source={image.iconLogin}
                style={{
                  width: size.s260 * 1.5,
                  height: size.s260 * 1.5
                }}
              />

            </View>

            <View style={{
              flex: 1,
              paddingHorizontal: size.s30,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GoogleSigninButton
                style={{
                  width: Dimensions.get('window').width - size.s260,
                  height: 48,
                  alignItems: 'center',
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
                disabled={this.state.isSigninInProgress} />
              {/* <Button
                style={{
                  backgroundColor: '#ffffff',
                  borderWidth: 1
                }}
                label='Đăng nhập'
                style={{
                  marginTop: size.s50
                }}
                onPress={() => {
                  this.onPressLogin()
                }}
              /> */}
            </View>
          </KeyboardAvoidingView>

        </TouchableWithoutFeedback>

      </ImageBackground>





    )
  }

}