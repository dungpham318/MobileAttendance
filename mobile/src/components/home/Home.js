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
  Touchable,
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
import { convertDate, convertTime } from '../../res/functions'
const { WifiModule } = NativeModules
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      BSSID: '',
      SSID: '',
      classList: [],
      loading: false
    }
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      Geolocation.requestAuthorization()
      let info = WifiModule.getWifiInfo()
      this.setState({
        BSSID: info?.BSSID,
        SSID: info?.SSID
      })
      let classList = await this.getListClass()
      if (classList.resultCode === 1) {
        this.setState({
          classList: classList.data
        })
      } else {
        alert(classList.message)
      }
    })

  }

  getListClass = async () => {
    await this.setState({ loading: true })
    let url = '/session/get_session_by_date'
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

        <SafeAreaView style={{
          marginHorizontal: size.s30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Image
            source={require('../../res/image/img_logo.png')}
            style={{
              width: size.s200,
              height: size.s100
            }}
          />
          <Image
            source={require('../../res/image/ic_notification.png')}
            style={{
              width: size.s45,
              height: size.s45
            }}
          />
        </SafeAreaView>
        <View style={{
          flex: 1
        }}>

          <View style={{
            marginHorizontal: size.s30,
            marginVertical: size.s30
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: size.s10
            }}>
              <Image
                source={require('../../res/image/ic_wifi.png')}
                style={{
                  width: size.s40,
                  height: size.s40
                }}
              />
              <Text style={{
                fontFamily: font.medium,
                marginHorizontal: size.s10,
                color: '#262626',
                fontSize: size.s30
              }}>{this.state.SSID} ({this.state.BSSID}) </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: size.s10
            }}>
              <Image
                source={require('../../res/image/ic_calendar.png')}
                style={{
                  width: size.s40,
                  height: size.s40
                }}
              />
              <Text style={{
                fontFamily: font.medium,
                marginHorizontal: size.s10,
                color: '#262626',
                fontSize: size.s30
              }}>{convertDate(new Date())}</Text>
            </View>

          </View>
          <View style={{
            paddingHorizontal: size.s30,
            flex: 1,
          }}>
            <Text style={{
              color: '#FE9E23',
              fontFamily: font.bold,
              fontSize: size.s40
            }}>Danh sách buổi học</Text>
            {
              this.state.classList.length === 0 ?
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                }}>

                  <Image
                    source={require('../../res/image/img_emptyClass.png')}
                    style={{
                      width: Dimensions.get('window').width * 0.4,
                      height: Dimensions.get('window').width * 0.4,
                    }}
                    resizeMode='contain'
                  />
                  <Text style={{
                    color: '#262626',
                    fontFamily: font.italic,
                    fontSize: size.s30,
                    marginVertical: size.s60
                  }}>Bạn không có buổi học nào trong hôm nay</Text>

                </View> :

                <ScrollView style={{
                  marginVertical: size.s30
                }}
                  showsVerticalScrollIndicator={false}>
                  {
                    this.state.classList.map((item, index) => {
                      return <ClassItem
                        data={item}
                        key={index}
                        backgroundColor={index % 2 === 0 ? "#EF6F2E" : '#626BB7'}
                        onPress={() => {
                          this.props.navigation.navigate('Checkin', {
                            data: item
                          })
                        }}
                      />
                    })
                  }
                </ScrollView>

            }

          </View>
        </View>

      </ImageBackground>
    )
  }

}

const ClassItem = (props) => {
  let data = props.data
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: props.backgroundColor,
        marginVertical: size.s15,
        paddingHorizontal: size.s15,
        borderRadius: size.s10,
        paddingVertical: size.s10,
      }}
      onPress={() => {
        props.onPress()
      }}
    >

      <Text style={{
        fontFamily: font.medium,
        fontSize: size.s30,
        color: '#ffffff',
        paddingVertical: size.s10,
      }}>
        Môn học: { }
        <Text style={{
          fontFamily: font.regular
        }}>
          {data?.course?.name}
        </Text>
      </Text>

      <Text style={{
        fontFamily: font.medium,
        fontSize: size.s30,
        color: '#ffffff',
        paddingVertical: size.s10,
      }}>
        Phòng học: { }
        <Text style={{
          fontFamily: font.regular
        }}>
          {data?.room?.name}
        </Text>
      </Text>
      <Text style={{
        fontFamily: font.medium,
        fontSize: size.s30,
        color: '#ffffff',
        paddingVertical: size.s10,
      }}>
        Thời gian: { }
        <Text style={{
          fontFamily: font.regular
        }}>
          {convertTime(data?.startTime) + ' - ' + convertTime(data?.endTime)}
        </Text>
      </Text>

      <Text style={{
        fontFamily: font.medium,
        fontSize: size.s30,
        color: '#ffffff',
        paddingVertical: size.s10,
      }}>
        Checkin: { }
        <Text style={{
          fontFamily: font.regular
        }}>
          {convertTime(data?.attendance?.checkinTime)}
        </Text>
      </Text>

      <Text style={{
        fontFamily: font.medium,
        fontSize: size.s30,
        color: '#ffffff',
        paddingVertical: size.s10,
      }}>
        Checkout: { }
        <Text style={{
          fontFamily: font.regular
        }}>
          {convertTime(data?.attendance?.checkoutTime)}
        </Text>
      </Text>

    </TouchableOpacity>
  )
}