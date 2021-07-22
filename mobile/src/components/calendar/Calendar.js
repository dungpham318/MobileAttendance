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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: convertDate(new Date(), 'yyyy-mm-dd'),
      classList: []
    }
  }

  async componentDidMount() {
    this.getListClass(this.state.selectedDate)
  }

  getListClass = async () => {
    await this.setState({ loading: true })
    let url = '/session/get_session_by_date?date=' + this.state.selectedDate
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
          this.setState({
            classList: result.data
          })
        }
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
          alignItems: 'center',
        }}>
          <Text style={{
            color: '#FE9E23',
            fontFamily: font.bold,
            fontSize: size.s40,
            paddingVertical: size.s30
          }}>Lịch sử điểm danh</Text>
        </SafeAreaView>

        <View style={{
          width: '100%'
        }}>
          <Calendar
            current={this.state.selectedDate}
            onDayPress={(day) => {
              this.setState({ selectedDate: day.dateString }, () => {
                this.getListClass(this.state.selectedDate)
              })
            }}
            markedDates={{
              [this.state.selectedDate]: { selected: true, marked: true, selectedColor: '#FE9E23' },
            }}
          />
        </View>



        {
          this.state.classList.length > 0 ?
            <ScrollView style={{
              marginHorizontal: size.s30,
              flex: 1,
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
            </ScrollView> :
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

            </View>
        }


      </ImageBackground>
    )
  }

}

const ClassItem = (props) => {
  let data = props.data
  return (
    <View
      style={{
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

    </View>
  )
}