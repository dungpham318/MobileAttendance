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
import { userProfile } from '../../settings'
import Loading from '../custom/Loading'
import { setKeyChain, getKeyChain, resetKeyChain } from '../custom/keychain'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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
      password: ''
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

  componentDidUpdate(prevProps) {
    if (this.props.loadingLogin !== prevProps.loadingLogin && !this.props.loadingLogin) {
      if (this.props.errorLogin !== null) {
        Alert.alert(
          "Thông báo",
          this.props.errorLogin,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        )
      } else if (this.props.responseLogin !== null) {
        if (this.props?.responseLogin?.status === 200) {
          if (this.state.rememberLogin) {
            setKeyChain(this.state.username, this.state.password)
          } else {
            resetKeyChain()
          }
          userProfile.diaChi = this.props?.responseLogin?.data?.diaChi
          userProfile.hoVaTen = this.props?.responseLogin?.data?.hoVaTen
          userProfile.id = this.props?.responseLogin?.data?.id
          userProfile.matKhau = this.props?.responseLogin?.data?.matKhau
          userProfile.namSinh = this.props?.responseLogin?.data?.namSinh
          userProfile.ngayTao = this.props?.responseLogin?.data?.ngayTao
          userProfile.soCmt = this.props?.responseLogin?.data?.soCmt
          userProfile.soDienThoai = this.props?.responseLogin?.data?.soDienThoai
          userProfile.soHopDong = this.props?.responseLogin?.data?.soHopDong
          this.props.navigation.replace('Home')
        } else {
          resetKeyChain()
          Alert.alert(
            "Thông báo",
            this.props?.responseLogin?.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          )
        }
      }
    }
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

      console.log(userInfo)
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
        {this.props.loadingLogin && <Loading />}
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